import React, { FC, useContext } from 'react'
import styled from 'styled-components'
import './carbon-ads.scss'

import { AvailButton, Action } from '../types'
import { SearchAlgoNames } from '../../types'
import { GridTypeNames } from '../../algorithms/types'

import data from './data'
import { DispatchContext } from '../contexts'
import useAds from '../../hooks/useCarbonAds'

import Tabs from '../../ui/tabs'
import Button from '../../ui/button'
import Select from '../../ui/select'

import { ReactComponent as TriangleSolidIcon } from './../../assets/icons/triangle-solid.svg'
import { ReactComponent as TriangleOutlineIcon } from './../../assets/icons/triangle-outline.svg'
import { ReactComponent as SquareSolidIcon } from './../../assets/icons/square-solid.svg'
import { ReactComponent as SquareOutlineIcon } from './../../assets/icons/square-outline.svg'
import { ReactComponent as PlayIcon } from './../../assets/icons/play.svg'
import { ReactComponent as PauseIcon } from './../../assets/icons/pause.svg'

type StateReturn<T> = [T, (value: T) => void]

type HeaderProps = {
  grid: StateReturn<GridTypeNames>
  searchAlgo: StateReturn<SearchAlgoNames>
  delay: StateReturn<number>
  availButton: AvailButton
  onStart: () => void
}
const Header: FC<HeaderProps> = (props) => {
  const [grid, setGrid] = props.grid
  const [searchAlgo, setSearchAlgo] = props.searchAlgo
  const [delay, setDelay] = props.delay

  const { dispatch } = useContext(DispatchContext)
  const { adsEl } = useAds()

  return (
    <Wrapper>
      <div ref={adsEl} />
      <Form>
        <div style={{ display: 'flex' }}>
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
              tooltip='Visualize'
              Icon={<PlayIcon width='22' height='22' />}
              onClick={props.onStart}
            />
          )}
          {props.availButton === 'continue' && (
            <Button
              tooltip='Continue'
              Icon={<PlayIcon width='22' height='22' />}
              onClick={() => dispatch({ type: 'continue' })}
            />
          )}
          {props.availButton === 'pause' && (
            <Button
              tooltip='Pause'
              Icon={<PauseIcon width='22' height='22' />}
              onClick={() => dispatch({ type: 'pause' })}
            />
          )}
        </div>
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
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 7px;
  padding-bottom: 14px;
`
const Form = styled.form.attrs({ onSubmit: (e) => e.preventDefault() })`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-right: 10px;
`

export default Header
