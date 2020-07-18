import {
  NodeFrontier,
  TDataStructure,
  FrontierParams,
  SearchAlgoNames,
} from '../../types'
import { Stack, Queue, BinaryHeap } from '../../data-structures'
import { heuristics } from './heuristics'

/**
 * estrutura de dados que dita a ordem de visitação dos nós durante a busca,
 * pode ter ou não acesso à informações específicas do problema (source, target)
 */
export class Frontier {
  constructor(
    private ds: TDataStructure<NodeFrontier> // ds: instância de uma DataStructure, pois ela precisa ser intância fora dessa classe, já que existem estruturas com construtores diferentes
  ) {}

  add(item: NodeFrontier) {
    this.ds.push(item)
  }
  next() {
    return this.ds.top()
  }
  remove() {
    this.ds.pop()
  }
  empty() {
    return this.ds.empty()
  }
}

export function getCreateFrontier(searchAlgo: SearchAlgoNames) {
  const createFrontier: {
    [key in SearchAlgoNames]: (info: FrontierParams) => Frontier
  } = {
    // eslint-disable-next-line
    'depth-first': ({}) => {
      return new Frontier(new Stack<NodeFrontier>())
    },
    // eslint-disable-next-line
    'breadth-first': ({}) => {
      return new Frontier(new Queue<NodeFrontier>())
    },
    // TODO: testar
    'greedy-best-first': ({ target }) => {
      if (!target) throw Error('target must be defined')

      const h = heuristics['manhattan-distance']
      const f = (node: NodeFrontier) => h(node!.state, target)

      return new Frontier(new BinaryHeap<NodeFrontier>((a, b) => f(a) < f(b)))
    },
    // TODO: testar
    'a-star': ({ target }) => {
      if (!target) throw Error('target must be defined')

      const h = heuristics['manhattan-distance']
      const f = (node: NodeFrontier) => node!.cost + h(node!.state, target)

      return new Frontier(new BinaryHeap<NodeFrontier>((a, b) => f(a) < f(b)))
    },
  }
  return createFrontier[searchAlgo]
}
