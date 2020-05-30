import { Stack, Queue, BinaryHeap } from './index'

describe('stack', () => {
  const s = new Stack<number>()

  test('push', () => {
    s.push(1)
    s.push(2)
    expect(s.top()).toEqual(2)
  })
  test('pop', () => {
    s.pop()
    expect(s.top()).toEqual(1)
  })
})

describe('queue', () => {
  const s = new Queue<number>()

  test('push', () => {
    s.push(1)
    s.push(2)
    expect(s.top()).toEqual(1)
  })
  test('pop', () => {
    s.pop()
    expect(s.top()).toEqual(2)
  })
})

describe('binary heap', () => {
  describe('max', () => {
    const max = new BinaryHeap<number>((a, b) => a > b)

    test('push', () => {
      max.push(1)
      max.push(2)
      max.push(3)
      max.push(4)
      max.push(5)
      expect(max.top()).toEqual(5)
    })
    
    test('pop', () => {
      max.pop()
      expect(max.top()).toEqual(4)
      max.pop()
      expect(max.top()).toEqual(3)
    })
  })

  describe('min', () => {
    const min = new BinaryHeap<number>((a, b) => a < b)

    test('push', () => {
      min.push(1)
      min.push(2)
      min.push(3)
      min.push(4)
      min.push(5)
      expect(min.top()).toEqual(1)
    })

    test('pop', () => {
      min.pop()
      expect(min.top()).toEqual(2)
      min.pop()
      expect(min.top()).toEqual(3)
    })
  })
})