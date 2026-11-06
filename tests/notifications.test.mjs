import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function loadTs(file, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, { exports, Response, Request, URL, AbortSignal, ...globals });
  return exports;
}
const helpers = loadTs("utils/notifications.ts");
const secret = "test-only-secret-abcdefghijklmnopqrstuvwxyz";
const valid = { name: "테스트", phone: "010-0000-0000", consent: true };

function route(fetch, configured = true) {
  return loadTs("app/api/notifications/route.ts", {
    require: () => helpers,
    process: { env: configured ? { GOOGLE_SHEETS_WEBHOOK_URL: "https://script.google.com/macros/s/test/exec", GOOGLE_SHEETS_WEBHOOK_SECRET: secret } : {} },
    fetch,
  }).POST;
}
function request(body = valid, extra = {}) {
  return new Request("https://example.test/api/notifications", {
    method: "POST", headers: { "Content-Type": "application/json", origin: "https://example.test", ...extra }, body: JSON.stringify(body),
  });
}

test("phone validation accepts separators and rejects invalid domestic numbers", () => {
  assert.equal(helpers.normalizePhone("010 (0000) 0000"), "01000000000");
  assert.equal(helpers.notificationErrors(valid.name, valid.phone, true).phone, "");
  for (const phone of ["0101234567", "0212345678", "010abcdefgh", "010000000000", ""]) {
    assert.ok(helpers.notificationErrors(valid.name, phone, true).phone);
  }
  assert.ok(helpers.notificationErrors("", valid.phone, true).name);
  assert.ok(helpers.notificationErrors("a\nb", valid.phone, true).name);
  assert.ok(helpers.notificationErrors(valid.name, valid.phone, false).consent);
});

test("API validates consent, input, origin and configuration before contacting Google", async () => {
  const submit = route(() => { throw new Error("Google must not be called"); });
  for (const body of [null, {}, { ...valid, name: "" }, { ...valid, phone: "bad" }, { ...valid, consent: "true" }, { ...valid, consent: false }]) {
    assert.equal((await submit(request(body))).status, 400);
  }
  assert.equal((await submit(request(valid, { origin: "https://other.test" }))).status, 403);
  assert.equal((await submit(request(valid, { origin: "null" }))).status, 403);
  assert.equal((await submit(request(valid, { "sec-fetch-site": "cross-site" }))).status, 403);
  assert.equal((await submit(request(valid, { "Content-Type": "text/plain" }))).status, 415);
  assert.equal((await submit(request({ ...valid, name: "a".repeat(2100) }))).status, 413);
  assert.equal((await route(() => assert.fail(), false)(request())).status, 503);
  // A proxy's internal request URL can differ from the browser-facing Host.
  const proxied = request(valid, { host: "public.example.test", origin: "https://public.example.test" });
  assert.equal((await route(() => assert.fail(), false)(proxied)).status, 503);
});

test("API forwards normalized data and server-only secret, requires explicit storage success", async () => {
  let sent;
  const response = await route(async (url, options) => {
    sent = JSON.parse(options.body);
    assert.equal(options.redirect, "follow");
    assert.equal(options.cache, "no-store");
    return Response.json({ ok: true });
  })(request({ ...valid, name: " テスト " }));
  assert.equal(response.status, 200);
  assert.equal(sent.name, "テスト");
  assert.equal(sent.phone, "01000000000");
  assert.equal(sent.secret, secret);
  assert.equal(sent.consentVersion, helpers.NOTIFICATION_CONSENT_VERSION);
  assert.equal(await response.text(), '{"ok":true}');
  assert.equal(response.headers.get("cache-control"), "no-store");
  for (const fetch of [async () => Response.json({ ok: false }), async () => new Response("Login page"), async () => Response.json({ ok: true }, { status: 403 }), async () => { throw new Error("secret upstream error"); }]) {
    const failure = await route(fetch)(request());
    assert.equal(failure.status, 502);
    assert.ok(!(await failure.text()).includes("secret upstream error"));
  }
});

function script() {
  const rows = [];
  let locked = false;
  const sheet = {
    getLastRow: () => rows.length,
    getMaxRows: () => 1000,
    appendRow: (row) => rows.push(Array.from(row)),
    setFrozenRows() {},
    getRange: (row, col, count = 1) => {
      const range = {
        setFontWeight: () => range,
        setNumberFormat: () => range,
        setValues: (values) => { rows[row - 1] = values[0]; return range; },
        getValues: () => rows.slice(row - 1, row - 1 + count),
        createTextFinder: (phone) => {
          const finder = { matchEntireCell: () => finder, useRegularExpression: () => finder, findNext: () => rows.slice(1).some((entry) => entry[col - 1] === phone) };
          return finder;
        },
      };
      return range;
    },
  };
  const context = {
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => secret }) },
    LockService: { getScriptLock: () => ({ tryLock: () => { locked = true; return true; }, hasLock: () => locked, releaseLock: () => { locked = false; } }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => rows.length ? sheet : null, insertSheet: () => sheet }), flush() {} },
    Utilities: { formatDate: () => "2026-11-06 12:00:00" },
    ContentService: { MimeType: { JSON: "application/json" }, createTextOutput: (body) => ({ setMimeType: () => JSON.parse(body) }) },
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync("integrations/google-sheets/Code.gs", "utf8"), context);
  return { rows, locked: () => locked, post: (data) => context.doPost({ postData: { contents: JSON.stringify(data) } }) };
}
const scriptBody = { ...valid, phone: "01000000000", secret, consentVersion: helpers.NOTIFICATION_CONSENT_VERSION, source: "dongbaek-website" };

test("Apps Script rejects unauthenticated requests and missing consent without writing", () => {
  const app = script();
  for (const data of [null, {}, { ...scriptBody, secret: "wrong" }, { ...scriptBody, consent: false }, { ...scriptBody, consentVersion: "old" }, { ...scriptBody, phone: "bad" }]) {
    assert.equal(app.post(data).ok, false);
    assert.equal(app.rows.length, 0);
  }
});

test("Apps Script preserves leading zeros, prevents duplicate rows and releases lock", () => {
  const app = script();
  assert.equal(app.post(scriptBody).ok, true);
  assert.equal(app.rows.length, 2);
  assert.equal(app.rows[1][2], "01000000000");
  assert.equal(app.rows[1][3], "동의");
  assert.equal(app.post(scriptBody).ok, true);
  assert.equal(app.rows.length, 2);
  assert.equal(app.locked(), false);
  assert.equal(app.post({ ...scriptBody, phone: "01000000001", name: "=1+1" }).ok, true);
  assert.equal(app.rows[2][1], "'=1+1");
  app.rows[0][0] = "unrelated header";
  assert.equal(app.post({ ...scriptBody, phone: "01000000002" }).ok, false);
  assert.equal(app.rows.length, 3);
  assert.equal(app.locked(), false);
});
