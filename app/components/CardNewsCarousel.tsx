"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import useAutoAdvance from "./useAutoAdvance";
import styles from "../page.module.css";

const titles = ["콜라보 이야기", "제주 동백마을", "마을 체험 이야기", "오일과 아로마 링", "모자와 파우치", "동백마을에서 만나요"];

export default function CardNewsCarousel() {
  const [index, setIndex] = useState(0);
  const advance = useCallback(() => setIndex((current) => (current + 1) % titles.length), []);
  const autoplay = useAutoAdvance(advance);
  const move = (direction: number) => setIndex((current) => (current + direction + titles.length) % titles.length);

  return (
    <div role="region" aria-labelledby="card-news-title" aria-roledescription="슬라이드" tabIndex={0} className={styles.cardNewsViewer} {...autoplay.bindings} data-carousel-paused={autoplay.paused} onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
      <div className={styles.cardNewsStage}>
        <button type="button" className={styles.triangleButton} aria-label="이전 카드뉴스" aria-controls="card-news-image" onClick={() => move(-1)}><span aria-hidden="true">◀</span></button>
        <a id="card-news-image" className={styles.cardNewsImage} href={`/brand/final/card-0${index + 1}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${titles[index]} 크게 보기 (새 탭)`}>
          <Image key={index} src={`/brand/final/card-0${index + 1}.webp`} alt={`카드뉴스 ${index + 1}: ${titles[index]}`} width={1122} height={1402} sizes="(max-width: 767px) 70vw, 35vw" />
        </a>
        <button type="button" className={styles.triangleButton} aria-label="다음 카드뉴스" aria-controls="card-news-image" onClick={() => move(1)}><span aria-hidden="true">▶</span></button>
      </div>
      <div className={styles.cardNewsAutoplay}>
        <p className={styles.cardNewsPosition} aria-live={autoplay.paused ? "polite" : "off"} aria-atomic="true">{index + 1} / {titles.length}<span className="sr-only"> · {titles[index]}</span></p>
        <button type="button" onClick={autoplay.toggle} aria-label={`카드뉴스 자동 넘김 ${autoplay.stopped ? "재생" : "정지"}`}>{autoplay.stopped ? "자동 재생" : "일시정지"}</button>
      </div>
    </div>
  );
}
