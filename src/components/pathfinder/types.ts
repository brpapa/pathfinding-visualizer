import { GridItemStatus, AgentState, GridTypeNames } from './../../types'

// reducer
export type State = {
  gridItems: GridItemStatus[][]
  isUpdating: boolean
  availButton: 'start' | 'pause' | 'continue'
  source: AgentState
  target: AgentState
}
// reducer
export type Action =
  | {
      type: 'pause' | 'continue' | 'clear' | 'stop'
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
