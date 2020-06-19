export { createNeighbors } from './neighbors'
export type { TNeighbors } from './neighbors'

export { createVisited } from './visited'
export type { TVisited } from './visited'

/**
 * compara se os objetos a e b são iguais em valor
 * obs: ordem das chaves do objeto importa!
 */
export function isEqual(a: Object, b: Object) {
  return JSON.stringify(a) === JSON.stringify(b)
}
