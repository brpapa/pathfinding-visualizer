import { createSearcher } from './index'
import { GridItemStatus } from '../../types'

describe('searchers for a square grid', () => {
  const max = { x: 4, y: 4 }
  const visitable: GridItemStatus[][] = [...Array(max.x + 1)].map(() =>
    Array(max.y + 1).fill('unvisited')
  )

  test('for DFS', () => {
    const dfs = createSearcher('square', 'depth-first', visitable)

    expect(dfs.solve({ x: 0, y: 0 }, { x: 2, y: 2 }).solution).toEqual([
      [{ x: 0, y: 0 }],
      [{ x: 1, y: 0 }],
      [{ x: 2, y: 0 }],
      [{ x: 3, y: 0 }],
      [{ x: 4, y: 0 }],
      [{ x: 4, y: 1 }],
      [{ x: 4, y: 2 }],
      [{ x: 4, y: 3 }],
      [{ x: 4, y: 4 }],
      [{ x: 3, y: 4 }],
      [{ x: 2, y: 4 }],
      [{ x: 1, y: 4 }],
      [{ x: 0, y: 4 }],
      [{ x: 0, y: 3 }],
      [{ x: 1, y: 3 }],
      [{ x: 2, y: 3 }],
      [{ x: 3, y: 3 }],
      [{ x: 3, y: 2 }],
      [{ x: 2, y: 2 }],
    ])

    expect(dfs.solve({ x: 0, y: 0 }, {x: 5, y: 5}).solution).toEqual([])
  })

  test('for BFS', () => {
    const bfs = createSearcher('square', 'breadth-first', visitable)

    const ans = bfs.solve({ x: 0, y: 0 }, { x: 4, y: 4 })
    expect(ans.solution).toEqual([
      [{ x: 0, y: 0 }],
      [{ x: 0, y: 1 }],
      [{ x: 0, y: 2 }],
      [{ x: 0, y: 3 }],
      [{ x: 0, y: 4 }],
      [{ x: 1, y: 4 }],
      [{ x: 2, y: 4 }],
      [{ x: 3, y: 4 }],
      [{ x: 4, y: 4 }],
    ])
  })
})

/*
ord: cima esq baixo dir
rev: dir baixo esq cima

0,0  1,0  2,0  3,0  4,0
0,1  1,1  2,1  3,1  4,1
0,2  1,2  2,2  3,2  4,2
0,3  1,3  2,3  3,3  4,3
0,4  1,4  2,4  3,4  4,4
*/
