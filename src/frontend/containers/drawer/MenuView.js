import React, {Component} from 'react'
import {
  View, FlatList, Text, TouchableWithoutFeedback
} from 'react-native'

import NavBarMenu from '$/navBarMenu'
import { backgroundMenu, colors } from '$/globalStyles'
import i18n from '$/translations'
import { connect } from 'react-redux'
import styles from './styles'
import { Actions } from 'react-native-router-flux'
import { setTouchMenu } from '#/actions/accountActions'
import { bindActionCreators } from 'redux'
/*
 * NAME: MenuView
 * CREATOR: TUAN
 * render view menu  , navbar, menu
 * FUNCTION
 * onClick
 * renderRow
 */
class MenuView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colorClick: colors.primary,
      txtClick: '#FFFFFF',
      selectItem: null
    }
  }
  componentWillReceiveProps (props) {
    this.setState({})
  }
  onClickMenu (key) {
    const { pincode, clickRegionalCurrency, clickSettingPINCode, clickSettingLanguage } = this.props
    switch (key) {
    case 1:
      clickRegionalCurrency()
      break
    case 2 :
      clickSettingLanguage()
      break
    case 3 :
      clickSettingPINCode()
      break

    case 4:
      if (pincode) {
        Actions.pinCode({ types: 'ConfirmPinCode',
          title: i18n.t('SettingPinCode.titleConfirm'),
          nextScreen: 'displayBackupPhrase'})
      } else {
        Actions.displayBackupPhrase()
      }
      break
    case 5:
      if (pincode) {
        Actions.pinCode({ types: 'ConfirmPinCode',
          title: i18n.t('SettingPinCode.titleConfirm'),
          nextScreen: 'displayPrivateKey' })
      } else {
        Actions.displayPrivateKey()
      }
      break
    case 6 :
      Actions.privacyPolicy({parentView: 'Menu'})
      break
    case 7 :
      Actions.termOfService({parentView: 'Menu'})
      break
    case 8 :
      Actions.about()
      break
    default:
      break
    }
  }
  /**
   * renderRow
   * render row of menu with  param item
   */
  renderRow = ({index, item}) => {
    const {setTouchMenu, isTouchMenu} = this.props
    const { colorClick, txtClick, selectItem } = this.state
    return (
      <TouchableWithoutFeedback
        delayLongPress={1000}
        onPressIn={() => this.setState({
          colorClick: '#FFFFFF',
          txtClick: colors.primary,
          selectItem: index
        })}
        onPressOut={() => this.setState({
          colorClick: colors.primary,
          txtClick: '#FFFFFF',
          selectItem: null
        })}
        onPress={() => {
          if (isTouchMenu) {
            setTouchMenu(false)
            this.onClickMenu(item.key)
          }
        }}>
        <View style={[styles.buttonView, {backgroundColor: selectItem === index ? colorClick : colors.primary}]}>
          <Text style={[styles.titleButton, {color: selectItem === index ? txtClick : '#FFFFFF'}]}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  render () {
    var data = [
      { key: 1, title: i18n.t('Menu.Currency') },
      { key: 2, title: i18n.t('Menu.SettingLanguage') },
      { key: 3, title: i18n.t('Menu.PinCodeSetting') },
      { key: 4, title: i18n.t('Menu.DisplayPassphrase') },
      { key: 5, title: i18n.t('Menu.DisplayPrivateKey') },
      { key: 6, title: i18n.t('Menu.PrivacyPolicy') },
      { key: 7, title: i18n.t('Menu.TermsOfService') },
      { key: 8, title: i18n.t('Menu.About') }
    ]
    const {clickBack} = this.props
    return (
      <View style={backgroundMenu}>
        <NavBarMenu
          onPress={clickBack}
          type='main' title ={i18n.t('Initial.title')}/>
        <View style={styles.leftBottom}>
          <FlatList
            data={data}
            renderItem={this.renderRow} />
          <View style={styles.textView}>
            <Text style={styles.txtVersion}>{i18n.t('Menu.Version')}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pincode: state.pincode,
    isTouchMenu: state.isTouchMenu,
    language: state.language
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTouchMenu: bindActionCreators(setTouchMenu, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuView)
