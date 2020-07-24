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
      primary={props.primary}
      disabled={props.disabled}
      data-tooltip={props.tooltip}
      onClick={props.onClick}
    >
      <Label>
        {/* FIXME */}
        {props.Icon && props.Icon}
        {props.label}
      </Label>
    </StyledButton>
  )
}

type StyledButtonProps = {
  primary?: boolean
}
const StyledButton = styled.button`
  user-select: none;
  text-decoration: none;
  text-align: center;

  font-size: 14px;
  height: var(--form-item-height);
  padding: 0 0.5em;
  border-radius: var(--border-radius);
  cursor: pointer;

  border: ${({ primary }: StyledButtonProps) =>
    primary ? 'none' : 'var(--border)'};
  color: ${({ primary }: StyledButtonProps) =>
    primary ? '#fff' : 'var(--text-color)'};
  background-color: ${({ primary }: StyledButtonProps) =>
    primary ? '#000' : 'var(--foreground)'};

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: var(--foreground-hover);
  }
`
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
// const IconWrapper = styled.span.attrs({ role: 'img' })`
//   fill: black;
//   width: 22px;
//   height: 22px;
// `

export default Button
