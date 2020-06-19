import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/js/bootstrap.bundle' // all bootstrap js, including popper.js for tooltips
import './styles.scss' // my own styles

import { GithubCorner } from './components/github-corner'
import { Pathfinder } from './core/pathfinder'

function App() {
  return (
    <>
      <GithubCorner link='https://github.com/brnpapa/pathfinding-visualizer' />
      <Pathfinder />
    </>
  )
}

render(<App />, document.getElementById('root'))
