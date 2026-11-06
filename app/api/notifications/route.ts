import { normalizePhone, notificationErrors, NOTIFICATION_CONSENT_VERSION } from "@/utils/notifications";

function reply(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next.js Proxy may normalize request.url to an internal host. Browsers send
  // the public authority in Host, so compare Origin against that authority.
  let invalidOrigin = false;
  if (origin) {
    try {
      const originUrl = new URL(origin);
      invalidOrigin = !["http:", "https:"].includes(originUrl.protocol) || originUrl.host !== (request.headers.get("host") ?? new URL(request.url).host);
    } catch {
      invalidOrigin = true;
    }
  }
  if (invalidOrigin || request.headers.get("sec-fetch-site") === "cross-site") {
    return reply({ error: "이 사이트의 신청 폼에서 다시 접수해주세요." }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return reply({ error: "잘못된 요청입니다." }, 415);
  }
  let body: unknown;
  try {
    if (Number(request.headers.get("content-length")) > 2048) return reply({ error: "입력 내용이 너무 깁니다." }, 413);
    const raw = await request.text();
    if (raw.length > 2048) return reply({ error: "입력 내용이 너무 깁니다." }, 413);
    body = JSON.parse(raw);
  } catch {
    return reply({ error: "입력 내용을 확인해주세요." }, 400);
  }
  if (!body || typeof body !== "object" || !("name" in body) || !("phone" in body) || !("consent" in body) || typeof body.name !== "string" || typeof body.phone !== "string") {
    return reply({ error: "이름과 휴대폰 번호를 입력해주세요." }, 400);
  }
  const name = body.name.trim();
  const phone = normalizePhone(body.phone);
  const errors = notificationErrors(name, phone, body.consent === true);
  if (Object.values(errors).some(Boolean)) return reply({ error: "입력 내용을 확인해주세요.", errors }, 400);

  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url) || !secret || secret.length < 32) {
    return reply({ error: "신청 접수를 준비 중입니다. 잠시 후 다시 이용해주세요." }, 503);
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, name, phone, consent: true, consentVersion: NOTIFICATION_CONSENT_VERSION, source: "dongbaek-website" }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) throw new Error("Storage unavailable");
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) throw new Error("Storage not confirmed");
    return reply({ ok: true });
  } catch {
    // Do not log names, phone numbers, secrets, or upstream responses.
    return reply({ error: "접수 결과를 확인하지 못했습니다. 잠시 후 다시 신청해주세요. 같은 번호는 중복 저장되지 않습니다." }, 502);
  }
}
