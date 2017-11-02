import createReducer from '../lib/createReducer'
import * as types from '$/constants/types'
import { initState } from '$/global-constants'

export const currency = createReducer(initState.initCurrency, {
  [types.SET_CURRENCY] (state, action) {
    return action.payload
  }
})
