import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput, Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { height } from 'react-native-dimension'
import Spinner from 'react-native-loading-spinner-overlay'
import { Actions } from 'react-native-router-flux'

// redux
import { bindActionCreators } from 'redux'
import { setAccount } from '#/actions/accountActions'

// Alert
import DropdownAlert from '../../components/DropdownAlert/DropdownAlert'
import Text from '../../components/CustomText/CustomText'

// lib of blockchain
import bip39 from 'react-native-bip39'
// import EtherLib from '~/lib/noahLibrary'

// Ionicons
import Ionicons from 'react-native-vector-icons/Ionicons'

import i18n from '$/translations'

import NavBarView from '$/navBarView'
import { background, colors } from '$/globalStyles'

// styles 
import styles from './styles'

/**
 * NAME: RestoreWallet
 * CREATOR: TUAN
 * restore wallet with passphrase 
 * FUNCTION
 * onPressedNext
 */

class RestoreWallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mnemonic: '',
      visible: false
    }
    this.onPressedNext = this.onPressedNext.bind(this)
  }

  /*
  * NAME: onPressedNext
  * PARAM:
  * push to screen Terms of service
  */
  onPressedNext () {
    const { mnemonic } = this.state
    Keyboard.dismiss()
    // Checking Mnemonic type
    if (bip39.validateMnemonic(mnemonic) === true) {
      Actions.termOfService({mnemonic: mnemonic})
    } else {
      this.showAlert(i18n.t('RestoreWallet.error'))
    }
  }
  /**
   * NAME: showAlert
   * PARAMS: message  
   * Show message error
   * RETURN
   */
  showAlert (message) {
    this.dropdown.alertWithType('error', message)
  }
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { visible } = this.state
    return (
      <View style={{flex: 1}}>
        <Spinner visible={visible} textContent={'Loading...'} textStyle={styles.textStyleSpinner} />
        <View style={background}>
          {/* Navigator */}
          <NavBarView type='Back' title = {i18n.t('SetupWallet.Restore')}/>
          <View style= {styles.view1}>
            <Text>{i18n.t('RestoreWallet.message')}</Text>
          </View>
          <View style= {styles.view2}>
            <TextInput
              style={ styles.textInput }
              placeholder={i18n.t('RestoreWallet.enter')}
              underlineColorAndroid={'transparent'}
              elevation={10}
              numberOfLines={2}
              multiline={true}
              onChangeText={text => this.setState({ mnemonic: text })}/>
          </View>
          <View style= {styles.view3}>
            <TouchableOpacity style= {styles.btn} onPress={() => this.onPressedNext()}>
              <Ionicons name ={'ios-checkmark-circle'} size= {height(8)} color={colors.primary}/>
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
  }
}

//  Redux 
function mapStateToProps (state) {
  return {
    account: state.account
  }
}
function mapDispatchToProps (dispatch) {
  return {
    setAccount: bindActionCreators(setAccount, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RestoreWallet)
