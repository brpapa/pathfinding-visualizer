import React, { useState, useRef, useReducer, useEffect } from 'react'

import { UpdatesLinkedList } from '../types'

import reducer from './reducer'
import {
  getInitialState,
  initialGrid,
  initialSearchAlgo,
  initialDelay
} from './config'
import { convertToUpdatesLinkedList } from './utils'

import Form from '../form'
import Grid from '../grid'

import { createSearcher } from '../../algorithms/searcher'
import { useInterval } from '../../hooks'

export default () => {
  // main state
  const [state, dispatch] = useReducer(reducer, getInitialState(initialGrid))

  // form state (inputted by user)
  const [grid, setGrid] = useState(initialGrid)
  const [searchAlgo, setSearchAlgo] = useState(initialSearchAlgo)
  const [delay, setDelay] = useState(initialDelay)

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
        type: 'update-grid-items',
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

  function handleStart() {
    dispatch({ type: 'clear' })
    dispatch({ type: 'continue' })

    const searcher = createSearcher(grid, searchAlgo, state.gridItems)
    const ans = searcher.solve(state.source, state.target)

    // yes, overwrite previous solution/pendingUpdate
    solution.current = {
      qtyVisited: ans.history.reduce((acc, curr) => acc + curr.length, 0),
      cost: ans.solution.reduce((acc, curr) => acc + curr.length, 0),
    }
    pendingUpdate.current = convertToUpdatesLinkedList(
      ans.history,
      ans.solution
    )
  }

  return (
    <>
      <Form
        grid={[grid, setGrid]}
        searchAlgo={[searchAlgo, setSearchAlgo]}
        delay={[delay, setDelay]}
        
        availButton={state.availButton}
        dispatch={dispatch}
        onStart={handleStart}
      />
      <Grid
        type={grid}
        items={state.gridItems}
        //TODO passar dispatch como context
        onToggleGridItem={(id) =>
          dispatch({
            type: 'toggle-grid-item',
            payload: { id },
          })
        }
      />
      {
        // TODO: exibir notificacao por alguns segundos
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
