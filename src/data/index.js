import * as day1 from './day1'
import * as day2 from './day2'

const dayModules = {
  day1,
  day2,
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
  return {
    ...mod.meta,
    itemOrder: [...mod.recommendedOrder],
    recommendedOrder: [...mod.recommendedOrder],
    movableIds: getMovableIds(mod),
    fixedStartId: getFixedId(mod, 'start'),
    fixedEndId: getFixedId(mod, 'end'),
  }
}

export const DAYS = [getDay('day1'), getDay('day2')]

export function getMovableIds(mod) {
  return mod.recommendedOrder.filter((id) => {
    const item = mod.items.find((entry) => entry.id === id)
    return item && !item.fixedPosition
  })
}

export function getFixedId(mod, position) {
  return mod.items.find((item) => item.fixedPosition === position)?.id ?? null
}

export function getShortName(dayId, id) {
  const item = getItemsById(dayId)[id]
  return item?.shortName ?? item?.title ?? id
}
