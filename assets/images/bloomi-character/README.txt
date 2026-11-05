동백마을 캐릭터 2D 스프라이트

내장 ImageGen으로 턴어라운드의 형태·방향과 캐릭터 가이드의 동작을 참고했습니다. 연두색 몸, 분홍 꽃잎 모자, 작은 꽃과 잎은 유지하고 기존 마을의 과슈풍에 맞췄습니다.

시트는 1024×1024 PNG 3장이고, 각 셀과 개별 PNG는 256×256입니다.
행은 위에서부터 하·좌·우·상입니다.
mascot-walk.png — 정지, 걷기 1, 2, 3
mascot-run.png — 달리기 1, 2, 3, 4
mascot-hop.png — 웅크리기, 도약, 공중, 착지
frames/ — 방향과 동작으로 이름 붙인 PNG 48개
source/ — 생성 원본 시트
animations.json — 0부터 시작하는 열 번호, 발 기준점, 권장 재생 속도

배치와 재생
- 발밑 기준점은 셀 안의 (128, 224)입니다. 엔진이 정규화 좌표를 쓰면 (0.5, 0.875)입니다.
- 이동 방향에 해당하는 행을 선택합니다. 걷기는 초당 8프레임, 달리기는 초당 12프레임부터 조절해 보세요.
- 점프는 4장 한 번 재생합니다. 화면의 캐릭터 몸체만 수직으로 올리고, 그림자와 충돌 기준점은 땅에 둡니다. 그림자는 기존 마을 에셋을 재사용하거나 별도 타원으로 그릴 수 있습니다.
- 꽃잎 모자는 충돌에 포함하지 않고 발밑에 작은 충돌 영역을 둡니다. 동백나무 수관은 캐릭터 위에 그립니다.
- 우측 점프의 꽃과 잎 배치는 우측 걷기·달리기와 조금 다릅니다. 게임 화면 크기에서 동작 전환을 확인해 주세요.

생성 프롬프트
Create a game sprite atlas for the EXACT attached Dongbaek flower mascot. Image 1 is identity and directional reference, image 2 is only a pose reference. Never reproduce the guide layout, its annotations or any backgrounds. Preserve pale yellow-green spherical body, short arms and feet, overhanging light pink flower-petal cap, hot-pink small flower with yellow center on the same physical side, SINGLE stalk and single broad green leaf, brown oval eyes, blush and small smile. No clothing. Convert smooth 3D to matte opaque hand-painted storybook gouache with restrained short strokes, light from upper left, rich flat colors and crisp silhouette. Fixed mild elevated top-down RPG perspective, consistent proportions and scale. Real transparent RGBA background with zero alpha in gutters, no cast shadow, no ground, no lines, no text. Exactly one centered full sprite in each cell of a precise square 4x4 grid, 16 sprites, 12% clearance to every cell edge, with identical scale and x center. Row 1 faces down (front), row 2 faces left (left profile), row 3 faces right (right profile with physically correct flower placement), row 4 faces up (back, no face). Column mapping applies identically to all rows. 
walk
Column 1 standing idle, column 2 walk with left foot forward, column 3 walk passing stance, column 4 walk with right foot forward. Arms counter-swing gently. Stable baseline, poses legible at 64px.

run
All four columns are distinct frames of a brisk playful RUN cycle. Column 1 left leg lands far forward, col 2 airborne with legs tucked, col 3 right leg lands far forward, col 4 airborne with reversed arm swing. Show clear stride and forward lean, stronger swing than walking, leaf trails slightly. Stable ground registration, no travel across cells.

hop
Playful single HOP in place, four key poses. Column 1 anticipation crouch, col 2 upward stretch feet tucked together, col 3 apex round body, arms out, col 4 soft landing squat with cap bouncing. Use the same frame scale throughout. Keep poses vertically registered on the same approximate baseline, game engine will add vertical lift. No graphic marks or effects.
