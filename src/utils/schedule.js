import { dinnerPlans } from '../data/day1'
import { alternativeOrder } from '../data/day2'
import { getDay, getDayModule, getItemsById, getRecommendedOrder } from '../data'

export function mapToCardItem(raw) {
  if (!raw) return {}

  return {
    id: raw.id,
    place: raw.title,
    shortName: raw.shortName ?? raw.title,
    scheduledTime: raw.scheduledTime,
    duration: raw.estimatedDuration,
    description: raw.description,
    travelMemo: raw.travelMemo,
    timeKind: raw.timeKind ?? 'arrive',
    steps: raw.route,
    tips: raw.notes,
    canSkip: Boolean(raw.optional),
    fixed: raw.fixedPosition,
    highlight: Boolean(raw.highlight),
    canClose: Boolean(raw.canClose),
    nightBadge: raw.nightBadge,
    kicker: raw.kicker,
    isDinner: Boolean(raw.isDinner),
    showCourse: Boolean(raw.showCourse),
    showPacking: Boolean(raw.showPacking),
    courseSteps: raw.courseSteps,
    packingItems: raw.packingItems,
    packingTitle: raw.packingTitle,
    foodChoices: raw.foodChoices,
    foodKey: raw.foodKey,
    foodLabel: raw.foodLabel,
    courses: raw.courses,
    choiceKey: raw.choiceKey,
    tripComplete: Boolean(raw.tripComplete),
  }
}

function applyCourseChoice(item, extras) {
  if (!item.courses || !item.choiceKey) return item

  const selected = extras[item.choiceKey]
  const course = item.courses.options[selected] ?? item.courses.options[item.courses.defaultKey]
  const courseOptions = Object.fromEntries(
    Object.entries(item.courses.options).map(([key, value]) => [
      key,
      {
        label: value.label,
        duration: value.estimatedDuration,
        steps: value.route,
      },
    ]),
  )

  return {
    ...item,
    duration: course.estimatedDuration,
    steps: course.route,
    selectedCourse: selected ?? item.courses.defaultKey,
    courseKey: item.choiceKey,
    courseOptions,
  }
}

export function getDayItem(dayId, id, extras = {}) {
  const dinnerChoice = typeof extras === 'string' ? extras : extras?.dinnerChoice
  const state = typeof extras === 'string' ? { dinnerChoice } : extras
  const raw = getItemsById(dayId)[id]
  let item = mapToCardItem(raw)

  if (dayId === 'day1' && id === 'dinner' && dinnerChoice && dinnerPlans[dinnerChoice]) {
    const plan = dinnerPlans[dinnerChoice]
    item = {
      ...item,
      place: plan.title,
      scheduledTime: plan.scheduledTime,
      duration: plan.estimatedDuration,
      description: plan.description,
      travelMemo: plan.travelMemo,
    }
  }

  if (dayId === 'day1' && id === 'hotel' && dinnerChoice && dinnerPlans[dinnerChoice]) {
    item = {
      ...item,
      scheduledTime: dinnerPlans[dinnerChoice].hotelTime,
    }
  }

  return applyCourseChoice(item, state)
}

export function normalizeDayOrder(dayId, order) {
  const day = getDay(dayId)
  const seen = new Set()
  const middle = []

  if (Array.isArray(order)) {
    for (const id of order) {
      if (day.movableIds.includes(id) && !seen.has(id)) {
        middle.push(id)
        seen.add(id)
      }
    }
  }

  for (const id of day.movableIds) {
    if (!seen.has(id)) middle.push(id)
  }

  return [day.fixedStartId, ...middle, ...day.fixedTailIds].filter(Boolean)
}

export function getAlternativeOrder() {
  return normalizeDayOrder('day2', alternativeOrder)
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

export function createDayUserState(dayId) {
  const order = getRecommendedOrder(dayId)
  const items = {}
  for (const id of order) {
    items[id] = createDefaultItemState()
  }

  const packing = {}
  const course = {}
  for (const item of Object.values(getItemsById(dayId))) {
    if (item.packingItems) {
      for (const pack of item.packingItems) packing[pack.id] = false
    }
    if (item.courseSteps) {
      for (const step of item.courseSteps) course[step.id] = false
    }
  }

  const base = {
    dinnerChoice: '',
    items,
    packing,
    course,
  }

  if (dayId === 'day1') return base

  const extra = {
    ...base,
    itemOrder: [...order],
    lunchChoice: '',
  }

  if (dayId === 'day3') {
    return {
      ...extra,
      tripComplete: false,
    }
  }

  const day2 = getDayModule('day2')
  const mureung = day2.items.find((item) => item.id === 'mureung')
  const deokbong = day2.items.find((item) => item.id === 'deokbong')

  return {
    ...extra,
    mureungLevel: mureung?.courses?.defaultKey ?? 'light',
    deokbongLevel: deokbong?.courses?.defaultKey ?? 'summit',
    badaClosed: false,
    dinnerFood: '',
  }
}

export function createDefaultUserState() {
  return {
    selectedDay: 'day1',
    days: {
      day1: createDayUserState('day1'),
      day2: createDayUserState('day2'),
      day3: createDayUserState('day3'),
    },
  }
}
