import createReducer from '../lib/createReducer'
import * as types from '$/constants/types'
import { initState } from '$/global-constants'
/*
  * NAME: pincode
  * PARAM: 
  * value  pincode in redux
  */
export const pincode = createReducer(initState.initPin, {
  [types.SET_PINCODE] (state, action) {
    return action.payload
  }
})
