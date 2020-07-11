import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/js/bootstrap.bundle' // all bootstrap js, including popper.js for tooltips
import './index.scss' // my own styles

import { GithubCorner } from './ui/github-corner'
import { Pathfinder } from './components/pathfinder'

function App() {
  return (
    <>
      <GithubCorner link='https://github.com/brnpapa/pathfinding-visualizer' />
      <Pathfinder />
    </>
  )
}

render(<App />, document.getElementById('root'))
