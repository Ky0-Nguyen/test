import createReducer from '../lib/createReducer'
import * as types from '$/constants/types'

export const onBack = createReducer(null, {
  [types.SET_ONBACK] (state, action) {
    return action.payload
  }
})
