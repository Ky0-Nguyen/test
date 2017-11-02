// base component
import QueryString from 'query-string'
// global
import Settings from '$/constants/settings'

export default class EthPlorerService {
  static async getTokenTransactions (address, tokenAddress, limit) {
    let action = 'getAddressHistory/'
    let queryStr = action + address + '?' + QueryString.stringify({
      token: tokenAddress,
      apiKey: Settings.server.ethplorer.key,
      limit: limit || Settings.server.ethplorer.limit

    })

    return this.fetchData(queryStr)
  }

  static async fetchData (queryStr, type) {
    let apiurl = Settings.server.ethplorer.url + queryStr
    try {
      let response = await fetch(apiurl)
      let responJson = await response.json()
      if (responJson) {
        return responJson
      }
    } catch (error) {
      throw error
    }
  }
}
