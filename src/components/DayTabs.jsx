import { DAYS } from '../data'

export default function DayTabs({ selectedDay, onSelect }) {
  return (
    <div className="day-tabs" role="tablist" aria-label="여행 날짜">
      {DAYS.map((day) => {
        const selected = day.id === selectedDay

        return (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`day-tab${selected ? ' selected' : ''}`}
            onClick={() => onSelect(day.id)}
          >
            {day.tabLabel}
          </button>
        )
      })}
    </div>
  )
}
