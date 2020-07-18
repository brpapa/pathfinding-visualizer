import { UpdatesLinkedList } from '../types'
import { AgentState } from './../../types'

export function convertToUpdatesLinkedList(
  visited: AgentState[][],
  solution: AgentState[][]
) {
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
