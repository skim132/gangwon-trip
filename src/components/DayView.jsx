import { useState } from 'react'
import { getDayItem } from '../utils/schedule'
import {
  Day2CardActions,
  Day2CardBody,
  Day2EditBar,
  Day2OrderPreview,
  Day2TimeHint,
} from './Day2Extras'
import Day2Timeline from './Day2Timeline'
import ScheduleCard from './ScheduleCard'

function SharedCard({
  item,
  itemState,
  dayState,
  onUpdate,
  onDinnerChoice,
  onTogglePacking,
  onToggleCourse,
  headerActions,
  children,
}) {
  return (
    <ScheduleCard
      item={item}
      itemState={itemState}
      dinnerChoice={dayState.dinnerChoice}
      packing={dayState.packing}
      course={dayState.course}
      onUpdate={onUpdate}
      onDinnerChoice={onDinnerChoice}
      onTogglePacking={onTogglePacking}
      onToggleCourse={onToggleCourse}
      headerActions={headerActions}
    >
      {children}
    </ScheduleCard>
  )
}

export default function DayView({
  day,
  dayState,
  onUpdate,
  onDinnerChoice,
  onTogglePacking,
  onToggleCourse,
  onSetDay2Field,
  onSetDay2ItemOrder,
  onResetDay2Order,
  onApplyBadaAltOrder,
  onSkipDay2Item,
  onRestoreDay2Item,
}) {
  const [editing, setEditing] = useState(false)
  const itemOrder = Array.isArray(dayState.itemOrder) ? dayState.itemOrder : day.itemOrder
  const doneCount = itemOrder.filter((id) => dayState.items[id]?.done).length
  const canReorder = Array.isArray(dayState.itemOrder)
  const showExtras = day.id === 'day2' || day.id === 'day3'

  function renderCard(id) {
    const item = getDayItem(day.id, id, dayState)
    const itemState = dayState.items[id]

    return (
      <SharedCard
        item={item}
        itemState={itemState}
        dayState={dayState}
        onUpdate={(patch) => onUpdate(id, patch)}
        onDinnerChoice={onDinnerChoice}
        onTogglePacking={onTogglePacking}
        onToggleCourse={onToggleCourse}
        headerActions={
          showExtras && (item.canSkip || item.canClose || itemState.status === 'skipped') ? (
            <Day2CardActions
              item={item}
              itemState={itemState}
              badaClosed={dayState.badaClosed}
              onSkip={() => onSkipDay2Item(id)}
              onRestore={() => onRestoreDay2Item(id)}
              onToggleClosed={() => onSetDay2Field({ badaClosed: !dayState.badaClosed })}
            />
          ) : null
        }
      >
        {showExtras ? (
          <Day2CardBody
            item={item}
            dayState={dayState}
            onSetField={onSetDay2Field}
            onApplyAltOrder={onApplyBadaAltOrder}
          />
        ) : null}
      </SharedCard>
    )
  }

  return (
    <>
      <header className="hero">
        <p className="eyebrow">{day.eyebrow}</p>
        <h1>강원 2박3일 여행</h1>
        {day.theme ? <p className="hero-theme">{day.theme}</p> : null}
        {day.subtitle ? <p className="hero-subtitle">{day.subtitle}</p> : null}
        <p className="hero-date">{day.dateLabel}</p>
        <p className="hero-route">{day.route}</p>
      </header>

      <section className="summary">
        {day.summary.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
        <div>
          <span>오늘 진행</span>
          <strong>
            {doneCount}/{itemOrder.length} 완료
          </strong>
        </div>
      </section>

      {day.notice ? (
        <section className="day-notice">
          <p>{day.notice}</p>
        </section>
      ) : null}

      {canReorder ? (
        <>
          <Day2OrderPreview dayId={day.id} itemOrder={itemOrder} items={dayState.items} />
          <Day2EditBar
            editing={editing}
            onToggle={() => setEditing((value) => !value)}
            onReset={onResetDay2Order}
            resetLabel={day.id === 'day3' ? '추천 순서로 되돌리기' : '추천 일정으로 초기화'}
          />
        </>
      ) : null}

      <section className="timeline">
        <h2 className="section-title">{day.sectionTitle}</h2>
        {canReorder ? (
          <Day2Timeline
            itemOrder={itemOrder}
            editing={editing}
            onReorder={onSetDay2ItemOrder}
            renderItem={renderCard}
            movableIds={day.movableIds}
            fixedStartId={day.fixedStartId}
            fixedEndId={day.fixedEndId}
            fixedTailIds={day.fixedTailIds}
          />
        ) : (
          itemOrder.map((id, index) => (
            <div key={`${day.id}-${id}`} className="timeline-item">
              <div className="timeline-index">{index + 1}</div>
              {renderCard(id)}
            </div>
          ))
        )}
      </section>

      {canReorder ? (
        <Day2TimeHint hints={day.timeHints} copy={day.timeHintCopy} />
      ) : null}
    </>
  )
}
