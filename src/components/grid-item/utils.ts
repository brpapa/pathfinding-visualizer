import { AgentState } from '../../types'
import { SIDE_GRID_ITEM } from '../grid-config'

export function triangleSide() {
  return SIDE_GRID_ITEM.triangle
}

export function squareSide() {
  return SIDE_GRID_ITEM.square
}

// retorna a altura de um triangulo equilátero
export function triangleHeight(side: number) {
  return (side * Math.sqrt(3)) / 2
}

// retorna os 3 pontos onde o triângulo deve ser posicionado
export function trianglePoints(id: AgentState) {
  const anchorPointOfTriangle00 = {
    x: 0,
    y: triangleSide() / 2,
  }
  const to = (id.x + id.y) % 2 === 0 ? 'rightward' : 'leftward'
  const h = triangleHeight(triangleSide())

  const anchorPoint = {
    x: anchorPointOfTriangle00.x + h * (to === 'leftward' ? id.x + 1 : id.x),
    y: anchorPointOfTriangle00.y + triangleSide() * (id.y / 2),
  }

  // a partir do seu anchor point e orientação (to)
  const d = h * (to === 'rightward' ? 1 : -1)
  return [
    anchorPoint,
    { x: anchorPoint.x + d, y: anchorPoint.y - SIDE_GRID_ITEM.triangle / 2 },
    { x: anchorPoint.x + d, y: anchorPoint.y + SIDE_GRID_ITEM.triangle / 2 },
  ]
}

// retorna o ponto do canto superior esquerdo do quadrado
export function squareAnchorPoint(id: AgentState) {
  const anchorPointOfSquare00 = { x: 0, y: 0 }

  return {
    x: id.x * squareSide() + anchorPointOfSquare00.x,
    y: id.y * squareSide() + anchorPointOfSquare00.y,
  }
}

