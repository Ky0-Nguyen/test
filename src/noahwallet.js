import React, { Component } from 'react'

// base component
import { Router } from 'react-native-router-flux'

// router config
import scenes from './global/config/routes'

// redux
import {Provider} from 'react-redux'
import { checkStoreRedux } from './redux/lib/createReducer'
import configureStore from './redux/store/configureStore'
import * as types from './global/constants/types'

// actions redux
import { setPinCode } from './redux/actions/pinCodeActions'
import { setAccount } from './redux/actions/accountActions'
import { setCurrency } from './redux/actions/currencyActions'
import { setLanguage } from './redux/actions/language'
import { setToken } from './redux/actions/mainAction'

// global
import { initState } from './global/global-constants'

export default class noahwallet extends Component {
  render () {
    const store = configureStore()
    checkStoreRedux(store, types.SET_PINCODE, setPinCode, initState.initPin)
    checkStoreRedux(store, types.SET_ACCOUNT, setAccount, initState.initData)
    checkStoreRedux(store, types.SET_LANGUAGE, setLanguage, initState.initLanguage)
    checkStoreRedux(store, types.SET_CURRENCY, setCurrency, initState.initCurrency)
    checkStoreRedux(store, types.SET_TOKEN, setToken, initState.initCurrency)
    return (
      <Provider store={store}>
        <Router scenes={scenes}/>
      </Provider>
    )
  }
}
