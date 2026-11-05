import type { Metadata } from "next";
import AuthForm from "@/app/components/AuthForm";
import styles from "@/app/components/account.module.css";

export const metadata: Metadata = { title: "로그인 | Chats" };

export default function LoginPage() {
  return <main className={styles.page}><AuthForm mode="login" /></main>;
}
