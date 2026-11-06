import Image from "next/image";
import GoodsCarousel from "./components/GoodsCarousel";
import GoodsShowcase from "./components/GoodsShowcase";
import HeroVideo from "./components/HeroVideo";
import NotificationPreview from "./components/NotificationPreview";
import PhotoPanel from "./components/PhotoPanel";
import CardNewsCarousel from "./components/CardNewsCarousel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">본문으로 바로가기</a>
      <main id="main-content" className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className="sr-only">bLOOM 동백마을</h1>
          <HeroVideo src="/brand/final/hero-video.mp4" />
        </section>
        <section id="collaboration" className={`${styles.section} ${styles.pink}`} aria-labelledby="collaboration-title">
          <div className={`${styles.sectionInner} ${styles.collaboration}`}>
            <HeroVideo
              src="/brand/final/collaboration-news.mp4"
              id="collaboration-film"
              label="동백마을 × A2O Lite 콜라보레이션 뉴스 영상"
              frameClassName={styles.newsVideo}
              captionClassName={styles.newsCaption}
              caption={
                <><div className={styles.newsTop}>
                  <h2 id="collaboration-title">너의 방식대로 피어나</h2>
                  <p className={styles.newsSubtitle}>저마다의 색으로 피는 동백숲이 각자의 색으로 빛나는 A2O Lite를 만나 Neon처럼 빛나요.</p>
                  </div><div className={styles.newsBottom}>
                  <div className={styles.newsDescription}>
                    <p>굿즈에 피어난 콜라보 NEON 그래픽</p>
                    <p>이 그래픽들이 동백마을 X A2O LITE 한정판 굿즈에 그대로 담겼어요.</p>
                  </div>
                  <div className={styles.newsActions}>
                    <a href="#goods" className={styles.newsPrimary}>한정판 굿즈보기</a>
                    <a href="#notification" className={styles.newsSecondary}>알림받기</a>
                  </div>
                  </div></>
              }
            />
            <details className={styles.assetDetails}>
              <summary>콜라보 포스터 보기</summary>
              <p className={styles.smallNote}>브랜드 소개용 제작 이미지입니다. 이미지 속 일정·증정·판매 조건은 현재 확정된 운영 안내가 아닙니다.</p>
              <a href="/brand/final/collaboration-poster.webp" target="_blank" rel="noopener noreferrer" aria-label="콜라보 포스터 크게 보기 (새 탭)"><Image className={styles.posterImage} src="/brand/final/collaboration-poster.webp" alt="BLOOM YOUR WAY 콜라보 포스터 시안" width={1024} height={1536} sizes="(max-width: 767px) 90vw, 480px" /></a>
            </details>
          </div>
        </section>

        <section id="village" className={`${styles.section} ${styles.ivory}`} aria-labelledby="village-title">
          <div className={`${styles.sectionInner} ${styles.villageFullBleed}`}>
            <PhotoPanel image="/brand/final/village-entrance.webp" alt="동백나무와 제주 초가집 앞에서 블룸이와 함께하는 동백마을" className={styles.villagePanel}>
            <header className={styles.sectionHeading}>
              <h2 id="village-title">동백마을</h2>
              <p>동백꽃이 피어나는 따뜻한 마을로 초대합니다.<br />블룸이와 함께 마을을 거닐어보세요.</p>
              <a href="https://bloom-dongbaek-village.vercel.app" className={styles.villageEntrance}>동백마을 입장하기 <span aria-hidden="true">→</span></a>
            </header>
            </PhotoPanel>
          </div>
        </section>

        <section id="experience" className={styles.section} aria-labelledby="experience-title">
          <div className={`${styles.sectionInner} ${styles.experience}`}>
            <header className={styles.sectionHeading}>
              <h2 id="experience-title">마을 체험 소개</h2>
            </header>
            <GoodsCarousel id="experience" subject="마을 체험" label="마을 체험 3종" trackClassName={styles.experienceSlider}>
              {[
                ["pasta", "동백오일 파스타", "동백오일과 함께하는 식탁의 풍경"],
                ["oil", "씨앗에서 오일로", "동백 씨앗과 오일의 이야기를 만나는 장면"],
                ["mist", "동백 화장수", "동백과 함께하는 나만의 일상"],
              ].map(([image, title, description]) => (
                <li key={image} className={styles.experienceCard}>
                  <Image className={styles.editorialImage} src={`/brand/final/experience-${image}-v3.webp`} alt={`${title} 만들기에 집중하는 참가자와 블룸이`} width={1536} height={1024} sizes="(max-width: 767px) 80vw, 45vw" />
                  <div className={styles.cardCopy}><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </GoodsCarousel>
          </div>
        </section>

        <section id="goods" className={`${styles.section} ${styles.ivory}`} aria-labelledby="goods-title">
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeading}>
              <h2 id="goods-title">콜라보 굿즈</h2>
              <p>일상에서도, 너의 방식대로.</p>
            </header>
            <GoodsShowcase />
          </div>
        </section>

        <section id="notification" className={`${styles.section} ${styles.green}`} aria-labelledby="notification-title">
          <div className={styles.sectionInner}>
            <PhotoPanel image="/brand/final/experience-mist.webp" alt="동백의 이야기를 일상에서 만나는 장면" className={styles.notificationPanel}>
            <div className={styles.notificationContent}>
            <header className={styles.sectionHeading}>
              <h2 id="notification-title">출시 알림 신청</h2>
              <p>콜라보의 다음 소식을 만나는 곳</p>
              <p className={styles.notificationMessage}>다음에 피어날 소식도<br />함께해요.</p>
            </header>
            <NotificationPreview />
            </div>
            </PhotoPanel>
          </div>
        </section>

        <section id="stories" className={styles.section} aria-labelledby="stories-title">
          <div className={styles.sectionInner}>
            <PhotoPanel image="/brand/final/village-forest.webp" alt="짧은 이야기로 만나는 동백숲" className={styles.storiesPanel}>
            <header className={styles.sectionHeading}>
              <h2 id="stories-title">숏폼 · 카드뉴스</h2>
              <p>짧은 장면으로 만나는 bLOOM</p>
            </header>
            <div className={styles.storiesColumns}>
              <div className={styles.storiesColumn}>
                <h3>숏폼</h3>
                <video
                  className={styles.shortformSlot}
                  controls playsInline preload="metadata"
                  poster="/brand/final/short-combined-poster.webp"
                  width={360} height={640}
                  aria-label="동백마을 숏폼 영상 — 1편과 2편 이어보기"
                >
                  <source src="/brand/final/short-combined.mp4" type="video/mp4" />
                  <a href="/brand/final/short-combined.mp4">숏폼 영상 직접 보기</a>
                </video>
              </div>
              <div className={styles.storiesColumn}>
                <h3 id="card-news-title">카드뉴스</h3>
                <CardNewsCarousel />
              </div>
            </div>
              <p className={styles.smallNote}>카드를 누르면 크게 볼 수 있어요. 브랜드 소개용 제작 콘텐츠이며, 이미지 속 체험·선물·이벤트 조건은 현재 확정된 운영 안내가 아닙니다.</p>
            </PhotoPanel>
          </div>
        </section>

        <section id="visit" className={`${styles.section} ${styles.ivory}`} aria-labelledby="visit-title">
          <div className={styles.sectionInner}>
            <PhotoPanel image="/brand/final/village-forest.webp" alt="동백마을로 이어지는 숲길" className={styles.visitPanel}>
            <header className={styles.sectionHeading}>
              <h2 id="visit-title">방문 안내</h2>
              <p>동백마을에서 만나요.</p>
            </header>
            <dl className={styles.visitDetails}>
              {[
                ["위치", "정확한 방문 주소와 지도"],
                ["교통", "대중교통과 주차 안내"],
                ["운영", "운영시간과 휴무일"],
                ["문의", "공식 문의처와 SNS"],
              ].map(([title, description]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd><span className={styles.comingSoon}>준비 중</span><p>{description}는 확인 후 안내합니다.</p></dd>
                </div>
              ))}
            </dl>
            </PhotoPanel>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <Image src="/brand/bloom-logo.png" alt="bLOOM YOUR WAY" width={2172} height={724} className={styles.footerLogo} />
        <p>너의 방식대로 피어나.</p>
        <div className={styles.footerDetails}>
          <p>bLOOM 동백마을 × A2O Lite</p>
          <p>꽃과 씨앗, 오일의 이야기를 마을과 일상으로.</p>
          <p className={styles.footerNote}>공식 브랜드 상세 정보·문의처·SNS 준비 중</p>
        </div>
      </footer>
    </>
  );
}
