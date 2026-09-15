import { DndContext, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function TimelineShell({ index, children, rowRef, style, className = '' }) {
  return (
    <div ref={rowRef} className={`timeline-item${className}`} style={style}>
      <div className="timeline-index">{index + 1}</div>
      <div className="timeline-main">{children}</div>
    </div>
  )
}

function SortableRow({ id, index, editing, onMove, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !editing,
  })

  return (
    <TimelineShell
      index={index}
      rowRef={setNodeRef}
      className={isDragging ? ' dragging' : ''}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {editing ? (
        <div className="reorder-row">
          <button type="button" className="drag-handle" {...attributes} {...listeners}>
            드래그
          </button>
          <button type="button" className="move-button" onClick={() => onMove(id, -1)} aria-label="한 단계 위">
            ↑
          </button>
          <button type="button" className="move-button" onClick={() => onMove(id, 1)} aria-label="한 단계 아래">
            ↓
          </button>
        </div>
      ) : null}
      {children}
    </TimelineShell>
  )
}

export default function Day2Timeline({
  itemOrder,
  editing,
  onReorder,
  renderItem,
  movableIds,
  fixedStartId,
  fixedEndId,
  fixedTailIds,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 6 },
    }),
  )
  const movable = itemOrder.filter((id) => movableIds.includes(id))
  const tailIds = fixedTailIds?.length ? fixedTailIds : [fixedEndId].filter(Boolean)

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    if (!movableIds.includes(active.id) || !movableIds.includes(over.id)) return

    const oldIndex = movable.indexOf(active.id)
    const newIndex = movable.indexOf(over.id)
    if (oldIndex < 0 || newIndex < 0) return

    onReorder([fixedStartId, ...arrayMove(movable, oldIndex, newIndex), ...tailIds])
  }

  function handleMove(id, direction) {
    const oldIndex = movable.indexOf(id)
    const newIndex = oldIndex + direction
    if (oldIndex < 0 || newIndex < 0 || newIndex >= movable.length) return

    onReorder([fixedStartId, ...arrayMove(movable, oldIndex, newIndex), ...tailIds])
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={movable} strategy={verticalListSortingStrategy}>
        <div className="timeline-list">
          {itemOrder.map((id, index) =>
            movableIds.includes(id) ? (
              <SortableRow key={id} id={id} index={index} editing={editing} onMove={handleMove}>
                {renderItem(id)}
              </SortableRow>
            ) : (
              <TimelineShell key={id} index={index}>
                {renderItem(id)}
              </TimelineShell>
            ),
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}
