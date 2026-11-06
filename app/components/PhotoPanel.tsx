import Image from "next/image";
import type { ReactNode } from "react";
import styles from "../page.module.css";

export default function PhotoPanel({ image, alt, children, className = "" }: {
  image: string;
  alt: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.photoPanel} ${className}`}>
      <Image src={image} alt={alt} fill sizes="(max-width: 767px) 100vw, 90vw" className={styles.panelImage} />
      <div className={styles.photoCopy}>{children}</div>
    </div>
  );
}
