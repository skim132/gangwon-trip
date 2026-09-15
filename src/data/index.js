import * as day1 from './day1'
import * as day2 from './day2'
import * as day3 from './day3'

const dayModules = {
  day1,
  day2,
  day3,
}

export function getDayModule(dayId) {
  return dayModules[dayId] ?? day1
}

export function getDayItems(dayId) {
  return getDayModule(dayId).items
}

export function getItemsById(dayId) {
  return Object.fromEntries(getDayItems(dayId).map((item) => [item.id, item]))
}

export function getRecommendedOrder(dayId) {
  return [...getDayModule(dayId).recommendedOrder]
}

export function getDay(dayId) {
  const mod = getDayModule(dayId)
  const fixedEndId = getFixedId(mod, 'end')
  const fixedBeforeEndIds = getFixedIds(mod, 'beforeEnd')

  return {
    ...mod.meta,
    itemOrder: [...mod.recommendedOrder],
    recommendedOrder: [...mod.recommendedOrder],
    movableIds: getMovableIds(mod),
    fixedStartId: getFixedId(mod, 'start'),
    fixedEndId,
    fixedBeforeEndIds,
    fixedTailIds: [...fixedBeforeEndIds, fixedEndId].filter(Boolean),
    notice: mod.notice,
    timeHints: mod.timeHints,
    timeHintCopy: mod.timeHintCopy,
  }
}

export const DAYS = [getDay('day1'), getDay('day2'), getDay('day3')]

export function getMovableIds(mod) {
  return mod.recommendedOrder.filter((id) => {
    const item = mod.items.find((entry) => entry.id === id)
    return item && !item.fixedPosition
  })
}

export function getFixedId(mod, position) {
  return getFixedIds(mod, position)[0] ?? null
}

export function getFixedIds(mod, position) {
  return mod.recommendedOrder.filter((id) => {
    const item = mod.items.find((entry) => entry.id === id)
    return item?.fixedPosition === position
  })
}

export function getShortName(dayId, id) {
  const item = getItemsById(dayId)[id]
  return item?.shortName ?? item?.title ?? id
}
