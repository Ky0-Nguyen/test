// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer
global.process = require('process')
global.process.env.NODE_ENV = 'development'// global.process.env.NODE_ENV ? 'development' : 'development'

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: 'file:'
}

global.crypto = {
  getRandomValues (byteArray) {
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = Math.floor(256 * Math.random())
    }
  }
}

export const initState = {
  initPin: '',
  initLanguage: '',
  initData: [],
  initCurrency: '',
  internetInit: true,
  initBalance: 0.00000000,
  istouch: true
}
export const validateAddress = (string) => {
  var reg = /^([A-Fa-f0-9_x]+)$/
  return reg.test(string)
}
export const countDots = (s1, letter) => {
  return (s1.match(RegExp(letter, 'g')) || []).length
}

export const validateMnemonic = (string) => {
  var reg = /^[a-zA-Z\s]*$/
  return reg.test(string)
}

export const validateNumber = (number) => {
  var reg = /^([0-9_.]+)$/
  return reg.test(number)
}

export const validateSpace = (string) => {
  return /\S/.test(string)
}

export const formatNumber = (number, precision) => {
  let value = I18n.toNumber(number, {separator: '.', precision: precision || 8, delimiter: ','})
  return value
}
export const commaGlobal = {
  comma: ',',
  semicolon: ';'
}

export const contractAddressNoah = '0x341c5c553853ade9a83c8036b230c30ed4089d6f'// '0x341c5c553853ade9a83c8036b230c30ed4089d6f'
export const tokenDecimalsNoah = 18

// Create key mapping for AsyncStorage
const keyAsync = {
  CryptoExchangeKey: 'CryptoExchangeKey'
}

export default keyAsync
