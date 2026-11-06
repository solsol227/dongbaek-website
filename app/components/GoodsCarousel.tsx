"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import useAutoAdvance from "./useAutoAdvance";
import styles from "../page.module.css";

export default function GoodsCarousel({ children, id = "goods", subject = "굿즈", label = "콜라보 굿즈 8종", trackClassName = "", header }: {
  children: ReactNode;
  id?: string;
  subject?: string;
  label?: string;
  trackClassName?: string;
  header?: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const advance = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2 || track.scrollWidth <= track.clientWidth + 1) return;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    track.scrollTo({ left: atEnd ? 0 : (Math.round(track.scrollLeft / step) + 1) * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, []);
  const autoplay = useAutoAdvance(advance);

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
    <div role="region" aria-labelledby={`${id}-title`} aria-roledescription="슬라이드" {...autoplay.bindings} onPointerDown={() => {
      autoplay.bindings.onPointerDown();
      const track = trackRef.current;
      if (track) track.scrollTo({ left: track.scrollLeft, behavior: "instant" });
    }}>
      <div className={header ? styles.carouselHeading : styles.carouselToolbar}>
        {header}
        <div className={styles.carouselControls}>
          <button type="button" aria-label={`이전 ${subject}`} aria-controls={`${id}-slider`} disabled={edges.start} onClick={() => move(-1)}>이전</button>
          <button type="button" aria-label={`다음 ${subject}`} aria-controls={`${id}-slider`} disabled={edges.end} onClick={() => move(1)}>다음</button>
          <button type="button" onClick={autoplay.toggle} aria-label={`${subject} 자동 넘김 ${autoplay.stopped ? "재생" : "정지"}`}>{autoplay.stopped ? "자동 재생" : "일시정지"}</button>
        </div>
      </div>
      <ul ref={trackRef} id={`${id}-slider`} className={`${styles.goodsSlider} ${trackClassName}`} tabIndex={0} aria-label={label} onKeyDown={(event) => {
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
