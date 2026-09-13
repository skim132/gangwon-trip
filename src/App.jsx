import DayTabs from './components/DayTabs'
import DayView from './components/DayView'
import { getDay } from './data'
import { useTripState } from './utils/useTripState'

function App() {
  const {
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
  } = useTripState()
  const day = getDay(selectedDay)

  return (
    <div className="app">
      <DayTabs selectedDay={selectedDay} onSelect={setSelectedDay} />
      <DayView
        day={day}
        dayState={dayState}
        onUpdate={updateItem}
        onDinnerChoice={setDinnerChoice}
        onTogglePacking={togglePacking}
        onToggleCourse={toggleCourse}
        onSetDay2Field={setDay2Field}
        onSetDay2ItemOrder={setDay2ItemOrder}
        onResetDay2Order={resetDay2Order}
        onApplyBadaAltOrder={applyBadaAltOrder}
        onSkipDay2Item={skipDay2Item}
        onRestoreDay2Item={restoreDay2Item}
      />
    </div>
  )
}

export default App
