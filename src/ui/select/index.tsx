import React, { FC } from 'react'
import styled from 'styled-components'

import './../tooltip.scss'

// TODO: https://www.w3schools.com/howto/howto_custom_select.asp, https://codesandbox.io/s/wu4wf?file=/index.js
// https://pt-br.reactjs.org/docs/forms.html

type SelectProps = {
  defaultValue: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: [string, string][] // array de [value, label]
  // tooltip?: string
}
const Select: FC<SelectProps> = (props) => {
  return (
    <StyledSelect
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      // data-tooltip={props.tooltip}
    >
      {props.options.map((opt) => (
        <option key={opt[0]} value={opt[0]}>
          {opt[1]}
        </option>
      ))}
    </StyledSelect>
  )
}

const StyledSelect = styled.select`
  font-size: 14px;
  height: var(--form-item-height);
  width: fit-content;
  padding: 0.35em 1.2em;
  border-radius: var(--border-radius);

  color: var(--text-color);
  background-color: var(--foreground);

  border: 0.05em solid var(--foreground-accent);
`
export default Select
