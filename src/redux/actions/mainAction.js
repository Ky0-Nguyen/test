import * as types from '$/constants/types'
import store from 'react-native-simple-store'
// SET DATA for QrCode
export function setQRCode (qrCode) {
  return {
    type: types.SET_QRCODE,
    payload: qrCode
  }
}

export function setToken (tokenData) {
  store.save(types.SET_TOKEN, tokenData)
  return {
    type: types.SET_TOKEN,
    payload: tokenData
  }
}

export function setInternet (internet) {
  return {
    type: types.SET_INTERNET,
    payload: internet
  }
}

export function setBalance (balance) {
  return {
    type: types.SET_BALANCE,
    payload: balance
  }
}
