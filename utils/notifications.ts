export const NOTIFICATION_CONSENT_VERSION = "2026-11-06-v1";

export function normalizePhone(value: string) {
  return value.replace(/[\s()-]/g, "");
}

export function notificationErrors(name: string, phone: string, consent: boolean) {
  return {
    name: !name ? "이름을 입력해주세요." : name.length > 50 || /[\u0000-\u001f\u007f]/.test(name) ? "이름은 50자 이내로 입력해주세요." : "",
    phone: !phone ? "휴대폰 번호를 입력해주세요." : !/^(010\d{8}|01[16789]\d{7,8})$/.test(normalizePhone(phone)) ? "올바른 휴대폰 번호를 입력해주세요. 예: 010-1234-5678" : "",
    consent: consent ? "" : "필수 동의 항목을 선택해주세요.",
  };
}
