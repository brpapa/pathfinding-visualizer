import { SearchAlgoNames } from '../../algorithms/types'

// informed searches: usam algum conhecimento específico do problema, no caso as coordenadas do nó atual e do nó objetivo
// heuristica: uma funcao que ESTIMA o melhor caminho até o objetivo

export const data: { [K in SearchAlgoNames]: any } = {
  'depth-first': {
    category: 'uninformed search',
    desc: '',
    solutionIsOptimal: false,
  },
  'breadth-first': {
    category: 'uninformed search',
    desc: '',
    solutionIsOptimal: true,
  },
  'greedy best-first': {
    category: 'informed search',
    desc:
      'visita primeiro aquele nó n que com a menor h(n), sendo h(n) a manhattan distance entre n e o nó objetivo',
    solutionIsOptimal: false,
  },
  'a-star': {
    category: 'informed search',
    desc:
      'visita primeiro aquele nó com menor g(n)+h(n), sendo g(n) o custo (nível) do nó n em relação ao nó origem e, h(n), a manhattan distance entre n e o nó objetivo',
    solutionIsOptimal: true,
  },
}
