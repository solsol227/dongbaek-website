"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "../page.module.css";

export default function HeroVideo({ src = "/brand/opening.mp4", id = "brand-film", label = "bLOOM 동백마을 대표 영상", frameClassName = "", captionClassName = "", caption }: {
  src?: string;
  id?: string;
  label?: string;
  frameClassName?: string;
  captionClassName?: string;
  caption?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let active = true;
    video.muted = true;
    void video.play().catch((error: unknown) => {
      if (active && error instanceof DOMException && error.name === "NotAllowedError") {
        setMessage("자동재생이 제한되어 있어요. 영상 오른쪽 아래 재생 버튼을 눌러주세요.");
      }
    });
    return () => { active = false; };
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    try {
      await video.play();
      setMessage("");
    } catch {
      setMessage("영상을 재생하지 못했어요. 재생 버튼을 다시 누르거나 대표 영상을 직접 열어주세요.");
    }
  }

  function toggleSound() {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  }

  return (
    <figure className={styles.film}>
      <div className={`${styles.videoFrame} ${frameClassName}`}>
      <video
        ref={videoRef} id={id} className={styles.video}
        autoPlay muted loop playsInline preload="auto"
        poster="/brand/final/key-visual.webp" width={1536} height={864}
        aria-label={label}
        onPlay={() => { setPlaying(true); setMessage(""); }}
        onPause={() => setPlaying(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onError={() => { setPlaying(false); setMessage("영상을 불러오지 못했어요. 대표 영상을 직접 열거나 잠시 후 다시 시도해주세요."); }}
      >
        <source src={src} type="video/mp4" />
        이 브라우저에서는 영상을 재생할 수 없습니다.
      </video>
        <div className={styles.filmControls} role="group" aria-label={`${label} 제어`}>
          <button type="button" onClick={toggleSound} aria-controls={id} aria-label={muted ? "소리 켜기" : "소리 끄기"} title={muted ? "소리 켜기" : "소리 끄기"} className={styles.videoButton}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              {muted ? <path d="m16 9 6 6m0-6-6 6" /> : <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></>}
            </svg>
          </button>
          <button type="button" onClick={togglePlayback} aria-controls={id} aria-label={playing ? "영상 일시정지" : "영상 재생"} title={playing ? "영상 일시정지" : "영상 재생"} className={styles.videoButton}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {playing ? <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></> : <path d="M7 4v16l14-8L7 4Z" />}
            </svg>
          </button>
        </div>
        <div className={`${styles.filmCaption} ${captionClassName}`}>{caption ?? <><span>동백마을의 이야기가 피어나는 순간</span><span>bLOOM YOUR WAY</span></>}</div>
      </div>
      <figcaption>
        <p className={styles.fieldError} role="status">{message}{message && <> <a href={src}>영상 직접 열기</a></>}</p>
      </figcaption>
    </figure>
  );
}
