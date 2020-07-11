import { GridItemStatus, AgentState, GridTypeNames } from './../../types'

// reducer
export type State = {
  gridItems: GridItemStatus[][]
  isUpdating: boolean
  source: AgentState
  target: AgentState
}
// reducer
export type Action =
  | {
      type: 'pause' | 'continue' | 'clear'
    }
  | {
      type: 'reset'
      payload: {
        grid: GridTypeNames
      }
    }
  | {
      type: 'toggle-grid-item'
      payload: {
        id: AgentState
        hasPending: boolean
      }
    }
  | {
      type: 'update-grid-items'
      payload: {
        agentStates: AgentState[]
        newStatus: GridItemStatus
      }
    }

export type UpdatesLinkedList = {
  agentStates: AgentState[] // de um mesmo nível
  newStatus: GridItemStatus // novo status dos agentStates
  next: UpdatesLinkedList
} | null
