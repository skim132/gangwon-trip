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
