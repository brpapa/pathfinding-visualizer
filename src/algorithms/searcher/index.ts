import { getCreateFrontier } from './frontiers'
import { createNeighbors, createVisited, isEqual } from './utils'
import { GridItemStatus } from './../../types'
import {
  AgentState,
  SearchAlgoNames,
  GridTypeNames,
  NodeFrontier,
  TFrontier,
  TNeighbors,
  TVisited,
  FrontierParams,
} from './../types'

class Searcher {
  // paremeter property: declara como propriedade da classe e já a inicializa com o valor recebido
  constructor(
    private createFrontier: (info: FrontierParams) => TFrontier, // função que retorna uma instância de Frontier, pois ele precisa ser instanciado dentro do método this.solve()
    private visited: TVisited,
    private neighbors: TNeighbors
  ) {}

  private recover(lastNode: NodeFrontier) {
    const path: NodeFrontier[] = []
    for (let curr = lastNode; curr.parent; curr = curr.parent) path.push(curr)
    return path.reverse()
  }

  // retorna um array 2d arr, onde arr[l] é um array com todos os agentState visitados no nível l
  private agreggatedByLevel(nodes: NodeFrontier[]) {
    const last = nodes[nodes.length - 1]
    const len = last ? last.cost : 0

    const arr: AgentState[][] = [...Array(len)].map(() => [])
    for (const node of nodes) arr[node.cost - 1]?.push(node.state)

    return arr
  }

  public solve(source: AgentState, target: AgentState) {
    const { createFrontier, visited, neighbors, recover } = this

    visited.reset()
    const history: NodeFrontier[] = []
    let solution: NodeFrontier[] = []

    const frontier = createFrontier({ source, target })
    frontier.add({ state: source, cost: 0 })

    // searching loop
    for (let currNode = frontier.next(); currNode; currNode = frontier.next()) {
      frontier.remove()
      if (visited.has(currNode.state)) continue

      // current node from frontier
      visited.add(currNode.state)
      history.push(currNode)

      // check if it's solution and recover it
      if (isEqual(currNode.state, target)) {
        solution = recover(currNode)
        break
      }

      // add child nodes to frontier, currNode -> childNode
      for (const childState of neighbors(currNode.state))
        if (!visited.has(childState)) {
          const childNode = {
            state: childState,
            parent: currNode,
            cost: currNode.cost + 1, // = level
          }
          frontier.add(childNode)
        }
    }

    return {
      history: this.agreggatedByLevel(history.slice(1)), // não considera o nó source
      solution: this.agreggatedByLevel(solution),
    }
  }
}

// factory que instancia Searcher
export function createSearcher(
  grid: GridTypeNames,
  searchAlgo: SearchAlgoNames,
  gridItems: GridItemStatus[][] // entende que apenas se não for 'wall' é livre pra visitar
) {
  const createFrontier = getCreateFrontier(searchAlgo)
  const visited = createVisited(gridItems.length, gridItems[0].length)

  const neighbors = createNeighbors(
    grid,
    gridItems.map((items) => items.map((item) => item !== 'wall'))
  )

  return new Searcher(createFrontier, visited, neighbors)
}

export type TSearcher = Searcher
