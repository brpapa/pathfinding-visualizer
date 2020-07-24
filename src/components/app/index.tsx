import React, { FC } from 'react'
import styled from 'styled-components'

import './styles.scss'
import GithubCorner from '../../ui/github-corner'
import Pathfinder from '../../components/pathfinder'

const App: FC = () => {
  return (
    <Wrapper>
      <GithubCorner
        size={50}
        href='https://github.com/brnpapa/pathfinding-visualizer'
      />
      <Pathfinder />
      <Footer>Copyright &copy; 2020 Bruno Papa. All rights reserved.</Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  background: var(--background);
  font-family: 'Inter', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
`
const Footer = styled.footer`
  margin-top: 6px;
  text-align: center;
  font-size: 10px;
  color: gray;
`

export default App