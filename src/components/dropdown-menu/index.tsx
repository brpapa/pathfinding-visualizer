// TODO: se quiser transformar em um dropdown multi-level, continuar assistindo: https://youtu.be/IF6k0uZuypA?t=698

import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'

import { ReactComponent as ChevronIcon } from './../../assets/icons/chevron.svg'

export const DropdownMenu: FC = () => {
  return (
    <Dropdown>
      <DropdownItem>My profile</DropdownItem>
      <DropdownItem rightIcon={<ChevronIcon />}>A</DropdownItem>
      <DropdownItem rightIcon={<ChevronIcon />}>B</DropdownItem>
    </Dropdown>
  )
}

const DropdownItem: FC<{
  rightIcon?: ReactElement | string
}> = (props) => {
  return (
    <MenuItem href='#'>
      {/* left-icon here */}
      {props.children}
      <IconRight>{props.rightIcon}</IconRight>
    </MenuItem>
  )
}

const Dropdown = styled.div`
  position: absolute;
  top: 58px;
  width: 300px;
  padding: 0.8rem;
  transform: translateX(45%);
  background-color: var(--foreground);
  border: var(--border);
  border-radius: var(--border-radius);
  overflow: hidden;
`
const MenuItem = styled.a`
  height: 30px;
  display: flex;
  align-items: center;
  color: var(--text-color);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  transition: background var(--speed);

  &:hover {
    background-color: var(--foreground-hover);
  }
`
const IconRight = styled.span`
  margin-left: auto;

  svg {
    fill: var(--text-color);
    width: 20px;
    height: 20px;
  }
`
