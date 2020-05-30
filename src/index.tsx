import React from 'react'
import { render } from 'react-dom'

import './styles.css'

import { Pathfinding } from './components/pathfinding'

// import { DropdownMenu } from './components/dropdown-menu'
// import { ReactComponent as CaretIcon } from './assets/icons/caret.svg'
// import { ReactComponent as ArrowIcon } from './assets/icons/arrow.svg'
// import { ReactComponent as BellIcon } from './assets/icons/bell.svg'
// import { ReactComponent as PlusIcon } from './assets/icons/plus.svg'
// import { ReactComponent as BoltIcon } from './assets/icons/bolt.svg'
// import { ReactComponent as CogIcon } from './assets/icons/cog.svg'
// import { ReactComponent as ChevronIcon } from './assets/icons/chevron.svg'

function App() {
  return <Pathfinding />
}

render(<App />, document.getElementById('root'))
