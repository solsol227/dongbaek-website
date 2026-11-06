import Image from "next/image";
import GoodsCarousel from "./components/GoodsCarousel";
import HeroVideo from "./components/HeroVideo";
import NotificationPreview from "./components/NotificationPreview";
import styles from "./page.module.css";

const goods = [
  { name: "동백마을 산책 모자", description: "산책길에 함께하는 bLOOM", images: ["hat"] },
  { name: "동백꽃과 씨앗 파우치", description: "작은 소지품에 담는 마을의 이야기", images: ["pouch"] },
  { name: "동백마을 산책 텀블러", description: "일상에 함께하는 동백마을 모티브", images: ["bottle"] },
  { name: "동백꽃 블룸이 키링", description: "가방 끝에 함께하는 블룸이", images: ["keyring"] },
  { name: "동백마을 모티브 스티커", description: "좋아하는 곳에 남기는 동백마을", images: ["stickers"] },
  { name: "동백마을 모티브 마스킹테이프", description: "기록 사이에 피어나는 동백꽃", images: ["tape"] },
  { name: "동백오일 향기 반지", description: "동백오일의 이야기를 담은 반지", images: ["ring"] },
  { name: "동백오일 패키지", description: "블랙 · 아이보리 · 핑크 이미지 미리보기", images: ["oil-black", "oil-ivory", "oil-pink"] },
];

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">본문으로 바로가기</a>
      <main id="main-content" className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className="sr-only">bLOOM 동백마을</h1>
          <HeroVideo />
        </section>
        <section id="collaboration" className={`${styles.section} ${styles.pink}`} aria-labelledby="collaboration-title">
          <div className={`${styles.sectionInner} ${styles.collaboration}`}>
            <h2 id="collaboration-title" className={styles.eyebrow}>콜라보레이션 뉴스</h2>
            <p className={styles.collabName}>동백마을 × A2O Lite</p>
            <p className={styles.manifesto}>BLOOM<br />YOUR WAY.</p>
            <p className={styles.brandMessage}>너의 방식대로 피어나.</p>
            <p className={styles.intro}>동백의 꽃과 씨앗, 오일의 이야기가<br className={styles.desktopBreak} /> 마을에서 일상으로 이어집니다.</p>
            <p className={styles.smallNote}>협업 상세 소식과 출시 일정은 준비 중입니다.</p>
          </div>
        </section>

        <section id="village" className={`${styles.section} ${styles.ivory}`} aria-labelledby="village-title">
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeading}>
              <h2 id="village-title">블룸이와 동백마을</h2>
              <p>꽃과 씨앗, 오일로 이어지는 이야기</p>
            </header>
            <div className={styles.villageGrid}>
              <figure className={styles.villagePhoto}>
                <Image src="/brand/village.jpg" alt="붉은 동백꽃과 초록 잎, 돌담이 어우러진 동백숲" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 60vw" />
                <figcaption>동백마을의 풍경</figcaption>
              </figure>
              <div className={styles.characterStory}>
                <Image src="/brand/bloomi.png" alt="분홍 동백꽃과 초록 새싹을 머리에 얹은 캐릭터 블룸이" width={227} height={259} className={styles.character} />
                <h3>안녕, 나는 블룸이.</h3>
                <p>동백마을의 이야기를 함께 전하는 bLOOM의 캐릭터예요. 꽃에서 씨앗으로, 씨앗에서 오일로 이어지는 동백의 이야기를 만나보세요.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className={styles.section} aria-labelledby="experience-title">
          <div className={`${styles.sectionInner} ${styles.experience}`}>
            <header className={styles.sectionHeading}>
              <h2 id="experience-title">마을 체험 소개</h2>
              <p>동백마을을 만나는 또 하나의 방법</p>
            </header>
            <div className={styles.experienceBody}>
              <p className={styles.experienceMessage}>동백의 이야기를<br />마을에서 만나요.</p>
              <div className={styles.pendingCopy}>
                <span className={styles.comingSoon}>준비 중</span>
                <p>실제 운영하는 마을 체험을 소개할 예정입니다. 체험 종류와 진행 방식, 운영 일정은 확인 후 안내할게요.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="goods" className={`${styles.section} ${styles.ivory}`} aria-labelledby="goods-title">
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeading}>
              <h2 id="goods-title">콜라보 굿즈</h2>
              <p>일상에서도, 너의 방식대로.</p>
              <p className={styles.smallNote}>제공된 제품 이미지 미리보기입니다. 출시 일정·가격·판매 정보는 준비 중입니다.</p>
            </header>
            <GoodsCarousel>
              {goods.map((item) => (
                <li key={item.name} className={styles.product}>
                  <div className={`${styles.productVisual} ${item.images.length > 1 ? styles.oilVariants : ""}`}>
                    {item.images.map((image, index) => (
                      <Image key={image} src={`/brand/goods/${image}.png`} alt={item.images.length > 1 ? `${item.name} ${["블랙", "아이보리", "핑크"][index]}` : item.name} width={image === "bottle" ? 1024 : image === "keyring" ? 1262 : 1536} height={image === "bottle" ? 1536 : image === "keyring" ? 1246 : 1024} sizes={item.images.length > 1 ? "(max-width: 767px) 25vw, (max-width: 1023px) 14vw, 10vw" : "(max-width: 767px) 80vw, (max-width: 1023px) 45vw, 30vw"} />
                    ))}
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </GoodsCarousel>
            <a href="#notification" className={styles.notificationCta}>출시 알림 받기</a>
          </div>
        </section>

        <section id="notification" className={`${styles.section} ${styles.green}`} aria-labelledby="notification-title">
          <div className={`${styles.sectionInner} ${styles.notification}`}>
            <header className={styles.sectionHeading}>
              <h2 id="notification-title">출시 알림 신청</h2>
              <p>콜라보의 다음 소식을 만나는 곳</p>
              <p className={styles.notificationMessage}>다음에 피어날 소식도<br />함께해요.</p>
            </header>
            <NotificationPreview />
          </div>
        </section>

        <section id="stories" className={styles.section} aria-labelledby="stories-title">
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeading}>
              <h2 id="stories-title">숏폼 · 카드뉴스</h2>
              <p>짧은 장면으로 만나는 bLOOM</p>
            </header>
            <div className={styles.storiesGrid}>
              <article className={styles.story}>
                <h3>움직이는 마을 이야기</h3>
                <p>숏폼 영상</p>
                <span className={styles.comingSoon}>준비 중</span>
                <p className={styles.smallNote}>새로운 영상이 준비되면 이곳에서 만날 수 있어요.</p>
              </article>
              <article className={styles.story}>
                <h3>한 장씩 만나는 콜라보</h3>
                <p>카드뉴스</p>
                <span className={styles.comingSoon}>준비 중</span>
                <p className={styles.smallNote}>브랜드와 굿즈 소식을 담은 카드를 준비하고 있어요.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="visit" className={`${styles.section} ${styles.ivory}`} aria-labelledby="visit-title">
          <div className={styles.sectionInner}>
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
