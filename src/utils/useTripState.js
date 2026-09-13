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

function loadUserState() {
  try {
    const current = localStorage.getItem(STORAGE_KEY)
    if (current) {
      const parsed = JSON.parse(current)
      return {
        selectedDay: parsed.selectedDay === 'day2' ? 'day2' : 'day1',
        days: {
          day1: normalizeDay1State(parsed.days?.day1),
          day2: normalizeDay2State(parsed.days?.day2),
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
      selectedDay: dayId === 'day2' ? 'day2' : 'day1',
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
    setState((prev) => updateDay(prev, 'day2', patch))
  }

  function setDay2ItemOrder(order) {
    setDay2Field({ itemOrder: normalizeDayOrder('day2', order) })
  }

  function resetDay2Order() {
    setDay2Field({ itemOrder: getRecommendedOrder('day2') })
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
      const current = prev.days.day2
      return updateDay(prev, 'day2', {
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
      const current = prev.days.day2
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

      return updateDay(prev, 'day2', patch)
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
