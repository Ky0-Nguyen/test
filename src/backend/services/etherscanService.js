import Settings from './settings'
import QueryString from 'query-string'

/**
 * NAME: ETHERSCAN SERVICE
 * CREATOR: STEVEN
 * Handle calling rest api to etherscan
 */
export default class EtherscanServices {
  /**
   * getEtherBalance() returns balance of the account
   * based on the passed-in ethereum address
   */
  static async getEtherBalance (ethAddress) {
    let queryStr = QueryString.stringify({
      module: 'account',
      action: 'balance',
      address: ethAddress,
      tag: 'latest'
    })

    return this.fetchData(queryStr)
  }

  /**
   * getEtherBalanceForMultipleAddresses() returns balances of the multiple accounts
   * based on the passed-in ethereum addresses array
   */
  static async getEtherBalanceForMultipleAddresses (...ethAddresses) {
    let queryStr = QueryString.stringify({
      module: 'account',
      action: 'balancemulti',
      address: ethAddresses.join(),
      tag: 'latest'
    })

    return this.fetchData(queryStr)
  }

  /**
   * getNormalTransactionByAddress() returns a list of normal transaction
   * based on the passed-in ethereum address
   */
  static async getNormalTransactionByAddress (ethAddress, pageNumber, offset) {
    let queryStr = QueryString.stringify({
      module: 'account',
      action: 'txlist',
      address: ethAddress,
      startblock: 0,
      page: pageNumber,
      offset: offset,
      sort: 'desc'
    })

    return this.fetchData(queryStr)
  }

  /**
   * getEtherBalanceForMultipleAddresses() returns balances of the multiple accounts
   * based on the passed-in ethereum addresses array
   */
  static async checkContractExecutionStatus (txhash) {
    let queryStr = QueryString.stringify({
      module: 'transaction',
      action: 'getstatus',
      txhash: txhash
    })

    return this.fetchData(queryStr)
  }

  /**
   * getEventLogs() returns the event log from specified blog to the latest blog
   * based on the passed-in starting block, ethereum address and topic
   */
  static async getEventLogs (fromBlock, ethAddress, topic) {
    let queryStr = QueryString.stringify({
      module: 'logs',
      action: 'getLogs',
      fromBlock: fromBlock,
      toBlock: 'latest',
      address: ethAddress,
      topic0: topic
    })

    return this.fetchData(queryStr)
  }

  /**
   * getCode() returns code at a given address
   * based on the passed-in address
   */
  static async getCode (toAddress) {
    let queryStr = QueryString.stringify({
      module: 'proxy',
      action: 'eth_getCode',
      address: toAddress,
      tag: 'latest'
    })

    return this.fetchData(queryStr)
  }

  /**
   * getGasPrice() returns the current price per gas in wei.
   */
  static async getGasPrice () {
    let queryStr = QueryString.stringify({
      module: 'proxy',
      action: 'eth_gasPrice'
    })

    return this.fetchData(queryStr)
  }

  /**
   * estimateGas() returns the estimated gas when sending ether
   * based on the passed-in address, value, gas price and gas
   */
  static async estimateGas (address, value, gasPrice, gas) {
    let queryStr = QueryString.stringify({
      module: 'proxy',
      action: 'eth_estimateGas',
      to: address,
      value: value,
      gasPrice: gasPrice,
      gas: gas
    })

    return this.fetchData(queryStr)
  }
  /**
   * estimateGas() returns the estimated gas when sending ether
   * based on the passed-in address, value, gas price and gas
   */
  static async estimateGasToken (address, data, gasPrice, gas) {
    let queryStr = QueryString.stringify({
      module: 'proxy',
      action: 'eth_estimateGas',
      to: address,
      value: 0x0,
      gasPrice: gasPrice,
      gas: gas,
      data: data
    })
    return this.fetchData(queryStr)
  }

  /**
   * getERC20TokenAccountBalanceByContractAddress() returns ERC20 token account balance
   * based on the passed-in contract address and address
   */
  static async getERC20TokenAccountBalanceByContractAddress (contractAddress, address) {
    let queryStr = QueryString.stringify({
      module: 'account',
      action: 'tokenbalance',
      contractaddress: contractAddress,
      address: address,
      tag: 'latest'
    })
    return this.fetchData(queryStr)
  }

  /**
   * getNounce() returns nounce value
   * based on the passed-in ethereum address
   */
  static async getNounce (ethAddress) {
    let queryStr = QueryString.stringify({
      module: 'proxy',
      action: 'eth_getTransactionCount',
      address: ethAddress,
      tag: 'latest'
    })

    return this.fetchData(queryStr)
  }

  static async sendRawTransaction (hexTransaction) {
    let queryStr = QueryString.stringify({
      module: 'proxy',
      action: 'eth_sendRawTransaction',
      hex: hexTransaction
    })
    return this.fetchData(queryStr)
  }
  static async getReceiptTransaction (txhash) {
    let queryStr = QueryString.stringify({
      module: 'proxy',
      action: 'eth_getTransactionReceipt',
      txhash: txhash
    })

    return this.fetchData(queryStr)
  }

  /**
   * fetchData() returns the result from rest api call using build-in fetch() of react
   * based on the passed-in pre-defined query string
   */
  static async fetchData (queryStr) {
    let apiurl = Settings.server.etherscan.url + queryStr
    try {
      let response = await fetch(apiurl)
      let responJson = await response.json()
      if (responJson.result) {
        return responJson.result
      } else {
        throw responJson.error
      }
    } catch (error) {
      throw error
    }
  }
}
