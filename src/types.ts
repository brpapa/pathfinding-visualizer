// redireciona fontes da verdade
import { SearchAlgoNames, HeuristicNames } from './algorithms/types'
export type { SearchAlgoNames, HeuristicNames }

// coordenada do agente
export type AgentState = {
  x: number
  y: number
}

export type GridTypeNames = 'square' | 'triangle'

export type StatusGridItem =
  | 'unvisited'
  | 'visited'
  | 'solution'
  | 'wall'
  | 'source'
  | 'target'
