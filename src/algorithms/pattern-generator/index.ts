import { GridItemStatus } from './../../types'
import { AgentState } from '../../types'
import { TVisited } from '../utils/visited'
import { TNeighbors } from '../utils/neighbors'
import { GridTypeNames } from '../../types'
import { PatternAlgoNames } from '../types'
import { createVisited } from '../utils/visited'
import { createNeighbors } from '../utils/neighbors'

/**
 * @description retorna gridItems
 * @param X - 0 <= x < X
 * @param Y - 0 <= y < Y
 */
export function generatePattern(
  grid: GridTypeNames,
  algo: PatternAlgoNames,
  X: number,
  Y: number
): GridItemStatus[][] {
  const neighbors = createNeighbors(
    grid,
    [...Array(X)].map(() => Array(Y).fill(true)),
    2
  )
  const visited = createVisited(X, Y)

  switch (algo) {
    case 'basic-random':
      return basicRandom(X, Y)
    case 'perfect-maze-recursive-backtracking':
      return perfectMazeSquare(neighbors, visited, X, Y)
    default:
      return []
  }
}

function between(u: AgentState, v: AgentState) {
  return {
    x: (u.x + v.x) / 2,
    y: (u.y + v.y) / 2,
  }
}

function basicRandom(X: number, Y: number): GridItemStatus[][] {
  const gridItems = [...Array(X)].map(() => Array(Y).fill('unvisited'))

  let qtyWalls = (X * Y) / 3
  while (qtyWalls--) {
    const x = Math.floor(Math.random() * X)
    const y = Math.floor(Math.random() * Y)
    gridItems[x][y] = 'wall'
  }

  return gridItems
}

/*
  0,0  1,0  2,0  3,0  4,0
  0,1  1,1  2,1  3,1  4,1
  0,2  1,2  2,2  3,2  4,2
  0,3  1,3  2,3  3,3  4,3
  0,4  1,4  2,4  3,4  4,4
*/

// todo nó (x,y), com ambos x e y pares, é 'unvisited'
// todo nó (x,y), com ambos x e y ímpares, é 'wall'
// todo nó (x,y), com x+y ímpar, é possivelmente 'unvisited'
// recursive backtracking version
function perfectMazeSquare(
  neighbors: TNeighbors,
  visited: TVisited,
  X: number,
  Y: number
): GridItemStatus[][] {
  const gridItems = [...Array(X)].map(() => Array(Y).fill('wall'))
  visited.reset()

  // recursion
  ;(function traverse(u: AgentState) {
    visited.add(u)
    gridItems[u.x][u.y] = 'unvisited'

    // u -> q -> v
    for (const v of neighbors(u).sort(() => Math.random() - 0.5)) {
      if (visited.has(v)) continue

      // visited.add(q)
      const q = between(u, v)
      gridItems[q.x][q.y] = 'unvisited'

      traverse(v)
    }
  })({ x: 0, y: 0 })

  return gridItems
}

// TODO: abre novos caminhos ao setar alguns nós randômicos (x,y), com x+y ímpar, como 'unvisited'
// function almostPerfectMaze() {
//   gridItems[2][3] = 'unvisited'
//   gridItems[4][5] = 'unvisited'
//   gridItems[2][7] = 'unvisited'
//   gridItems[4][9] = 'unvisited'
// }

// TODO: tem um monte de egde case
// function mazeTriangle() {

// }