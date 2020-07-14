import React, { FC } from 'react'
import styled from 'styled-components'

import './styles.scss'
import GithubCorner from '../../ui/github-corner'
import Pathfinder from '../../components/pathfinder'

const App: FC = () => {
  return (
    <>
      <GithubCorner
        size={60}
        href='https://github.com/brnpapa/pathfinding-visualizer'
      />
      <Pathfinder />
      <Footer>Copyright &copy; 2020 Bruno Papa. All rights reserved.</Footer>
    </>
  )
}

const Footer = styled.footer`
  margin: 6px;
  text-align: center;
  font-size: 10px;
  color: gray;
`

export default App