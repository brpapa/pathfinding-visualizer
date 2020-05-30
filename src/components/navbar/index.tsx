// TODO: https://www.youtube.com/watch?v=biOMz4puGt8&t=555s
// tab navigation + transition: https://www.instagram.com/p/B_UzZP5AseV/?igshid=1khwochmznl7d

import React, { FC, ReactNode, useState } from 'react'
import styled from 'styled-components'

export const Navbar: FC<{ children: ReactNode[] | ReactNode }> = (props) => {
  return (
    <Nav>
      <NavList>{props.children}</NavList>
    </Nav>
  )
}

export const NavItem: FC<{ icon: ReactNode }> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <NavListItem>
      <IconButton href='#' onClick={() => setOpen(!open)}>
        {props.icon}
      </IconButton>
      {open && props.children}
    </NavListItem>
  )
}

const Nav = styled.nav`
  height: var(--navbar-size);
  background-color: var(--foreground);
  padding: 0 1rem;
  border-bottom: var(--border);
`
const NavList = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
const NavListItem = styled.li`
  width: calc(var(--navbar-size) * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`
const IconButton = styled.a`
  --button-size: calc(var(--navbar-size) * 0.5);
  width: var(--button-size);
  height: var(--button-size);

  background-color: var(--foreground-accent);
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  &:hover {
    background-color: var(--foreground-accent-hover);
  }

  svg {
    fill: var(--text-color);
    width: 20px;
    height: 20px;
  }
`
