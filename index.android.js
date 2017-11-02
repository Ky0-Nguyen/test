import './shim'
import { AppRegistry } from 'react-native'
import App from './src/noahwallet'
import { textDefault } from './src/global/globalStyles'
import { setCustomText } from 'react-native-global-props'
import './ReactotronConfig'
const globalText = {
  style: textDefault
}
setCustomText(globalText)
AppRegistry.registerComponent('noahwallet', () => App)
