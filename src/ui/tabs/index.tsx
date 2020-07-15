// TODO: https://codepen.io/brnpapa/pen/xxZwPgE
import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

/*
  <Tabs defaultValue={'1'} onChange={(value) => console.log(value)}>
    <Tabs.Item value='1' label='Um'/>
    <Tabs.Item value='2' label='Dois'/>
    <Tabs.Item value='3' label='Três'/>
  </Tabs>
*/

const biggerBorderRadius = '1.6em'
const smallerBorderRadius = '1.2em'

type TabsProps = {
  defaultValue: string
  onChange: (value: string) => void
  children: React.ReactElement<TabItemProps>[] // necessário p/ que child sejá válido dentro de React.Children.map
}
export const Tabs: FC<TabsProps> & { Item: FC<TabItemProps> } = ({
  defaultValue,
  onChange,
  children,
}) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    onChange(value)
  }, [value, onChange])

  // adiciona novas props em todos os filhos, antes de renderizá-los
  const childElements = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      checked: child.props.value === value,
      onCheck: (value: string) => {
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

type TabItemProps = {
  value: string
  tooltip?: string
  label?: string
  IconUnchecked?: React.ReactNode
  IconChecked?: React.ReactNode

  // passado pelo componente pai Tabs
  checked?: boolean
  onCheck?: (value: string) => void
}
export const TabItem: FC<TabItemProps> = (props) => {
  return (
    <>
      <Input
        type='radio'
        name='tabs'
        id={props.value}
        checked={props.checked}
        onChange={() => (props.onCheck ? props.onCheck(props.value) : null)}
      />
      <Label htmlFor={props.value} data-tooltip={props.tooltip}>
        <span role='img' style={{ width: 26, height: 26 }}>
          {props.checked ? props.IconUnchecked : props.IconChecked}
        </span>
        {props.label}
      </Label>
    </>
  )
}
const Input = styled.input`
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
  width: 100%; /* FIXME: temporário */
  font-size: 1.25rem;
  border-radius: ${smallerBorderRadius};
  cursor: pointer;
  transition: color 0.15s ease-in;
`

Tabs.Item = TabItem
export default Tabs
