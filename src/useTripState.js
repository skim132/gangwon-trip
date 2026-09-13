import { useEffect, useState } from 'react'
import { STATUSES, STORAGE_KEY, createDefaultState } from './tripData'

const VALID_STATUSES = new Set(STATUSES.map((status) => status.id))

function asText(value) {
  return typeof value === 'string' ? value : ''
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createDefaultState()

    const parsed = JSON.parse(raw)
    const defaults = createDefaultState()

    return {
      dinnerChoice: parsed.dinnerChoice === 'A' || parsed.dinnerChoice === 'B' ? parsed.dinnerChoice : '',
      items: Object.fromEntries(
        Object.entries(defaults.items).map(([id, fallback]) => {
          const saved = parsed.items?.[id] ?? {}
          return [
            id,
            {
              status: VALID_STATUSES.has(saved.status) ? saved.status : fallback.status,
              arrivedAt: asText(saved.arrivedAt),
              leftAt: asText(saved.leftAt),
              done: Boolean(saved.done),
              memo: asText(saved.memo),
            },
          ]
        }),
      ),
      packing: { ...defaults.packing, ...(parsed.packing ?? {}) },
      course: { ...defaults.course, ...(parsed.course ?? {}) },
    }
  } catch {
    return createDefaultState()
  }
}

export function useTripState() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function updateItem(id, patch) {
    setState((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        [id]: {
          ...prev.items[id],
          ...patch,
        },
      },
    }))
  }

  function setDinnerChoice(choice) {
    setState((prev) => ({
      ...prev,
      dinnerChoice: choice,
    }))
  }

  function togglePacking(id) {
    setState((prev) => ({
      ...prev,
      packing: {
        ...prev.packing,
        [id]: !prev.packing[id],
      },
    }))
  }

  function toggleCourse(id) {
    setState((prev) => ({
      ...prev,
      course: {
        ...prev.course,
        [id]: !prev.course[id],
      },
    }))
  }

  return {
    state,
    updateItem,
    setDinnerChoice,
    togglePacking,
    toggleCourse,
  }
}

export function nowTimeValue() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export function getDelayNote(scheduledTime, actualTime) {
  if (!scheduledTime || !actualTime) return ''

  const [scheduledHour, scheduledMinute] = scheduledTime.split(':').map(Number)
  const [actualHour, actualMinute] = actualTime.split(':').map(Number)

  if (
    [scheduledHour, scheduledMinute, actualHour, actualMinute].some((value) => Number.isNaN(value))
  ) {
    return ''
  }

  const diff = actualHour * 60 + actualMinute - (scheduledHour * 60 + scheduledMinute)
  if (diff <= 10) return ''

  const rounded = Math.round(diff / 10) * 10
  if (rounded < 60) return `예정보다 약 ${rounded}분 늦음`

  const hours = Math.floor(rounded / 60)
  const minutes = rounded % 60
  if (minutes === 0) return `예정보다 약 ${hours}시간 늦음`
  return `예정보다 약 ${hours}시간 ${minutes}분 늦음`
}
