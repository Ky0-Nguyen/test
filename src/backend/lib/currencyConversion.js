import CacheStore from '../utils/CacheStore'
import CurrencyService from '../services/CurrencyService'
import Settings from '../constants/settings'
import keyAsync from '../global/global-constants'
/**
 * NAME: CurrencyConversion
 * CREATOR: STEVEN
 * Provides the functions to exchange from crypto to fiat money and vice versal
 * FUNCTION
 * convertCryptoAmountToFiatMoneyAmount()
 * convertFiatMoneyAmountToCrytoAmount()
 * getExchangeRateFromCryptoToFiatMoneyFromCache()
 */
export default class CurrencyCoversion {
  /**
   * NAME: convertCryptoAmountToFiatMoneyAmount
   * PARAMS: cryptoType (ETH, BTC), fiatMoney (USD, JPY), cryptoAmount
   * Convert the specified amount of crypto to the coresponding fiat money amount
   * RETURN crypto value after converting
   */
  static async convertCryptoAmountToFiatMoneyAmount (cryptoType, fiatMoney, cryptoAmount) {
    try {
      var cryptoExchangeValue = await this.getExchangeRateFromCryptoToFiatMoneyFromCache(cryptoType, fiatMoney)
      let cryptoValue = cryptoAmount * cryptoExchangeValue
      return cryptoValue
    } catch (error) {
      return 0
    }
  }

  /**
   * NAME: convertCryptoAmountToFiatMoneyAmount
   * PARAMS: cryptoType (ETH, BTC), fiatMoney (USD, JPY), cryptoAmount
   * Convert the specified amount of crypto to the coresponding fiat money amount
   * RETURN crypto value after converting
   */
  static async convertTokenAmountToFiatMoneyAmount (tokenID, fiatMoney) {
    let tokenParse = tokenID + '/?'
    let convertMoney = 'convert=' + fiatMoney
    let apiurl = Settings.server.coinmarketcapApi.url + tokenParse + convertMoney
    try {
      let response = await fetch(apiurl)

      let responJson = await response.json()

      if (responJson.length > 0) {
        return responJson[0].price_usd
      } else {
        return []
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * NAME: convertFiatMoneyAmountToCrytoAmount
   * PARAMS: cryptoType (ETH, BTC), fiatMoney (USD, JPY), fiatMoneyAmount
   * Convert the specified amount of fiat money to the coresponding crypto amount
   * RETURN fiat money value after converting
   */
  static async convertFiatMoneyAmountToCrytoAmount (cryptoType, fiatMoney, fiatMoneyAmount) {
    try {
      var cryptoExchangeValue = await this.getExchangeRateFromCryptoToFiatMoneyFromCache(cryptoType, fiatMoney)
      let fiatMoneyValue = fiatMoneyAmount / cryptoExchangeValue
      return fiatMoneyValue
    } catch (error) { return 0 }
  }

  /**
   * NAME: getExchangeRateFromCryptoToFiatMoneyFromCache
   * PARAMS: cryptoType (ETH, BTC), fiatMoney (USD, JPY)
   * Get the exchange amount from 1 crypto to ? fiat money
   * Cache is also applied with pre-defined interval time to ensure the performance
   * RETURN fiat money value after converting
   */
  static async getExchangeRateFromCryptoToFiatMoneyFromCache (cryptoType, fiatMoney) {
    let value = await CacheStore.get(keyAsync.CryptoExchangeKey).catch(() => {})

    if (Array.isArray(value)) {
      var cachedFiatMoney = value[0]
      if (cachedFiatMoney === fiatMoney) {
        return value[1]
      }
    }

    try {
      var cryptoExchangeValue = await CurrencyService.getExchangeRateFromCryptoToFiatMoney(cryptoType, fiatMoney)
      let cacheValue = [fiatMoney, cryptoExchangeValue]
      CacheStore.set(keyAsync.CryptoExchangeKey, cacheValue, Settings.intervalTime.refreshExchangeRate)

      return cryptoExchangeValue
    } catch (error) {
      throw error
    }
  }
}
