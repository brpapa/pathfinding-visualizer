import { Point, AgentState, StatusGridItem, GridTypeNames } from './types'

// Renderer
export const BOTTOM_RIGHT_CORNER: Point = { x: 1600, y: 900 }

export const GRID_ITEM: { [K in GridTypeNames]: any } = {
  triangle: {
    // max_id: { x: 26, y: 26 },
    max_id: { x: 18, y: 18 },
    // side: 60
    side: 80,
  },
  square: {
    // max_id: { x: 11, y: 6 },
    max_id: { x: 25, y: 15 },
    // side: 80,
    side: 50,
  },
}

export const ANCHOR_OF_TRIANGLE_0_0: Point = {
  x: 0,
  y: GRID_ITEM.triangle.side / 2,
}
export const ANCHOR_OF_SQUARE_0_0: Point = { x: 0, y: 0 }

export const GRID_ITEM_COLORS: { [K in StatusGridItem]: string } = {
  visited: '#656BFF',
  unvisited: '#FFFFFF',
  solution: '#62E6AC',
  unvisitable: '#333333',
  start: '#FF8C5F',
  goal: '#E85A7E',
}
