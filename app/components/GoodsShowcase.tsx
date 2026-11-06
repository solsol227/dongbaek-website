"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./goods-showcase.module.css";
import GoodsMedia from "./GoodsMedia";

// Positions follow the supplied, uncropped 3:2 collection photograph.
const goods = [
  { image: "bottle", name: "동백마을 산책 텀블러", label: "텀블러", x: 33.5, y: 23, w: 12, h: 40, description: "아이보리 바탕에 bLOOM 로고와 푸른 별 모티브를 담은 텀블러예요. 손잡이가 있는 뚜껑과 간결한 형태가 산책길의 풍경에 자연스럽게 어울려요.", detail: "마을을 걷는 순간부터 책상 위의 일상까지, 동백마을의 분위기를 곁에 두어보세요." },
  { image: "pouch", name: "동백꽃과 씨앗 파우치", label: "파우치", x: 54, y: 26, w: 24, h: 25, description: "동백꽃의 분홍빛과 씨앗의 연두빛을 담은 파우치예요. 밝은 원단 위에 bLOOM 로고와 꽃·씨앗 그래픽을 배치해 마을의 이야기를 표현했어요.", detail: "가방 속 작은 소지품을 한곳에 모으고, 여행에서 만난 색을 일상에서도 즐겨보세요." },
  { image: "hat", name: "동백마을 산책 모자", label: "산책 모자", x: 87, y: 26, w: 23, h: 29, description: "밝은 아이보리 컬러에 ‘bLOOM yourway’ 레터링을 더한 모자예요. 편안한 색감과 간결한 로고가 동백마을을 거니는 산책의 분위기를 담고 있어요.", detail: "여행길에도 평소 옷차림에도 자연스럽게 어울리는 동백마을의 기념품이에요." },
  { image: "keyring", name: "동백꽃 블룸이 키링", label: "블룸이 키링", x: 10, y: 60, w: 12, h: 23, description: "동백꽃 모자를 쓴 마을의 친구, 블룸이를 담은 키링이에요. 동그란 연두빛 얼굴과 분홍 꽃잎, 작은 잎사귀가 블룸이의 사랑스러운 모습을 완성해요.", detail: "가방이나 열쇠에 달아 동백마을에서 만난 블룸이와 매일 함께해 보세요." },
  { image: "stickers", name: "동백마을 모티브 스티커", label: "스티커", x: 26, y: 59, w: 20, h: 23, description: "동백꽃과 씨앗, 푸른 별과 블룸이를 한 장에 모은 스티커예요. bLOOM의 다채로운 그래픽으로 동백마을의 즐거운 장면을 표현했어요.", detail: "다이어리나 노트, 좋아하는 소지품에 붙여 나만의 동백마을 풍경을 만들어보세요." },
  { image: "oil-black", name: "동백오일 패키지 블랙", label: "오일 블랙", x: 46, y: 57, w: 17, h: 34, description: "짙은 블랙 바탕에 분홍 동백꽃과 연두빛 씨앗, 푸른 별을 더한 동백오일 패키지예요. 선명한 대비로 콜라보 그래픽의 개성을 담았어요.", detail: "꽃과 씨앗에서 시작된 동백마을의 이야기를 패키지 디자인으로 만나보세요." },
  { image: "oil-ivory", name: "동백오일 패키지 아이보리", label: "오일 아이보리", x: 65.5, y: 57, w: 17, h: 34, description: "부드러운 아이보리 바탕에 연두빛과 분홍빛 그래픽을 담은 동백오일 패키지예요. 동백 씨앗과 꽃에서 가져온 형태가 밝고 편안한 인상을 전해요.", detail: "자연의 색과 bLOOM의 그래픽이 어우러진 패키지 디자인을 살펴보세요." },
  { image: "oil-pink", name: "동백오일 패키지 핑크", label: "오일 핑크", x: 85, y: 58, w: 19, h: 34, description: "선명한 핑크 바탕에 꽃의 선과 씨앗 모티브를 담은 동백오일 패키지예요. 푸른색과 연두색 포인트로 콜라보의 경쾌한 분위기를 표현했어요.", detail: "동백꽃의 생기와 ‘너의 방식대로 피어나’라는 bLOOM의 메시지를 담았어요." },
  { image: "tape", name: "동백마을 모티브 마스킹테이프", label: "마스킹테이프", x: 30.5, y: 81, w: 15, h: 15, description: "연두빛 씨앗과 푸른 별, 분홍 꽃잎이 이어지는 마스킹테이프예요. 동백마을의 모티브를 반복 무늬로 담아 작은 구간에서도 브랜드의 색을 느낄 수 있어요.", detail: "여행 기록과 다이어리, 선물 포장에 더해 동백마을의 기억을 남겨보세요." },
  { image: "ring", name: "동백오일 향기 반지", label: "향기 반지", x: 56.5, y: 80, w: 12, h: 20, description: "아이보리 링 위에 분홍빛 포인트를 올린 향기 반지 디자인이에요. 동백꽃을 떠올리게 하는 색과 둥근 형태로 동백오일의 이야기를 표현했어요.", detail: "손끝에 작은 동백꽃을 얹은 듯한 디자인과 오일을 주제로 한 굿즈의 아이디어를 만나보세요." },
];

export default function GoodsShowcase() {
  const [selected, setSelected] = useState<(typeof goods)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  function open(item: (typeof goods)[number], trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected(item);
  }

  return (
    <div className={styles.showcase}>
      <div className={styles.scene}>
        <Image src="/brand/goods/showcase.webp" alt="햇살 아래 모인 bLOOM 텀블러, 파우치, 모자, 블룸이 키링, 스티커, 동백오일 3종, 마스킹테이프와 향기 반지" width={1536} height={1024} sizes="(max-width: 767px) 92vw, 1200px" className={styles.collection} />
        {goods.map((item) => (
          <button key={item.image} type="button" className={styles.hotspot} style={{ "--x": `${item.x}%`, "--y": `${item.y}%`, "--w": `${item.w}%`, "--h": `${item.h}%` } as CSSProperties} aria-label={`${item.name} 설명 보기`} aria-haspopup="dialog" onClick={(event) => open(item, event.currentTarget)}>
            <span className={styles.pin} aria-hidden="true">+</span>
            <span className={styles.tooltip}>{item.label}</span>
          </button>
        ))}
      </div>
      <p className={styles.hint}>사진 속 굿즈의 + 버튼을 눌러 자세히 만나보세요.</p>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="goods-detail-title" aria-describedby="goods-detail-description" onCancel={(event) => { event.preventDefault(); setSelected(null); }} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        {selected && <>
          <header className={styles.dialogHeader}>
            <p className={styles.brand}>bLOOM YOUR WAY</p>
            <button type="button" className={styles.close} aria-label="굿즈 설명 닫기" onClick={() => setSelected(null)} autoFocus>닫기 <span aria-hidden="true">×</span></button>
          </header>
          <div className={styles.dialogContent}>
          <GoodsMedia key={selected.image} id={selected.image} name={selected.name} />
          <div className={styles.copy}>
            <h3 id="goods-detail-title">{selected.name}</h3>
            <p id="goods-detail-description">{selected.description}</p>
            <p>{selected.detail}</p>
            <p className={styles.note}>제품 디자인 미리보기입니다. 출시 일정·가격·판매 정보는 준비 중입니다.</p>
          </div>
          </div>
        </>}
      </dialog>
    </div>
  );
}
