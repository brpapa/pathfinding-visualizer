// TODO: https://www.w3schools.com/howto/howto_custom_select.asp, https://codesandbox.io/s/wu4wf?file=/index.js
// https://pt-br.reactjs.org/docs/forms.html

import React from 'react'

export const Select = () => {
  return (
    // em React, é assim que select deve ser usado
    <select defaultValue='x'>
      <option value='x'>x label</option>
      <option value='y'>y label</option>
      <option value='z'>z label</option>
    </select>
  )
}
