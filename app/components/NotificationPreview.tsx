"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "../page.module.css";

export default function NotificationPreview() {
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ email: "", consent: "" });
  const [submitted, setSubmitted] = useState(false);

  function submitPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current;
    const consent = consentRef.current;
    if (!email || !consent) return;
    email.value = email.value.trim();
    const nextErrors = {
      email: !email.value ? "이메일을 입력해주세요." : email.validity.typeMismatch ? "올바른 이메일 형식으로 입력해주세요." : "",
      consent: consent.checked ? "" : "필수 동의 항목을 선택해주세요.",
    };
    setErrors(nextErrors);
    setSubmitted(!nextErrors.email && !nextErrors.consent);
    if (nextErrors.email) email.focus();
    else if (nextErrors.consent) consent.focus();
  }

  return (
    <form className={styles.notificationForm} aria-label="출시 알림 신청 미리보기" aria-describedby="notification-preview-note notification-submit-note" noValidate onSubmit={submitPreview}>
      <p id="notification-preview-note" className={styles.previewNote}>현재는 미리보기로, 실제 신청은 접수되지 않습니다.</p>
      <label htmlFor="notification-email" className={styles.fieldLabel}>이메일 <span>(필수)</span></label>
      <input ref={emailRef} id="notification-email" type="email" autoComplete="off" placeholder="name@example.com" required aria-invalid={Boolean(errors.email)} aria-describedby={`notification-email-help${errors.email ? " notification-email-error" : ""}`} className={styles.emailInput} onChange={() => { setErrors((previous) => ({ ...previous, email: "" })); setSubmitted(false); }} />
      {errors.email && <p id="notification-email-error" className={styles.fieldError} role="alert">{errors.email}</p>}
      <p id="notification-email-help" className={styles.fieldHelp}>회원가입 없이 입력할 수 있어요. 입력한 이메일은 저장하거나 발송에 사용하지 않습니다.</p>
      <label className={styles.consentLabel}>
        <input ref={consentRef} id="notification-consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} aria-describedby={`notification-consent-help${errors.consent ? " notification-consent-error" : ""}`} onChange={() => { setErrors((previous) => ({ ...previous, consent: "" })); setSubmitted(false); }} />
        <span>출시 알림을 위한 이메일 수집·이용에 동의합니다. (필수)</span>
      </label>
      {errors.consent && <p id="notification-consent-error" className={styles.fieldError} role="alert">{errors.consent}</p>}
      <p id="notification-consent-help" className={styles.fieldHelp}>동의 항목의 화면 미리보기입니다. 실제 접수용 동의 문구와 보관 정책은 준비 중입니다.</p>
      <button type="submit" className={styles.submitButton} aria-describedby="notification-submit-note">출시 알림 신청 미리보기</button>
      <p id="notification-submit-note" className={styles.fieldHelp}>이메일과 필수 동의를 입력하면 신청 흐름을 미리 확인할 수 있어요.</p>
      <p role="status" className={submitted ? styles.previewNote : undefined}>{submitted ? "현재는 미리보기로, 실제 신청은 접수되지 않습니다." : ""}</p>
    </form>
  );
}
