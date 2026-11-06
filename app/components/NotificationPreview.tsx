"use client";

import { useRef, useState, type FormEvent } from "react";
import { normalizePhone, notificationErrors } from "@/utils/notifications";
import styles from "../page.module.css";

export default function NotificationPreview() {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);
  const [errors, setErrors] = useState({ name: "", phone: "", consent: "" });
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function changed(field: keyof typeof errors) {
    setErrors((previous) => ({ ...previous, [field]: "" }));
    setSubmitted(false);
    setSubmitError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current || submitted) return;
    const name = nameRef.current;
    const phone = phoneRef.current;
    const consent = consentRef.current;
    if (!name || !phone || !consent) return;
    name.value = name.value.trim();
    const nextErrors = notificationErrors(name.value, phone.value, consent.checked);
    setErrors(nextErrors);
    setSubmitError("");
    if (nextErrors.name) return name.focus();
    if (nextErrors.phone) return phone.focus();
    if (nextErrors.consent) return consent.focus();
    sendingRef.current = true;
    setPending(true);
    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.value, phone: normalizePhone(phone.value), consent: consent.checked }),
        signal: AbortSignal.timeout(25_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        if (result.errors) setErrors(result.errors);
        throw new Error(typeof result.error === "string" ? result.error : "신청을 접수하지 못했습니다. 다시 시도해주세요.");
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error && error.name === "Error" ? error.message : "접수 결과를 확인하지 못했습니다. 잠시 후 다시 신청해주세요. 같은 번호는 중복 저장되지 않습니다.");
    } finally {
      sendingRef.current = false;
      setPending(false);
    }
  }

  return (
    <form className={styles.notificationForm} aria-label="출시 알림 신청" aria-busy={pending} noValidate onSubmit={submit}>
      <div className={styles.notificationField}>
        <label htmlFor="notification-name" className={styles.fieldLabel}>이름 <span>(필수)</span></label>
        <input ref={nameRef} id="notification-name" name="name" type="text" autoComplete="name" placeholder="이름을 입력해주세요" maxLength={50} required disabled={pending} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "notification-name-error" : undefined} className={styles.emailInput} onChange={() => changed("name")} />
        {errors.name && <p id="notification-name-error" className={styles.fieldError} role="alert">{errors.name}</p>}
      </div>
      <div className={styles.notificationField}>
        <label htmlFor="notification-phone" className={styles.fieldLabel}>휴대폰 번호 <span>(필수)</span></label>
        <input ref={phoneRef} id="notification-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="010-1234-5678" maxLength={20} required disabled={pending} aria-invalid={Boolean(errors.phone)} aria-describedby={`notification-phone-help${errors.phone ? " notification-phone-error" : ""}`} className={styles.emailInput} onChange={() => changed("phone")} />
        {errors.phone && <p id="notification-phone-error" className={styles.fieldError} role="alert">{errors.phone}</p>}
        <p id="notification-phone-help" className={styles.fieldHelp}>출시 소식을 받을 국내 휴대폰 번호를 입력해주세요.</p>
      </div>
      <label className={styles.consentLabel}>
        <input ref={consentRef} id="notification-consent" name="consent" type="checkbox" required disabled={pending} aria-invalid={Boolean(errors.consent)} aria-describedby={`notification-consent-help${errors.consent ? " notification-consent-error" : ""}`} onChange={() => changed("consent")} />
        <span>출시 알림을 위한 이름·휴대폰 번호 수집·이용에 동의합니다. (필수)</span>
      </label>
      {errors.consent && <p id="notification-consent-error" className={styles.fieldError} role="alert">{errors.consent}</p>}
      <p id="notification-consent-help" className={styles.fieldHelp}>수집 항목: 이름, 휴대폰 번호 · 이용 목적: 출시 알림 안내 · 보유 기간: 출시 알림 발송 완료 또는 동의 철회 시까지. 동의를 거부할 수 있으며, 거부 시 알림 신청이 제한됩니다.</p>
      <button type="submit" className={styles.submitButton} disabled={pending || submitted}>{pending ? "신청 접수 중…" : submitted ? "신청 완료" : "출시 알림 신청"}</button>
      {submitError && <p className={styles.fieldError} role="alert">{submitError}</p>}
      <p role="status" className={submitted ? styles.previewNote : undefined}>{submitted ? "출시 알림 신청이 완료되었습니다. 새로운 소식으로 만나요!" : ""}</p>
    </form>
  );
}
