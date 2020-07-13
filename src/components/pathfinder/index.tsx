import React, { useState, useRef, useReducer, useEffect } from 'react'

import { UpdatesLinkedList } from './types'
import { SearchAlgoNames, GridItemStatus } from '../../types'
import { GridTypeNames } from '../../algorithms/types'

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

import { Grid } from '../grid'

import { createSearcher } from '../../algorithms/searcher'
import { useInterval } from '../../hooks'

import { InputRange as Range } from '../../ui/input-range'
import { InputButton as Button } from '../../ui/input-button'
import { InputSelect as Select } from '../../ui/input-select'
import { InputGroup as Group } from '../../ui/input-group'

import { Tabs, Tab } from './../../ui/tabs'
import { ReactComponent as TriangleIcon } from './../../assets/icons/triangle.svg'
import { ReactComponent as TriangleOutlineIcon } from './../../assets/icons/triangle-outline.svg'
import { ReactComponent as SquareIcon } from './../../assets/icons/square.svg'
import { ReactComponent as SquareOutlineIcon } from './../../assets/icons/square-outline.svg'

export default () => {
  // main state
  const [state, dispath] = useReducer(reducer, getInitialState(initialGrid))

  // states inputed by user
  const [grid, setGrid] = useState(initialGrid)
  const [searchAlgo, setSearchAlgo] = useState(initialSearchAlgo)
  const [delay, setDelay] = useState(initialDelay)

  const solution = useRef({ qtyVisited: 0, cost: 0 })
  const pendingUpdate = useRef<UpdatesLinkedList>(null)

  // executa a cb enquanto isUpdating e pendingUpdate.current !== null
  useInterval(
    () => {
      const update = pendingUpdate.current
      if (update === null) {
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

  // reseta após o grid mudar
  useEffect(() => {
    dispath({ type: 'reset', payload: { grid } })
  }, [grid])

  function handleStart() {
    dispath({ type: 'clear' })
    dispath({ type: 'continue' })

    const searcher = createSearcher(grid, searchAlgo, state.gridItems)
    const ans = searcher.solve(state.source, state.target)

    // sobrescreve solution/pendingUpdate anteriores, se houver
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
    <div>
      {/* TODO: separar o formulario em um componente separado */}
      <form
        className='container'
        style={{ paddingTop: '8px', paddingBottom: '14px' }}
        onSubmit={(e) => e.preventDefault()}
      >
        <Tabs
          defaultValue={grid}
          onChange={(value) => setGrid(value as GridTypeNames)}
        >
          <Tab
            value='triangle'
            Icon={<TriangleIcon width={26} />}
            SelectedIcon={<TriangleOutlineIcon width={26} />}
          />
          <Tab
            value='square'
            Icon={<SquareIcon width={26} />}
            SelectedIcon={<SquareOutlineIcon width={26} />}
          />
        </Tabs>
        <Group>
          <Select
            defaultValue={searchAlgo}
            title='pick a search algorithm'
            onChange={(e) => setSearchAlgo(e.target.value as SearchAlgoNames)}
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
        <Range
          {...delayConfig}
          value={delay}
          label='delay'
          onChange={(e) => setDelay(Number(e.target.value))}
        />
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
