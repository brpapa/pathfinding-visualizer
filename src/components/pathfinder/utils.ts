import { UpdatesLinkedList } from './types'
import { AgentState } from './../../types'

// TODO: não incluir o state que é o próprio target, tanto em visited como em solution
export const convertToUpdatesLinkedList = (
  visited: AgentState[][],
  solution: AgentState[][]
): UpdatesLinkedList => {
  if (visited.length === 0) return null

  let tail: UpdatesLinkedList = {
    agentStates: visited[0],
    newStatus: 'visited',
    next: null,
  }

  const head = tail // guarda o nó inicial

  for (const agentStates of visited) {
    tail.next = { agentStates, newStatus: 'visited', next: null }
    tail = tail.next
  }

  tail.next = {
    agentStates: solution.reduce((acc, curr) => acc.concat(curr), []), // achata array em 1 nível (flat)
    newStatus: 'solution',
    next: null,
  }

  return head
}