import type { Metadata } from "next";
import AuthForm from "@/app/components/AuthForm";
import styles from "@/app/components/account.module.css";

export const metadata: Metadata = { title: "회원가입 | bLOOM" };

export default function SignupPage() {
  return <main className={styles.page}><AuthForm mode="signup" /></main>;
}
