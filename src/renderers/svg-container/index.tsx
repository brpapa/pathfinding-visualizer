import React, { FC, MouseEvent } from 'react'

import { SVG } from './styles'
import { BOTTOM_RIGHT_CORNER } from '../constants'

export const SVGContainer: FC<{
  // onClick?: (e: MouseEvent) => void
  // onMouseMove?: (e: MouseEvent) => void
}> = (props) => {
  const { x, y } = BOTTOM_RIGHT_CORNER
  
  return (
    <SVG viewBox={`0 0 ${x} ${y}`}>
      {/* <rect x='0' y='0' width={x} height={y} fill='white' /> */}
      {props.children}
    </SVG>
  )
}
