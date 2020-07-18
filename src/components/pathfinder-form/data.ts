import { SearchAlgoNames } from '../../types'

// informed searches: usam algum conhecimento específico do problema, no caso as coordenadas do nó atual e do nó objetivo
// heuristica: uma funcao que ESTIMA o melhor caminho até o objetivo

/* patterns */
// perfect maze: só tem um único caminho entre quaisquer dois nós (ai nao da p/ mostrar as diferencas entre os algoritmos :/)

/* search algos */
const data: {
  [K in SearchAlgoNames]: {
    name: string
    category: string
    description: string
    solutionIsOptimal: boolean
  }
} = {
  'depth-first': {
    name: 'Depth-First Search',
    category: 'Uninformed Search',
    description: '',
    solutionIsOptimal: false,
  },
  'breadth-first': {
    name: 'Breadth-First Search',
    category: 'Uninformed Search',
    description: '',
    solutionIsOptimal: true,
  },
  'greedy-best-first': {
    name: 'Greedy Best-First Search',
    category: 'Informed Search',
    description:
      'visita primeiro aquele nó n que com a menor h(n), sendo h(n) a manhattan distance entre n e o nó objetivo',
    solutionIsOptimal: false,
  },
  'a-star': {
    name: 'A* Search',
    category: 'Informed Search',
    description:
      'visita primeiro aquele nó com menor g(n)+h(n), sendo g(n) o custo (nível) do nó n em relação ao nó origem e, h(n), a manhattan distance entre n e o nó objetivo',
    solutionIsOptimal: true,
  },
}

export default data