import * as types from '$/constants/types'
import store from 'react-native-simple-store'

/*
  * NAME: setPinCode
  * PARAM: pincode -> value pincode for function.
  * set pincode to store
  */
export function setPinCode (pincode) {
  store.save(types.SET_PINCODE, pincode)
  return {
    type: types.SET_PINCODE,
    payload: pincode
  }
}
