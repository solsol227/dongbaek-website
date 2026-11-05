import type { Metadata } from "next";
import Chats from "./Chats";
import styles from "./preview.module.css";

export const metadata: Metadata = {
  title: "Chats · Component preview",
  description: "A mobile Chats component recreated from the provided design resources.",
};

export default function ChatsPreviewPage() {
  return (
    <main className={styles.preview}>
      <Chats className={styles.chatScreen} />
    </main>
  );
}
