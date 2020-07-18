import React, { FC, useContext } from 'react'
import styled from 'styled-components'

import { AvailButton, Action } from './../types'
import { SearchAlgoNames } from './../../types'
import { GridTypeNames } from '../../algorithms/types'

import data from './data'
import { DispatchContext } from '../contexts'

import Tabs from '../../ui/tabs'
import Button from '../../ui/button'
import Select from '../../ui/select'

import { ReactComponent as TriangleSolidIcon } from './../../assets/icons/triangle-solid.svg'
import { ReactComponent as TriangleOutlineIcon } from './../../assets/icons/triangle-outline.svg'
import { ReactComponent as SquareSolidIcon } from './../../assets/icons/square-solid.svg'
import { ReactComponent as SquareOutlineIcon } from './../../assets/icons/square-outline.svg'
import { ReactComponent as PlayIcon } from './../../assets/icons/play-circle.svg'
import { ReactComponent as PauseIcon } from './../../assets/icons/pause-circle.svg'

type StateReturn<T> = [T, (value: T) => void]

type PathfinderFormProps = {
  grid: StateReturn<GridTypeNames>
  searchAlgo: StateReturn<SearchAlgoNames>
  delay: StateReturn<number>
  availButton: AvailButton
  onStart: () => void
}
const PathfinderForm: FC<PathfinderFormProps> = (props) => {
  const [grid, setGrid] = props.grid
  const [searchAlgo, setSearchAlgo] = props.searchAlgo
  const [delay, setDelay] = props.delay

  const { dispatch } = useContext(DispatchContext)

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Tabs
        defaultValue={grid}
        onChange={(value) => setGrid(value as GridTypeNames)}
      >
        <Tabs.Item
          value='triangle'
          tooltip='View on triangle grid'
          Icon={{
            checked: <TriangleSolidIcon />,
            unchecked: <TriangleOutlineIcon />,
          }}
        />
        <Tabs.Item
          value='square'
          tooltip='View on square grid'
          Icon={{
            checked: <SquareSolidIcon />,
            unchecked: <SquareOutlineIcon />,
          }}
        />
      </Tabs>
      <div>
        <Select
          defaultValue={searchAlgo}
          // tooltip='Pick a search algorithm'
          onChange={(e) => setSearchAlgo(e.target.value as SearchAlgoNames)}
          options={Object.entries(data).map(([key, value]) => [
            key,
            value.name,
          ])}
        />
        {props.availButton === 'start' && (
          <Button
            primary
            tooltip='Start'
            Icon={<PlayIcon />}
            onClick={props.onStart}
          />
        )}
        {props.availButton === 'continue' && (
          <Button
            primary
            tooltip='Continue'
            Icon={<PlayIcon />}
            onClick={() => dispatch({ type: 'continue' })}
          />
        )}
        {props.availButton === 'pause' && (
          <Button
            primary
            tooltip='Pause'
            Icon={<PauseIcon />}
            onClick={() => dispatch({ type: 'pause' })}
          />
        )}
      </div>
      <Tabs
        defaultValue={String(delay)}
        onChange={(value) => setDelay(Number(value))}
      >
        <Tabs.Item
          value={'20'}
          label='Fast'
          tooltip='Speed up the visualization'
        />
        <Tabs.Item value={'100'} label='Normal' />
        <Tabs.Item
          value={'180'}
          label='Slow'
          tooltip='Speed down the visualization'
        />
      </Tabs>
      <div>
        <Button
          label='Reset'
          tooltip='Clear grid'
          onClick={() => dispatch({ type: 'reset', payload: { grid } })}
        />
        <Button
          label='Clear'
          tooltip='Clear path'
          onClick={() => dispatch({ type: 'clear' })}
        />
      </div>
    </Form>
  )
}

const Form = styled.form`
  padding: 8px 0 14px 0;
  margin: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default PathfinderForm
