// TODO: https://www.w3schools.com/howto/howto_css_tooltip.asp

import React, { FC } from 'react'

/*
  <Tooltip label='Message here'>
    <Button/>
  </Tooltip
*/

const Tooltip: FC<{}> = (props) => {
  return <span>{props.children}</span>
}

export default Tooltip
