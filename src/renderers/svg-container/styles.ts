import styled from 'styled-components'

export const SVG = styled('svg')`
  /* width e height são estilos css, seus valores padrão são definidos pelo container que habita */
  height: auto;
  width: 1000px;
  margin-left: 20px;
  border: 1px solid rgb(120, 120, 120, 0.1);
  /* box-shadow: 10px 10px 50px rgb(120,120,120,0.05); */

  &:hover {
    cursor: crosshair;
  }
`
