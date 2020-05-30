import { NodeFrontier, DataStructure, FrontierParams } from '../../types'
import { Stack, Queue, BinaryHeap } from '../../data-structures'
import { heuristics } from './heuristics'

/**
 * estruturas de dados que dita a ordem de visitação dos nós durante a busca,
 * pode ter ou não acesso à informações específicas do problema (start, goal)
 */
export class Frontier {
  constructor(
    private ds: DataStructure<NodeFrontier> // ds: instância de uma DataStructure, pois ela precisa ser intância fora dessa classe, já que existem estruturas com construtores diferentes
  ) {}

  add(item: NodeFrontier): void {
    this.ds.push(item)
  }
  next(): NodeFrontier | undefined {
    return this.ds.top()
  }
  remove(): void {
    this.ds.pop()
  }
  empty(): boolean {
    return this.ds.empty()
  }
}

/**
 * factories para cada tipo de busca
 */
export const createFrontierFor = {
  'depth-first': ({}: FrontierParams) => {
    return new Frontier(new Stack<NodeFrontier>())
  },
  'breadth-first': ({}: FrontierParams) => {
    return new Frontier(new Queue<NodeFrontier>())
  },
  // TODO: testar
  'greedy best-first': ({ goal }: FrontierParams) => {
    if (!goal) throw Error('goal must be defined')

    const h = heuristics['manhattan-distance']
    const f = (node: NodeFrontier) => h(node.state, goal)

    return new Frontier(new BinaryHeap<NodeFrontier>((a, b) => f(a) < f(b)))
  },
  // TODO: testar
  'a-star': ({ goal }: FrontierParams) => {
    if (!goal) throw Error('goal must be defined')

    const h = heuristics['manhattan-distance']
    const f = (node: NodeFrontier) => node.cost + h(node.state, goal)

    return new Frontier(new BinaryHeap<NodeFrontier>((a, b) => f(a) < f(b)))
  },
}

export type SearchAlgoNames = keyof typeof createFrontierFor
