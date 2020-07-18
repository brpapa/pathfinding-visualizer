import { getCreateFrontier } from './index'

describe('DFS frontier', () => {
  const f = getCreateFrontier('depth-first')({})

  test('add', () => {
    f.add({ state: { x: 0, y: 0 }, cost: 0 })
    f.add({ state: { x: 1, y: 0 }, cost: 0 })
    f.add({ state: { x: 2, y: 0 }, cost: 0 })
    expect(f.next()?.state).toEqual({ x: 2, y: 0})
  })

  test('remove', () => {
    f.remove()
    expect(f.next()?.state).toEqual({ x: 1, y: 0})
    f.remove()
    expect(f.next()?.state).toEqual({ x: 0, y: 0 })
    expect(f.empty()).toBeTruthy
  })
})

describe('BFS frontier', () => {
  const f = getCreateFrontier('breadth-first')({})

  test('add', () => {
    f.add({ state: { x: 0, y: 0 }, cost: 0 })
    f.add({ state: { x: 1, y: 0 }, cost: 0 })
    f.add({ state: { x: 2, y: 0 }, cost: 0 })
    expect(f.next()?.state).toEqual({ x: 0, y: 0})
  })

  test('remove', () => {
    f.remove()
    expect(f.next()?.state).toEqual({ x: 1, y: 0})
    f.remove()
    expect(f.next()?.state).toEqual({ x: 2, y: 0 })
    expect(f.empty()).toBeTruthy
  })
})

describe('GBFS frontier', () => {
  const f = getCreateFrontier('greedy-best-first')({ target: { x: 4, y: 4 } })

  test('add', () => {
    f.add({ state: { x: 0, y: 0 }, cost: 0 })
    f.add({ state: { x: 1, y: 0 }, cost: 0 })
    f.add({ state: { x: 2, y: 0 }, cost: 0 })
    f.add({ state: { x: 2, y: 2 }, cost: 0 })
    f.add({ state: { x: 0, y: 1 }, cost: 0 })
    f.add({ state: { x: 0, y: 2 }, cost: 0 })
    f.add({ state: { x: 1, y: 1 }, cost: 0 })
    expect(f.next()?.state).toEqual({ x: 2, y: 2 })
  })

  // test('remove', () => {
  //   for (let i = 0; i < 7; i++) {
  //     console.log(f.next()?.state)
  //     f.remove()
  //   }
  // })
})

/*
0,0  1,0  2,0  3,0  4,0
0,1  1,1  2,1  3,1  4,1
0,2  1,2  2,2  3,2  4,2
0,3  1,3  2,3  3,3  4,3
0,4  1,4  2,4  3,4  4,4
*/