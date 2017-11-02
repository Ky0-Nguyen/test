import {Platform} from 'react-native'
import I18n from 'react-native-i18n'

/**
 * Enum of screens in body of Wallet Top View
 */

global.IOS = Platform.OS === 'ios'

export const WalletTopComponents = {
  TRANSACTION_HISTORY: 0,
  SEND_NOAH_TOKEN: 1,
  CONFIRM_SEND_TOKEN: 2,
  RECEIVE_TOKEN: 3
}

export const ComponentTransitionType = {
  SlideUp: 0,
  SlideDown: 1
}
export const formatNumber = (number, precision) => {
  let value = I18n.toNumber(number, {separator: '.', precision: precision || 8, delimiter: ','})
  return value
}
