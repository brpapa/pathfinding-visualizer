import React, { useState, useRef } from 'react'

import { StatusGridItem, AgentState } from '../../types'

import * as Utils from './utils'
import * as Config from './config'
import { data } from './data'
import { createSearcher } from '../../algorithms/searcher'
import { useInterval } from './../../hooks'

import { Grid } from '../grid'
import { InputRange } from './../../components/input-range'
import { InputButton } from './../../components/input-button'
import { InputSelect } from './../../components/input-select'
import { InputGroup } from './../../components/input-group'

type UpdatesLinkedList = {
  states: AgentState[] // de um mesmo nível
  status: StatusGridItem
  next: UpdatesLinkedList
} | null

// TODO: refatorar com useReducer? https://pt-br.reactjs.org/docs/hooks-reference.html#usereducer
export const Pathfinder = () => {
  const [grid, setGrid] = useState(Config.defaultGrid)
  const [source, setSource] = useState(Utils.sourceState())
  const [target, setTarget] = useState(Utils.targetState(Config.defaultGrid))
  const [searchAlgo, setSearchAlgo] = useState(Config.defaultSearchAlgo)
  const [delay, setDelay] = useState(Config.defaultDelay)
  const [gridItems, setGridItems] = useState(
    Utils.createInitGridItems(
      Config.defaultGrid,
      Utils.sourceState(),
      Utils.targetState(Config.defaultGrid)
    )
  )
  const [isUpdating, setIsUpdating] = useState(false)

  const solution = useRef({ qtyVisited: 0, cost: 0 })
  const pendingUpdate = useRef<UpdatesLinkedList>(null)

  useInterval(
    () => {
      const update = pendingUpdate.current
      if (!update) {
        setIsUpdating(false)
        return
      }
      setGridItems(Utils.createUpdateGridItems(update.states, update.status))
      pendingUpdate.current = update.next
    },
    isUpdating ? delay : null
  )

  async function handleStart() {
    await setGridItems(Utils.clearGridItems)

    const searcher = createSearcher(grid, searchAlgo, gridItems)
    const ans = searcher.solve(source, target)

    solution.current = {
      qtyVisited: ans.history.reduce((acc, curr) => acc + curr.length, 0),
      cost: ans.solution.reduce((acc, curr) => acc + curr.length, 0),
    }
    pendingUpdate.current = convertToUpdatesLinkedList(
      ans.history,
      ans.solution
    )
    setIsUpdating(true)
  }
  function handlePause() {
    setIsUpdating(false)
  }
  function handleContinue() {
    setIsUpdating(true)
  }
  function handleReset() {
    pendingUpdate.current = null
    setIsUpdating(false)
    setGridItems(Utils.createInitGridItems(grid, source, target))
  }
  function handleClear() {
    pendingUpdate.current = null
    setIsUpdating(false)
    setGridItems(Utils.clearGridItems)
  }
  function handleChangeGrid() {
    const newGrid = Utils.toggleGrid(grid)
    const newSource = Utils.sourceState()
    const newTarget = Utils.targetState(newGrid)

    pendingUpdate.current = null
    setIsUpdating(false)
    setGrid(newGrid)
    setSource(newSource)
    setTarget(newTarget)
    setGridItems(Utils.createInitGridItems(newGrid, newSource, newTarget))
  }
  function handleChangeSearchAlgo(event: React.ChangeEvent<HTMLSelectElement>) {
    const algo = event.target.value
    // TODO: melhorar, mas nao sei como, pois os tipos nao existem em runtime
    if (
      algo === 'breadth-first' ||
      algo === 'depth-first' ||
      algo === 'greedy best-first' ||
      algo === 'a-star'
    )
      setSearchAlgo(algo)
  }
  function handleChangeDelay(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setDelay(Number(value))
  }
  function handleToggleGridItem(id: AgentState) {
    if (pendingUpdate.current !== null) return
    setGridItems(Utils.createToggleGridItem(id))
  }

  return (
    <>
      <form
        className='container'
        style={{ paddingTop: '8px', paddingBottom: '14px' }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='row align-items-center'>
          <div className='col-md-auto'>
            <InputButton // TODO: mudar para radio group, como em https://codepen.io/brnpapa/pen/xxZwPgE, https://v5.getbootstrap.com/docs/5.0/forms/checks/#radio-toggle-buttons
              label='Change grid'
              title={`Change to ${Utils.toggleGrid(grid)} grid`}
              onClick={handleChangeGrid}
            />
          </div>
          <div className='col'>
            <InputGroup>
              <InputSelect
                defaultValue={Config.defaultSearchAlgo}
                title='pick a search algorithm'
                onChange={handleChangeSearchAlgo}
                // prettier-ignore
                options={Object.entries(data).map(([key, value]) => [key, value.name])}
              />
              {
                // prettier-ignore
                !isUpdating
              ? pendingUpdate.current === null
                ? <InputButton primary label='start' onClick={handleStart} />
                : <InputButton primary label='continue' onClick={handleContinue} />
              : <InputButton primary label='pause' onClick={handlePause} />
              }
            </InputGroup>
          </div>
          <div className='col-md-auto'>
            <InputRange
              value={delay}
              label='delay'
              onChange={handleChangeDelay}
              {...Config.delayConfig}
            />
          </div>
          <div className='col-md-auto'>
            <InputGroup>
              <InputButton
                label='Reset all'
                title='Clear all nodes, except the source and target'
                onClick={handleReset}
              />
              <InputButton
                label='Clear walls'
                title='Clear all nodes, except walls, source and target'
                onClick={handleClear}
              />
            </InputGroup>
          </div>
        </div>
      </form>
      {/* <p style={{ margin: '0 auto 13px auto', width: 'fit-content' }}>
        {
          // prettier-ignore
          !isUpdating && pendingUpdate.current === null
            ? `visited nodes: ${solution.current.qtyVisited}, solution cost: ${solution.current.cost}`
            : 'searching...'
        }
      </p> */}
      <Grid
        type={grid}
        items={gridItems}
        onToggleGridItem={handleToggleGridItem}
      />
    </>
  )
}

// TODO: não incluir o state que é o próprio target, tanto em visited como em solution
const convertToUpdatesLinkedList = (
  visited: AgentState[][],
  solution: AgentState[][]
): UpdatesLinkedList => {
  if (visited.length === 0) return null

  let tail: UpdatesLinkedList = {
    states: visited[0],
    status: 'visited',
    next: null,
  }

  const head = tail // guarda o nó inicial

  for (const states of visited) {
    tail.next = { states, status: 'visited', next: null }
    tail = tail.next
  }

  tail.next = {
    states: solution.reduce((acc, curr) => acc.concat(curr), []), // achata array em 1 nível (flat)
    status: 'solution',
    next: null,
  }

  return head
}
