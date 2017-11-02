import React, { Component } from 'react'

import Drawer from '@/components/Drawer'
// base component

// multi language 

import MenuView from './MenuView'
import RegionalCurrency from '../regionalCurrency/RegionalCurrency'
import SettingPINCode from '../pinCode/PinCodeSetting'
import SettingLanguage from '../settingLanguage/SettingLanguage'
// redux 
import { connect } from 'react-redux'
import { setTouchMenu } from '#/actions/accountActions'
import { bindActionCreators } from 'redux'
// component

/**
 * NAME: Menu
 * CREATOR: TUAN
 * menu View
 * FUNCTION
 * componentWillReceiveProps()
 * renderScene ()
 */
class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openView: null
    }
  }
  /*
  * NAME: renderScene
  * renderScene router to view
  */
  renderScene () {
    switch (this.state.openView) {
    case 'RegionalCurrency': return (
      <RegionalCurrency
        showAlert={() => this.props.showAlert(I18n.t('Menu.CurrencyChange'))} clickBack={() => {
          this.drawers && this.drawers.closeLeftDrawer()
        }} />
    )
    case 'SettingPINCode': return (
      <SettingPINCode clickBack={() => { this.drawers && this.drawers.closeLeftDrawer() }} />)
    case 'SettingLanguage': return (
      <SettingLanguage reset={() => this.setState({})} clickBack={() => { this.drawers && this.drawers.closeLeftDrawer() }} />)
    }
  }
  /**
   * onClickBack
   * close menu or menu view 
   */
  onClickBack () {
    this.props.setTouchMenu(true)
    this.drawers && this.drawers.closeLeftDrawer()
  }
  /**
   * resetView
   * reset all view when change props
   */
  resetView () {
    this.props.reload()
    this.setState({})
  }
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    return (
      <Drawer
        ref={comp => { this.drawers = comp }}
        leftDrawerContent={
          this.state.openView === 'RegionalCurrency'
            ? <RegionalCurrency clickBack={() => this.onClickBack()}/>
            : (this.state.openView === 'SettingPINCode'
              ? <SettingPINCode clickBack={() => this.onClickBack()}/>
              : <SettingLanguage reset={() => this.resetView()} clickBack={() => this.onClickBack()}/>)
        }
        disabled={false}>
        <MenuView
          clickBack={this.props.clickBack}
          clickRegionalCurrency={() => {
            this.setState({ openView: 'RegionalCurrency' })
            this.drawers && this.drawers.openLeftDrawer()
          }
          }
          clickSettingPINCode ={() => {
            this.setState({ openView: 'SettingPINCode' })
            this.drawers && this.drawers.openLeftDrawer()
          }
          }
          clickSettingLanguage={() => {
            this.setState({ openView: 'SettingLanguage' })
            this.drawers && this.drawers.openLeftDrawer()
          }
          }
        />
      </Drawer>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    pinCode: state.pinCode
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTouchMenu: bindActionCreators(setTouchMenu, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
