import React, { useRef, useReducer, useEffect, FC } from 'react'

import { UpdatesLinkedList } from '../types'

import reducer from './reducer'
import {
  getInitialState,
  initialGrid,
  initialSearchAlgo,
  initialDelay,
} from './config'
import { convertToUpdatesLinkedList } from './utils'

import PathfinderForm from '../pathfinder-form'
import Grid from '../grid'

import { createSearcher } from '../../algorithms/searcher'
import { generatePattern } from '../../algorithms/pattern-generator'
import useInterval from '../../hooks/useInterval'
import useLocalStorage from '../../hooks/useLocalStorage'
import Button from '../../ui/button'

import { DispatchContext } from './../contexts'

const Pathfinder: FC = () => {
  // main state
  const [state, dispatch] = useReducer(reducer, getInitialState(initialGrid))

  // form state (inputted by user)
  const [grid, setGrid] = useLocalStorage('grid', initialGrid)
  const [searchAlgo, setSearchAlgo] = useLocalStorage(
    'search-algo',
    initialSearchAlgo
  )
  // const [pattern, setPattern] = useLocalStorage('maze', initialMazeAlgo)
  const [delay, setDelay] = useLocalStorage('delay', initialDelay)

  const solution = useRef({ qtyVisited: 0, cost: 0 })
  const pendingUpdate = useRef<UpdatesLinkedList>(null)

  // execute the callback function while isUpdating and pendingUpdate.current !== null
  useInterval(
    () => {
      const update = pendingUpdate.current
      if (update === null) {
        dispatch({ type: 'stop' })
        return
      }

      dispatch({
        type: 'update',
        payload: update,
      })
      pendingUpdate.current = update.next
    },
    state.isUpdating ? delay : null
  )

  // reset after a grid change
  useEffect(() => {
    dispatch({ type: 'reset', payload: { grid } })
  }, [grid])

  function handleSearchStart() {
    dispatch({ type: 'clear' })
    dispatch({ type: 'continue' })

    const searcher = createSearcher(grid, searchAlgo, state.gridItems)
    const res = searcher.solve(state.source, state.target)

    // yes, overwrite previous solution.current and pendingUpdate.current
    pendingUpdate.current = convertToUpdatesLinkedList(
      res.history,
      res.solution
    )
    solution.current = {
      qtyVisited: res.history.reduce((acc, curr) => acc + curr.length, 0),
      cost: res.solution.reduce((acc, curr) => acc + curr.length, 0),
    }
  }

  // FIXME: grid square com basic random pattern ta travando
  function handlePatternGenerate() {
    const gridItems = generatePattern(
      grid,
      'perfect-maze-recursive-backtracking',
      state.gridItems.length,
      state.gridItems[0].length
    )
    dispatch({ type: 'set', payload: { gridItems } })
  }

  return (
    <>
      <Button label={'Pattern'} onClick={handlePatternGenerate} />
      <DispatchContext.Provider value={{ dispatch }}>
        <PathfinderForm
          grid={[grid, setGrid]}
          searchAlgo={[searchAlgo, setSearchAlgo]}
          delay={[delay, setDelay]}
          availButton={state.availButton}
          onStart={handleSearchStart}
        />
        <Grid
          type={grid}
          items={state.gridItems}
          source={state.source}
          target={state.target}
        />
      </DispatchContext.Provider>
      {
        // TODO: exibir notificacao no canto da tela por alguns segundos
        /* <p style={{ margin: '0 auto 13px auto', width: 'fit-content' }}>
        {
          // prettier-ignore
          !isUpdating && pendingUpdate.current === null
            ? `visited nodes: ${solution.current.qtyVisited}, solution cost: ${solution.current.cost}`
            : 'searching...'
        }
      </p> */
      }
    </>
  )
}

export default Pathfinder
