import React, { FC } from 'react'

import './styles.scss'
import GithubCorner from '../../assets/icons/github-corner'
import Pathfinder from '../../components/pathfinder'

const App: FC = () => {
  return (
    <div>
      <Pathfinder />
      <GithubCorner href='https://github.com/brnpapa/pathfinding-visualizer' />
    </div>
  )
}

export default App
