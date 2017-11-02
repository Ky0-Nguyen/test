import createReducer from '../lib/createReducer'
import * as types from '$/constants/types'
import i18n from 'react-native-i18n'
import { initState } from '$/global-constants'

export const language = createReducer(initState.initLanguage, {
  [types.SET_LANGUAGE] (state, action) {
    i18n.locale = action.language
    return action.language
  }
})
