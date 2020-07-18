import { createNeighbors } from './neighbors'

test('neighbors function for a triangle grid', () => {
  const max = { x: 4, y: 4 }
  const neighbors = createNeighbors(
    'triangle',
    [...Array(max.x + 1)].map(() => Array(max.y + 1).fill(true))
  )

  expect(neighbors({ x: 1, y: 1 })).toEqual([
    { x: 1, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
  ])

  expect(neighbors({ x: 2, y: 1 })).toEqual([
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ])

  expect(neighbors({ x: 0, y: 0 })).toEqual([
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ])

  expect(neighbors(max)).toEqual([{ x: max.x, y: max.y - 1 }])
})

test('neighbors function for a square grid', () => {
  const max = { x: 4, y: 4 }
  const neighbors = createNeighbors(
    'square',
    [...Array(max.x + 1)].map(() => Array(max.y + 1).fill(true))
  )

  expect(neighbors({ x: 1, y: 1 })).toEqual([
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
  ])
  expect(neighbors({ x: 2, y: 1 })).toEqual([
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 1 },
  ])
  expect(neighbors({ x: 3, y: 1 })).toEqual([
    { x: 3, y: 0 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 1 },
  ])

  expect(neighbors({ x: 0, y: 0 })).toEqual([
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ])
  expect(neighbors({ x: 4, y: 4 })).toEqual([
    { x: 4, y: 3 },
    { x: 3, y: 4 },
  ])
})

/*
0,0  1,0  2,0  3,0  4,0
0,1  1,1  2,1  3,1  4,1
0,2  1,2  2,2  3,2  4,2
0,3  1,3  2,3  3,3  4,3
0,4  1,4  2,4  3,4  4,4
*/
