"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./goods-showcase.module.css";

const views = ["정면", "사선", "측면", "뒷면"];

export default function GoodsMedia({ id, name }: { id: string; name: string }) {
  const [mode, setMode] = useState<"product" | "lifestyle">("product");
  const [angle, setAngle] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasExplored, setHasExplored] = useState(false);
  const drag = useRef<{ x: number; angle: number; pointer: number } | null>(null);
  // The sticker sheet places its back and side views in the opposite bottom cells.
  const cell = id === "stickers" && angle >= 2 ? 5 - angle : angle;

  function changeMode(next: typeof mode) {
    if (mode === next) return;
    setMode(next);
    setLoaded(false);
    setFailed(false);
    drag.current = null;
  }

  function move(step: number) {
    setHasExplored(true);
    setAngle((current) => (current + step + views.length) % views.length);
  }

  return <div className={styles.gallery}>
    <div className={styles.photoOptions} role="group" aria-label="제품 보기 선택">
      <button type="button" aria-pressed={mode === "product"} onClick={() => changeMode("product")}>제품 둘러보기</button>
      <button type="button" aria-pressed={mode === "lifestyle"} onClick={() => changeMode("lifestyle")}>일상 속 사용</button>
    </div>
    <div className={styles.productImage}>
      {!loaded && !failed && <span className={styles.imageStatus} role="status">사진 불러오는 중…</span>}
      {failed ? <p className={styles.imageStatus} role="status">사진을 불러오지 못했어요. 잠시 후 다시 열어주세요.</p> : mode === "product" ? <div
        className={styles.turntable}
        role="region" aria-label={`${name} 각도별 보기`} aria-describedby="goods-view-help" tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          } else if (event.key === "Home") {
            event.preventDefault();
            setHasExplored(true);
            setAngle(0);
          }
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          drag.current = { x: event.clientX, angle, pointer: event.pointerId };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const start = drag.current;
          if (!start || start.pointer !== event.pointerId) return;
          const steps = Math.trunc((start.x - event.clientX) / 45);
          if (steps !== 0) setHasExplored(true);
          setAngle(((start.angle + steps) % views.length + views.length) % views.length);
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
        onLostPointerCapture={() => { drag.current = null; }}
      >
        <div className={styles.turnFrame}>
          <Image src={`/brand/goods/turnarounds/${id}.webp`} alt={`${name} ${views[angle]}`} width={1536} height={1024} unoptimized loading="eager" draggable={false} style={{ left: `${-(cell % 2) * 100}%`, top: `${-Math.floor(cell / 2) * 100}%` }} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
        </div>
        {loaded && !hasExplored && <div className={styles.dragCue} aria-hidden="true">
          <span className={styles.dragGesture}>↔</span>
          <span>좌우로 드래그</span>
        </div>}
      </div> : <Image className={styles.lifestyleImage} src={`/brand/goods/lifestyle/${id}.webp`} alt={`${name}을 일상에서 사용하는 모습`} width={1536} height={1024} unoptimized loading="eager" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
    </div>
    {mode === "product" ? <>
      <p id="goods-view-help" className="sr-only">제품 위에서 좌우로 드래그하거나, 키보드 좌우 방향키로 각도를 바꿔보세요. Home 키를 누르면 정면으로 돌아갑니다.</p>
      <span className="sr-only" aria-live="polite" aria-atomic="true">현재 {views[angle]} 보기</span>
    </> : <p className={styles.mediaHint}>일상에서 함께하는 {name}</p>}
  </div>;
}
