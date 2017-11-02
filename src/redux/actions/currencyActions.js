import * as types from '$/constants/types'
import store from 'react-native-simple-store'

export function setCurrency (currency) {
  store.save(types.SET_CURRENCY, currency)
  return {
    type: types.SET_CURRENCY,
    payload: currency
  }
}
