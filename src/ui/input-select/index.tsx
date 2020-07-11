// TODO: https://www.w3schools.com/howto/howto_custom_select.asp, https://codesandbox.io/s/wu4wf?file=/index.js
// https://pt-br.reactjs.org/docs/forms.html

import React from 'react'

export const InputSelect: React.FunctionComponent<{
  defaultValue: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: [string, string][] // array de [value, label]
  title?: string
}> = (props) => {
  return (
    <select
      className='form-select form-select-sm'
      // style={{ width: 'fit-content', display: 'inline-block' }}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    >
      {props.options.map((opt) => (
        <option key={opt[0]} value={opt[0]}>
          {opt[1]}
        </option>
      ))}
    </select>
  )
}

