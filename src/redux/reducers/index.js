import { combineReducers } from 'redux'
import * as languageReducer from './language'
import * as buttonActionReducer from './buttonActions'
import * as pinCodeActionReducer from './pinCodeActions'
import * as accountActionReducer from './accountActions'
import * as mainAction from './mainAction'
// currencyActions
import * as CurrencyActionReducer from './currencyActions'
export default combineReducers(Object.assign(
  languageReducer,
  buttonActionReducer,
  pinCodeActionReducer,
  accountActionReducer,
  CurrencyActionReducer,
  mainAction
))
