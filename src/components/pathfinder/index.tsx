import React, { useState, useRef, useReducer, useEffect } from 'react'

import { UpdatesLinkedList } from './types'

import data from './data'
import reducer from './reducer'
import {
  getInitialState,
  initialGrid,
  initialSearchAlgo,
  initialDelay,
  delayConfig,
} from './config'
import { convertToUpdatesLinkedList } from './utils'

import { createSearcher } from '../../algorithms/searcher'
import { useInterval } from '../../hooks'

import { Grid } from '../grid'
import { InputRange as Range } from '../../ui/input-range'
import { InputButton as Button } from '../../ui/input-button'
import { InputSelect as Select } from '../../ui/input-select'
import { InputGroup as Group } from '../../ui/input-group'

export const Pathfinder = () => {
  // state principal
  const [state, dispath] = useReducer(reducer, getInitialState(initialGrid))

  // states do form
  const [grid, setGrid] = useState(initialGrid)
  const [searchAlgo, setSearchAlgo] = useState(initialSearchAlgo)
  const [delay, setDelay] = useState(initialDelay)

  const solution = useRef({ qtyVisited: 0, cost: 0 })
  const pendingUpdate = useRef<UpdatesLinkedList>(null)

  useInterval(
    () => {
      const update = pendingUpdate.current
      if (!update) {
        dispath({ type: 'stop' })
        return
      }
      dispath({
        type: 'update-grid-items',
        payload: update,
      })
      pendingUpdate.current = update.next
    },
    state.isUpdating ? delay : null
  )

  useEffect(() => {
    dispath({ type: 'reset', payload: { grid } })
  }, [grid])

  function handleStart() {
    dispath({ type: 'clear' })
    dispath({ type: 'continue' })

    const searcher = createSearcher(grid, searchAlgo, state.gridItems)
    const ans = searcher.solve(state.source, state.target)

    solution.current = {
      qtyVisited: ans.history.reduce((acc, curr) => acc + curr.length, 0),
      cost: ans.solution.reduce((acc, curr) => acc + curr.length, 0),
    }
    // sobrescreve pendencias anteriores, se houver
    pendingUpdate.current = convertToUpdatesLinkedList(
      ans.history,
      ans.solution
    )
  }

  return (
    <div>
      {/* TODO: desabilitar o input change-grid enquando estiver atualizando */}
      <form
        className='container'
        style={{ paddingTop: '8px', paddingBottom: '14px' }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='row align-items-center'>
          <div className='col-md-auto'>
            {/* TODO: mudar para um grupo de botoes radio, rotulados com icones de triangulo e um quadrado, https://codepen.io/brnpapa/pen/xxZwPgE, https://v5.getbootstrap.com/docs/5.0/forms/checks/#radio-toggle-buttons, https://icons.getbootstrap.com/icons/triangle-fill/, https://icons.getbootstrap.com/icons/triangle-half/, https://icons.getbootstrap.com/icons/triangle/, https://icons.getbootstrap.com/icons/square-fill/, https://icons.getbootstrap.com/icons/square-half/, https://icons.getbootstrap.com/icons/square/ */}
            <Button
              label='Change grid'
              title={`Change to another grid`}
              onClick={() =>
                setGrid((prev) => (prev === 'triangle' ? 'square' : 'triangle'))
              }
            />
          </div>
          <div className='col'>
            <Group>
              <Select
                defaultValue={searchAlgo}
                title='pick a search algorithm'
                onChange={(e) => {
                  const searchAlgo = e.target.value
                  // TODO: melhorar, mas nao sei como, pois os tipos nao existem em runtime
                  if (
                    searchAlgo === 'breadth-first' ||
                    searchAlgo === 'depth-first' ||
                    searchAlgo === 'greedy best-first' ||
                    searchAlgo === 'a-star'
                  )
                    setSearchAlgo(searchAlgo)
                }}
                options={Object.entries(data).map(([key, value]) => [
                  key,
                  value.name,
                ])}
              />
              {state.availButton === 'start' && (
                <Button primary label='start' onClick={handleStart} />
              )}
              {state.availButton === 'continue' && (
                <Button
                  primary
                  label='continue'
                  onClick={() => dispath({ type: 'continue' })}
                />
              )}
              {state.availButton === 'pause' && (
                <Button
                  primary
                  label='pause'
                  onClick={() => dispath({ type: 'pause' })}
                />
              )}
            </Group>
          </div>
          <div className='col-md-auto'>
            <Range
              {...delayConfig}
              value={delay}
              label='delay'
              onChange={(e) => setDelay(Number(e.target.value))}
            />
          </div>
          <div className='col-md-auto'>
            <Group>
              <Button
                label='Reset'
                title='Clear all nodes, except the source and target'
                onClick={() => dispath({ type: 'reset', payload: { grid } })}
              />
              <Button
                label='Clear'
                title='Clear all nodes, except walls, source and target'
                onClick={() => dispath({ type: 'clear' })}
              />
            </Group>
          </div>
        </div>
      </form>
      <Grid
        type={grid}
        items={state.gridItems}
        onToggleGridItem={(id) =>
          dispath({
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
    </div>
  )
}
