import { QTY_GRID_ITEMS } from '../grid-config'
import { GridTypeNames, AgentState, StatusGridItem } from './../../types'

type MapFunction<T> = (prev: T) => T

export const sourceState = () => ({ x: 0, y: 0 })
export const targetState = (grid: GridTypeNames) => ({
  x: QTY_GRID_ITEMS[grid].width - 1,
  y: QTY_GRID_ITEMS[grid].height - 1,
})

// inicializa gridItems[x][y], onde (x,y) >= (0,0) e (x,y) < QTY_GRID_ITEMS[grid]
export function createInitGridItems(
  grid: GridTypeNames,
  source: AgentState,
  target: AgentState
) {
  return (): StatusGridItem[][] => {
    const { width: x, height: y } = QTY_GRID_ITEMS[grid]

    const items = [...Array(x)].map(() => Array(y).fill('unvisited'))
    items[source.x][source.y] = 'source'
    items[target.x][target.y] = 'target'

    return items
  }
}

export const toggleGrid: MapFunction<GridTypeNames> = (prev) =>
  prev === 'triangle' ? 'square' : 'triangle'

export const clearGridItems: MapFunction<StatusGridItem[][]> = (prev) =>
  prev.map((items) =>
    items.map((item) =>
      item === 'source' || item === 'target' || item === 'wall'
        ? item
        : 'unvisited'
    )
  )

export function createToggleGridItem(
  id: AgentState
): MapFunction<StatusGridItem[][]> {
  const { x, y } = id
  return (prev) => {
    const curr = [...prev]
    curr[x][y] = prev[x][y] === 'wall' ? 'unvisited' : 'wall'
    return curr
  }
}
export function createUpdateGridItems(
  states: AgentState[], // states para serem atualizados todos de uma vez
  newStatus: StatusGridItem
): MapFunction<StatusGridItem[][]> {
  return (prev) => {
    const curr = [...prev]
    for (const { x, y } of states) curr[x][y] = newStatus
    return curr
  }
}
