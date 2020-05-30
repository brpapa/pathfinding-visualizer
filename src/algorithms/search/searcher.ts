import {
  AgentState,
  NodeFrontier,
  Frontier,
  TNeighbors,
  TVisited,
  FrontierParams,
} from '../types'
import { isEqual } from './utils'

export class Searcher {
  // paremeter property: declara como propriedade da classe e já a inicializa com o valor recebido
  constructor(
    private createFrontier: (info: FrontierParams) => Frontier, // função que retorna uma instância de Frontier, pois ele precisa ser instanciado dentro do método this.solve()
    private visited: TVisited,
    private neighbors: TNeighbors
  ) {}

  private recover(lastNode: NodeFrontier) {
    const path: NodeFrontier[] = []
    for (let curr = lastNode; curr.parent; curr = curr.parent) path.push(curr)
    return path.reverse()
  }

  /**
   * retorna um array 2d arr, onde arr[l] é um array com todos os agentState visitados no nível l
   */
  private agreggatedByLevel(nodes: NodeFrontier[]) {
    if (!nodes) return []

    let arr: AgentState[][] = [
      ...Array(nodes[nodes.length - 1].cost + 1),
    ].map(() => [])

    for (const node of nodes)
      arr[node.cost].push(node.state)

    return arr
  }

  public solve(start: AgentState, goal: AgentState) {
    const { createFrontier, visited, neighbors, recover } = this

    let history: NodeFrontier[] = []
    let solution: NodeFrontier[] = []
    visited.reset()

    const frontier = createFrontier({ start, goal })
    frontier.add({ state: start, cost: 0 })

    // searching loop
    for (let node = frontier.next(); node; node = frontier.next()) {
      frontier.remove()
      if (visited.has(node.state)) continue

      // current node from frontier
      visited.add(node.state)
      history.push(node)

      // check if it's solution and recover it
      if (isEqual(node.state, goal)) {
        solution = recover(node)
        break
      }

      // add child nodes to frontier
      for (var state of neighbors(node.state))
        if (!visited.has(state)) {
          frontier.add({
            state: state,
            parent: node,
            cost: node.cost + 1, // = level
          })
        }
    }

    return {
      history: this.agreggatedByLevel(history),
      solution: this.agreggatedByLevel(solution),
    }
  }
}
