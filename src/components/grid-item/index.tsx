import React, { FC, useContext } from 'react'

import './styles.scss'
import { AgentState, GridItemStatus, GridTypeNames } from '../../types'

import Icon from './icon'
import { DispatchContext } from '../contexts'
import * as Utils from './utils'

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
  const { id, grid, status, isSourceOrTarget, mouseIsPressed } = props

  const { dispatch } = useContext(DispatchContext)

  function toggle() {
    if (isSourceOrTarget === null)
      dispatch({
        type: 'toggle',
        payload: { agentState: id },
      })
  }

  const commonChildProps = {
    className: ['node', `node-${status}`].join(' '),
    'data-tooltip': `(${id.x}, ${id.y})`, // TODO

    // o evento mouseDown em svg é disparado depois do mouseDown em rect/polygon, por causa do bubbling, então nao usei mouseIsPressed
    onMouseDown: () => {
      toggle()
    },
    onMouseEnter: () => {
      if (mouseIsPressed()) toggle()
    },
  }

  if (grid === 'square') {
    const { x, y } = Utils.squareAnchorPoint(id)
    const side = Utils.squareSide()

    // calcula o ponto central do icone
    const sideIcon = side * (4 / 4)
    const cxIcon = x + side / 2
    const cyIcon = y + side / 2

    return (
      <>
        <rect {...commonChildProps} x={x} y={y} width={side} height={side} />
        {isSourceOrTarget && (
          <Icon
            type={isSourceOrTarget}
            cx={cxIcon}
            cy={cyIcon}
            side={sideIcon}
          />
        )}
      </>
    )
  }
  if (grid === 'triangle') {
    const points = Utils.trianglePoints(id)

    // calcula o ponto central do icone
    const side = Utils.triangleSide()
    const height = Utils.triangleHeight(side)
    const [{ x, y }] = points
    const sideIcon = height * (7 / 11)
    const cxIcon =
      x + ((height * (2/3)) * ((id.x + id.y) % 2 === 0 ? 1 : -1))
    const cyIcon = y

    return (
      <>
        <polygon
          {...commonChildProps}
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        />
        {isSourceOrTarget && (
          <Icon
            type={isSourceOrTarget}
            cx={cxIcon}
            cy={cyIcon}
            side={sideIcon}
          />
        )}
      </>
    )
  }
  return <></>
}

export default GridItem
export const MemoizedGridItem = React.memo(GridItem)
