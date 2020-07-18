import { SearchAlgoNames } from './../../algorithms/types'
import { State } from '../types'
import { GridTypeNames, GridItemStatus } from './../../types'
import { QTY_GRID_ITEMS } from '../grid-config'

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

  return [...Array(x)].map(() => Array(y).fill('unvisited'))
}

function getInitialSource() {
  return { x: 2, y: 2 }
}
function getInitialTarget(grid: GridTypeNames) {
  return {
    x: QTY_GRID_ITEMS[grid].width - 1 - 2,
    y: QTY_GRID_ITEMS[grid].height - 1 - 2,
  }
}
