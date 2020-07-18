import { Comparator } from './../types'

export abstract class DataStructure<T> {
  protected arr: T[]

  constructor() {
    this.arr = []
  }
  // O(1)
  push(item: T): void {
    this.arr.push(item)
  }
  empty(): boolean {
    return this.arr.length === 0
  }

  // funções que devem "terminar" de serem implementadas pelas classes filhas
  top(): T | undefined {
    if (this.empty()) return undefined
  }
  pop(): void {
    if (this.empty()) {
      console.warn('arr is already empty')
      return
    }
  }
}

export class Stack<T> extends DataStructure<T> {
  // O(1)
  top() {
    super.top()
    return this.arr[this.arr.length - 1]
  }
  // O(1)
  pop() {
    super.pop()
    this.arr.pop()
  }
}
export class Queue<T> extends DataStructure<T> {
  // O(1)
  top() {
    super.top()
    return this.arr[0]
  }
  // O(n)
  pop() {
    super.pop()
    this.arr.shift()
  }
}
export class BinaryHeap<T> extends DataStructure<T> {
  // convenção de nome dos nós: se u -> v (u é pai e v é filho)

  /**
   * se eu quero maximizar, cmp(1, 2) deve retornar false, por exemplo
   * se eu quero minimizar, cmp(1, 2) deve retornar true, por exemplo
   */
  constructor(private cmp: Comparator<T>) {
    super()
  }

  // retorna o nó pai de v, e se v já é a raiz, retorna -1
  private parent = (v: number) => (v === 0 ? -1 : (v - 2 + (v % 2)) / 2)
  // retorna o nó filho à esquerda de u
  private leftChild = (u: number) => 2 * u + 1
  // retorna o nó filho à direita de u
  private rightChild = (u: number) => 2 * u + 2

  // re-organiza a sub-árvore enraizada pelo nó u
  private heapifyDown(u: number) {
    const { arr, cmp, leftChild, rightChild } = this

    let w = u // worst node to now
    const l = leftChild(u)
    const r = rightChild(u)

    if (l < arr.length && !cmp(arr[w], arr[l])) w = l
    if (r < arr.length && !cmp(arr[w], arr[r])) w = r

    if (w !== u) {
      [arr[w], arr[u]] = [arr[u], arr[w]] // swap
      this.heapifyDown(w)
    }
  }
  // re-organiza o caminho do nó folha v até a raiz 0
  private heapifyUp(v: number) {
    const { arr, parent, cmp } = this

    const u = parent(v)

    if (u >= 0 && !cmp(arr[u], arr[v])) {
      [arr[u], arr[v]] = [arr[v], arr[u]] // swap
      this.heapifyUp(u)
    }
  }

  // O(log(n))
  push(item: T) {
    this.arr.push(item) // increase arr length
    this.heapifyUp(this.arr.length - 1)
  }
  // O(1)
  top() {
    super.top()
    return this.arr[0]
  }
  // O(log(n))
  pop() {
    super.pop()
    const last = this.arr.pop() // decrease arr length
    if (last) this.arr[0] = last // overwrite root
    this.heapifyDown(0)
  }
}
