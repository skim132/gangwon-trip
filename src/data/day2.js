/**
 * DAY 2 원본 일정 (Git에 저장)
 * 논골담길, 추암은 포함하지 않습니다.
 *
 * 당일 사용자가 바꾼 순서, 완료, 시간, 메모, 제외, 체력 코스 선택은
 * 이 파일을 수정하지 않고 localStorage에만 저장됩니다.
 */

export const meta = {
  id: 'day2',
  tabLabel: 'DAY 2 · 9/19',
  sectionTitle: 'DAY 2 일정',
  theme: '바다 · 계곡 · 삼척 해안',
  eyebrow: '2박 3일 · 2일차',
  dateLabel: '2026년 9월 19일 토요일',
  route: '쏠비치 삼척 출발 → 같은 숙소 복귀',
  summary: [
    { label: '오늘 테마', value: '바다 · 계곡 · 삼척 해안' },
    { label: '숙소', value: '쏠비치 삼척' },
    { label: '연박', value: '2박 중 둘째 밤' },
  ],
}

export const lunchChoices = ['물회', '회덮밥', '생선구이', '한식', '장칼국수']
export const dinnerFoodChoices = ['회·해산물', '물회', '생선구이', '고기', '일반 한식']

export const mureungCourses = {
  defaultKey: 'light',
  options: {
    light: {
      label: '가볍게',
      estimatedDuration: '1시간 20분~1시간 40분',
      route: ['주차장', '무릉반석', '삼화사', '계곡길', '학소대 전후', '원점회귀'],
    },
    full: {
      label: '충분히 걷기',
      estimatedDuration: '2시간~2시간 30분',
      route: ['주차장', '무릉반석', '삼화사', '학소대', '쌍폭포', '용추폭포', '원점회귀'],
    },
  },
}

export const deokbongCourses = {
  defaultKey: 'summit',
  options: {
    summit: {
      label: '정상 포함',
      estimatedDuration: '1시간~1시간 20분',
      route: ['덕산해변 주차', '백사장', '외나무다리', '대나무숲', '덕봉산 정상', '해안생태탐방로', '덕산해변 원점회귀'],
    },
    light: {
      label: '가볍게',
      estimatedDuration: '40분~1시간',
      route: ['외나무다리', '해안 둘레길', '원점회귀'],
    },
  },
}

export const items = [
  {
    id: 'solStart',
    title: '쏠비치 삼척 출발',
    shortName: '쏠비치 삼척',
    type: 'depart',
    scheduledTime: '09:00',
    estimatedDuration: '출발 준비',
    description: '2박 연박 둘째 날, 같은 숙소에서 하루를 시작합니다.',
    route: ['쏠비치 삼척'],
    notes: ['차량과 물, 바람막이 확인'],
    optional: false,
    fixedPosition: 'start',
    travelMemo: '리조트 주차장에서 출발합니다. 차량과 물, 바람막이를 확인하세요.',
    timeKind: 'depart',
  },
  {
    id: 'bada',
    title: '정동·심곡 바다부채길',
    shortName: '바다부채길',
    type: 'walk',
    scheduledTime: '10:20',
    estimatedDuration: '1시간 30분~2시간',
    description: '약 3km 해안 탐방 코스입니다. 정동 또는 심곡 입구에서 시작해 반대편 출입구로 이어집니다.',
    route: ['정동 또는 심곡 입구', '해안데크', '몽돌해변', '투구바위', '부채바위', '반대편 출입구'],
    notes: [
      '약 3km 해안 탐방',
      '탐방로 내부 화장실 없음',
      '입장 전 화장실 이용',
      '강풍, 높은 파도 등으로 통제 가능',
      '오늘 통제되면 건너뜀 처리 가능',
    ],
    optional: true,
    fixedPosition: null,
    travelMemo: '정동 또는 심곡 입구 주차장을 이용합니다. 탐방로 내부에는 화장실이 없습니다.',
    timeKind: 'arrive',
    highlight: true,
    canClose: true,
  },
  {
    id: 'lunch',
    title: '점심',
    shortName: '점심',
    type: 'meal',
    scheduledTime: '12:30',
    estimatedDuration: '약 60분',
    description: '특정 식당은 정하지 않습니다. 현장에서 선택하세요.',
    route: [],
    notes: ['현장에서 선택'],
    optional: false,
    fixedPosition: null,
    travelMemo: '바다부채길 또는 다음 이동 동선에 맞춰 가까운 식당을 고릅니다.',
    timeKind: 'arrive',
    foodChoices: lunchChoices,
    foodKey: 'lunchChoice',
    foodLabel: '현장에서 선택',
  },
  {
    id: 'mureung',
    title: '무릉계곡',
    shortName: '무릉계곡',
    type: 'hike',
    scheduledTime: '14:00',
    estimatedDuration: mureungCourses.options.light.estimatedDuration,
    description: '계곡과 사찰, 바위길을 걷는 코스입니다. 체력에 맞춰 길이를 고를 수 있습니다.',
    route: mureungCourses.options.light.route,
    notes: ['기본 추천은 가볍게'],
    optional: true,
    fixedPosition: null,
    travelMemo: '무릉계곡 주차장을 이용합니다. 원점회귀이므로 같은 주차장으로 돌아옵니다.',
    timeKind: 'arrive',
    courses: mureungCourses,
    choiceKey: 'mureungLevel',
  },
  {
    id: 'deokbong',
    title: '덕봉산 해안생태탐방로',
    shortName: '덕봉산',
    type: 'walk',
    scheduledTime: '16:10',
    estimatedDuration: deokbongCourses.options.summit.estimatedDuration,
    description: '덕산해변에서 시작해 외나무다리와 해안길을 걷는 원점회귀 코스입니다.',
    route: deokbongCourses.options.summit.route,
    notes: ['기본 코스는 정상 포함'],
    optional: true,
    fixedPosition: null,
    travelMemo: '덕산해변 주차장을 이용합니다. 원점회귀이므로 같은 해변으로 돌아옵니다.',
    timeKind: 'arrive',
    courses: deokbongCourses,
    choiceKey: 'deokbongLevel',
  },
  {
    id: 'isabu',
    title: '삼척 이사부길',
    shortName: '이사부길',
    type: 'drive',
    scheduledTime: '17:40',
    estimatedDuration: '1시간~1시간 30분',
    description:
      '걷기보다 해안도로 드라이브가 중심입니다. 전망 좋은 곳에서 1~2회 정차한 뒤 소망의탑과 삼척 해상스카이워크를 봅니다.',
    route: ['해안도로 드라이브', '전망 좋은 곳 1~2회 정차', '소망의탑', '삼척 해상스카이워크', '해안도로'],
    notes: [
      '전체 해안도로를 걸을 필요 없음',
      '시간이 부족하면 정차 횟수 줄이기',
      '더 늦으면 소망의탑·스카이워크 중심으로 축소 가능',
    ],
    optional: true,
    fixedPosition: null,
    travelMemo: '해안도로를 따라 이동합니다. 전체 해안도로를 걸을 필요는 없습니다.',
    timeKind: 'arrive',
    kicker: '드라이브 중심',
  },
  {
    id: 'dinner',
    title: '저녁식사',
    shortName: '저녁',
    type: 'meal',
    scheduledTime: '19:00',
    estimatedDuration: '약 60~90분',
    description: '삼척에서 현장에서 선택합니다. 특정 식당은 정하지 않습니다.',
    route: [],
    notes: ['삼척에서 현장 선택'],
    optional: false,
    fixedPosition: null,
    travelMemo: '숙소로 돌아가기 좋은 삼척 시내 또는 해변 근처에서 저녁을 먹습니다.',
    timeKind: 'arrive',
    foodChoices: dinnerFoodChoices,
    foodKey: 'dinnerFood',
    foodLabel: '삼척에서 현장 선택',
  },
  {
    id: 'solReturn',
    title: '쏠비치 삼척 복귀',
    shortName: '쏠비치 삼척',
    type: 'stay',
    scheduledTime: '20:30',
    estimatedDuration: '숙박 · 2박 중 둘째 날',
    description: '같은 숙소 연박 두 번째 밤입니다. 체크인 없이 객실로 돌아갑니다.',
    route: ['숙소 복귀'],
    notes: ['다음날 체크아웃 준비', '짐 정리', '차량 정리', 'DAY 3 날씨 확인'],
    optional: false,
    fixedPosition: 'end',
    travelMemo: '리조트 주차장에 주차한 뒤 객실로 이동합니다.',
    timeKind: 'arrive',
    nightBadge: '2/2 NIGHT',
  },
]

export const recommendedOrder = [
  'solStart',
  'bada',
  'lunch',
  'mureung',
  'deokbong',
  'isabu',
  'dinner',
  'solReturn',
]

export const alternativeOrder = [
  'solStart',
  'bada',
  'mureung',
  'lunch',
  'deokbong',
  'isabu',
  'dinner',
  'solReturn',
]

export const alternativeFlowLabels = [
  '쏠비치 삼척',
  '무릉계곡',
  '점심',
  '덕봉산',
  '이사부길',
  '저녁',
  '쏠비치 삼척',
]

export const timeHints = [
  '무릉계곡을 가볍게 코스로 변경',
  '이사부길 정차 횟수 줄이기',
  '필요하면 관광지 하나를 오늘 제외',
]
