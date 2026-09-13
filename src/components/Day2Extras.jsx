import { getShortName } from '../data'
import { alternativeFlowLabels, timeHints } from '../data/day2'

function CoursePath({ steps }) {
  if (!steps?.length) return null

  return (
    <ol className="course-path">
      {steps.map((step, index) => (
        <li key={`${step}-${index}`}>
          <span>{step}</span>
          {index < steps.length - 1 ? <span className="course-path-arrow">→</span> : null}
        </li>
      ))}
    </ol>
  )
}

function TipList({ tips }) {
  if (!tips?.length) return null

  return (
    <ul className="tip-list">
      {tips.map((tip) => (
        <li key={tip}>{tip}</li>
      ))}
    </ul>
  )
}

export function Day2CardActions({ item, itemState, badaClosed, onSkip, onRestore, onToggleClosed }) {
  return (
    <div className="day2-actions">
      {item.canClose ? (
        <button
          type="button"
          className={`mini-button${badaClosed ? ' selected' : ''}`}
          onClick={onToggleClosed}
        >
          {badaClosed ? '통제 해제' : '오늘 통제됨'}
        </button>
      ) : null}

      {item.canSkip && itemState.status !== 'skipped' ? (
        <button type="button" className="mini-button" onClick={onSkip}>
          오늘 제외
        </button>
      ) : null}

      {itemState.status === 'skipped' ? (
        <button type="button" className="mini-button selected" onClick={onRestore}>
          다시 넣기
        </button>
      ) : null}
    </div>
  )
}

export function Day2CardBody({ item, dayState, onSetField, onApplyAltOrder }) {
  const foodValue = item.foodKey ? dayState[item.foodKey] : ''

  return (
    <div className="day2-body">
      {item.steps?.length ? (
        <div className="subblock">
          <p className="subblock-title">{item.courseOptions ? '선택한 코스' : '추천 코스'}</p>
          <CoursePath steps={item.steps} />
        </div>
      ) : null}

      {item.tips ? <TipList tips={item.tips} /> : null}

      {item.foodChoices ? (
        <div className="subblock">
          <p className="subblock-title">{item.foodLabel}</p>
          <div className="choice-row">
            {item.foodChoices.map((choice) => (
              <button
                key={choice}
                type="button"
                className={`status-chip${foodValue === choice ? ' selected status-arrived' : ''}`}
                onClick={() => onSetField({ [item.foodKey]: choice })}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {item.courseOptions ? (
        <div className="subblock">
          <p className="subblock-title">체력 선택</p>
          <div className="choice-buttons">
            {Object.entries(item.courseOptions).map(([key, course]) => (
              <button
                key={key}
                type="button"
                className={`choice-button${item.selectedCourse === key ? ' selected-a' : ''}`}
                onClick={() => onSetField({ [item.courseKey]: key })}
              >
                <strong>{course.label}</strong>
                <span>{course.duration}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {item.canClose && dayState.badaClosed ? (
        <div className="notice-block">
          <p className="notice-text">강릉 방향 이동이 없어져 오늘 일정이 여유로워졌어요.</p>
          <p className="subblock-title">대체 순서</p>
          <ol className="course-path">
            {alternativeFlowLabels.map((step, index) => (
              <li key={`alt-${index}`}>
                <span>{step}</span>
                {index < alternativeFlowLabels.length - 1 ? (
                  <span className="course-path-arrow">→</span>
                ) : null}
              </li>
            ))}
          </ol>
          <button type="button" className="text-action" onClick={onApplyAltOrder}>
            대체 순서 적용
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function Day2OrderPreview({ itemOrder, items }) {
  const visible = itemOrder.filter((id) => items[id]?.status !== 'skipped')

  return (
    <section className="order-preview">
      <h2 className="section-title">오늘 이동 순서</h2>
      <ol className="order-flow">
        {visible.map((id, index) => (
          <li key={id}>
            <span>{getShortName('day2', id)}</span>
            {index < visible.length - 1 ? <span className="order-flow-arrow">↓</span> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Day2EditBar({ editing, onToggle, onReset }) {
  return (
    <div className="edit-bar">
      <button
        type="button"
        className={`choice-button edit-bar-button${editing ? ' selected-a' : ''}`}
        onClick={onToggle}
      >
        <strong>{editing ? '편집 완료' : '일정 순서 편집'}</strong>
        <span>
          {editing
            ? '드래그 또는 화살표로 순서를 바꾼 뒤 눌러 주세요'
            : '중간 일정의 순서를 바꿀 수 있습니다'}
        </span>
      </button>
      <button type="button" className="text-action" onClick={onReset}>
        추천 일정으로 초기화
      </button>
    </div>
  )
}

export function Day2TimeHint() {
  return (
    <section className="time-hint">
      <h2 className="section-title">시간이 부족하면</h2>
      <ol className="hint-list">
        {timeHints.map((hint) => (
          <li key={hint}>{hint}</li>
        ))}
      </ol>
      <p className="hint-copy">시간에 쫓기지 말고 현장에서 자유롭게 조절하세요.</p>
    </section>
  )
}
