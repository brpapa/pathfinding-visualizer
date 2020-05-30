// redireciona fontes da verdade
import { SearchAlgoNames, HeuristicNames } from '../algorithms/types'
export type { SearchAlgoNames, HeuristicNames }

export type Point = {
  x: number
  y: number
}
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
  | 'unvisitable' // wall
  | 'start'
  | 'goal'
