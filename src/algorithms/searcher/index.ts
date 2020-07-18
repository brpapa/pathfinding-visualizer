import { getCreateFrontier } from './frontiers'
import { createNeighbors } from './../utils/neighbors'
import { createVisited } from './../utils/visited'
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

export function createSearcher(
  grid: GridTypeNames,
  algo: SearchAlgoNames,
  gridItems: GridItemStatus[][] // o grid item que não for 'wall' é considerado comolivre pra visitar
) {
  const X = gridItems.length,
    Y = gridItems[0].length

  const createFrontier = getCreateFrontier(algo)
  const visited = createVisited(X, Y)

  const neighbors = createNeighbors(
    grid,
    gridItems.map((items) => items.map((item) => item !== 'wall'))
  )

  return new Searcher(createFrontier, visited, neighbors)
}

class Searcher {
  // paremeter property: declara como propriedade da classe e já a inicializa com o valor recebido
  constructor(
    private createFrontier: (info: FrontierParams) => TFrontier, // função que retorna uma instância de Frontier, pois ele precisa ser instanciado dentro do método this.solve()
    private visited: TVisited,
    private neighbors: TNeighbors
  ) {}

  private recover(lastNode: NodeFrontier) {
    const path: NodeFrontier[] = []

    for (let curr = lastNode; curr; curr = curr.parent) path.push(curr)
    return path.reverse()
  }

  // retorna um array 2d arr, onde arr[l] é um array com todos os agentState visitados no nível l
  private aggregateByLevel(nodes: NodeFrontier[]) {
    const lastNode = nodes[nodes.length - 1]
    const len = lastNode ? lastNode.cost + 1 : 0

    const arr2D: AgentState[][] = [...Array(len)].map(() => [])
    for (const node of nodes)
      arr2D[node!.cost]?.push(node!.state)
    return arr2D
  }

  public solve(source: AgentState, target: AgentState) {
    const { createFrontier, visited, neighbors, recover } = this

    const history: NodeFrontier[] = []
    let solution: NodeFrontier[] = []

    const frontier = createFrontier({ source, target })
    frontier.add({ state: source, cost: 0 })

    visited.reset()

    // searching loop
    for (let currNode = frontier.next(); currNode; currNode = frontier.next()) {
      frontier.remove()
      if (visited.has(currNode.state)) continue

      // current node from frontier
      visited.add(currNode.state)
      history.push(currNode)

      // check if it's solution and recover it
      if (JSON.stringify(currNode.state) === JSON.stringify(target)) {
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
      history: this.aggregateByLevel(history),
      solution: this.aggregateByLevel(solution),
    }
  }
}

export type TSearcher = Searcher
