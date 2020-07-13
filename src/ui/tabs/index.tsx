// TODO: https://codepen.io/brnpapa/pen/xxZwPgE
import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

/*
  <Tabs defaultValue={'1'} onChange={(value) => console.log(value)}>
    <Tab value='1' label='Um'/>
    <Tab value='2' label='Dois'/>
    <Tab value='3' label='Tres'/>
  </Tabs>
*/

const biggerBorderRadius = '1.6em'
const smallerBorderRadius = '1.2em'

interface TabsProps {
  defaultValue: string
  onChange: (value: string) => void
  children: React.ReactElement<TabProps>[] // necessário p/ que child sejá válido dentro de React.Children.map
}
export const Tabs: FC<TabsProps> = ({ defaultValue, onChange, children }) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    onChange(value)
  }, [value, onChange])

  // adiciona novas props em todos os filhos, antes de renderizá-los
  const childElements = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      selected: child.props.value === value,
      onSelect: (value: string) => {
        setValue(value)
      },
    })
  )

  return (
    <Wrapper>
      {childElements}
      {/* <Glider /> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  position: relative;
  background-color: #fff;
  height: 45px;
  padding: 0.3rem;
  border-radius: ${biggerBorderRadius};
  border: var(--border);
  * {
    z-index: 2;
  }
`
const Glider = styled.span`
  position: absolute;
  display: flex;
  height: 54px;
  width: 200px;
  background-color: var(--secondary);
  z-index: 1;
  transition: 0.25s ease-out;
`

interface TabProps {
  value: string
  label?: string
  Icon?: React.ReactNode
  SelectedIcon?: React.ReactNode

  // passado pelo componente pai Tabs
  selected?: boolean
  onSelect?: (value: string) => void
}
export const Tab: FC<TabProps> = (props) => {
  return (
    <>
      <Input
        checked={props.selected}
        type='radio'
        name='tabs'
        id={props.value}
        onChange={() => (props.onSelect ? props.onSelect(props.value) : null)}
      />
      <Label htmlFor={props.value}>
        {props.selected || !props.SelectedIcon
          ? props.Icon
          : props.SelectedIcon}
        {props.label}
      </Label>
    </>
  )
}
const Input = styled.input`
  display: none;

  &:checked {
    & + label {
      background-color: var(--secondary); /* FIXME: temporário */
      color: var(--primary);
    }
  }
`
const Label = styled.label`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* FIXME: temporário */
  font-size: 1.25rem;
  font-weight: 500;
  border-radius: ${smallerBorderRadius};
  cursor: pointer;
  transition: color 0.15s ease-in;
`
