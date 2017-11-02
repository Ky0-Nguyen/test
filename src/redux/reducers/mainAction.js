import createReducer from '../lib/createReducer'
import * as types from '$/constants/types'
import { initState } from '$/global-constants'
/*
  * NAME: pincode
  * PARAM: 
  * value  pincode in redux
  */
export const qrCode = createReducer(initState.initPin, {
  [types.SET_QRCODE] (state, action) {
    return action.payload
  }
})

export const tokenData = createReducer(initState.initData, {
  [types.SET_TOKEN] (state, action) {
    return action.payload
  }
})

export const internet = createReducer(initState.internetInit, {
  [types.SET_INTERNET] (state, action) {
    return action.payload
  }
})

export const balance = createReducer(initState.initBalance, {
  [types.SET_BALANCE] (state, action) {
    return action.payload
  }
})
