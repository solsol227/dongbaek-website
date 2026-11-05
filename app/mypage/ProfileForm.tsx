"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import styles from "@/app/components/account.module.css";

export default function ProfileForm({ userId, email, initialNickname }: { userId: string; email: string; initialNickname: string }) {
  const router = useRouter();
  const [nickname, setNickname] = useState(initialNickname);
  const [pending, setPending] = useState<"save" | "delete" | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function updateNickname(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError("");
    setMessage("");
    const value = nickname.trim();
    if (!value) { setError("닉네임을 입력해 주세요."); return; }
    setPending("save");
    try {
      const { data, error } = await createClient().from("profiles").update({ nickname: value }).eq("id", userId).select("nickname").single();
      if (error || !data) throw error ?? new Error("Profile not found");
      setNickname(data.nickname);
      setMessage("닉네임을 수정했습니다.");
      router.refresh();
    } catch {
      setError("닉네임을 수정하지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setPending(null);
    }
  }

  async function deleteAccount() {
    if (pending || !window.confirm("회원 탈퇴하시겠습니까? 계정과 프로필이 삭제됩니다.")) return;
    setPending("delete");
    setError("");
    setMessage("");
    const supabase = createClient();
    try {
      const { error } = await supabase.rpc("delete_own_account");
      if (error) throw error;
    } catch {
      setError("회원 탈퇴하지 못했습니다. 다시 시도해 주세요.");
      setPending(null);
      return;
    }
    // The account is already deleted. Always clear the browser session too,
    // even if the Auth server can no longer find the deleted user.
    try {
      const { error } = await supabase.auth.signOut();
      if (error) await supabase.auth.signOut({ scope: "local" });
    } finally {
      router.replace("/");
      router.refresh();
    }
  }

  return <>
    <form className={styles.form} onSubmit={updateNickname} aria-busy={!!pending}>
      <label className={styles.field} htmlFor="profile-email">이메일
        <input id="profile-email" className={styles.input} value={email} readOnly type="email" />
      </label>
      <label className={styles.field} htmlFor="profile-nickname">닉네임
        <input id="profile-nickname" className={styles.input} name="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} autoComplete="nickname" required disabled={!!pending} />
      </label>
      {message && <p className={styles.success} role="status">{message}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.primary} type="submit" disabled={!!pending}>{pending === "save" ? "저장 중…" : "닉네임 수정"}</button>
    </form>
    <div className={styles.deleteSection}>
      <button className={styles.danger} type="button" onClick={deleteAccount} disabled={!!pending}>{pending === "delete" ? "탈퇴 중…" : "회원 탈퇴"}</button>
    </div>
  </>;
}
