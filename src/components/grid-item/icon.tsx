import React, { FC } from 'react'

import { ReactComponent as SourceIcon } from './../../assets/icons/location-source.svg'
import { ReactComponent as TargetIcon } from './../../assets/icons/location-target.svg'
const Icons = { source: SourceIcon, target: TargetIcon }

type IconProps = {
  type: 'source' | 'target'
  cx: number
  cy: number
  side: number
}

const Icon: FC<IconProps> = (props) => {
  const { type, cx, cy, side } = props

  const Icon = Icons[type]
  const x = cx - side / 2
  const y = cy - side / 2

  return <Icon x={x} y={y} width={side} height={side} color='black'/>
}

export default Icon
