import React, { FC, useRef, useCallback, useContext } from 'react'
import styled from 'styled-components'

import { DIMENSION_GRID } from '../grid-config'
import { GridTypeNames, AgentState } from '../../algorithms/types'
import { GridItemStatus } from '../../types'
import GridItem from '../grid-item'

type GridProps = {
  type: GridTypeNames
  items: GridItemStatus[][]
  source: AgentState
  target: AgentState
}

const Grid: FC<GridProps> = (props) => {
  const width = DIMENSION_GRID[props.type].width
  const height = DIMENSION_GRID[props.type].height

  const mouseIsPressed = useRef(false)
  const memoizedMouseIsPressed = useCallback(
    () => mouseIsPressed.current,
    []
  )

  return (
    <Wrapper>
      <Svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        onMouseDown={() => (mouseIsPressed.current = true)}
        onMouseUp={() => (mouseIsPressed.current = false)}
        onMouseLeave={() => (mouseIsPressed.current = false)}
      >
        {props.items.map((items, x) =>
          items.map((item, y) => (
            <GridItem
              key={`${x},${y}`}
              id={{ x, y }}
              grid={props.type}
              status={item}
              isSourceOrTarget={(() => {
                if (JSON.stringify({ x, y }) === JSON.stringify(props.source)) return 'source'
                if (JSON.stringify({ x, y }) === JSON.stringify(props.target)) return 'target'
                return null
              })()}
              mouseIsPressed={memoizedMouseIsPressed}
            />
          ))
        )}
      </Svg>
    </Wrapper>
  )
}

export default Grid

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Svg = styled.svg`
  /* width e height são estilos css, seus valores padrão são definidos pelo container que habita */

  box-shadow: 10px 10px 50px rgb(120, 120, 120, 0.05);
`
