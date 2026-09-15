import { useEffect, useState } from 'react'
import { getRecommendedOrder } from '../data'
import { STATUSES, STORAGE_KEY, STORAGE_KEY_V1 } from './constants'
import {
  createDayUserState,
  createDefaultUserState,
  getAlternativeOrder,
  normalizeDayOrder,
} from './schedule'

const VALID_STATUSES = new Set(STATUSES.map((status) => status.id))

const VALID_DAYS = new Set(['day1', 'day2', 'day3'])

function asText(value) {
  return typeof value === 'string' ? value : ''
}

function normalizeItems(savedItems, defaults) {
  return Object.fromEntries(
    Object.keys(defaults.items).map((id) => {
      const fallback = defaults.items[id]
      const item = savedItems?.[id] ?? {}
      return [
        id,
        {
          status: VALID_STATUSES.has(item.status) ? item.status : fallback.status,
          arrivedAt: asText(item.arrivedAt),
          leftAt: asText(item.leftAt),
          done: Boolean(item.done),
          memo: asText(item.memo),
        },
      ]
    }),
  )
}

function normalizeDay1State(saved) {
  const defaults = createDayUserState('day1')
  if (!saved || typeof saved !== 'object') return defaults

  return {
    dinnerChoice: saved.dinnerChoice === 'A' || saved.dinnerChoice === 'B' ? saved.dinnerChoice : '',
    items: normalizeItems(saved.items, defaults),
    packing: { ...defaults.packing, ...(saved.packing ?? {}) },
    course: { ...defaults.course, ...(saved.course ?? {}) },
  }
}

function normalizeDay2State(saved) {
  const defaults = createDayUserState('day2')
  if (!saved || typeof saved !== 'object') return defaults

  return {
    ...defaults,
    items: normalizeItems(saved.items, defaults),
    packing: { ...defaults.packing, ...(saved.packing ?? {}) },
    course: { ...defaults.course, ...(saved.course ?? {}) },
    itemOrder: normalizeDayOrder('day2', saved.itemOrder),
    mureungLevel: saved.mureungLevel === 'full' ? 'full' : defaults.mureungLevel,
    deokbongLevel: saved.deokbongLevel === 'light' ? 'light' : defaults.deokbongLevel,
    badaClosed: Boolean(saved.badaClosed),
    lunchChoice: asText(saved.lunchChoice),
    dinnerFood: asText(saved.dinnerFood),
  }
}

function normalizeDay3State(saved) {
  const defaults = createDayUserState('day3')
  if (!saved || typeof saved !== 'object') return defaults

  return {
    ...defaults,
    items: normalizeItems(saved.items, defaults),
    packing: { ...defaults.packing, ...(saved.packing ?? {}) },
    course: { ...defaults.course, ...(saved.course ?? {}) },
    itemOrder: normalizeDayOrder('day3', saved.itemOrder),
    lunchChoice: asText(saved.lunchChoice),
    tripComplete: Boolean(saved.tripComplete),
  }
}

function loadUserState() {
  try {
    const current = localStorage.getItem(STORAGE_KEY)
    if (current) {
      const parsed = JSON.parse(current)
      return {
        selectedDay: VALID_DAYS.has(parsed.selectedDay) ? parsed.selectedDay : 'day1',
        days: {
          day1: normalizeDay1State(parsed.days?.day1),
          day2: normalizeDay2State(parsed.days?.day2),
          day3: normalizeDay3State(parsed.days?.day3),
        },
      }
    }

    const legacy = localStorage.getItem(STORAGE_KEY_V1)
    if (legacy) {
      return {
        selectedDay: 'day1',
        days: {
          day1: normalizeDay1State(JSON.parse(legacy)),
          day2: createDayUserState('day2'),
          day3: createDayUserState('day3'),
        },
      }
    }
  } catch {
    return createDefaultUserState()
  }

  return createDefaultUserState()
}

function updateCurrentDay(prev, patch) {
  const dayId = prev.selectedDay
  return {
    ...prev,
    days: {
      ...prev.days,
      [dayId]: {
        ...prev.days[dayId],
        ...patch,
      },
    },
  }
}

function updateDay(prev, dayId, patch) {
  return {
    ...prev,
    days: {
      ...prev.days,
      [dayId]: {
        ...prev.days[dayId],
        ...patch,
      },
    },
  }
}

export function useTripState() {
  const [state, setState] = useState(loadUserState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const selectedDay = state.selectedDay
  const dayState = state.days[selectedDay]

  function setSelectedDay(dayId) {
    setState((prev) => ({
      ...prev,
      selectedDay: VALID_DAYS.has(dayId) ? dayId : 'day1',
    }))
  }

  function updateItem(id, patch) {
    setState((prev) => {
      const current = prev.days[prev.selectedDay]
      return updateCurrentDay(prev, {
        items: {
          ...current.items,
          [id]: {
            ...current.items[id],
            ...patch,
          },
        },
      })
    })
  }

  function setDinnerChoice(choice) {
    setState((prev) => updateCurrentDay(prev, { dinnerChoice: choice }))
  }

  function togglePacking(id) {
    setState((prev) => {
      const current = prev.days[prev.selectedDay]
      return updateCurrentDay(prev, {
        packing: {
          ...current.packing,
          [id]: !current.packing[id],
        },
      })
    })
  }

  function toggleCourse(id) {
    setState((prev) => {
      const current = prev.days[prev.selectedDay]
      return updateCurrentDay(prev, {
        course: {
          ...current.course,
          [id]: !current.course[id],
        },
      })
    })
  }

  function setDay2Field(patch) {
    setState((prev) => {
      const dayId = prev.selectedDay
      if (dayId === 'day1') return prev
      return updateDay(prev, dayId, patch)
    })
  }

  function setDay2ItemOrder(order) {
    setState((prev) => {
      const dayId = prev.selectedDay
      if (dayId === 'day1') return prev
      return updateDay(prev, dayId, { itemOrder: normalizeDayOrder(dayId, order) })
    })
  }

  function resetDay2Order() {
    setState((prev) => {
      const dayId = prev.selectedDay
      if (dayId === 'day1') return prev
      return updateDay(prev, dayId, { itemOrder: getRecommendedOrder(dayId) })
    })
  }

  function applyBadaAltOrder() {
    setState((prev) => {
      const current = prev.days.day2
      return updateDay(prev, 'day2', {
        badaClosed: true,
        itemOrder: getAlternativeOrder(),
        items: {
          ...current.items,
          bada: {
            ...current.items.bada,
            status: 'skipped',
            done: false,
          },
        },
      })
    })
  }

  function skipDay2Item(id) {
    setState((prev) => {
      const dayId = prev.selectedDay
      if (dayId === 'day1') return prev
      const current = prev.days[dayId]
      return updateDay(prev, dayId, {
        items: {
          ...current.items,
          [id]: {
            ...current.items[id],
            status: 'skipped',
            done: false,
          },
        },
      })
    })
  }

  function restoreDay2Item(id) {
    setState((prev) => {
      const dayId = prev.selectedDay
      if (dayId === 'day1') return prev
      const current = prev.days[dayId]
      const patch = {
        items: {
          ...current.items,
          [id]: {
            ...current.items[id],
            status: 'scheduled',
            done: false,
          },
        },
      }

      if (id === 'bada') {
        patch.badaClosed = false
      }

      return updateDay(prev, dayId, patch)
    })
  }

  return {
    selectedDay,
    setSelectedDay,
    dayState,
    updateItem,
    setDinnerChoice,
    togglePacking,
    toggleCourse,
    setDay2Field,
    setDay2ItemOrder,
    resetDay2Order,
    applyBadaAltOrder,
    skipDay2Item,
    restoreDay2Item,
  }
}
