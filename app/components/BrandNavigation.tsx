import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./brand-header.module.css";

const navigation = [
  ["collaboration", "콜라보"], ["village", "동백마을"],
  ["experience", "체험"], ["goods", "굿즈"],
  ["notification", "알림받기"], ["visit", "방문안내"],
];

export default function BrandNavigation({ children }: { children: ReactNode }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="bLOOM 홈">
          <Image src="/brand/bloom-logo.png" alt="bLOOM YOUR WAY" width={2172} height={724} className={styles.logo} preload />
        </Link>
        <nav className={styles.sections} aria-label="브랜드 메뉴">
          {navigation.map(([id, label]) => <a key={id} href={`/#${id}`}>{label}</a>)}
        </nav>
        <nav className={styles.account} aria-label="회원 메뉴">{children}</nav>
      </div>
    </header>
  );
}
