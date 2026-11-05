import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";
import styles from "./account.module.css";

export function HeaderFallback() {
  return <header className={styles.header}><div className={styles.headerInner}><Link href="/" className={styles.brand}>Chats</Link><span className={styles.loading}>불러오는 중…</span></div></header>;
}

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let nickname = "";
  if (user) {
    const { data } = await supabase.from("profiles").select("nickname").eq("id", user.id).maybeSingle();
    nickname = data?.nickname ?? user.user_metadata.nickname ?? user.email?.split("@")[0] ?? "회원";
  }

  return <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/" className={styles.brand}>Chats</Link>
      <nav className={styles.navigation} aria-label="회원 메뉴">
        {user ? <>
          <span className={styles.nickname} title={`${nickname}님`}>{nickname}님</span>
          <Link href="/mypage" prefetch={false}>마이페이지</Link>
          <LogoutButton />
        </> : <>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </>}
      </nav>
    </div>
  </header>;
}
