// TODO: https://codepen.io/brnpapa/pen/xxZwPgE
import React, { FC, useState } from 'react'
import styled from 'styled-components'

import './../tooltip.scss'

/*
  <Tabs defaultValue={'1'} onChange={(value) => console.log(value)}>
    <Tabs.Item value='1' label='Um'/>
    <Tabs.Item value='2' label='Dois'/>
    <Tabs.Item value='3' label='Três'/>
  </Tabs>
*/

type TabsProps = {
  defaultValue: string
  onChange: (value: string) => void
  children: React.ReactElement<TabsItemProps>[] // necessário p/ que child sejá válido dentro de React.Children.map
}
export const Tabs: FC<TabsProps> & { Item: FC<TabsItemProps> } = (props) => {
  const [checkedValue, setCheckedValue] = useState(props.defaultValue)

  // adiciona novas props em todos os filhos, antes de renderizá-los
  const childElements = React.Children.map(props.children, (child) =>
    React.cloneElement(child, {
      checked: child.props.value === checkedValue,
      onCheck: (value: string) => {
        setCheckedValue(value)
        props.onChange(value)
      },
    })
  )

  return <Wrapper>{childElements}</Wrapper>
}
const Wrapper = styled.div`
  display: flex;
  position: relative;
  background-color: #fff;
  height: var(--form-item-height);
  border-radius: var(--border-radius);
  border: var(--border);
  * {
    z-index: 2;
  }
`

type TabsItemProps = {
  value: string
  tooltip?: string
  label?: string
  Icon?: { checked: React.ReactNode; unchecked: React.ReactNode }

  // passado pelo componente pai Tabs
  checked?: boolean
  onCheck?: (value: string) => void
}
export const TabsItem: FC<TabsItemProps> = (props) => {
  return (
    <>
      <RadioInput
        id={props.value}
        checked={props.checked}
        onChange={() => (props.onCheck ? props.onCheck(props.value) : null)}
      />
      <Label htmlFor={props.value} data-tooltip={props.tooltip}>
        {props.Icon && (
          <IconWrapper>
            {props.checked ? props.Icon.checked : props.Icon.unchecked}
          </IconWrapper>
        )}
        {props.label}
      </Label>
    </>
  )
}
const RadioInput = styled.input.attrs({ type: 'radio' })`
  display: none;

  &:checked {
    & + label {
      color: var(--primary);
    }
  }
`
const Label = styled.label`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 70px;
  color: black;
  font-size: 14px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: color 50ms ease-in;

  &:hover {
    background-color: var(--foreground-hover);
  }
`
const IconWrapper = styled.span.attrs({ role: 'img' })`
  width: 22px;
  height: 22px;
`

Tabs.Item = TabsItem
export default Tabs
