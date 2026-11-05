동백마을 2D 에셋
================

제작 방식
내장 ImageGen으로 생성한 PNG입니다. 바닥, 오브젝트, 캐릭터, 효과를 따로 배치하는 사선 탑다운 시점을 기준으로 제작했습니다. 루트에는 원본 시트, sprites에는 잘라낸 개별 PNG가 있습니다.

배치 순서
1. sprites/terrain의 바닥을 놓습니다. 바닥 타일은 508×508이며, 반복 배치 시 경계가 보이는 곳은 맵에 맞춰 다듬어 주세요.
2. sprites/walls와 sprites/house로 골목과 집을 배치합니다. 돌담 입구 중앙은 통행 영역으로, 돌담과 집 벽은 충돌 영역으로 설정합니다.
3. sprites/camellia의 trunk와 canopy를 따로 배치합니다. 줄기의 밑동을 충돌 기준점으로 잡고 수관을 캐릭터 위에 그리면 캐릭터가 가지 아래에서 가려집니다. 두 이미지의 크기가 다르므로 맵에서 조합 위치를 맞춰 주세요.
4. sprites/character에는 하·좌·우·상 순으로 정지 1장과 걷기 3장이 있습니다. 개별 프레임은 314×314이며, 발밑을 기준으로 배치합니다. 걷기 재생은 walk-1 → walk-2 → walk-3 → walk-2부터 시도해 보세요.
5. 실내에는 wood-floor와 sprites/interior의 벽, 창문, 문, 탁자, 의자를 조합합니다. sprites/props의 씨앗과 기름병을 조사 대상으로 배치할 수 있습니다.
6. sprites/lighting에서 그림자, 나뭇잎 사이의 햇빛, 창빛, 등불빛, 하늘을 골라 별도 레이어로 씁니다. sprites/ui에는 손 아이콘, 대화창, 화살표, 동백 아이콘이 있습니다.

이 패키지는 시각 에셋으로 구성됩니다. 이동, 충돌, 문 전환, 대화, 오디오는 사용하는 엔진에서 연결합니다.

생성 프롬프트
Use case illustration-story. Production-ready 2D walkable Jeju Dongbaek Village game assets, fixed near-frontal orthographic top-down three-quarter RPG view from south, visible tops and fronts, no isometric rotation. Sunny rural garden children's picture-book opaque gouache, broad matte painted shapes with layered short irregular brushmarks. Yellow-green grass, olive and deep green foliage, cream stone, terracotta roofs, red and pink and purple accents, warm upper-left sun. Clear silhouettes, natural textured edges, crisp architecture. No text, no labels, no grid lines. 
terrain
A regular 3 columns by 2 rows tile atlas, equally sized square cells, edge-to-edge artwork, no gutters. Row 1 seamless top-down solid grass, ochre dirt path, wooden indoor floor. Row 2 grass-to-dirt straight transition with dirt on bottom half, grass-to-dirt corner with dirt in lower-right, sparse gray stepping stones on grass. Flat ground textures, nearly even lighting, each cell precisely occupies its allotted rectangle.

walls
One 3 columns by 2 rows sprite sheet, equal cells, large transparent gutters, one isolated sprite centered per cell. Row 1 horizontal low dry-stacked stone wall, north-south low wall, 90-degree L wall corner. Row 2 single end post, two short low walls separated by walkable entrance opening, irregular low standalone rock. Charcoal basalt and warm cream stone accents, olive moss. True alpha transparency. Nothing crosses cells.

camellia
Single composite tree layer atlas in two equally sized side-by-side cells. Left isolated rooted camellia trunk with curving forked branches, long broken bark brushstrokes. Right isolated broad rounded canopy ONLY, fully detached, deep glossy olive leaves and many scarlet double camellia blossoms, with irregular airy leaf tips. Design the canopy to overlap the upper branches on assembly. No ground or shadows. Real alpha transparency, wide transparent margins.

flora
A regular 3 columns by 2 rows sprite atlas with equally sized cells and generous transparent padding. One isolated object per cell. Row 1 olive shrub, bright tufts of grass, low moss patch. Row 2 pink clumping blossoms, purple upright flower spikes, fallen scarlet camellia blossoms and petals viewed from above. No ground tiles. Real alpha.

house
One standalone walkable game cottage exterior centered on true alpha transparent background. Low single-story Korean countryside stone cottage, warm cream irregular rubble masonry, rounded overlapping russet tiles, simple strong roof silhouette, clear wooden front door facing viewer, a window with amber glow, small chimney. No ground, path, landscaping or props. generous margin.

interior
A regular 3 columns by 2 rows modular cottage interior sprite atlas with generously separated centered isolated pieces. Row 1 horizontal cream stone interior wall, vertical side wall, wooden glazed window. Row 2 wooden door, rough wooden table, simple wooden chair. True alpha. No floor or baked shadows. No crossing cell boundaries.

props
Regular 3 columns by 3 rows atlas, equal cells with huge transparent gutters, exactly one standalone object centered per cell. Row 1 wooden bench, terracotta flowerpot with flowers, brown Korean earthenware jar. Row 2 wicker basket of red apples, short laundry line on two wooden supports with cream cloth and wooden pegs, small blank wooden sign. Row 3 shallow dish of dark camellia seeds, small amber camellia oil bottle, small wooden crate. Fabric broad matte wash, slender creases flowing from clothespins, gently scalloped hems. True alpha.

character
Production 4x4 animation sprite sheet on real alpha. Exactly sixteen equally sized invisible cells. One consistent full body adult villager in each, cream shirt, olive trousers, russet scarf, brown shoes and short dark hair. Each figure same height and feet anchored at same baseline within each cell, roomy padding. Row1 facing down toward viewer, row2 facing left, row3 facing right, row4 facing up away from viewer. Column1 standing idle, column2 left foot forward, column3 passing walk pose, column4 right foot forward. Ensure visible directional changes, natural simple readable walk cycle. No ground shadows.

lighting
3 columns by 2 rows regular atlas of effects on real alpha, isolated in center of each cell. Row 1 soft dark olive ground ellipse under a tree, narrow horizontal soft wall contact shadow, delicate patch of leaf-filtered warm sunlight with irregular little speckles. Row 2 soft amber glow for window, soft golden circular lantern halo, pale blue sky swatch with broad light blue paint and soft cream cloud across entire cell. For glow and shadows use genuine fading alpha. Transparent gutters.

ui
A single sprite atlas 2 by 2 equal cells on true alpha. Isolated centered UI elements in matching hand-painted storybook palette: top left round cream interaction keycap with simple hand icon, top right warm ivory empty dialogue box with restrained dark olive edge, bottom left small downward pointer icon, bottom right small red camellia icon. Generous transparent gutters. No text.

