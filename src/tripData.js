export const STORAGE_KEY = 'gangwon-trip-day1-v1'

export const STATUSES = [
  { id: 'scheduled', label: '예정' },
  { id: 'traveling', label: '이동 중' },
  { id: 'arrived', label: '도착' },
  { id: 'done', label: '완료' },
  { id: 'skipped', label: '건너뜀' },
]

export const PACKING_ITEMS = [
  { id: 'boots', label: '등산화' },
  { id: 'windbreaker', label: '바람막이' },
  { id: 'water', label: '물' },
  { id: 'snacks', label: '간식' },
  { id: 'battery', label: '보조배터리' },
  { id: 'hat', label: '모자' },
]

export const COURSE_STEPS = [
  { id: 'start', label: '대관령 출발' },
  { id: 'forest', label: '숲길' },
  { id: 'ridge', label: '능선' },
  { id: 'wind', label: '풍력발전기 전망' },
  { id: 'summit', label: '선자령 정상' },
  { id: 'photo', label: '휴식 및 사진' },
  { id: 'return', label: '원점회귀' },
]

export const DINNER_PLANS = {
  A: {
    place: '삼척 이동 후 저녁',
    scheduledTime: '17:00',
    duration: '이동 약 1시간 30분~2시간',
    description:
      '하산 후 바로 삼척으로 이동합니다. 도착한 뒤 숙소 근처에서 저녁을 먹습니다.',
    travelMemo: '선자령에서 삼척까지 동해 방향으로 이동합니다. 저녁은 삼척에서 해결합니다.',
    hotelTime: '19:30',
  },
  B: {
    place: '대관령 또는 강릉 저녁',
    scheduledTime: '17:00',
    duration: '식사 60~90분 후 삼척 이동',
    description:
      '대관령 또는 강릉에서 저녁을 먹은 뒤 삼척으로 이동합니다. 식사 장소는 당일 컨디션에 맞춰 고릅니다.',
    travelMemo: '식사 후 야간 운전을 고려해 너무 늦지 않게 출발합니다.',
    hotelTime: '20:30',
  },
}

const baseItems = {
  depart: {
    id: 'depart',
    place: '성남 출발',
    scheduledTime: '09:00',
    duration: '출발 준비 약 20분',
    description:
      '성남을 출발합니다. 출발 전 주유, 물, 간식, 등산장비를 확인하세요.',
    travelMemo: '영동고속도로로 진입합니다. 출발 전 주유 상태를 먼저 확인하세요.',
    timeKind: 'depart',
  },
  reststop: {
    id: 'reststop',
    place: '영동고속도로 휴게소',
    scheduledTime: '10:50',
    duration: '40~60분',
    description:
      '식사와 휴식을 위한 중간 정류입니다. 특정 휴게소는 정하지 않고, 실제 교통상황에 따라 선택합니다.',
    travelMemo: '휴게소 주차장을 이용합니다. 혼잡하면 다음 휴게소로 이동합니다.',
    timeKind: 'arrive',
  },
  seonja: {
    id: 'seonja',
    place: '선자령',
    scheduledTime: '13:00',
    duration: '3시간 30분~4시간',
    description:
      '오늘의 핵심 코스입니다. 대관령에서 출발해 숲길과 능선을 지나 풍력발전기 전망을 보고, 선자령 정상에서 휴식과 사진을 남긴 뒤 원점회귀합니다.',
    travelMemo: '대관령 선자령 탐방 주차장을 이용합니다. 원점회귀이므로 같은 주차장으로 돌아옵니다.',
    timeKind: 'arrive',
    highlight: true,
    showCourse: true,
    showPacking: true,
  },
  dinner: {
    id: 'dinner',
    place: '하산 후 저녁',
    scheduledTime: '17:00',
    duration: '선택에 따라 달라집니다',
    description: '하산 후 저녁 코스를 먼저 선택해 주세요. 언제든 다시 바꿀 수 있습니다.',
    travelMemo: 'A안은 바로 삼척 이동, B안은 대관령 또는 강릉에서 저녁입니다.',
    timeKind: 'arrive',
    isDinner: true,
  },
  hotel: {
    id: 'hotel',
    place: '쏠비치 삼척',
    scheduledTime: '19:30',
    duration: '숙박 · 2박 중 첫째 날',
    description:
      '2박 연박의 첫날입니다. 체크인 후 짐을 정리하고, 등산화와 옷을 말리며 다음날 날씨를 확인합니다.',
    travelMemo: '리조트 주차장을 이용합니다. 체크인 데스크에서 객실 안내를 받습니다.',
    timeKind: 'arrive',
    nightBadge: '1/2 NIGHT',
  },
}

export const ITEM_ORDER = ['depart', 'reststop', 'seonja', 'dinner', 'hotel']

export function getItemDefinition(id, dinnerChoice) {
  const item = { ...baseItems[id] }

  if (id === 'dinner' && dinnerChoice && DINNER_PLANS[dinnerChoice]) {
    const plan = DINNER_PLANS[dinnerChoice]
    return {
      ...item,
      place: plan.place,
      scheduledTime: plan.scheduledTime,
      duration: plan.duration,
      description: plan.description,
      travelMemo: plan.travelMemo,
    }
  }

  if (id === 'hotel' && dinnerChoice && DINNER_PLANS[dinnerChoice]) {
    return {
      ...item,
      scheduledTime: DINNER_PLANS[dinnerChoice].hotelTime,
    }
  }

  return item
}

export function createDefaultItemState() {
  return {
    status: 'scheduled',
    arrivedAt: '',
    leftAt: '',
    done: false,
    memo: '',
  }
}

export function createDefaultState() {
  const items = {}
  for (const id of ITEM_ORDER) {
    items[id] = createDefaultItemState()
  }

  return {
    dinnerChoice: '',
    items,
    packing: Object.fromEntries(PACKING_ITEMS.map((item) => [item.id, false])),
    course: Object.fromEntries(COURSE_STEPS.map((step) => [step.id, false])),
  }
}
