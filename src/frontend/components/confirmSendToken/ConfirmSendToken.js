import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Animated, Text, TextInput, Keyboard } from 'react-native'

// base component
import { height } from 'react-native-dimension'
import Spinner from 'react-native-loading-spinner-overlay'

// redux
import { connect } from 'react-redux'

// style
import styles from './styles'
import { btnStyleDefault } from '$/globalStyles'
// global
import { WalletTopComponents, ComponentTransitionType } from '$/constants/constants'
import i18n from '$/translations'

// backend
import EtherLib from '~/lib/noahLibrary'

// custom component
import CustomText, { CustomTextBold } from '../../components/CustomText/CustomText'
import CustomTextButton from '../../components/CustomText/CustomTextButton'

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
/**
 * NAME: ConfirmSendToken
 * CREATOR: Chau
 * Confirm sending token
 */
class ConfirmSendToken extends Component {
  constructor (props) {
    super(props)
    this.cancelSendToken = this.cancelSendToken.bind(this)
    this.state = ({
      contractAddress: props.tokenData.address,
      senderPrvKey: props.account[0].privateKey,
      senderAddress: props.account[0].address,
      sending: false,
      disabled: 'box-none',
      opacityNumber: new Animated.Value(1),
      valuePin: '',
      pincode: props.pincode,
      hideDot: true
      // opacityHideShow: new Animated.Value(1)
    })
    this.onPressConfirm = this.onPressConfirm.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }
  componentWillReceiveProps (props) {
    if (props.isShowFooter) {
      // this.visibilityBtnHideShow(1)
      this.refs.txtPin.focus()
    }
  }

  componentDidMount () {
    if (this.props.pincode) {
      this.setState({
        disabled: 'none',
        opacityNumber: new Animated.Value(0.7),
        hideDot: false
      })

      const self = this
      setTimeout(function () {
        self.refs.txtPin.focus()
        // self.props.preventHideKeyboard('always')
      }, 600)
    }
  }
  /**
   * Go to SendComfirm Screen
   */
  async onPressConfirm () {
    this.setState({sending: true, disabled: 'none'})
    this.visibilityTransform(0.7)
    const self = this
    if (this.props.internet) {
      await EtherLib.sendTokenAction(this.state.senderAddress, this.state.senderPrvKey, this.props.revAddress, this.props.revAmount, this.state.contractAddress, this.props.tokenData.decimal)
        .then(value => {
          self.setState({sending: false, disabled: 'box-none'})
          self.visibilityTransform(1)
          self.props.changeParentComponentID(WalletTopComponents.TRANSACTION_HISTORY, ComponentTransitionType.SlideDown)
          self.props.updateOldBalance(true, i18n.t('ConfirmSendToken.SendSuccess'))
        })
        .catch(error => {
          self.setState({sending: false, disabled: 'box-none'})
          self.visibilityTransform(1)
          self.props.showAlert(i18n.t('ConfirmSendToken.SendError'), 'error')
          if (error.message) {
            console.log(error.message)
          }
          setTimeout(function () {
            self.props.changeParentComponentID(WalletTopComponents.TRANSACTION_HISTORY, ComponentTransitionType.SlideDown)
          }, 1700)
        })
    } else {
      this.setState({sending: false, disabled: 'box-none'})
      this.props.showToustInternet()
      this.visibilityTransform(1)
      setTimeout(function () {
        self.setState({showInternet: false})
      }, 2000)
    }
  }

  /**
   * cancelSendToken: go back to transaction history
   */
  cancelSendToken () {
    this.props.changeParentComponentID(WalletTopComponents.SEND_NOAH_TOKEN, ComponentTransitionType.SlideDown)
    this.props.updateOldBalance(false, '')
    this.props.dataSimple(this.props.revAddress, this.props.revAmount)
  }

  /**
   * validate input
   */
  validateNumber = (number) => {
    var reg = /^([0-9_.]+)$/
    return reg.test(number)
  }
  /**
   * FUNCTION: onChangeText
   * @param {*} text 
   */
  onChangeText (text) {
    if (this.validateNumber(text)) {
      if (text.length <= 4) {
        this.setState({
          valuePin: text
        })
        if (text === this.state.pincode) {
          this.setState({
            hideDot: true,
            opacityNumber: new Animated.Value(1),
            disabled: 'box-none'
          })
          // this.visibilityBtnHideShow(0)
          this.props.showAlert(i18n.t('PinCode.Confirm'), 'success')
          this.props.setShowButton(false)
          Keyboard.dismiss()
        }
        if (text.length === 4 && text !== this.state.pincode) {
          this.props.showAlert(i18n.t('PinCode.Error'), 'error')
          const self = this
          setTimeout(function () {
            self.setState({
              valuePin: ''
            })
          }, 2500)
        }
      }
    } else {
      if (text.length === 0) {
        this.setState({
          valuePin: text
        })
      }
    }
  }
  /**
 * visibilityTransform
 * @param {*} bgTo 
 * animation
 */
  visibilityTransform (bgTo) {
    Animated.timing(this.state.opacityNumber, {
      toValue: bgTo,
      delay: 0,
      duration: 500
    }).start()
  }

  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { disabled, opacityNumber, sending, valuePin, hideDot } = this.state
    // const { pincode } = this.props
    const marks = valuePin.replace(/./g, ' ● ')
    const dots = makeDots(MAX_LENGTH - valuePin.length)

    return (
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'} style={styles.container}>
        <Spinner visible={sending} textContent={'Sending...'} textStyle={{ color: 'white', fontSize: 15 }} />
        {hideDot && <View style={styles.addressStyle}/>}
        {hideDot && (<CustomTextBold style={[styles.title, {marginTop: IOS ? (i18n.locale === 'jp' ? height(2) : 0) : 0}]}>{i18n.t('SendNoahToken.Confirm')}</CustomTextBold>)}
        <View style={styles.line} />
        <View style={[styles.borderContain, {height: height(!hideDot ? 61 : (IOS ? 53 : 55))}]}>
          <View style={styles.bottomView}>
            <CustomText style={[styles.textStyle, { marginTop: height(2) }]}>{i18n.t('ConfirmSendToken.ReceiverAccount')}</CustomText>
            <CustomText style={styles.textStyle}>{this.props.revAddress}</CustomText>
            <CustomText style={[styles.textStyle, { marginTop: height(2) }]}>{i18n.t('ConfirmSendToken.SenderAccount')}</CustomText>
            <CustomText style={styles.textStyle}>{this.state.senderAddress}</CustomText>
            <CustomText style={[styles.textStyle, { marginTop: height(2) }]}>{i18n.t('ConfirmSendToken.Amount')}</CustomText>
            <CustomText style={[styles.textStyle, { marginBottom: height(2) }]}>{this.props.revAmount} NOAH</CustomText>
            {!hideDot && (
              <View style={{ flexDirection: 'column', margin: 0, padding: 0 }}>
                <View style={styles.row} >
                  <Text style={[ styles.pin ]} >{marks}{dots}</Text>
                </View>
              </View>
            )}
          </View>
          <TextInput
            ref='txtPin'
            onChangeText={(text) => this.onChangeText(text)}
            returnKeyType='go'
            autoCapitalize='none'
            autoCorrect={false}
            style={{width: 0, height: 0}}
            keyboardType='numeric'
            value={this.state.valuePin}
            blurOnSubmit={false} />
          <View style={styles.border2Button}>
            <TouchableOpacity style={[btnStyleDefault, {backgroundColor: '#7D7E7F'}]} onPress={this.cancelSendToken}>
              <CustomTextButton style={styles.btnTextStyle}>{i18n.t('button.Cancel')}</CustomTextButton>
            </TouchableOpacity>
            <Animated.View pointerEvents={disabled} style={[btnStyleDefault, { opacity: opacityNumber }]}>
              <TouchableOpacity style={btnStyleDefault} onPress={this.onPressConfirm}>
                <CustomTextButton style={styles.btnTextStyle}>{i18n.t('button.Confirm')}</CustomTextButton>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

//  Redux 
function mapStateToProps (state) {
  return {
    account: state.account,
    tokenData: state.tokenData,
    pincode: state.pincode,
    internet: state.internet,
    language: state.language
  }
}
export default connect(mapStateToProps)(ConfirmSendToken)
