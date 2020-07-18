import React from 'react'
// import { State } from './types'
import { Action } from './types'

// export const StateContext = React.createContext<State | undefined>(undefined)
export const DispatchContext = React.createContext<{
  dispatch: React.Dispatch<Action>
}>({ dispatch: () => {} })