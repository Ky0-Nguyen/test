import createReducer from '../lib/createReducer'
import * as types from '$/constants/types'
import { initState } from '$/global-constants'
/*
  * NAME: account
  * PARAM: 
  * value  account in redux
  */
export const account = createReducer(initState.initData, {
  [types.SET_ACCOUNT] (state, action) {
    return action.payload
  }
})
export const isTouchMenu = createReducer(initState.initData, {
  [types.SET_ISTOUCH] (state, action) {
    return action.payload
  }
})
