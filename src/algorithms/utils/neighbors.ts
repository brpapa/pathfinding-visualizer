import { AgentState, GridTypeNames } from '../../types'

// todos os próximos movimento no sentido anti-horário
const actions = ({ x, y }: AgentState, k: number) => {
  const base = [
    { x: x, y: y - k },
    { x: x - k, y: y },
    { x: x, y: y + k },
    { x: x + k, y: y },
  ]

  return base
  // return !allowDiagonal
  //   ? base
  //   : base.concat([
  //       { x: x + k, y: y - k },
  //       { x: x + k, y: y + k },
  //       { x: x - k, y: y - k },
  //       { x: x - k, y: y + k },
  //     ])
}

/**
 * @param visitable - visitable[x][y] diz se o item de id (x, y) é visitável ou não
 */
export function createNeighbors(
  grid: GridTypeNames,
  visitable: boolean[][],
  k: number = 1
) {
  const min = { x: 0, y: 0 }
  const max = {
    x: visitable.length - 1,
    y: visitable[0].length - 1,
  }

  const neighborsByGrid = {
    triangle: (triangle: AgentState) =>
      actions(triangle, k).filter(
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
      actions(square, k).filter(
        (s) =>
          s.x >= min.x &&
          s.x <= max.x &&
          s.y >= min.y &&
          s.y <= max.y &&
          visitable[s.x][s.y]
      ),
  }
  return neighborsByGrid[grid]
}

export type TNeighbors = (state: AgentState) => AgentState[]
