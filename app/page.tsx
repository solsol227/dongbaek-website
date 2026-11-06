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
            <Image className={styles.keyVisual} src="/brand/final/key-visual.webp" alt="겨울 동백숲 돌담에서 만나는 블룸이와 bLOOM" width={1672} height={941} sizes="(max-width: 767px) 100vw, 90vw" />
            <details className={styles.assetDetails}>
              <summary>콜라보 포스터 보기</summary>
              <p className={styles.smallNote}>브랜드 소개용 제작 이미지입니다. 이미지 속 일정·증정·판매 조건은 현재 확정된 운영 안내가 아닙니다.</p>
              <a href="/brand/final/collaboration-poster.webp" target="_blank" rel="noopener noreferrer" aria-label="콜라보 포스터 크게 보기 (새 탭)"><Image className={styles.posterImage} src="/brand/final/collaboration-poster.webp" alt="BLOOM YOUR WAY 콜라보 포스터 시안" width={1024} height={1536} sizes="(max-width: 767px) 90vw, 480px" /></a>
            </details>
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
                <Image src="/brand/final/village-forest.webp" alt="붉은 동백꽃과 초록 잎, 돌담이 어우러진 동백숲 산책길" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 60vw" />
                <figcaption>동백마을의 풍경</figcaption>
              </figure>
              <div className={styles.characterStory}>
                <Image src="/brand/bloomi.png" alt="분홍 동백꽃과 초록 새싹을 머리에 얹은 캐릭터 블룸이" width={227} height={259} className={styles.character} />
                <h3>안녕, 나는 블룸이.</h3>
                <p>동백마을의 이야기를 함께 전하는 bLOOM의 캐릭터예요. 꽃에서 씨앗으로, 씨앗에서 오일로 이어지는 동백의 이야기를 만나보세요.</p>
                <details className={styles.assetDetails}>
                  <summary>블룸이의 여러 모습 보기</summary>
                  <Image className={styles.editorialImage} src="/brand/final/bloomi-turnaround.webp" alt="앞·옆·뒤에서 바라본 블룸이의 다양한 모습" width={1536} height={1024} sizes="(max-width: 767px) 90vw, 35vw" />
                </details>
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
            <div className={styles.experienceCards}>
              {[
                ["pasta", "동백오일 파스타", "동백오일과 함께하는 식탁의 풍경"],
                ["oil", "씨앗에서 오일로", "동백 씨앗과 오일의 이야기를 만나는 장면"],
                ["mist", "동백 화장수", "동백과 함께하는 나만의 일상"],
              ].map(([image, title, description]) => (
                <article key={image}>
                  <Image className={styles.editorialImage} src={`/brand/final/experience-${image}.webp`} alt={`${title} 체험을 블룸이와 함께하는 소개 이미지`} width={1536} height={1024} sizes="(max-width: 767px) 90vw, 30vw" />
                  <h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
            <p className={styles.smallNote}>체험 소개용 제작 이미지입니다. 실제 운영 여부·진행 방식·일정·참여 조건은 확인 후 안내합니다.</p>
          </div>
        </section>

        <section id="goods" className={`${styles.section} ${styles.ivory}`} aria-labelledby="goods-title">
          <div className={styles.sectionInner}>
            <header className={styles.sectionHeading}>
              <h2 id="goods-title">콜라보 굿즈</h2>
              <p>일상에서도, 너의 방식대로.</p>
              <p className={styles.smallNote}>제공된 제품 이미지 미리보기입니다. 출시 일정·가격·판매 정보는 준비 중입니다.</p>
            </header>
            <div className={styles.goodsEditorial}>
              <Image className={styles.editorialImage} src="/brand/final/goods-collection.webp" alt="모자·텀블러·키링·파우치·스티커·마스킹테이프 콜라보 굿즈 화보" width={1774} height={887} sizes="90vw" />
              <details className={styles.assetDetails}>
                <summary>오일 패키지와 아로마 링 자세히 보기</summary>
                <p className={styles.smallNote}>제공된 디자인 시안입니다. 시안 속 제품 구분·증정·사용 안내는 확정 판매 조건이 아닙니다.</p>
                <div className={styles.editorialGrid}>
                  {[["goods-oil", "동백오일 패키지와 그래픽 디자인"], ["goods-ring", "아로마 링과 오일 패키지 디자인"], ["ring-design", "동백오일 향기 반지의 형태와 디자인"]].map(([image, alt]) => (
                    <a key={image} href={`/brand/final/${image}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${alt} 크게 보기 (새 탭)`}><Image className={styles.editorialImage} src={`/brand/final/${image}.webp`} alt={alt} width={1536} height={1024} sizes="(max-width: 767px) 90vw, 45vw" /></a>
                  ))}
                </div>
              </details>
            </div>
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
            <h3 className={styles.contentTitle}>움직이는 마을 이야기</h3>
            <div className={styles.shortFilms}>
              {[1, 2].map((number) => (
                <figure key={number}>
                  <video controls playsInline preload="none" poster={`/brand/final/short-${number}-poster.webp`} width={941} height={1672} aria-label={`bLOOM 숏폼 영상 ${number}`}>
                    <source src={`/brand/final/short-${number}.mp4`} type="video/mp4" />
                    이 브라우저에서는 영상을 재생할 수 없습니다.
                  </video>
                  <figcaption>동백마을 × bLOOM · 숏폼 {number} <a href={`/brand/final/short-${number}.mp4`}>영상 직접 열기</a></figcaption>
                </figure>
              ))}
            </div>
            <h3 className={styles.contentTitle}>한 장씩 만나는 콜라보</h3>
            <p className={styles.smallNote}>카드를 누르면 크게 볼 수 있어요. 브랜드 소개용 제작 콘텐츠이며, 이미지 속 체험·선물·이벤트 조건은 현재 확정된 운영 안내가 아닙니다.</p>
            <div className={styles.cardNews}>
              {["콜라보 이야기", "제주 동백마을", "마을 체험 이야기", "오일과 아로마 링", "모자와 파우치", "동백마을에서 만나요"].map((title, index) => (
                <figure key={title}>
                  <a href={`/brand/final/card-0${index + 1}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`카드뉴스 ${index + 1}: ${title} 크게 보기 (새 탭)`}>
                    <Image src={`/brand/final/card-0${index + 1}.webp`} alt={`카드뉴스 ${index + 1}: ${title}`} width={1122} height={1402} sizes="(max-width: 767px) 90vw, 30vw" />
                  </a>
                  <figcaption><span>0{index + 1}</span> {title}</figcaption>
                </figure>
              ))}
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
