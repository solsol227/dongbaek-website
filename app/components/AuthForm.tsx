"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import styles from "./account.module.css";

export default function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const nickname = String(form.get("nickname") ?? "").trim();

    if (isSignup && !nickname) {
      setError("닉네임을 입력해 주세요.");
      setPending(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = isSignup
        ? await supabase.auth.signUp({ email, password, options: { data: { nickname } } })
        : await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(isSignup ? "회원가입하지 못했습니다. 입력 내용을 확인하고 다시 시도해 주세요." : "이메일 또는 비밀번호가 틀렸습니다");
        return;
      }
      if (!data.session) {
        setError("로그인 상태를 만들지 못했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError(isSignup ? "회원가입하지 못했습니다. 잠시 후 다시 시도해 주세요." : "이메일 또는 비밀번호가 틀렸습니다");
    } finally {
      setPending(false);
    }
  }

  return <div className={styles.panel}>
    <h1 className={styles.title}>{isSignup ? "회원가입" : "로그인"}</h1>
    <form className={styles.form} onSubmit={submit} aria-busy={pending}>
      <label className={styles.field} htmlFor={`${mode}-email`}>이메일
        <input className={styles.input} id={`${mode}-email`} name="email" type="email" autoComplete="email" placeholder="name@example.com" required disabled={pending} />
      </label>
      <label className={styles.field} htmlFor={`${mode}-password`}>비밀번호
        <input className={styles.input} id={`${mode}-password`} name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={isSignup ? 6 : undefined} placeholder={isSignup ? "6자 이상 입력해 주세요" : "비밀번호를 입력해 주세요"} required disabled={pending} />
      </label>
      {isSignup && <label className={styles.field} htmlFor="signup-nickname">닉네임
        <input className={styles.input} id="signup-nickname" name="nickname" autoComplete="nickname" placeholder="닉네임을 입력해 주세요" required disabled={pending} />
      </label>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.primary} disabled={pending} type="submit">{pending ? "처리 중…" : isSignup ? "회원가입" : "로그인"}</button>
    </form>
    <p className={styles.footer}>{isSignup ? "이미 가입하셨나요?" : "아직 회원이 아니신가요?"}<Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "로그인" : "회원가입"}</Link></p>
  </div>;
}
