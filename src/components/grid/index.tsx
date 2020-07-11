import React, { FC, useRef, useCallback } from 'react'
import styled from 'styled-components'

import { DIMENSION_GRID } from '../grid-config'
import { GridTypeNames } from '../../algorithms/types'
import { GridItemStatus, AgentState } from '../../types'
import { MemoizedGridItem as GridItem } from '../grid-item'

// TODO: seria possivel/melhor manter o gridItems como um state interno aqui?
export const Grid: FC<{
  type: GridTypeNames
  items: GridItemStatus[][]
  onToggleGridItem: (id: AgentState) => void
}> = (props) => {
  const width = DIMENSION_GRID[props.type].width
  const height = DIMENSION_GRID[props.type].height

  const mouseIsPressed = useRef(false)
  const memoizedGetMouseIsPressed = useCallback(
    () => mouseIsPressed.current,
    []
  )

  return (
    <Container>
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
              getMouseIsPressed={memoizedGetMouseIsPressed}
              onToggle={props.onToggleGridItem} // TODO: precisaria memorizar no componente pai (Pathfinder)?
            />
          ))
        )}
      </Svg>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`
const Svg = styled.svg`
  /* width e height são estilos css, seus valores padrão são definidos pelo container que habita */
  
  /* border: 1px solid rgb(120, 120, 120, 0.2); */
  /* box-shadow: 10px 10px 50px rgb(120,120,120,0.05); */
`
