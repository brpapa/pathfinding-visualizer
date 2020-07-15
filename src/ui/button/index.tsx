import React, { FC } from 'react'
import styled from 'styled-components'

import './../tooltip.scss'

type ButtonProps = {
  label: string
  tooltip?: string
  disabled?: boolean
  title?: string
  primary?: boolean
  onClick?: () => void
}
const Button: FC<ButtonProps> = (props) => {
  return (
    <StyledButton
      type='button'
      disabled={props.disabled}
      data-tooltip={props.tooltip}
      onClick={props.onClick}
      title={props.title} // TODO: mudar, renderizar uma nova box (tooltip) no :hover para aparecer imediatamente esse texto, definir essa box com um dark blur background; (background-color: rgba(245,245,247,0.72); backdrop-filter: saturate(180%) blur(20px); (https://css-tricks.com/almanac/properties/b/backdrop-filter/) (https://v5.getbootstrap.com/docs/5.0/components/tooltips/)
    >
      {props.label || 'no label'}
    </StyledButton>
  )
}

// TODO: primary version
const StyledButton = styled.button`
  user-select: none;
  text-decoration: none;
  text-align: center;
  font-size: 1em;
  padding: 0.35em 1.2em;
  margin: 0.5em 0.2em;
  border-radius: 0.4em;
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

export default Button
