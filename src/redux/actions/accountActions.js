import * as types from '$/constants/types'
import store from 'react-native-simple-store'

/*
  * NAME: setAccount
  * PARAM: account -> account array 
  * set account data
  */
export function setAccount (account) {
  store.save(types.SET_ACCOUNT, account)
  return {
    type: types.SET_ACCOUNT,
    payload: account
  }
}
export function setTouchMenu (isTouch) {
  return {
    type: types.SET_ISTOUCH,
    payload: isTouch
  }
}
