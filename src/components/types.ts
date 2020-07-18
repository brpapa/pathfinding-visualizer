import { GridItemStatus, AgentState, GridTypeNames } from '../types'

/* reducer */

export type AvailButton = 'start' | 'pause' | 'continue'

export type State = {
  gridItems: GridItemStatus[][]
  isUpdating: boolean
  availButton: AvailButton
  source: AgentState
  target: AgentState
}

type Act<T> = { type: T }
type ActWithPayload<T, P> = Act<T> & { payload: P }

export type Action =
  | Act<'pause' | 'continue' | 'clear' | 'stop'>
  | ActWithPayload<'reset', { grid: GridTypeNames }>
  | ActWithPayload<'set', { gridItems: GridItemStatus[][] }>
  | ActWithPayload<
      'update',
      {
        agentStates: AgentState[]
        newStatus: GridItemStatus
      }
    >
  | ActWithPayload<'toggle', { agentState: AgentState }>

/* others */

export type UpdatesLinkedList = {
  agentStates: AgentState[] // de um mesmo nível
  newStatus: GridItemStatus // novo status dos agentStates
  next: UpdatesLinkedList
} | null
