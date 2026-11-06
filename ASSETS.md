# 홈페이지 에셋 목록

2026.11.06 · TODO 1-2, 1-3, 2-4

## 준비한 에셋

삭제된 `assets/` 원본은 복구하지 않고 Git HEAD의 바이너리를 그대로 `public/brand/`에 복사했다. 로고는 원본 비율을 유지한다.

| 원본 | 웹 경로 | 크기 | 용도 |
| --- | --- | --- | --- |
| Git `assets/bloom-logo.png` | `/brand/bloom-logo.png` | 2172 × 724, 332,629 bytes | 헤더·푸터 원본 로고 |
| Git `assets/opening.mp4` | `/brand/opening.mp4` | 3,497,254 bytes | 대표 영상 |
| Git `assets/village.jpg` | `/brand/village.jpg` | 1536 × 1024, 610,958 bytes | 영상 로딩 전 동백숲 대체 이미지 |
| Git `assets/bloomi.png` | `/brand/bloomi.png` | 227 × 259, 99,784 bytes | 2단계 소개 영역용 캐릭터 |
| 기존 마을 프로젝트 `assets/fonts/PretendardVariable.woff2` | `/fonts/PretendardVariable.woff2` | 가변 웹폰트 | `next/font/local`로 로컬 제공 |
| 같은 폴더 `Pretendard-LICENSE.txt` | `/fonts/Pretendard-LICENSE.txt` | 원본 라이선스 | 폰트와 함께 보관 |

## Git 이력에서 확인한 후속 에셋

굿즈의 투명 PNG 10개는 2단계에서 Git HEAD의 원본 바이너리를 `public/brand/goods/`로 복사했다. 그 외 후속 에셋은 복사하지 않았다.

- `assets/images/goods/`: 키링·파우치·스티커·마스킹테이프·모자·텀블러·아로마 링·오일 패키지(블랙·아이보리·핑크). 각각 투명 이미지와 턴어라운드 이미지가 있다. 총 20개 PNG.
- `assets/images/bloomi-character/`: 캐릭터 방향별 프레임과 애니메이션 시트. 이번 홈페이지는 게임이나 아바타 이동을 구현하지 않는다.
- `assets/그래픽요소 턴어라운드 PNG/`: 꽃·잎 등 브랜드 그래픽.
- `assets/Dongbaek-2D-Assets/`: 기존 마을 게임용 리소스로 홈페이지 사용 대상에서 제외.

### 2단계 굿즈 이미지

모두 Git `assets/images/goods/`의 해당 제품 폴더에 있는 `*_투명_20261104.png` 원본을 사용한다.

| 제품 | 웹 경로 | 원본 크기 |
| --- | --- | --- |
| 동백마을 산책 모자 | `/brand/goods/hat.png` | 1536 × 1024 |
| 동백꽃과 씨앗 파우치 | `/brand/goods/pouch.png` | 1536 × 1024 |
| 동백마을 산책 텀블러 | `/brand/goods/bottle.png` | 1024 × 1536 |
| 동백꽃 블룸이 키링 | `/brand/goods/keyring.png` | 1262 × 1246 |
| 동백마을 모티브 스티커 | `/brand/goods/stickers.png` | 1536 × 1024 |
| 동백마을 모티브 마스킹테이프 | `/brand/goods/tape.png` | 1536 × 1024 |
| 동백오일 향기 반지 | `/brand/goods/ring.png` | 1536 × 1024 |
| 동백오일 패키지 블랙 | `/brand/goods/oil-black.png` | 1536 × 1024 |
| 동백오일 패키지 아이보리 | `/brand/goods/oil-ivory.png` | 1536 × 1024 |
| 동백오일 패키지 핑크 | `/brand/goods/oil-pink.png` | 1536 × 1024 |

- 패키지 3색은 하나의 제품 항목으로 묶어 전체 8종을 콜라보 굿즈로 소개한다.
- 제품 이미지는 미리보기이며 출시일·가격·판매 정보는 미확정이다.
- 체험 원본·운영 정보도 미제공 상태이므로 체험 영역에는 준비 중 안내를 표시한다.

## 시각 기준

- 제공된 `tmp/pdfs/brand-reference.jpg`의 디자인 가이드 발췌를 확인했다. 원본 로고 사용, 지정 색상, 자연 풍경의 색과 돌담 질감 유지 기준을 반영했다.
- 본문 서체는 Pretendard, 배경은 화이트·웜 아이보리, 주요 강조색은 소프트 핑크·그린이다. 라임·시안도 토큰으로 준비했다.
- 방문 정보, 숏폼·카드뉴스 원본, 확정 출시 정보는 아직 제공되지 않았다. 섹션 틀에는 준비 중을 표시한다.


## 산출물최종정리 반영 (2026.11.06)

원본 폴더: `../산출물최종정리/`. 원본은 그대로 두고 게시용 이미지를 WebP(품질 92)로 준비했다.

| 원본 | 웹 경로 |
| --- | --- |
| AX관광_키비주얼_최종_20261106.png | /brand/final/key-visual.webp |
| AX관광_콜라보포스터_굿즈체험정보와로고조화_20261103.png | /brand/final/collaboration-poster.webp |
| 영상/제주 동백숲의 붉은 길.png | /brand/final/village-forest.webp |
| 캐릭터/AX관광_캐릭터가이드_턴어라운드.png | /brand/final/bloomi-turnaround.webp |
| AX관광_마을체험_동백오일파스타_20261106.png | /brand/final/experience-pasta.webp |
| AX관광_마을체험_씨앗오일_20261106.png | /brand/final/experience-oil.webp |
| AX관광_마을체험_화장수_20261106.png | /brand/final/experience-mist.webp |
| 굿즈/AX관광_기본굿즈_여섯종로고자연스럽게적용_20261103.png | /brand/final/goods-collection.webp |
| 굿즈/AX관광_동백오일패키지_로고자연스럽게적용_20261103.png | /brand/final/goods-oil.webp |
| 굿즈/AX관광_아로마링_핑크로고와한방울사용법_20261103.png | /brand/final/goods-ring.webp |
| 굿즈/AX관광_A20콜라보_반지디자인_진진솔.png | /brand/final/ring-design.webp |
| 영상/AX관광_A20콜라보_숏폼1.1_진진솔.png | /brand/final/short-1-poster.webp |
| 영상/AX관광_A20콜라보_숏폼2.1_진진솔.png | /brand/final/short-2-poster.webp |
| 카드뉴스/AX관광_카드뉴스01_배경유지텍스트여백_20261103.png | /brand/final/card-01.webp |
| 카드뉴스/AX관광_카드뉴스02_배경유지텍스트여백_20261103.png | /brand/final/card-02.webp |
| 카드뉴스/AX관광_카드뉴스03_배경유지텍스트여백_20261103.png | /brand/final/card-03.webp |
| 카드뉴스/AX관광_카드뉴스04_배경유지텍스트여백_20261103.png | /brand/final/card-04.webp |
| 카드뉴스/AX관광_카드뉴스05_배경유지텍스트여백_20261103.png | /brand/final/card-05.webp |
| 카드뉴스/AX관광_카드뉴스06_배경유지텍스트여백_20261103.png | /brand/final/card-06.webp |

- 최종 블랙 로고를 헤더·푸터 공용 `/brand/bloom-logo.png`에 반영했다.
- 숏폼 영상 1·2를 `/brand/final/short-1.mp4`, `/brand/final/short-2.mp4`로 준비하고 기본 재생 컨트롤과 직접 열기 링크를 연결했다.
- `Creating_forest_video_animation_07ff0c30.mp4`는 기존 대표 영상과 SHA-256이 일치하여 중복 복사하지 않았다.
- 카드뉴스 6장과 제품 화보는 전체 이미지를 볼 수 있고, 클릭 시 새 탭에서 크게 열린다.
- 포스터·카드뉴스·제품 시안 속 과거 날짜, 증정, 제품 구분은 확정 운영 조건으로 채택하지 않았다. 전체 8종 콜라보 굿즈 구성과 미확정 방문 안내를 유지한다.
- 디자인 가이드·브랜드 브리프·프롬프트북·무드보드·모델 가이드·그래픽 도형·수정 전 원본·바로 가기는 제작 참고자료로 보관하며 홈페이지 공개 콘텐츠로 싣지 않았다. 숏폼 장면 PNG 중 각 영상의 표지 1장씩을 사용했다.
- 앞선 단계의 미제공 기록은 당시 상태이며, 이번 반영으로 체험 이미지·숏폼·카드뉴스가 준비된 상태로 변경됐다. 실제 운영 주소·시간·문의처·예약 조건은 여전히 미확정이다.
