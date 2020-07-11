import { State, Action } from './types'
import { getInitialState } from './config'

// a partir do state atual e uma action, retorna o novo state
export default (prev: State, action: Action): State => {
  switch (action.type) {
    case 'reset': {
      return getInitialState(action.payload?.grid)
    }
    case 'pause': {
      return {
        ...prev,
        isUpdating: false,
        availButton: 'continue',
      }
    }
    case 'continue': {
      return {
        ...prev,
        isUpdating: true,
        availButton: 'pause',
      }
    }
    case 'stop': {
      return {
        ...prev,
        isUpdating: false,
        availButton: 'start',
      }
    }
    case 'clear': {
      return {
        ...prev,
        isUpdating: false,
        availButton: 'start',
        gridItems: prev.gridItems.map((items) =>
          items.map((item) =>
            item === 'source' || item === 'target' || item === 'wall'
              ? item
              : 'unvisited'
          )
        ),
      }
    }
    case 'toggle-grid-item': {
      // ainda tem pendencias
      if (prev.availButton === 'continue') return prev

      return {
        ...prev,
        gridItems: ((items) => {
          const { id } = action.payload

          const newest = [...items]
          newest[id.x][id.y] =
            items[id.x][id.y] === 'wall' ? 'unvisited' : 'wall'
          return newest
        })(prev.gridItems),
      }
    }
    case 'update-grid-items': {
      return {
        ...prev,
        gridItems: ((items) => {
          const { agentStates, newStatus } = action.payload

          const newest = [...items]
          for (const { x, y } of agentStates) newest[x][y] = newStatus
          return newest
        })(prev.gridItems),
      }
    }
  }
}
