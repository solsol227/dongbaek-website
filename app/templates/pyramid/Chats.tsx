"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./Chats.module.css";

export type Chat = { id: string; name: string; message: string; unread?: number };
export type ChatsProps = { initialChats?: Chat[]; className?: string };

export const sampleChats: Chat[] = [
  { id: "haley", name: "Haley James", message: "Stand up for what you believe in", unread: 9 },
  { id: "nathan", name: "Nathan Scott", message: "One day you’re seventeen and planning for someday. And then quietly and without..." },
  { id: "brooke", name: "Brooke Davis", message: "I am who I am. No excuses.", unread: 2 },
  { id: "jamie", name: "Jamie Scott", message: "Some people are a little different. I think that’s cool." },
  { id: "marvin", name: "Marvin McFadden", message: "Last night in the NBA the Charlotte Bobcats quietly made a move that most sports fans..." },
  { id: "antwon", name: "Antwon Taylor", message: "Meet me at the Rivercourt" },
  { id: "jake", name: "Jake Jagielski", message: "In your life, you're gonna go to some great places, and do some wonderful things." },
  { id: "peyton", name: "Peyton Sawyer", message: "Every song ends. Is that any reason not to enjoy the music?" },
];

type IconName = "search" | "compose" | "chats" | "friends" | "settings" | "back" | "send";
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    compose: <><path d="M12 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7" /><path d="m16 3 5 5M10 14l1-5 8-8 5 5-8 8-6 1Z" /></>,
    chats: <path d="M12 2a10 10 0 0 0-8.5 15.3L2 23l5.8-1.5A10 10 0 1 0 12 2Z" fill="currentColor" stroke="none" />,
    friends: <><circle cx="12" cy="6" r="5" fill="currentColor" stroke="none" /><path d="M3 23v-3a9 9 0 0 1 18 0v3Z" fill="currentColor" stroke="none" /></>,
    settings: <path d="m10 2-.6 2.3-2 .9-2.1-1.1L2.5 7l1.2 2-.8 2L.5 12v4l2.4.7.8 2-1.2 2 2.8 2.8 2.1-1.1 2 .8.6 2.3h4l.6-2.3 2-.8 2.1 1.1 2.8-2.8-1.2-2 .8-2 2.4-.7v-4l-2.4-1-.8-2 1.2-2-2.8-2.9-2.1 1.1-2-.9L14 2h-4Zm2 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="currentColor" fillRule="evenodd" stroke="none" transform="translate(1 -1) scale(.92)" />,
    back: <path d="m15 4-8 8 8 8" />,
    send: <><path d="m3 3 19 9-19 9 4-9-4-9Z" /><path d="M7 12h15" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Avatar() {
  return <span className={styles.avatar} aria-hidden="true"><span /><span /></span>;
}

/** Standalone local-state demo of the supplied 375 × 812 Chats design. */
export default function Chats({ initialChats = sampleChats, className = "" }: ChatsProps) {
  const searchId = useId();
  const [chats, setChats] = useState(initialChats);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"Chats" | "Friends" | "Settings">("Chats");
  const [editing, setEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<Record<string, string[]>>({});
  const activeChat = chats.find((chat) => chat.id === activeId);
  const filtered = chats.filter((chat) => `${chat.name} ${tab === "Chats" ? chat.message : ""}`.toLowerCase().includes(query.toLowerCase().trim()));

  function openChat(chat: Chat) {
    if (editing) {
      setSelectedIds((ids) => ids.includes(chat.id) ? ids.filter((id) => id !== chat.id) : [...ids, chat.id]);
      return;
    }
    setActiveId(chat.id);
    setChats((items) => items.map((item) => item.id === chat.id ? { ...item, unread: 0 } : item));
    setDraft("");
    setComposing(false);
  }

  return (
    <section className={`${styles.screen} ${className}`} aria-label="Chats application">
      <div className={styles.statusBar} aria-hidden="true">
        <span className={styles.time}>9:41</span>
        <span className={styles.statusIcons}>
          <span className={styles.signal}><i /><i /><i /><i /></span>
          <svg className={styles.wifi} viewBox="0 0 20 17"><path d="M1 5a14 14 0 0 1 18 0M4 9a9 9 0 0 1 12 0M7 12a4 4 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="m8 14 2 3 2-3Z" fill="currentColor" /></svg>
          <span className={styles.battery}><i /></span>
        </span>
      </div>
      <header className={styles.header}>
        {activeChat || composing ? (
          <button className={styles.iconButton} onClick={() => { setActiveId(null); setComposing(false); setDraft(""); }} aria-label="Back to chats"><Icon name="back" /></button>
        ) : tab === "Chats" ? (
          <button className={styles.editButton} onClick={() => { setEditing(!editing); setSelectedIds([]); }}>{editing ? "Done" : "Edit"}</button>
        ) : <span />}
        <h1>{activeChat?.name ?? (composing ? "New chat" : tab)}</h1>
        {!activeChat && !composing && tab === "Chats" ? (
          <button className={styles.iconButton} onClick={() => { setComposing(true); setEditing(false); setQuery(""); }} aria-label="New chat"><Icon name="compose" /></button>
        ) : <span />}
      </header>
      {activeChat ? (
        <>
          <div className={styles.conversation} role="log" aria-label={`Conversation with ${activeChat.name}`}>
            <p className={styles.demoNote}>Demo conversation · messages stay in this session</p>
            <p className={styles.received}>{initialChats.find((chat) => chat.id === activeChat.id)?.message ?? activeChat.message}</p>
            {sent[activeChat.id]?.map((message, index) => <p className={styles.sent} key={index}>{message}</p>)}
          </div>
          <form className={styles.messageForm} onSubmit={(event) => {
            event.preventDefault();
            const message = draft.trim();
            if (!message) return;
            setSent((messages) => ({ ...messages, [activeChat.id]: [...(messages[activeChat.id] ?? []), message] }));
            setChats((items) => items.map((item) => item.id === activeChat.id ? { ...item, message } : item));
            setDraft("");
          }}>
            <input aria-label="Message" placeholder="Message" value={draft} onChange={(event) => setDraft(event.target.value)} />
            <button className={styles.iconButton} aria-label="Send message" disabled={!draft.trim()}><Icon name="send" /></button>
          </form>
        </>
      ) : tab === "Settings" && !composing ? (
        <div className={styles.settings}>
          <h2>About this demo</h2>
          <p>A Chats component based on the supplied design. Search, read, and manage sample conversations.</p>
          <p>Changes are stored in memory and reset when you refresh.</p>
        </div>
      ) : (
        <>
          <div className={styles.searchWrap}>
            <label className={styles.search} htmlFor={searchId}>
              <Icon name="search" />
              <input id={searchId} type="search" aria-label={composing || tab === "Friends" ? "Search friends" : "Search conversations"} placeholder={composing || tab === "Friends" ? "Search friends" : "Search"} value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
          </div>
          <div className={styles.listArea}>
            <ul className={styles.list} aria-label={composing || tab === "Friends" ? "Friends" : "Conversations"}>
              {filtered.map((chat) => (
                <li key={chat.id}>
                  <button className={styles.chatRow} onClick={() => openChat(chat)} aria-pressed={editing ? selectedIds.includes(chat.id) : undefined}>
                    {editing && <span className={`${styles.check} ${selectedIds.includes(chat.id) ? styles.checked : ""}`} aria-hidden="true">{selectedIds.includes(chat.id) ? "✓" : ""}</span>}
                    <Avatar />
                    <span className={styles.chatCopy}>
                      <span className={styles.name}>{chat.name}</span>
                      {!composing && tab === "Chats" && <span className={styles.preview}>{chat.message}</span>}
                    </span>
                    {!editing && !composing && tab === "Chats" && !!chat.unread && <span className={styles.badge} aria-label={`${chat.unread} unread messages`}>{chat.unread}</span>}
                  </button>
                </li>
              ))}
            </ul>
            {filtered.length === 0 && <p className={styles.empty} role="status">No results for “{query}”</p>}
          </div>
          {editing && <div className={styles.editActions}><button disabled={!selectedIds.length} onClick={() => { setChats((items) => items.filter((chat) => !selectedIds.includes(chat.id))); setSelectedIds([]); setEditing(false); }}>Delete{selectedIds.length ? ` (${selectedIds.length})` : ""}</button></div>}
        </>
      )}
      {!activeChat && !composing && (
        <nav className={styles.tabBar} aria-label="Main navigation">
          {(["Chats", "Friends", "Settings"] as const).map((item) => (
            <button key={item} className={`${styles.tab} ${tab === item ? styles.activeTab : ""}`} aria-current={tab === item ? "page" : undefined} onClick={() => { setTab(item); setQuery(""); setEditing(false); setSelectedIds([]); }}>
              <Icon name={item === "Chats" ? "chats" : item === "Friends" ? "friends" : "settings"} />
              <span>{item}</span>
            </button>
          ))}
        </nav>
      )}
    </section>
  );
}
