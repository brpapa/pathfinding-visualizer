import { SearchAlgoNames } from './../../algorithms/types'
import { State } from './types'
import { GridTypeNames, AgentState, GridItemStatus } from './../../types'
import { QTY_GRID_ITEMS } from '../grid-config'

export const delayConfig = {
  minValue: 20,
  maxValue: 180,
  step: 40,
}

export const initialGrid: GridTypeNames = 'triangle'
export const initialSearchAlgo: SearchAlgoNames = 'depth-first'
export const initialDelay = 80

export function getInitialState(grid: GridTypeNames): State {
  return {
    isUpdating: false,
    availButton: 'start',
    source: getInitialSource(),
    target: getInitialTarget(grid),
    gridItems: getInitialGridItems(grid),
  }
}

/* */

// retorna gridItems[x][y], onde (x,y) >= (0,0) e (x,y) < QTY_GRID_ITEMS[grid]
function getInitialGridItems(grid: GridTypeNames): GridItemStatus[][] {
  const { width: x, height: y } = QTY_GRID_ITEMS[grid]
  const source = getInitialSource()
  const target = getInitialTarget(grid)

  const items = [...Array(x)].map(() => Array(y).fill('unvisited'))
  items[source.x][source.y] = 'source'
  items[target.x][target.y] = 'target'

  return items
}

function getInitialSource() {
  return { x: 2, y: 2 }
}
function getInitialTarget(grid: GridTypeNames) {
  return {
    x: QTY_GRID_ITEMS[grid].width-1 - 2,
    y: QTY_GRID_ITEMS[grid].height-1 - 2,
  }
}
