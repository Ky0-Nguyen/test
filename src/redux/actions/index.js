import * as LanguageActions from './language'
import * as ButtonActions from './buttonActions'
import * as PinCodeActions from './pinCodeActions'
import * as AccountActions from './accountActions'
import * as MainAction from './mainAction'
// currencyActions
import * as CurrencyActions from './currencyActions'

export const ActionCreators = Object.assign({},
  LanguageActions,
  ButtonActions,
  PinCodeActions,
  AccountActions,
  CurrencyActions,
  MainAction
)
