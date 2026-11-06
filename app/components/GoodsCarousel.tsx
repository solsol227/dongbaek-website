"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "../page.module.css";

export default function GoodsCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateEdges = () => {
      const start = track.scrollLeft <= 1;
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      setEdges((previous) => previous.start === start && previous.end === end ? previous : { start, end });
    };
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    track.addEventListener("scroll", updateEdges, { passive: true });
    updateEdges();
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateEdges);
    };
  }, []);

  function move(direction: number) {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    const index = Math.round(track.scrollLeft / step) + direction;
    track.scrollTo({ left: index * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <div role="region" aria-labelledby="goods-title" aria-roledescription="슬라이드">
      <div className={styles.carouselToolbar}>
        <p id="goods-slide-help">옆으로 넘겨 굿즈를 만나보세요.</p>
        <div className={styles.carouselControls}>
          <button type="button" aria-label="이전 굿즈" aria-controls="goods-slider" disabled={edges.start} onClick={() => move(-1)}>이전</button>
          <button type="button" aria-label="다음 굿즈" aria-controls="goods-slider" disabled={edges.end} onClick={() => move(1)}>다음</button>
        </div>
      </div>
      <ul ref={trackRef} id="goods-slider" className={styles.goodsSlider} tabIndex={0} aria-label="콜라보 굿즈 8종" aria-describedby="goods-slide-help" onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
        {children}
      </ul>
    </div>
  );
}
