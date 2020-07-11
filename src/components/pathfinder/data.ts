import { SearchAlgoNames } from '../../types'

// informed searches: usam algum conhecimento específico do problema, no caso as coordenadas do nó atual e do nó objetivo
// heuristica: uma funcao que ESTIMA o melhor caminho até o objetivo

const data: {
  [K in SearchAlgoNames]: {
    name: string
    category: string
    description: string
    solutionIsOptimal: boolean
  }
} = {
  'depth-first': {
    name: 'depth-first search',
    category: 'uninformed search',
    description: '',
    solutionIsOptimal: false,
  },
  'breadth-first': {
    name: 'breadth-first search',
    category: 'uninformed search',
    description: '',
    solutionIsOptimal: true,
  },
  'greedy best-first': {
    name: 'greedy best-first search',
    category: 'informed search',
    description:
      'visita primeiro aquele nó n que com a menor h(n), sendo h(n) a manhattan distance entre n e o nó objetivo',
    solutionIsOptimal: false,
  },
  'a-star': {
    name: 'a* search',
    category: 'informed search',
    description:
      'visita primeiro aquele nó com menor g(n)+h(n), sendo g(n) o custo (nível) do nó n em relação ao nó origem e, h(n), a manhattan distance entre n e o nó objetivo',
    solutionIsOptimal: true,
  },
}

export default data