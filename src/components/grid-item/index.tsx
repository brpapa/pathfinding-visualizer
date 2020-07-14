import React, { FC } from 'react'
import './styles.scss'

import { AgentState, GridItemStatus, GridTypeNames } from '../../types'
import * as Utils from './utils'

type GridItemProps = {
  id: AgentState
  grid: GridTypeNames
  status: GridItemStatus
  getMouseIsPressed: () => boolean
  onToggle: (id: AgentState) => void
}

// TODO: se o grid item for source/target, arrastá-lo, mas sem drag and drop, usar onMouseEnter e onMouseLeave um anulando o outro
// TODO: renderizar por cima em caso de mudanca de status para animar do jeito que quero, usando ::after ou ::before
  
// TODO: o status deve poder ser ao mesmo tempo unvisited/visited/solution/wall E source/target
const GridItem: FC<GridItemProps> = (props) => {
  
  const commonChildProps = {
    className: ['node', `node-${props.status}`].join(' '),
    onMouseDown: () => {
      if (props.status === 'source' || props.status === 'target') return
      // o evento mouseDown em svg é disparado depois do mouseDown em rect/polygon, por causa do bubbling, então nao usei props.getMouseIsPressed
      props.onToggle(props.id)
    },
    onMouseEnter: () => {
      if (props.getMouseIsPressed()) props.onToggle(props.id)
    },
    // TODO: exibir dados sobre o nó?
    // onMouseOver: () => {
    //   if (!props.getMouseIsPressed())
    //     console.log(props.id)
    // },
  }

  return (
    <>
      {props.grid === 'square' && (
        <rect
          {...commonChildProps}
          x={Utils.squareAnchorPoint(props.id).x}
          y={Utils.squareAnchorPoint(props.id).y}
          width={Utils.squareSide()}
          height={Utils.squareSide()}
        />
      )}
      {props.grid === 'triangle' && (
        <polygon
          {...commonChildProps}
          points={Utils.trianglePoints(props.id)
            .map((p) => `${p.x},${p.y}`)
            .join(' ')}
        />
      )}
    </>
  )
}

export default GridItem
export const MemoizedGridItem = React.memo(GridItem)
