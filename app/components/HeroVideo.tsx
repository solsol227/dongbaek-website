"use client";

import { useRef, useState } from "react";
import styles from "../page.module.css";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <figure className={styles.film}>
      <video
        ref={videoRef} id="brand-film" className={styles.video}
        controls autoPlay muted loop playsInline preload="metadata"
        poster="/brand/village.jpg" width={1536} height={864}
        aria-label="bLOOM 동백마을 대표 영상"
        onPlay={() => { setPlaying(true); setMessage(""); }}
        onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setMessage("영상을 불러오지 못했어요. 대표 영상을 직접 열거나 잠시 후 다시 시도해주세요."); }}
      >
        <source src="/brand/opening.mp4" type="video/mp4" />
        이 브라우저에서는 영상을 재생할 수 없습니다.
      </video>
      <figcaption>
        <div className={styles.filmCaption}><span>동백마을의 이야기가 피어나는 순간</span><span>bLOOM YOUR WAY</span></div>
        <div className={styles.filmControls}>
          <button type="button" onClick={togglePlayback} aria-controls="brand-film" className={styles.videoButton}>
            {playing ? "영상 정지" : "영상 재생"}
          </button>
          <a href="/brand/opening.mp4">대표 영상 직접 열기</a>
        </div>
        <p className={styles.fieldHelp}>자동재생이 시작되지 않으면 영상 재생 버튼을 눌러주세요.</p>
        <p className={styles.fieldError} role="status">{message}</p>
      </figcaption>
    </figure>
  );
}
