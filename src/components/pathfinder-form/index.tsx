import React, { FC } from 'react'

import { AvailButton, Action } from './../types'
import { SearchAlgoNames } from './../../types'
import { GridTypeNames } from '../../algorithms/types'

import data from './data'

import Tabs from '../../ui/tabs'
import Button from '../../ui/button'
import { InputRange as Range } from '../../ui/input-range'
import { InputSelect as Select } from '../../ui/input-select'
import { InputGroup as Group } from '../../ui/input-group'

import { ReactComponent as TriangleIcon } from './../../assets/icons/triangle.svg'
import { ReactComponent as TriangleOutlineIcon } from './../../assets/icons/triangle-outline.svg'
import { ReactComponent as SquareIcon } from './../../assets/icons/square.svg'
import { ReactComponent as SquareOutlineIcon } from './../../assets/icons/square-outline.svg'

type StateReturn<T> = [T, (value: T) => void]

type PathfinderFormProps = {
  grid: StateReturn<GridTypeNames>
  searchAlgo: StateReturn<SearchAlgoNames>
  delay: StateReturn<number>
  availButton: AvailButton
  dispatch: React.Dispatch<Action>
  onStart: () => void
}
const PathfinderForm: FC<PathfinderFormProps> = (props) => {
  const [grid, setGrid] = props.grid
  const [searchAlgo, setSearchAlgo] = props.searchAlgo
  const [delay, setDelay] = props.delay

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ paddingTop: '8px', paddingBottom: '14px' }}
    >
      <Tabs
        defaultValue={grid}
        onChange={(value) => setGrid(value as GridTypeNames)}
      >
        <Tabs.Item
          value='triangle'
          tooltip='View on triangle grid'
          IconUnchecked={<TriangleIcon />}
          IconChecked={<TriangleOutlineIcon />}
        />
        <Tabs.Item
          value='square'
          tooltip='View on square grid'
          IconUnchecked={<SquareIcon />}
          IconChecked={<SquareOutlineIcon />}
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
        {props.availButton === 'start' && (
          <Button primary label='start' onClick={props.onStart} />
        )}
        {props.availButton === 'continue' && (
          <Button
            primary
            label='continue'
            onClick={() => props.dispatch({ type: 'continue' })}
          />
        )}
        {props.availButton === 'pause' && (
          <Button
            primary
            label='pause'
            onClick={() => props.dispatch({ type: 'pause' })}
          />
        )}
      </Group>
      <Range
        minValue={20}
        maxValue={180}
        step={40}
        value={delay}
        label='delay'
        onChange={(e) => setDelay(Number(e.target.value))}
      />
      <Group>
        <Button
          label='Reset'
          tooltip='Clear all nodes, except the source and target'
          onClick={() => props.dispatch({ type: 'reset', payload: { grid } })}
        />
        <Button
          label='Clear'
          tooltip='Clear all nodes, except walls, source and target'
          onClick={() => props.dispatch({ type: 'clear' })}
        />
      </Group>
    </form>
  )
}

export default PathfinderForm
