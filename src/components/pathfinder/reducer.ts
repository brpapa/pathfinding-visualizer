import { State, Action } from '../types'
import { getInitialState } from './config'

// receives the current (now previous) state and an action, returns the new state
export default (prev: State, action: Action): State => {
  switch (action.type) {
    case 'reset': {
      const { grid } = action.payload
      return getInitialState(grid)
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
          items.map((item) => (item === 'wall' ? item : 'unvisited'))
        ),
      }
    }
    case 'set': {
      const { gridItems } = action.payload
      return {
        ...prev,
        gridItems,
      }
    }
    case 'update': {
      const { agentStates, newStatus } = action.payload
      return {
        ...prev,
        gridItems: ((items) => {
          // TODO
          // if (newStatus == 'wall') localStorage.setItem()

          const newest = [...items]
          for (const { x, y } of agentStates) newest[x][y] = newStatus
          return newest
        })(prev.gridItems),
      }
    }
    case 'toggle': {
      const { agentState } = action.payload
      return {
        ...prev,
        gridItems: ((items) => {
          const { x, y } = agentState
          
          const newest = [...items]
          newest[x][y] = newest[x][y] === 'wall' ? 'unvisited' : 'wall'
          return newest
        })(prev.gridItems),
      }
    }
  }
}
