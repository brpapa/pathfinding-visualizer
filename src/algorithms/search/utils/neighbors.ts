import { AgentState } from '../../types'

// todos os próximos movimento no sentido anti-horário
const actions = ({ x, y }: AgentState) => [
  { x: x, y: y - 1 },
  { x: x - 1, y: y },
  { x: x, y: y + 1 },
  { x: x + 1, y: y },
]

/**
 * @description retorna um objeto de funções que têm em seus escopos o acesso à matriz visitable, indexadas por um grid type
 * @param visitable - visitable[x][y] diz se o item de id (x, y) é visitável ou não
 */
export function createNeighbors(visitable: boolean[][]) {
  const min = { x: 0, y: 0 }
  const max = {
    x: visitable.length - 1,
    y: visitable[0].length - 1,
  }

  return {
    triangle: (triangle: AgentState) =>
      actions(triangle).filter(
        (t) =>
          t.x >= min.x &&
          t.x <= max.x &&
          t.y >= min.y &&
          t.y <= max.y &&
          visitable[t.x][t.y] &&
          (t.x === triangle.x + 1 ? (triangle.x + triangle.y) % 2 === 0 : 1) &&
          (t.x === triangle.x - 1 ? (triangle.x + triangle.y) % 2 === 1 : 1)
      ),
    square: (square: AgentState) =>
      actions(square).filter(
        (s) =>
          s.x >= min.x &&
          s.x <= max.x &&
          s.y >= min.y &&
          s.y <= max.y &&
          visitable[s.x][s.y]
      ),
  }
}

export type TNeighbors = (state: AgentState) => AgentState[]
