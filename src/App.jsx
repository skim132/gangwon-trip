import ScheduleCard from './ScheduleCard'
import { ITEM_ORDER, getItemDefinition } from './tripData'
import { useTripState } from './useTripState'

function App() {
  const { state, updateItem, setDinnerChoice, togglePacking, toggleCourse } = useTripState()
  const doneCount = ITEM_ORDER.filter((id) => state.items[id].done).length

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">2박 3일 · 1일차</p>
        <h1>강원 2박3일 여행</h1>
        <p className="hero-date">2026년 9월 18일 금요일</p>
        <p className="hero-route">성남 오전 9시 출발 → 쏠비치 삼척</p>
      </header>

      <section className="summary">
        <div>
          <span>핵심 관광지</span>
          <strong>선자령</strong>
        </div>
        <div>
          <span>숙박</span>
          <strong>쏠비치 삼척 2박</strong>
        </div>
        <div>
          <span>연박</span>
          <strong>9/18 ~ 9/20</strong>
        </div>
        <div>
          <span>오늘 진행</span>
          <strong>
            {doneCount}/{ITEM_ORDER.length} 완료
          </strong>
        </div>
      </section>

      <section className="timeline">
        <h2 className="section-title">DAY 1 일정</h2>
        {ITEM_ORDER.map((id, index) => {
          const item = getItemDefinition(id, state.dinnerChoice)

          return (
            <div key={id} className="timeline-item">
              <div className="timeline-index">{index + 1}</div>
              <ScheduleCard
                item={item}
                itemState={state.items[id]}
                dinnerChoice={state.dinnerChoice}
                packing={state.packing}
                course={state.course}
                onUpdate={(patch) => updateItem(id, patch)}
                onDinnerChoice={setDinnerChoice}
                onTogglePacking={togglePacking}
                onToggleCourse={toggleCourse}
              />
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default App
