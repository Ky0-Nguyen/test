import React from 'react'
import { View, Text, TouchableOpacity, Clipboard } from 'react-native'

// redux
import { connect } from 'react-redux'
import {height} from 'react-native-dimension'

// style
import { background } from '$/globalStyles'
import styles from './styles'

// custom component
import CustomText, { CustomTextBold } from '../../components/CustomText/CustomText'
import NavBarView from '$/navBarView'

// multilanguage
import i18n from '$/translations'

// Alert
import DropdownAlert from '../../components/DropdownAlert/DropdownAlert'

/**
 * NAME: DisplayPrivateKey
 * CREATOR: Chau
 * Show the private key of current Noah Main account
 * User can copy to clipboard
 */

// Mark: Funcs
/**
* Copy private key to clipboard
*/
const onPressedCopy = (account) => {
  Clipboard.setString(account[0].privateKey)
  showAlert(i18n.t('TransactionHistory.Copied'))
}
/**
   * NAME: showAlert
   * PARAMS: message
   * Show message 
   * RETURN
   */
const showAlert = (message) => {
  this.dropdown.alertWithType('info', message)
}
// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
const DisplayPrivateKey = ({account, language}) => (
  // Mark: Render
  <View style={background} >
    <NavBarView type='back' title={i18n.t('DisplayPrivateKey.Title')} />
    <View style={styles.container}>
      <CustomTextBold >{i18n.t('DisplayPrivateKey.YourAccount')}</CustomTextBold>
      <CustomText>{account[0].address}</CustomText>
      <CustomTextBold >{i18n.t('DisplayPrivateKey.PrivateKey')}</CustomTextBold>
      <View style={styles.containerPri}>
        <CustomText style={styles.privateKey}>{account[0].privateKey}</CustomText>
        <TouchableOpacity style={styles.buttonCopy} onPress={() => onPressedCopy(account)} >
          <Text style={[styles.txtBtn, { marginTop: IOS ? (language === 'jp' ? height(0.5) : 0) : 0, marginBottom: IOS ? (language === 'en' ? height(0.5) : 0) : 0 }]}>{i18n.t('button.Copy')}</Text>
        </TouchableOpacity>
      </View>
    </View>
    {/* DropdownAlert */}
    <DropdownAlert
      updateStatusBar={false}
      closeInterval={1500}
      ref={(ref) => { this.dropdown = ref }}
    />
    {/* ---END---- */}
  </View>
)
//  Redux 
function mapStateToProps (state) {
  return {
    account: state.account, language: state.language
  }
}
export default connect(mapStateToProps)(DisplayPrivateKey)
