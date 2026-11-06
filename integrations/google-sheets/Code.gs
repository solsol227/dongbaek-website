// Paste this entire file into the spreadsheet's Extensions > Apps Script editor.
const SPREADSHEET_ID = "16uW5SoSuHZsWsrlsE5alwIbRjoJyiWgulyZ1asOfRco";
const TAB_NAME = "출시알림접수";
const CONSENT_VERSION = "2026-11-06-v1";
const HEADERS = ["접수시각(KST)", "이름", "휴대폰번호", "수집·이용 동의", "동의문 버전", "신청경로"];

function jsonResult(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let lock;
  try {
    const secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!secret || secret.length < 32 || !e || !e.postData || e.postData.contents.length > 2048) return jsonResult({ ok: false });
    const data = JSON.parse(e.postData.contents);
    if (!data || data.secret !== secret || data.consent !== true || data.consentVersion !== CONSENT_VERSION || data.source !== "dongbaek-website") return jsonResult({ ok: false });
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const phone = typeof data.phone === "string" ? data.phone.replace(/[\s()-]/g, "") : "";
    if (!name || name.length > 50 || /[\u0000-\u001f\u007f]/.test(name) || !/^(010\d{8}|01[16789]\d{7,8})$/.test(phone)) return jsonResult({ ok: false });

    // Serialize duplicate checks and writes, including simultaneous submissions.
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return jsonResult({ ok: false });
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(TAB_NAME) || spreadsheet.insertSheet(TAB_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }
    // Never overwrite an existing tab with a different column layout.
    const headers = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    if (!HEADERS.every((value, index) => value === headers[index])) return jsonResult({ ok: false });
    const lastRow = sheet.getLastRow();
    if (lastRow > 1 && sheet.getRange(2, 3, lastRow - 1, 1).createTextFinder(phone).matchEntireCell(true).useRegularExpression(false).findNext()) {
      return jsonResult({ ok: true });
    }
    const row = lastRow + 1;
    if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 100);
    // Text format preserves the leading zero; escape formula-like names.
    const safeName = /^[=+@\-']/.test(name) ? "'" + name : name;
    sheet.getRange(row, 1, 1, HEADERS.length).setNumberFormat("@").setValues([[
      Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss"),
      safeName, phone, "동의", CONSENT_VERSION, "dongbaek-website",
    ]]);
    SpreadsheetApp.flush();
    return jsonResult({ ok: true });
  } catch (_) {
    // Do not include submitted personal data in responses or execution logs.
    return jsonResult({ ok: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
