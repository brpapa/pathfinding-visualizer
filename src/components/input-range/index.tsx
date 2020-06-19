import React from 'react'

export const InputRange: React.FunctionComponent<{
  value: number
  minValue: number
  maxValue: number
  step: number
  label?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = (props) => {
  return (
    <label>
        {props.label || null}
      <input
        type='range'
        className={'form-range'}
        value={props.value}
        min={props.minValue}
        max={props.maxValue}
        step={props.step}
        onChange={props.onChange}
      />
    </label>
  )
}
