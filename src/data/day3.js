/**
 * DAY 3 원본 일정 (Git에 저장)
 * 철암탄광역사촌, 덕봉산은 포함하지 않습니다.
 *
 * 당일 사용자가 바꾼 순서, 완료, 시간, 메모, 제외, 체크리스트는
 * 이 파일을 수정하지 않고 localStorage에만 저장됩니다.
 */

export const meta = {
  id: 'day3',
  tabLabel: 'DAY 3 · 9/20',
  sectionTitle: 'DAY 3 일정',
  theme: '바다에서 태백으로',
  subtitle: '추암 촛대바위 · 구문소 · 태백산 하늘전망대',
  eyebrow: 'DAY 3 · 9/20 일요일',
  dateLabel: '2026년 9월 20일 일요일',
  route: '쏠비치 삼척 → 추암 → 태백 → 성남',
  summary: [
    { label: '출발', value: '쏠비치 삼척' },
    { label: '목적지', value: '성남' },
    { label: '숙박', value: '없음 · 체크아웃' },
  ],
}

export const notice =
  '하늘전망대는 운영 종료시간이 있으므로 DAY 3에서는 하늘전망대 도착시간을 우선 확인하세요.'

export const lunchChoices = ['물닭갈비', '한우', '한식', '막국수']

export const checkoutChecks = [
  { id: 'room', label: '객실 최종 확인' },
  { id: 'charger', label: '충전기 확인' },
  { id: 'fridge', label: '냉장고 확인' },
  { id: 'bathroom', label: '화장실 확인' },
  { id: 'car', label: '짐 차량 적재' },
  { id: 'checkout', label: '체크아웃' },
]

export const items = [
  {
    id: 'checkout',
    title: '쏠비치 삼척 체크아웃',
    shortName: '쏠비치 삼척',
    type: 'depart',
    scheduledTime: '09:00',
    estimatedDuration: '체크아웃 · 출발 준비',
    description: '2박 숙박을 마치고 체크아웃합니다. 차량에 짐을 모두 싣고 DAY 3 여행을 시작합니다.',
    route: [],
    notes: [],
    optional: false,
    fixedPosition: 'start',
    travelMemo: '리조트 주차장에서 짐을 싣고 출발합니다.',
    timeKind: 'depart',
    nightBadge: 'CHECK OUT',
    showPacking: true,
    packingTitle: '체크리스트',
    packingItems: checkoutChecks,
  },
  {
    id: 'chuam',
    title: '추암 촛대바위',
    shortName: '추암 촛대바위',
    type: 'walk',
    scheduledTime: '09:40',
    estimatedDuration: '50분~1시간',
    description: 'DAY 3 첫 관광지입니다. 바다와 기암괴석을 짧게 걸으며 보는 코스입니다.',
    route: ['주차', '추암해변', '능파대', '촛대바위 전망', '해암정', '출렁다리', '원점회귀'],
    notes: [
      '아침 산책으로 적당함',
      '촛대바위 하나만 보지 말고 주변 기암과 함께 보기',
      '출렁다리는 강풍이나 악천후 시 통제될 수 있음',
      '사진 촬영 포함 약 1시간 예상',
    ],
    optional: true,
    fixedPosition: null,
    travelMemo: '추암해변 주차장을 이용합니다. 원점회귀이므로 같은 주차장으로 돌아옵니다.',
    timeKind: 'arrive',
    kicker: '바다',
  },
  {
    id: 'gumunso',
    title: '구문소',
    shortName: '구문소',
    type: 'walk',
    scheduledTime: '11:20',
    estimatedDuration: '40분~1시간',
    description: '약 5억 년 전 지질 흔적과 물이 산을 관통하는 독특한 지형을 보는 곳입니다.',
    route: [
      '주차장',
      '구문소 앞다리',
      '자연 석문',
      '돌터널',
      '뒤쪽 다리',
      '자개루 방향',
      '구문소 반대편 전망',
      '원점회귀',
    ],
    notes: [
      '정면만 보고 나오지 말고 반대쪽에서도 구문소 보기',
      '인공 돌터널은 실제 차량이 지나가므로 주의',
      '걷기 부담은 크지 않음',
    ],
    optional: true,
    fixedPosition: null,
    travelMemo: '구문소 주차장을 이용합니다. 원점회귀이므로 같은 주차장으로 돌아옵니다.',
    timeKind: 'arrive',
    kicker: '지질 · 자연',
  },
  {
    id: 'lunch',
    title: '태백 점심',
    shortName: '태백 점심',
    type: 'meal',
    scheduledTime: '12:30',
    estimatedDuration: '약 60분',
    description: '특정 식당은 정하지 않습니다. 해산물 위주의 여행에서 분위기를 바꿔 태백 지역 음식을 추천합니다.',
    route: [],
    notes: ['태백에서 현장 선택'],
    optional: false,
    fixedPosition: null,
    travelMemo: '하늘전망대로 이어지기 좋은 태백 시내에서 점심을 먹습니다.',
    timeKind: 'arrive',
    foodChoices: lunchChoices,
    foodKey: 'lunchChoice',
    foodLabel: '현장에서 선택',
  },
  {
    id: 'observatory',
    title: '태백산 하늘전망대',
    shortName: '태백산 하늘전망대',
    type: 'walk',
    scheduledTime: '14:00',
    estimatedDuration: '1시간~1시간 30분',
    description:
      'DAY 3 마지막 관광지입니다. 힘든 등산보다는 숲길과 전망을 즐기는 가벼운 산책형 코스입니다.',
    route: ['주차', '하늘탐방로', '숲길', '하늘전망대', '전망 감상', '같은 길 또는 안내 동선으로 복귀'],
    notes: [
      '하늘탐방로 약 890m',
      '전망대 높이 약 33m',
      '전체 왕복 약 1.8km',
      '태백산과 주변 산세 전망',
      '마지막 날 장거리 산행은 하지 않는다',
      '천천히 전망을 즐기는 코스',
      '날씨가 흐리거나 강풍이면 체류시간 단축 가능',
      '운영 종료시간을 우선 확인할 것',
    ],
    optional: true,
    fixedPosition: null,
    travelMemo: '하늘전망대 주차장을 이용합니다. 왕복이므로 같은 주차장으로 돌아옵니다.',
    timeKind: 'arrive',
    highlight: true,
    kicker: 'DAY 3 핵심 마무리',
  },
  {
    id: 'seongnamDepart',
    title: '성남 출발',
    shortName: '성남 출발',
    type: 'depart',
    scheduledTime: '직접 입력',
    estimatedDuration: '귀가 이동',
    description: '태백산 하늘전망대 관람 후 성남으로 귀가합니다. 예정시간은 정하지 않았습니다.',
    route: [],
    notes: ['출발 전 화장실', '주유량 확인', '물 준비', '교통상황 확인'],
    optional: false,
    fixedPosition: 'beforeEnd',
    travelMemo: '출발 전 주유와 교통상황을 확인한 뒤 성남으로 이동합니다.',
    timeKind: 'depart',
  },
  {
    id: 'seongnamArrive',
    title: '성남 도착',
    shortName: '성남',
    type: 'arrive',
    scheduledTime: '직접 입력',
    estimatedDuration: '여행 종료',
    description: '2박3일 여행을 종료합니다.',
    route: [],
    notes: [],
    optional: false,
    fixedPosition: 'end',
    travelMemo: '성남에 도착하면 짐을 내리고 차량을 정리합니다.',
    timeKind: 'arrive',
    nightBadge: 'TRIP COMPLETE',
    tripComplete: true,
  },
]

export const recommendedOrder = [
  'checkout',
  'chuam',
  'gumunso',
  'lunch',
  'observatory',
  'seongnamDepart',
  'seongnamArrive',
]

export const timeHints = [
  '추암 체류를 약 40분으로 단축',
  '구문소를 핵심 전망 중심으로 약 30~40분 관람',
  '하늘전망대 운영시간을 우선',
  '성남 귀가 시간을 너무 늦추지 않기',
]

export const timeHintCopy =
  '마지막 날은 관광지를 더 추가하지 않고 여유 있게 귀가하는 것을 추천합니다.'
