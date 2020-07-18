// TODO: primary version
import React, { FC } from 'react'
import styled from 'styled-components'

import './../tooltip.scss'

type ButtonProps = {
  label?: string
  Icon?: React.ReactNode
  tooltip?: string
  disabled?: boolean
  primary?: boolean
  onClick?: () => void
}
const Button: FC<ButtonProps> = (props) => {
  return (
    <StyledButton
      disabled={props.disabled}
      data-tooltip={props.tooltip}
      onClick={props.onClick}
    >
      {/* FIXME */}
      {props.Icon && <IconWrapper>{props.Icon}</IconWrapper>}
      {props.label}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  user-select: none;
  text-decoration: none;
  /* text-align: center; */

  font-size: 14px;
  height: var(--form-item-height);
  padding: 0.35em 1.2em;
  border-radius: var(--border-radius);

  /* color: #fff; */
  color: var(--text-color);

  /* background-color: #000; */
  background-color: var(--foreground);

  border: 0.05em solid var(--foreground-accent);
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: var(--foreground-hover);
  }
`
const IconWrapper = styled.span.attrs({ role: 'img' })`
  display: flex;
  align-items: center;
  justify-content: center;

  fill: black;
  width: 22px;
  height: 22px;
`


export default Button
