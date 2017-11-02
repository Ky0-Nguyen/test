import Settings from '../constants/settings'
// import QueryString from 'query-string'

/**
 * NAME: TokenService
 * CREATOR: Khiem
 * Provides the service to get Token data from sever
 * FUNCTION
 * getExchangeRateFromCryptoToFiatMoney()
 * fetchData()
 */
export default class TokenService {
  /**
   * NAME: getExchangeRateFromCryptoToFiatMoney
   * PARAMS: cryptoType (ETH, BTC), fiatMoney (USD, JPY)
   * Get the exchange amount from 1 crypto to ? fiat money
   * RETURN fiat money value after converting
   */
  static async getTokenData () {
    let module = 'token_db_api/'
    let action = 'scan'
    let queryStr = module + action

    return this.fetchData(queryStr)
  }
  static async fetchData (queryStr) {
    let apiurl = Settings.server.amazonapi.url + queryStr

    try {
      let response = await fetch(apiurl)

      let responJson = await response.json()
      let array = []

      responJson.forEach(function (element) {
        array.push({
          id: element.id,
          name: element.token_name,
          tokenAddress: element.contract_address,
          cardImage: element.card_file_path,
          iconImage: element.icon_file_path,
          symbol: element.symbol,
          url: element.url
        })
      }, this)
      if (array.length > 0) {
        return array
      } else {
        return []
      }
    } catch (error) {
      throw error
    }
  }
}
