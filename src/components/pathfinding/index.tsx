// TODO: wall (segurar clicado)
// TODO: drag and drop em startNode and goalNode

import React, { FC, useState, useEffect } from 'react'

import { createSearcher } from '../../algorithms'
import {
  StatusGridItem,
  AgentState,
  SearchAlgoNames,
  GridTypeNames,
} from '../../renderers/types'
import { GRID_ITEM } from '../../renderers/constants'
import { GridContainer } from '../../renderers'
import { GridItem } from '../../renderers/grid-item'
import { data } from './data'

export const Pathfinding: FC<{}> = () => {
  const [grid, setGrid] = useState<GridTypeNames>('square')
  const [startNode] = useState<AgentState>({ x: 0, y: 0 })
  const [goalNode] = useState<AgentState>(GRID_ITEM[grid].max_id)
  const [timer] = useState(50)
  const [searchAlgo, setSearchAlgo] = useState<SearchAlgoNames>('breadth-first')
  const [gridItems, setGridItems] = useState<StatusGridItem[][]>(
    initialGridItems()
  )

  // retorna gridItems[x][y], onde (x, y) está em [(0, 0) .. max], inclusive
  function initialGridItems(): StatusGridItem[][] {
    const { x, y } = GRID_ITEM[grid].max_id

    const items = [...Array(x + 1)].map(() => Array(y + 1).fill('unvisited'))
    items[startNode.x][startNode.y] = 'start'
    items[goalNode.x][goalNode.y] = 'goal'

    return items
  }

  function updateGridItems(
    statesByLevel: AgentState[][],
    status: StatusGridItem
  ) {
    return new Promise<void>((resolve) => {
      let lvl = 0
      const interval = setInterval(() => {
        setGridItems(() => {
          const states = statesByLevel[lvl]

          if (++lvl === statesByLevel.length) {
            clearInterval(interval)
            resolve()
          }

          const newGridItems = [...gridItems]
          for (const { x, y } of states) newGridItems[x][y] = status
          return newGridItems
        })
      }, timer)
    })
  }

  const onVisualize = async () => {
    const searcher = createSearcher(grid, searchAlgo, gridItems)
    const ans = searcher.solve(startNode, goalNode)
    if (ans.solution) {
      await updateGridItems(ans.history, 'visited')
      await updateGridItems(ans.solution, 'solution')
    } else console.warn('no solution')
  }
  const onReset = () => {
    setGridItems(initialGridItems())
  }
  // FIXME
  const onToggleGrid = () => {
    onReset()
    setGrid(grid === 'triangle' ? 'square' : 'triangle')
  }
  // TODO: melhorar, mas nao sei como, pois os tipos nao existem em runtime
  const onChangeSearchAlgo = (algo: string) => {
    if (
      algo === 'breadth-first' ||
      algo === 'depth-first' ||
      algo === 'greedy best-first' ||
      algo === 'a-star'
    )
      setSearchAlgo(algo)
  }

  // DOING
  const onToggleGridItem = (idItem: AgentState) => {
    const { x, y } = idItem
    setGridItems(() => {
      const newGridItems = [...gridItems]
      newGridItems[x][y] =
        gridItems[x][y] === 'unvisitable' ? 'unvisited' : 'unvisitable'
      return newGridItems
    })
  }

  return (
    <>
      <section>
        <button onClick={onVisualize}>Visualize!</button>
        <button onClick={onToggleGrid}>Toggle grid</button>
        <button onClick={onReset}>Reset</button>
        <select
          value={searchAlgo}
          onChange={(e) => onChangeSearchAlgo(e.target.value)}
          placeholder='pick a search search algorithm'
        >
          <option value='depth-first'>depth-first search</option>
          <option value='breadth-first'>breadth-first search</option>
          <option value='greedy best-first'>greedy best-first search</option>
          <option value='a-star'>a* search</option>
        </select>
      </section>
      <GridContainer>
        {gridItems.map((items, x) =>
          items.map((item, y) => (
            <GridItem
              key={`${x},${y}`}
              grid={grid}
              id={{ x, y }}
              status={item}
              onToggle={onToggleGridItem}
            />
          ))
        )}
      </GridContainer>
    </>
  )
}
