import { AgentState } from '../../types'

/**
 * @description implementação do método has em O(1)
 * @param X - 0 <= x < X
 * @param Y - 0 <= y < Y
 */
export function createVisited(X: number, Y: number) {
  let visited: boolean[][] = [...Array(X)].map(() => Array(Y).fill(false))

  return {
    add: ({ x, y }: AgentState) => {
      visited[x][y] = true
    },
    has: ({ x, y }: AgentState) => {
      return visited[x][y]
    },
    reset: () => {
      visited = visited.map((arr) => arr.fill(false))
    },
  }
}

export type TVisited = ReturnType<typeof createVisited>
