import { GridTypeNames } from '../types'

type ForEachGrid<T> = { [K in GridTypeNames]: T }
type Dimension = { width: number; height: number }

// TODO: re-renderizar o svg quando ela mudar para suportar um resize da tela em runtime, mas lembre-se que quem depende dessas contantes são: pathfinder/config, grid/index, grid-item/utils; usar useContext?

const SIDE_GRID_ITEM: ForEachGrid<number> = {
  triangle: 60, // pixels
  square: 36, // pixels
}

const availWidth = window.innerWidth - 10
const availHeight = window.innerHeight - 80 // FIXME: hardcode

/* */

// retorna o maior valor <= a que é múltiplo de b
const fit = (a: number, b: number) => a - (a % b)

// largura (variacao do x) e altura (variacao do y) de cada item
const DIMENSION_GRID_ITEM: ForEachGrid<Dimension> = {
  triangle: {
    width: (SIDE_GRID_ITEM.triangle * Math.sqrt(3)) / 2,
    height: SIDE_GRID_ITEM.triangle / 2,
  },
  square: {
    width: SIDE_GRID_ITEM.square,
    height: SIDE_GRID_ITEM.square,
  },
}

// largura e altura total de cada grid
const DIMENSION_GRID: ForEachGrid<Dimension> = {
  triangle: {
    width: fit(availWidth, DIMENSION_GRID_ITEM.triangle.width),
    height: fit(availHeight, DIMENSION_GRID_ITEM.triangle.height),
  },
  square: {
    width: fit(availWidth, DIMENSION_GRID_ITEM.square.width),
    height: fit(availHeight, DIMENSION_GRID_ITEM.square.height),
  },
}

// qte de itens na largura e na altura em cada grid
const QTY_GRID_ITEMS: ForEachGrid<Dimension> = {
  // divisoes exatas
  triangle: {
    width: DIMENSION_GRID.triangle.width / DIMENSION_GRID_ITEM.triangle.width,
    height:
      DIMENSION_GRID.triangle.height / DIMENSION_GRID_ITEM.triangle.height - 1,
  },
  square: {
    width: DIMENSION_GRID.square.width / DIMENSION_GRID_ITEM.square.width,
    height: DIMENSION_GRID.square.height / DIMENSION_GRID_ITEM.square.height,
  },
}

export { SIDE_GRID_ITEM, DIMENSION_GRID, QTY_GRID_ITEMS }
