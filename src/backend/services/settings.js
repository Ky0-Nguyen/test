// Main settings will contain all the neccessary information of the system
const settings = {
  server: {
    etherscan: {
      url: 'https://api.etherscan.io/api?'
    },
    bitcoinaverage: {
      url: 'https://apiv2.bitcoinaverage.com/'
    },
    amazonapi: {
      url: 'https://5q5y954f4a.execute-api.ap-northeast-1.amazonaws.com/'
    },
    coinmarketcapApi: {
      url: 'https://api.coinmarketcap.com/v1/ticker/'
    },
    ethplorer: {
      url: 'https://api.ethplorer.io/',
      key: 'bacoor9624273',
      limit: 1000
    }
  },
  intervalTime: {
    refreshExchangeRate: 300
  },
  gas: {
    externalAcc: 21000,
    externalToken: 150000,
    extraGas: 50000
  },
  keyConvertMoney: {
    publickey: 'Y2RhZDk0NzRkYjM5NGIzMGFhMDIwMDRiMWY4Zjc2Yjc',
    secretkey: 'MWVkMzc1ZDljMTUwNGNkNGFkZWE0ZTQwOTNiNDMxZjdjNjAzNDllYmI0NDE0ZDBiOWVkMmRhYThlMzU3N2FlNg'
  }
}

export default settings
