import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProfileForm from "./ProfileForm";
import styles from "@/app/components/account.module.css";

export const metadata: Metadata = { title: "마이페이지 | Chats" };

async function Profile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile, error } = await supabase.from("profiles").select("nickname").eq("id", user.id).single();

  if (error || !profile) {
    return <p role="alert" className={styles.error}>프로필을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>;
  }

  return <ProfileForm userId={user.id} email={user.email ?? ""} initialNickname={profile.nickname} />;
}

export default function MyPage() {
  return <main className={styles.page}>
    <div className={styles.panel}>
      <h1 className={styles.title}>마이페이지</h1>
      <Suspense fallback={<p className={styles.loading}>프로필을 불러오는 중…</p>}><Profile /></Suspense>
    </div>
  </main>;
}
