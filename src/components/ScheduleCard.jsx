import { STATUSES } from '../utils/constants'
import { getDelayNote, nowTimeValue } from '../utils/time'

function TimeField({ label, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="time-row">
        <input type="time" value={value} onChange={(event) => onChange(event.target.value)} />
        <button type="button" className="now-button" onClick={() => onChange(nowTimeValue())}>
          지금
        </button>
      </div>
    </label>
  )
}

export default function ScheduleCard({
  item,
  itemState,
  dinnerChoice,
  packing,
  course,
  onUpdate,
  onDinnerChoice,
  onTogglePacking,
  onToggleCourse,
  headerActions,
  children,
}) {
  const compareTime = item.timeKind === 'depart' ? itemState.leftAt : itemState.arrivedAt
  const delayNote =
    itemState.status === 'skipped' ? '' : getDelayNote(item.scheduledTime, compareTime)
  const courseSteps = item.courseSteps ?? []
  const packingItems = item.packingItems ?? []

  function handleStatus(status) {
    onUpdate({
      status,
      done: status === 'done',
    })
  }

  function handleDone(event) {
    const done = event.target.checked
    onUpdate({
      done,
      status: done ? 'done' : itemState.status === 'done' ? 'scheduled' : itemState.status,
    })
  }

  return (
    <article className={`card${item.highlight ? ' card-highlight' : ''}`}>
      <div className="card-top">
        <div>
          <p className="card-kicker">{item.kicker ?? (item.highlight ? '오늘의 핵심' : '일정')}</p>
          <h2>{item.place}</h2>
        </div>
        {item.nightBadge ? <span className="night-badge">{item.nightBadge}</span> : null}
      </div>

      {headerActions}

      <dl className="meta">
        <div>
          <dt>예정시간</dt>
          <dd>{item.scheduledTime}</dd>
        </div>
        <div>
          <dt>예상 체류시간</dt>
          <dd>{item.duration}</dd>
        </div>
      </dl>

      <p className="description">{item.description}</p>
      <p className="travel-memo">
        <strong>주차 · 이동</strong>
        {item.travelMemo}
      </p>

      {children}

      {item.showCourse ? (
        <div className="subblock">
          <p className="subblock-title">선자령 코스</p>
          <ul className="check-list">
            {courseSteps.map((step) => (
              <li key={step.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(course[step.id])}
                    onChange={() => onToggleCourse(step.id)}
                  />
                  <span>{step.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {item.showPacking ? (
        <div className="subblock">
          <p className="subblock-title">준비물</p>
          <ul className="check-list packing-list">
            {packingItems.map((pack) => (
              <li key={pack.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(packing[pack.id])}
                    onChange={() => onTogglePacking(pack.id)}
                  />
                  <span>{pack.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {item.isDinner ? (
        <div className="choice-block">
          <p className="subblock-title">하산 후 선택</p>
          <div className="choice-buttons">
            <button
              type="button"
              className={`choice-button${dinnerChoice === 'A' ? ' selected-a' : ''}`}
              onClick={() => onDinnerChoice('A')}
            >
              <strong>A안</strong>
              <span>바로 삼척으로 이동 후 저녁</span>
            </button>
            <button
              type="button"
              className={`choice-button${dinnerChoice === 'B' ? ' selected-b' : ''}`}
              onClick={() => onDinnerChoice('B')}
            >
              <strong>B안</strong>
              <span>대관령 또는 강릉에서 저녁 후 삼척 이동</span>
            </button>
          </div>
          <p className="choice-hint">선택은 언제든 다시 바꿀 수 있습니다.</p>
        </div>
      ) : null}

      <div className="status-block">
        <p className="subblock-title">상태</p>
        <div className="status-row">
          {STATUSES.map((status) => (
            <button
              key={status.id}
              type="button"
              className={`status-chip status-${status.id}${itemState.status === status.id ? ' selected' : ''}`}
              onClick={() => handleStatus(status.id)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="time-grid">
        <TimeField
          label="실제 도착시간"
          value={itemState.arrivedAt}
          onChange={(value) => onUpdate({ arrivedAt: value })}
        />
        <TimeField
          label="실제 출발시간"
          value={itemState.leftAt}
          onChange={(value) => onUpdate({ leftAt: value })}
        />
      </div>

      {delayNote ? <p className="delay-note">{delayNote}</p> : null}

      <label className="done-row">
        <input type="checkbox" checked={itemState.done} onChange={handleDone} />
        <span>이 일정을 완료했어요</span>
      </label>

      <label className="field">
        <span>자유 메모</span>
        <textarea
          rows="3"
          value={itemState.memo}
          placeholder="기억할 내용을 적어 두세요"
          onChange={(event) => onUpdate({ memo: event.target.value })}
        />
      </label>
    </article>
  )
}
