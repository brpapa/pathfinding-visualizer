// redireciona as fontes da verdade
import { DataStructure } from './data-structures'
export type TDataStructure<T> = DataStructure<T>

import { Frontier } from './searcher/frontiers'
export type TFrontier = Frontier

import { AgentState, GridTypeNames } from '../types'
import { HeuristicNames } from './searcher/frontiers/heuristics'
import { TNeighbors } from './utils/neighbors'
import { TVisited } from './utils/visited'

export type { AgentState, TVisited, TNeighbors, DataStructure, HeuristicNames, GridTypeNames }

// prettier-ignore
export type NodeFrontier = {
  state: AgentState       // state of agent (where is it?)
  parent?: NodeFrontier   // node that generated this node
  cost: number            // cost of path from initial state to this node (= level, because graph is unweighted)
} | undefined

export type SearchAlgoNames =
  | 'depth-first'
  | 'breadth-first'
  | 'greedy-best-first'
  | 'a-star'

export type PatternAlgoNames =
  | 'perfect-maze-recursive-backtracking'
  | 'basic-random'

export type FrontierParams = {
  source?: AgentState,
  target?: AgentState
}

export type Comparator<T> = (a: T, b: T) => boolean
