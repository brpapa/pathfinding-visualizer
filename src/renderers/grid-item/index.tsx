import React, { FC } from 'react'
import './styles.css'

import {
  GRID_ITEM,
  ANCHOR_OF_TRIANGLE_0_0,
  ANCHOR_OF_SQUARE_0_0,
  GRID_ITEM_COLORS,
} from '../constants'
import { AgentState, StatusGridItem, GridTypeNames } from '../types'
import { triangleHeight } from '../geometry'

/*
Board.prototype.addEventListeners = function() {
  let board = this;
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      let currentId = `${r}-${c}`;
      let currentNode = board.getNode(currentId);
      let currentElement = document.getElementById(currentId);
      currentElement.onmousedown = (e) => {
        e.preventDefault();
        if (this.buttonsOn) {
          board.mouseDown = true;
          if (currentNode.status === "start" || currentNode.status === "target" || currentNode.status === "object") {
            board.pressedNodeStatus = currentNode.status;
          } else {
            board.pressedNodeStatus = "normal";
            board.changeNormalNode(currentNode);
          }
        }
      }
      currentElement.onmouseup = () => {
        if (this.buttonsOn) {
          board.mouseDown = false;
          if (board.pressedNodeStatus === "target") {
            board.target = currentId;
          } else if (board.pressedNodeStatus === "start") {
            board.start = currentId;
          } else if (board.pressedNodeStatus === "object") {
            board.object = currentId;
          }
          board.pressedNodeStatus = "normal";
        }
      }
      currentElement.onmouseenter = () => {
        if (this.buttonsOn) {
          if (board.mouseDown && board.pressedNodeStatus !== "normal") {
            board.changeSpecialNode(currentNode);
            if (board.pressedNodeStatus === "target") {
              board.target = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            } else if (board.pressedNodeStatus === "start") {
              board.start = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            } else if (board.pressedNodeStatus === "object") {
              board.object = currentId;
              if (board.algoDone) {
                board.redoAlgorithm();
              }
            }
          } else if (board.mouseDown) {
            board.changeNormalNode(currentNode);
          }
        }
      }
      currentElement.onmouseleave = () => {
        if (this.buttonsOn) {
          if (board.mouseDown && board.pressedNodeStatus !== "normal") {
            board.changeSpecialNode(currentNode);
          }
        }
      }
    }
  }
};
*/

export const GridItem: FC<{
  grid: GridTypeNames
  id: AgentState
  status: StatusGridItem
  onToggle: (id: AgentState) => void
}> = (props) => {
  
  const className = `item ${props.status}`
  const fill = GRID_ITEM_COLORS[props.status]

  if (props.grid === 'square') {
    const anchor = getAnchorPointSquare(props.id)
    return (
      <rect
        className={className}
        onMouseDown={(e) => {
          console.log(props.id, 'down')
        }}
        fill={fill}
        x={anchor.x}
        y={anchor.y}
        width={GRID_ITEM.square.side}
        height={GRID_ITEM.square.side}
      />
    )
  }
  if (props.grid === 'triangle') {
    const points = getPointsTriangle(props.id)
    return (
      <polygon
        className={className}
        onClick={() => props.onToggle(props.id)}
        fill={fill}
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
      />
    )
  }
  return null
}

// retorna os 3 pontos onde o triângulo deve ser posicionado
function getPointsTriangle(id: AgentState) {
  const to = (id.x + id.y) % 2 === 0 ? 'rightward' : 'leftward'
  const h = triangleHeight(GRID_ITEM.triangle.side)

  const anchor = {
    x: ANCHOR_OF_TRIANGLE_0_0.x + h * (to === 'leftward' ? id.x + 1 : id.x),
    y: ANCHOR_OF_TRIANGLE_0_0.y + GRID_ITEM.triangle.side * (id.y / 2),
  }

  // a partir do seu anchor point e orientação (to)
  const d = h * (to === 'rightward' ? 1 : -1)
  return [
    { x: anchor.x, y: anchor.y },
    { x: anchor.x + d, y: anchor.y - GRID_ITEM.triangle.side / 2 },
    { x: anchor.x + d, y: anchor.y + GRID_ITEM.triangle.side / 2 },
  ]
}

// retorna o ponto do canto superior esquerdo do quadrado
function getAnchorPointSquare(id: AgentState) {
  return {
    x: id.x * GRID_ITEM.square.side + ANCHOR_OF_SQUARE_0_0.x,
    y: id.y * GRID_ITEM.square.side + ANCHOR_OF_SQUARE_0_0.y,
  }
}
