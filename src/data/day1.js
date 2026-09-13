/**
 * DAY 1 원본 일정 (Git에 저장)
 * 당일 완료/시간/메모/A·B 선택은 localStorage에만 저장됩니다.
 */

export const meta = {
  id: 'day1',
  tabLabel: 'DAY 1 · 9/18',
  sectionTitle: 'DAY 1 일정',
  eyebrow: '2박 3일 · 1일차',
  dateLabel: '2026년 9월 18일 금요일',
  route: '성남 오전 9시 출발 → 쏠비치 삼척',
  summary: [
    { label: '핵심 관광지', value: '선자령' },
    { label: '숙박', value: '쏠비치 삼척 2박' },
    { label: '연박', value: '9/18 ~ 9/20' },
  ],
}

export const packingItems = [
  { id: 'boots', label: '등산화' },
  { id: 'windbreaker', label: '바람막이' },
  { id: 'water', label: '물' },
  { id: 'snacks', label: '간식' },
  { id: 'battery', label: '보조배터리' },
  { id: 'hat', label: '모자' },
]

export const seonjaCourse = [
  { id: 'start', label: '대관령 출발' },
  { id: 'forest', label: '숲길' },
  { id: 'ridge', label: '능선' },
  { id: 'wind', label: '풍력발전기 전망' },
  { id: 'summit', label: '선자령 정상' },
  { id: 'photo', label: '휴식 및 사진' },
  { id: 'return', label: '원점회귀' },
]

export const dinnerPlans = {
  A: {
    title: '삼척 이동 후 저녁',
    scheduledTime: '17:00',
    estimatedDuration: '이동 약 1시간 30분~2시간',
    description: '하산 후 바로 삼척으로 이동합니다. 도착한 뒤 숙소 근처에서 저녁을 먹습니다.',
    travelMemo: '선자령에서 삼척까지 동해 방향으로 이동합니다. 저녁은 삼척에서 해결합니다.',
    hotelTime: '19:30',
  },
  B: {
    title: '대관령 또는 강릉 저녁',
    scheduledTime: '17:00',
    estimatedDuration: '식사 60~90분 후 삼척 이동',
    description: '대관령 또는 강릉에서 저녁을 먹은 뒤 삼척으로 이동합니다. 식사 장소는 당일 컨디션에 맞춰 고릅니다.',
    travelMemo: '식사 후 야간 운전을 고려해 너무 늦지 않게 출발합니다.',
    hotelTime: '20:30',
  },
}

export const items = [
  {
    id: 'depart',
    title: '성남 출발',
    type: 'depart',
    scheduledTime: '09:00',
    estimatedDuration: '출발 준비 약 20분',
    description: '성남을 출발합니다. 출발 전 주유, 물, 간식, 등산장비를 확인하세요.',
    route: ['성남', '영동고속도로'],
    notes: ['출발 전 주유, 물, 간식, 등산장비 확인'],
    optional: false,
    fixedPosition: 'start',
    travelMemo: '영동고속도로로 진입합니다. 출발 전 주유 상태를 먼저 확인하세요.',
    timeKind: 'depart',
  },
  {
    id: 'reststop',
    title: '영동고속도로 휴게소',
    type: 'rest',
    scheduledTime: '10:50',
    estimatedDuration: '40~60분',
    description:
      '식사와 휴식을 위한 중간 정류입니다. 특정 휴게소는 정하지 않고, 실제 교통상황에 따라 선택합니다.',
    route: ['영동고속도로 휴게소'],
    notes: ['특정 휴게소는 고정하지 않음', '교통상황에 따라 선택'],
    optional: false,
    fixedPosition: null,
    travelMemo: '휴게소 주차장을 이용합니다. 혼잡하면 다음 휴게소로 이동합니다.',
    timeKind: 'arrive',
  },
  {
    id: 'seonja',
    title: '선자령',
    type: 'hike',
    scheduledTime: '13:00',
    estimatedDuration: '3시간 30분~4시간',
    description:
      '오늘의 핵심 코스입니다. 대관령에서 출발해 숲길과 능선을 지나 풍력발전기 전망을 보고, 선자령 정상에서 휴식과 사진을 남긴 뒤 원점회귀합니다.',
    route: ['대관령 출발', '숲길', '능선', '풍력발전기 전망', '선자령 정상', '휴식 및 사진', '원점회귀'],
    notes: ['등산화, 바람막이, 물, 간식, 보조배터리, 모자'],
    optional: false,
    fixedPosition: null,
    travelMemo: '대관령 선자령 탐방 주차장을 이용합니다. 원점회귀이므로 같은 주차장으로 돌아옵니다.',
    timeKind: 'arrive',
    highlight: true,
    showCourse: true,
    showPacking: true,
    courseSteps: seonjaCourse,
    packingItems,
  },
  {
    id: 'dinner',
    title: '하산 후 저녁',
    type: 'meal',
    scheduledTime: '17:00',
    estimatedDuration: '선택에 따라 달라집니다',
    description: '하산 후 저녁 코스를 먼저 선택해 주세요. 언제든 다시 바꿀 수 있습니다.',
    route: ['A안: 바로 삼척 이동 후 저녁', 'B안: 대관령 또는 강릉 저녁 후 삼척 이동'],
    notes: ['선택은 언제든 변경 가능'],
    optional: false,
    fixedPosition: null,
    travelMemo: 'A안은 바로 삼척 이동, B안은 대관령 또는 강릉에서 저녁입니다.',
    timeKind: 'arrive',
    isDinner: true,
  },
  {
    id: 'hotel',
    title: '쏠비치 삼척',
    type: 'stay',
    scheduledTime: '19:30',
    estimatedDuration: '숙박 · 2박 중 첫째 날',
    description: '2박 연박의 첫날입니다. 체크인 후 짐을 정리하고, 등산화와 옷을 말리며 다음날 날씨를 확인합니다.',
    route: ['체크인', '짐 정리', '등산화와 옷 말리기', '다음날 날씨 확인'],
    notes: ['1/2 NIGHT'],
    optional: false,
    fixedPosition: 'end',
    travelMemo: '리조트 주차장을 이용합니다. 체크인 데스크에서 객실 안내를 받습니다.',
    timeKind: 'arrive',
    nightBadge: '1/2 NIGHT',
  },
]

export const recommendedOrder = ['depart', 'reststop', 'seonja', 'dinner', 'hotel']
