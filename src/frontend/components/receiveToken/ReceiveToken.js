import React, { Component } from 'react'
import { View, TouchableOpacity, Animated, Text, ScrollView } from 'react-native'

//  base component
import { width, height } from 'react-native-dimension'

// redux
import { connect } from 'react-redux'

// style
import styles from './styles'
import { btnStyleDefault } from '$/globalStyles'

// custom component
import { CustomTextBold } from '../../components/CustomText/CustomText'
import CustomTextButton from '../../components/CustomText/CustomTextButton'
import InputError from '../../components/textInput/InputError'
// global
import i18n from '$/translations'
import { WalletTopComponents, ComponentTransitionType } from '$/constants/constants'
/**
 * NAME: ReceiveToken
 * CREATOR: Chau
 * Receive token
 */
class ReceiveToken extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      amountError: false,
      revAmount: '',
      spendable: 2000,
      disabled: 'none',
      opacityNumber: new Animated.Value(0.7),
      selectionAmount: null,
      // Animated input
      addressErrAnim: new Animated.Value(0),
      shakeAddressAnim: new Animated.Value(0)
    })
    this.cancelReceiveToken = this.cancelReceiveToken.bind(this)
    this.sendQRCode = this.sendQRCode.bind(this)
  }

  // Animation control Start
  amountErrActive () {
    Animated.timing(
      this.state.addressErrAnim, {
        toValue: this.state.amountError ? 1 : 0,
        duration: 400
      }
    ).start(!this.state.amountError && this.state.shakeAddressAnim.setValue(0))
  }

  shakeAnimation () {
    Animated.spring(
      this.state.shakeAddressAnim, {
        toValue: this.state.amountError ? 1 : 0,
        friction: 4,
        tension: 1
      }
    ).start()
  }
  /**
   * cancelSendToken: go back to transaction history
   */
  cancelReceiveToken () {
    this.props.changeParentComponentID(WalletTopComponents.TRANSACTION_HISTORY,
      ComponentTransitionType.SlideDown)
    this.setState({
      revAmount: ''
    })
    this.state.shakeAddressAnim.setValue(0)
    this.state.addressErrAnim.setValue(0)
    this.visibilityTransform(false, '')
  }
  /**
   * sendQRCode
   * Send amount to ViewTop to genarate QRCode
   */
  sendQRCode () {
    this.props.genarateQRCode(this.state.revAmount)
  }
  /**
   * validate input
   */
  validateNumber = (number) => {
    var reg = /^([0-9_.]+)$/
    return reg.test(number)
  }
  check8Decimal (amount) {
    let arr = amount.split('.')
    if (arr.length === 2) {
      if (arr[1].length <= 8) {
        return true
      }
      return false
    } else if (arr.length > 2) {
      return false
    }
    return true
  }
  /**
   * isAmountValis
   * Validate number
   * @param {*} amount 
   */
  isAmountValid (amount) {
    if (this.validateNumber(amount) && this.check8Decimal(amount)) {
      this.setState({
        revAmount: amount
      })
      if (Number(amount) > 0) {
        this.setState({
          amountError: false
        }, () =>
          this.amountErrActive()
        )
        this.visibilityTransform(false, amount)
      } else {
        this.setState({
          amountError: true
        }, () => {
          this.amountErrActive()
          this.shakeAnimation()
        })
        this.visibilityTransform(true, amount)
      }
    } else {
      if (amount === '') {
        this.setState({
          revAmount: amount
        })
        this.visibilityTransform(false, amount)
        this.setState({
          amountError: false
        }, () =>
          this.amountErrActive()
        )
      }
    }
  }
  /**
   * FUNCTION visibilityTransform
   * PARAM: bgTo ->  opacity value
   * set visibility opacity 
   * 
   */
  visibilityTransform (_amountError, _revAmount) {
    if (_amountError === false && _revAmount) {
      this.setState({
        disabled: 'box-none'
      })
      var bgTo = 1
    } else {
      bgTo = 0.7
      this.setState({
        disabled: 'none'
      })
    }
    Animated.timing(this.state.opacityNumber, {
      toValue: bgTo,
      delay: 0,
      duration: 300
    }).start()
  }
  /**
 * _onFocus
 * @param {*} event 
 */
  _onFocus (event) {
    if (!event) {
      this.setState({selectionAmount: {start: 0, end: 0}})
    } else {
      this.setState({selectionAmount: {start: this.state.revAmount.length, end: this.state.revAmount.length}}, () => this.setState({selectionAmount: null}))
    }
  }
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { selectionAmount, disabled, revAmount, addressErrAnim, shakeAddressAnim, amountError } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.addressStyle}>
          <CustomTextBold style={styles.title}>{i18n.t('ReceiveToken.Receive')}</CustomTextBold>
          <View style={styles.line} />
        </View>

        <View style={styles.borderContain}>
          {/* Address TextInput */}
          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
            <InputError
              value={revAmount}
              txtLabel={'NOAH'}
              txtHolder={i18n.t('ReceiveToken.Amount')}
              containerStyle={styles.inputStyle}
              isError={amountError}
              returnKeyType='go'
              inputStyle={styles.input}
              keyboardType='numeric'
              {
              ...selectionAmount ? { selection: selectionAmount } : null
              }
              onBlur={() => revAmount && this._onFocus(false)}
              onFocus={() => this._onFocus(true)}
              onSubmitEditing={() => console.log('tuanaaaaa') }
              errorStyle={{
                transform: [
                  {
                    translateX: shakeAddressAnim.interpolate({
                      inputRange: [0, 0.1, 0.3, 0.4, 1],
                      outputRange: [0, 2, -2, -2, 0]
                    })
                  }
                ]
              }}
              onChangeText={(text) => this.isAmountValid(text)}

            />
          </ScrollView>
          {/* Error Address */}
          <Animated.View style={{
            height: height(4),
            position: 'absolute',
            zIndex: -1,
            width: width(90),
            alignSelf: 'center',
            opacity: addressErrAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            }),
            transform: [{
              translateY: addressErrAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [height(8), height(8.5)]
              })
            }]
          }}>
            <Text style={styles.txtError}>{i18n.t('ReceiveToken.AmountError')}</Text>
          </Animated.View>

          <View style={styles.border2Button}>
            <TouchableOpacity style={[btnStyleDefault, {backgroundColor: '#7D7E7F'}]} onPress={this.cancelReceiveToken}>
              <CustomTextButton style={styles.btnTextStyle}>{i18n.t('button.Cancel')}</CustomTextButton>
            </TouchableOpacity>
            <Animated.View pointerEvents={disabled} style={[btnStyleDefault, { opacity: this.state.opacityNumber }]}>
              <TouchableOpacity style={btnStyleDefault} onPress={this.sendQRCode}>
                <CustomTextButton style={styles.btnTextStyle}>{i18n.t('ReceiveToken.Receive')}</CustomTextButton>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

      </View>
    )
  }
}

export default connect()(ReceiveToken)
