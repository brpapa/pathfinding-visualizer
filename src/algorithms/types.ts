// redireciona as fontes da verdade
import { DataStructure } from './data-structures'
import { Frontier, SearchAlgoNames } from './search/frontiers'
import { AgentState, GridTypeNames } from '../renderers/types'
import { HeuristicNames } from './search/frontiers/heuristics'
import { TVisited, TNeighbors } from './search/utils'
export type { AgentState, TVisited, TNeighbors, DataStructure, Frontier, HeuristicNames, SearchAlgoNames, GridTypeNames }

// prettier-ignore
export type NodeFrontier = {
  state: AgentState       // state of agent (where is it?)
  parent?: NodeFrontier   // node that generated this node
  cost: number            // cost of path from initial state to this node (= level, because graph is unweighted)
}

export type FrontierParams = {
  start?: AgentState,
  goal?: AgentState
}

export type Comparator<T> = (a: T, b: T) => boolean
