import { Point } from './types'

export class Vector {
  // em relação à origem (0, 0)
  x: number
  y: number

  constructor(p1: Point, p2: Point) {
    this.x = p2.x - p1.x
    this.y = p2.y - p2.x
  }

  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}

export function translate(p: Point, v: Vector): Point {
  return {
    x: v.x + p.x,
    y: v.y + p.y,
  }
}

export function scale(v: Vector, k: number): Vector {
  v.x *= k
  v.y *= k
  return v
}

/**
 * retorna o ponto na reta definida por a e b que está há uma distância d de b
 */
export function pointOnLine(a: Point, b: Point, d: number): Point {
  const ba = new Vector(b, a)
  return translate(b, scale(ba, d / ba.norm()))
}

export function dist(a: Point, b: Point): number {
  return new Vector(a, b).norm()
}

/**
 * retorna a altura de um triangulo equilátero
 */
export function triangleHeight(side: number): number {
  return (side * Math.sqrt(3)) / 2
}
