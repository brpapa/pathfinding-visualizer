import React, { FC } from 'react'

import { AvailButton, Action } from './../types'
import { SearchAlgoNames } from './../../types'
import { GridTypeNames } from '../../algorithms/types'

import data from './data'

import { InputRange as Range } from '../../ui/input-range'
import { InputButton as Button } from '../../ui/input-button'
import { InputSelect as Select } from '../../ui/input-select'
import { InputGroup as Group } from '../../ui/input-group'

import { Tabs, Tab } from './../../ui/tabs'
import { ReactComponent as TriangleIcon } from './../../assets/icons/triangle.svg'
import { ReactComponent as TriangleOutlineIcon } from './../../assets/icons/triangle-outline.svg'
import { ReactComponent as SquareIcon } from './../../assets/icons/square.svg'
import { ReactComponent as SquareOutlineIcon } from './../../assets/icons/square-outline.svg'

type ControlledInput<T> = [T, (value: T) => void]

type FormProps = {
  grid: ControlledInput<GridTypeNames>
  searchAlgo: ControlledInput<SearchAlgoNames>
  delay: ControlledInput<number>
  availButton: AvailButton
  dispatch: React.Dispatch<Action>
  onStart: () => void
}
const Form: FC<FormProps> = (props) => {
  const [grid, setGrid] = props.grid
  const [searchAlgo, setSearchAlgo] = props.searchAlgo
  const [delay, setDelay] = props.delay

  return (
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
          IconUnchecked={<TriangleIcon />}
          IconChecked={<TriangleOutlineIcon />}
        />
        <Tab
          value='square'
          IconUnchecked={<SquareIcon />}
          IconChecked={<SquareOutlineIcon />}
        />
      </Tabs>
      <Group>
        <Select
          defaultValue={searchAlgo}
          title='pick a search algorithm'
          onChange={(e) =>
            setSearchAlgo(e.target.value as SearchAlgoNames)
          }
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
          title='Clear all nodes, except the source and target'
          onClick={() => props.dispatch({ type: 'reset', payload: { grid } })}
        />
        <Button
          label='Clear'
          title='Clear all nodes, except walls, source and target'
          onClick={() => props.dispatch({ type: 'clear' })}
        />
      </Group>
    </form>
  )
}

export default Form
