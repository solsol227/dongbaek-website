"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import styles from "./account.module.css";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setPending(true);
    setError("");
    try {
      const { error } = await createClient().auth.signOut();
      if (error) throw error;
      router.replace("/");
      router.refresh();
    } catch {
      setError("로그아웃하지 못했습니다. 다시 시도해 주세요.");
      setPending(false);
    }
  }

  return <div className={styles.logout}>
    <button type="button" className={styles.textButton} disabled={pending} onClick={logout}>{pending ? "로그아웃 중…" : "로그아웃"}</button>
    {error && <p className={styles.logoutError} role="alert">{error}</p>}
  </div>;
}
