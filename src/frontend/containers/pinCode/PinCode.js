import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// base component 
import {width, height} from 'react-native-dimension'
import { Actions, ActionConst } from 'react-native-router-flux'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setPinCode } from '#/actions/pinCodeActions'

// multilaguage 
import i18n from '$/translations'

// custom component
import Text from '../../components/CustomText/CustomText'
import NavBarView from '$/navBarView'
import DropdownAlert from '../../components/DropdownAlert/DropdownAlert'
import ActionButton from '../../components/actionButton/ActionButton'

// style
import { background, colors } from '$/globalStyles'

// value of pin code 
const MAX_LENGTH = 4

// make dot of pincode
function makeDots (num) {
  let ret = ''
  while (num > 0) {
    ret += ' ○ '
    num--
  }
  return ret
}
/*
 * NAME: PinCode
 * CREATOR: TUAN
 * setup Pin code, change pincode , remove pincode
 * FUNCTION
 * handleClear
 * handlePress
 * handleRemove
 * renderButton
 */

class PinCode extends React.Component {
  constructor (props) {
    super(props)
    this.screen = this.props.types
    this.titleScreen = this.props.title
    this.state = {
      value: '',
      txtTitle: i18n.t('SettingPinCode.inputNew'),
      inputCorrectPINCount: 0,
      temporaryNewPIN: '',
      modMessage: 'heyllo',
      isTouch: true
    }
    // this.showMessage = this.showMessage.bind(this)
  }
  /**
 * FUNCTION handleClear
 * PARAM: 
 * clear input value
 * 
 */
  handleClear = () => {
    this.setState({value: ''})
  }

  componentWillMount () {
    if (this.screen === 'SetupPinCode') { // screen SetupPinCode
      this.setState({
        inputCorrectPINCount: 0,
        txtTitle: i18n.t('SettingPinCode.inputNew')
      })
    } else if (this.screen === 'ChangePinCode' || this.screen === 'ConfirmPinCode') { // screen ChangePinCode
      this.setState({
        inputCorrectPINCount: -1,
        txtTitle: i18n.t('SettingPinCode.inputCurrent')
      })
    } else {
      this.setState({
        inputCorrectPINCount: 0,
        txtTitle: i18n.t('SettingPinCode.inputCurrent')
      })
    }
  }
  /**
 * FUNCTION handlePress
 * PARAM: num -> number input value
 * handle press button
 * 
 */
  handlePress (num) {
    let {value} = this.state
    var self = this
    value += String(num)

    this.setState({value})
    if (value.length === MAX_LENGTH) {
      this.handleClear()
      if (this.screen === 'ConfirmPinCode') {
        if (value === this.props.pincode) {
          if (this.props.nextScreen === 'displayBackupPhrase') {
            Actions.displayBackupPhrase({type: ActionConst.REPLACE})
          } else {
            Actions.displayPrivateKey({type: ActionConst.REPLACE})
          }
        } else {
          this.showAlert(i18n.t('PinCode.Error'), 'error')
          this.setState({ isTouch: false })
          setTimeout(function () {
            self.setState({ isTouch: true })
          }, 1700)
        }
      } else if (this.screen === 'SetupPinCode') {
        if (this.state.inputCorrectPINCount === 0) {
        // set State inputCorrectPINCount, temporaryNewPIN, txtTitle
          this.setState({
            inputCorrectPINCount: 1,
            temporaryNewPIN: value,
            txtTitle: i18n.t('SettingPinCode.inputConfirm')
          })
        } else {
          if (this.state.temporaryNewPIN.toString() === value) {
            this.props.setPinCode(value)
            this.showAlert(i18n.t('PinCode.Setup'))
            this.setState({ isTouch: false })
            const self = this
            setTimeout(function () {
              self.setState({ isTouch: true })
              self.props.onBack()
            }, 1700)
          } else {
            this.showAlert(i18n.t('PinCode.Error'), 'error')
            this.setState({ inputCorrectPINCount: 1, isTouch: false })
            setTimeout(function () {
              self.setState({ isTouch: true })
            }, 1700)
          }
        }
      } else if (this.screen === 'ChangePinCode') {
        if (this.state.inputCorrectPINCount === -1) {
          if (value.toString() === this.props.pincode.toString()) {
            this.setState({
              txtTitle: i18n.t('SettingPinCode.inputNew'),
              inputCorrectPINCount: 0
            })
          } else {
            this.showAlert(i18n.t('PinCode.Error'), 'error')
            this.setState({inputCorrectPINCount: -1, isTouch: false})
            setTimeout(function () {
              self.setState({ isTouch: true })
            }, 1700)
          }
          // ---------_END_------------
        } else if (this.state.inputCorrectPINCount === 0) { // // Done input new 4 digits the first time or after reseting by input wrong PIN
          // setState inputCorrectPINCount to 1, temporaryNewPIN to newCode, txtTitle
          this.setState({
            inputCorrectPINCount: 1,
            temporaryNewPIN: value,
            txtTitle: i18n.t('SettingPinCode.inputConfirm')
          })
        } else {
          if (this.state.temporaryNewPIN.toString() === value) {
            this.setState({ isTouch: false })
            this.props.setPinCode(value)
            this.showAlert(i18n.t('PinCode.Change'))
            const self = this
            setTimeout(function () {
              self.setState({ isTouch: true })
              self.props.onBack()
            }, 1700)
          } else {
            // setState inputCorrectPINCount 0
            this.showAlert(i18n.t('PinCode.Error'), 'error')
            this.setState({inputCorrectPINCount: 1, isTouch: false})
            setTimeout(function () {
              self.setState({ isTouch: true })
            }, 1700)
          }
        }
      } else if (this.screen === 'RemovePinCode') {
        if (value.toString() === this.props.pincode.toString()) {
          this.props.setPinCode('')
          this.showAlert(i18n.t('PinCode.Remove'))
          this.setState({ isTouch: false })
          const self = this
          setTimeout(function () {
            self.setState({ isTouch: true })
            self.props.onBack()
          }, 1700)
        } else {
          this.showAlert(i18n.t('PinCode.Error'), 'error')
          this.setState({ isTouch: false })
          setTimeout(function () {
            self.setState({ isTouch: true })
          }, 1700)
        }
      }
    }
  }
  /**
 * FUNCTION handleRemove
 * PARAM:
 * remove 1 value input
 * 
 */
  handleRemove = () => {
    const {value} = this.state
    this.setState({value: value.substr(0, value.length - 1)})
  }
  /**
 * FUNCTION renderButton
 * PARAM: num
 * create keyboard for pincode
 * 
 */
  renderButton (num) {
    return (
      <ActionButton
        btnColor={colors.main}
        glowColor={colors.primary}
        borderColor={colors.primary}
        btnItems={ <Text style={styles.txtPinStyle}>{num}</Text>}
        btnAction={() => this.state.isTouch && this.handlePress(num)}
        size={height(12)}/>
    )
  }
  /**
 * renderAction
 * @param {*} name 
 * @param {*} action 
 * render acction view
 */
  renderAction (name, action) {
    return (
      <ActionButton
        btnItems={ <Text style={styles.txtClearStyle}>{name}</Text>}
        btnAction={() => action()}
        size={height(10)}
        btnColor={colors.main}
        borderColor={'transparent'}
        glowColor={colors.main}/>
    )
  }
  /**
   * NAME: showAlert
   * PARAMS: message
   * Show message 
   * RETURN
   */
  showAlert (message, type) {
    if (type && type === 'error') {
      this.dropdown.alertWithType('error', message)
    } else {
      this.dropdown.alertWithType('info', message)
    }
  }
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const {value} = this.state
    const marks = value.replace(/./g, ' ● ')
    const dots = makeDots(MAX_LENGTH - value.length)

    return (
      <View style={{flex: 1}}>
        <View style={background}>
          {/* Navigator */}
          <NavBarView type='Back' title = {this.titleScreen}/>
          <View style={styles.pad} ref='settingPinCode'>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>{this.state.txtTitle}</Text>
              <View style={styles.row}>
                <Text style={[ styles.pin ]} >{marks}{dots}</Text>
              </View>
            </View>
            {/* render keyboard */}
            <View style={styles.viewBtn1} >
              {this.renderButton(1)}
              {this.renderButton(2)}
              {this.renderButton(3)}
            </View>

            <View style={styles.viewBtn1} >
              {this.renderButton(4)}
              {this.renderButton(5)}
              {this.renderButton(6)}
            </View>

            <View style={styles.viewBtn1} >
              {this.renderButton(7)}
              {this.renderButton(8)}
              {this.renderButton(9)}
            </View>

            <View style={styles.viewBtn1} >
              {this.renderAction(i18n.t('button.Clear'), this.handleClear)}
              {this.renderButton(0)}
              {this.renderAction(i18n.t('button.Delete'), this.handleRemove)}
            </View>

          </View>
        </View>
        <DropdownAlert
          updateStatusBar={false}
          closeInterval={1500}
          ref={(ref) => { this.dropdown = ref }}
        />
      </View>
    )
  }
}
function mapStateToProps (state) {
  return {
    pincode: state.pincode,
    onBack: state.onBack
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPinCode: bindActionCreators(setPinCode, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PinCode)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    height: height(5)
  },
  viewTitle: {
    height: height(20),
    justifyContent: 'center'
  },
  title: { fontSize: width(5), alignSelf: 'center' },
  pad: {
    flex: 1
  },
  viewBtn1: { width: width(52), height: height(15), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between' },
  btn: {
    fontSize: height(5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(2.5),
    paddingHorizontal: width(5.5),
    textAlign: 'center',
    marginVertical: width(1),
    marginHorizontal: width(3),
    color: colors.primary,
    borderWidth: height(0.1),
    borderColor: colors.primary,
    borderRadius: height(7)
  },
  pin: {
    fontSize: width(6.5),
    fontWeight: '500',
    color: colors.primary
  },
  txtClearStyle: {
    fontSize: width(5)
  },
  txtPinStyle: {
    fontSize: width(8),
    color: colors.primary
  }
})
