import { Searcher } from './searcher'
import { createFrontierFor } from './frontiers'
import { createNeighbors, createVisited } from './utils'
import { SearchAlgoNames, GridTypeNames } from './../types'
import { StatusGridItem } from '../../renderers/types'

// factory que instancia Searcher
export function createSearcher(
  grid: GridTypeNames,
  searchAlgo: SearchAlgoNames,
  gridItems: StatusGridItem[][]
) {
  const createFrontier = createFrontierFor[searchAlgo]
  const visited = createVisited(gridItems.length, gridItems[0].length)

  const neighbors = createNeighbors(
    gridItems.map((items) => items.map((item) => item !== 'unvisitable'))
  )[grid]

  return new Searcher(createFrontier, visited, neighbors)
}

export type TSearcher = Searcher
