import React, { FC, useContext } from 'react'

import './styles.scss'
import { AgentState, GridItemStatus, GridTypeNames } from '../../types'

import { DispatchContext } from '../contexts'
import * as Utils from './utils'

import { ReactComponent as SourceIcon } from './../../assets/icons/location-source.svg'
import { ReactComponent as TargetIcon } from './../../assets/icons/location-target.svg'

// TODO: se o grid item for source/target, arrastá-lo, mas sem drag and drop, usar onMouseEnter e onMouseLeave um anulando o outro
// TODO: renderizar por cima em caso de mudanca de status para animar do jeito que quero

type GridItemProps = {
  id: AgentState
  grid: GridTypeNames
  status: GridItemStatus
  isSourceOrTarget: 'source' | 'target' | null
  mouseIsPressed: () => boolean
}

const GridItem: FC<GridItemProps> = (props) => {
  const { dispatch } = useContext(DispatchContext)

  function toggle() {
    if (props.isSourceOrTarget === null)
      dispatch({
        type: 'toggle',
        payload: { agentState: props.id },
      })
  }

  const commonChildProps = {
    className: ['node', `node-${props.status}`].join(' '),
    'data-tooltip': `(${props.id.x}, ${props.id.y})`, // TODO

    // o evento mouseDown em svg é disparado depois do mouseDown em rect/polygon, por causa do bubbling, então nao usei props.mouseIsPressed
    onMouseDown: () => {
      toggle()
    },
    onMouseEnter: () => {
      if (props.mouseIsPressed()) toggle()
    },
  }

  if (props.grid === 'square') {
    const { x, y } = Utils.squareAnchorPoint(props.id)
    const side = Utils.squareSide()

    // canto superior esquerdo do icone
    const xIcon = x + side * (1 / 8)
    const yIcon = y + side * (1 / 8)
    const sideIcon = side * (6 / 8)

    return (
      <>
        <rect {...commonChildProps} x={x} y={y} width={side} height={side} />
        {props.isSourceOrTarget === 'source' && (
          <SourceIcon x={xIcon} y={yIcon} width={sideIcon} height={sideIcon} />
        )}
        {props.isSourceOrTarget === 'target' && (
          <TargetIcon x={xIcon} y={yIcon} width={sideIcon} height={sideIcon} />
        )}
      </>
    )
  }
  // DOING: posicionar source e target icons
  if (props.grid === 'triangle') {
    return (
      <>
        <polygon
          {...commonChildProps}
          points={Utils.trianglePoints(props.id)
            .map((p) => `${p.x},${p.y}`)
            .join(' ')}
        />
      </>
    )
  }
  return <></>
}

export default GridItem
export const MemoizedGridItem = React.memo(GridItem)
