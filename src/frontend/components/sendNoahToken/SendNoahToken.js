import React, { Component } from 'react'
import { View, TouchableOpacity, Image,
  Animated, Keyboard, Text, ScrollView } from 'react-native'

// base component
import { width, height } from 'react-native-dimension'
import { Actions } from 'react-native-router-flux'

// redux
import { connect } from 'react-redux'
import { setBalance } from '#/actions/mainAction'
import { bindActionCreators } from 'redux'

// style
import styles from './styles'
import { btnStyleDefault } from '$/globalStyles'

// global
import { WalletTopComponents, ComponentTransitionType } from '$/constants/constants'
import Images from '$/constants/images'
import i18n from '$/translations'
import { commaGlobal, countDots, validateAddress, validateNumber } from '$/global-constants'

// custom component
import { CustomTextBold } from '../../components/CustomText/CustomText'
import CustomTextButton from '../../components/CustomText/CustomTextButton'
import InputError from '../../components/textInput/InputError'

/**
 * NAME: SendNoahToken
 * CREATOR: Chau
 * Send user token to another
 */
class SendNoahToken extends Component {
  constructor (props) {
    super(props)
    this.goToSendComfirmScreen = this.goToSendComfirmScreen.bind(this)
    this.cancelSendToken = this.cancelSendToken.bind(this)
    this.openScanQRCode = this.openScanQRCode.bind(this)
    this.state = ({
      revAddress: props.revAddress,
      addressError: false,
      amountError: false,
      qrCodeAmount: false,
      revAmount: props.revAmount,
      qrCode: false,
      disable: 'none',
      opacityNumber: new Animated.Value(0.7),
      selectionAddress: null,
      selectionAmount: null,
      // Animated input
      addressErrAnim: new Animated.Value(0),
      shakeAddressAnim: new Animated.Value(0),
      ethErrAnim: new Animated.Value(0),
      shakeEthAnim: new Animated.Value(0)
    })
  }

  // Animation control Start
  addressErrActive () {
    Animated.timing(
      this.state.addressErrAnim, {
        toValue: this.state.addressError ? 1 : 0,
        duration: 400
      }
    ).start(!this.state.addressError && this.state.shakeAddressAnim.setValue(0))
  }
  /**
 * 
 */
  shakeAnimation () {
    Animated.spring(
      this.state.shakeAddressAnim, {
        toValue: this.state.addressError ? 1 : 0,
        friction: 4,
        tension: 1
      }
    ).start()
  }
  /**
 * shakeEthAnimation
 */
  shakeEthAnimation () {
    Animated.spring(
      this.state.shakeEthAnim, {
        toValue: this.state.ethErrAnim ? 1 : 0,
        friction: 4,
        tension: 1
      }
    ).start()
  }
  /**
 * ethErrActive
 */
  ethErrActive () {
    Animated.timing(
      this.state.ethErrAnim, {
        toValue: this.state.amountError ? 1 : 0,
        duration: 400
      }
    ).start(!this.state.amountError && this.state.shakeEthAnim.setValue(0))
  }

  /**
   * FUNCTION: componentWillReceiveProps
   * @param {*} props 
   * Receive qrCode from scan Qrcode View
   */
  componentWillReceiveProps (props) {
    // Check receive account from scan QrCode 
    // Format HbQrcode: Address + ';' + sending amount
    if (props.qrCodeValue.length > 0) {
      let qrSlice = props.qrCodeValue.split(commaGlobal.semicolon)
      let revAddress = qrSlice[0] || ''
      let revAmount = qrSlice[1] || ''

      this.setState({
        revAddress,
        revAmount,
        qrCodeAmount: true,
        qrCode: true
      }, () => {
        // this.refs.addressInput.refs.searchBar.focus()
        // this.refs.addressInput.refs.searchBar.blur()
        this.isAddressValid(revAddress)
        this.isAmountValid(revAmount)
      })
    }
    if (props.isClear) {
      this.setState({revAddress: '', revAmount: ''}, () => {
        this.isAddressValid(this.state.revAddress)
        this.isAmountValid(this.state.revAmount)
      })
    }
  }
  componentDidMount () {
    if (this.props.revAddress) {
      this.isAmountValid(this.props.revAmount)
      this.isAddressValid(this.props.revAddress)
    }
  }
  visibilityActive (num) {
    Animated.timing(this.state.opacityNumber, {
      toValue: num,
      delay: 0,
      duration: 500
    }).start()
  }
  // Check clear qrCode when user scan error format
  checkClearQrcodeAddress (newAddress, oldAddress) {
    const { qrCode } = this.state
    // Don't remove input when error if scan Qrcode fail
    if (qrCode) {
      this.setState({ addressError: true, revAddress: newAddress }, () => {
        this.addressErrActive()
        this.shakeAnimation()
        this.visibilityActive(0.5)
      })
    } else {
      // remove input when error
      this.setState({ revAddress: oldAddress })
    }
  }

  /**
   * Go to SendComfirm Screen
   */
  goToSendComfirmScreen () {
    this.props.changeParentComponentID(WalletTopComponents.CONFIRM_SEND_TOKEN,
      ComponentTransitionType.SlideUp, this.state.revAddress, this.state.revAmount)
    const self = this
    this.refs.addressInput.refs.searchBar.blur()
    setTimeout(function () {
      self.setState({
        addressError: false,
        amountError: false
      })
    }, 100)
  }
  /**
   * cancelSendToken: go back to transaction history
   */
  cancelSendToken () {
    this.props.changeParentComponentID(WalletTopComponents.TRANSACTION_HISTORY,
      ComponentTransitionType.SlideDown, this.state.revAddress, this.state.revAmount)
    this.props.updateOldBalance(false, '')
    this.refs.addressInput.refs.searchBar.blur()
    const self = this
    setTimeout(function () {
      self.setState({
        revAddress: '',
        revAmount: '',
        addressError: false,
        amountError: false

      })
      self.state.addressErrAnim.setValue(0)
      self.state.shakeAddressAnim.setValue(0)
      self.state.ethErrAnim.setValue(0)
      self.state.shakeEthAnim.setValue(0)
    }, 100)
  }
  /**
   * openScanQRCode: open scanQR code screen
   */
  openScanQRCode () {
    Keyboard.dismiss()
    Actions.qr()
  }

  // Check clear qrCode when user scan error format
  checkClearQrcode (newAmount, oldAmount) {
    const { qrCodeAmount } = this.state
    // Don't remove input when error if scan Qrcode fail
    if (qrCodeAmount) {
      this.setState({ amountError: true, revAmount: newAmount }, () => {
        this.ethErrActive()
        this.shakeEthAnimation()
        this.visibilityActive(0.5)
      })
    } else {
      // remove input when error
      this.setState({ revAmount: oldAmount })
    }
  }
  /**
   * 
   * @param {*} amount 
   */
  isAmountValid (newAmount) {
    const { revAmount } = this.state
    const { balance } = this.props

    let oldAmount = revAmount
    // Check format number only
    if (!validateNumber(newAmount)) {
      // Clear data and error when no input
      if (newAmount.length === 0) {
        this.setState({ disable: 'none', amountError: false, revAmount: '' },
          () => {
            this.visibilityActive(0.5)
            this.ethErrActive()
          })
      } else {
        this.checkClearQrcode(newAmount, oldAmount)
      }
    } else {
      // Check clear first dots 
      if (newAmount.toString() !== '.') {
        let dotsCount = countDots(newAmount, '\\.')
        // Check only accept 1 dots 
        if (dotsCount <= 1) {
          let isError = false
          let decimalCount = newAmount.length - newAmount.indexOf('.') - 1

          if (dotsCount === 1 && decimalCount > 8) {
            // Check if eth amount decimal greater than 8
            this.checkClearQrcode(newAmount, oldAmount)
            isError = true
          }

          if (!isError) {
            // User can input if pass all previous condition
            let newAmountNum = Number(newAmount)
            // Convert to Money amount format max 2 decimal
            if (newAmountNum > balance || newAmountNum <= 0) {
              // Final fail checking
              this.setState({
                qrCodeAmount: false,
                amountError: true,
                disable: 'none',
                revAmount: newAmount
              }, () => {
                this.visibilityActive(0.5)
                this.ethErrActive()
                this.shakeEthAnimation()
              })
            } else {
              // Final success checking
              this.setState({
                qrCodeAmount: false,
                amountError: false,
                revAmount: newAmount
              }, () => {
                this.ethErrActive()
                this.checkOpenSending()
              })
            }
          }
        } else {
          this.checkClearQrcode(newAmount, oldAmount)
        }
      }
    }
  }
  // /**
  //  * 
  //  * @param {*} address 
  //  * @param {*} qrCode 
  //  */
  // isAddressValid (address, qrCode) {
  //   if (!this.validateString(address)) {
  //     this.checkFormatAddress(address)
  //     let oldAddress = this.state.revAddress
  //     this.visibilityTransform(true, this.state.amountError, address, this.state.revAmount)
  //     if (address.length === 0) {
  //       this.setState({ revAddress: '', addressError: false }, () =>
  //         this.addressErrActive()
  //       )
  //     } else {
  //       if (qrCode) {
  //         this.setState({ addressError: true, qrCode: true, revAddress: address }, () => {
  //           this.addressErrActive()
  //           this.shakeAnimation()
  //         })
  //       } else {
  //         this.setState({ revAddress: oldAddress, addressError: true }, () => {
  //           this.addressErrActive()
  //           this.shakeAnimation()
  //         })
  //       }
  //     }
  //   } else {
  //     this.setState({ qrCode: false })
  //   }
  //   this.setState({ revAddress: address })
  // }
  /**
   * NAME: isAddressValid
   * PARAMS: the receiving address
   * Check whether the address inputted by user is valid
   * Logic run check sending 
   * - Address check => Spendable => Check open send
   * - Token check => Money check => Check open send
   * - Money check => Token Check => Check open send
  */
  isAddressValid (newAddress) {
    const { revAddress } = this.state
    let oldAddress = revAddress
    // Check valid format address ethereum
    if (!validateAddress(newAddress)) {
      // Clear data and error when no input
      if (newAddress.length === 0) {
        this.setState({ disable: 'none',
          addressError: false,
          revAddress: '' }, () => {
          this.visibilityActive(0.5)
          this.addressErrActive()
        })
      } else {
        this.checkClearQrcodeAddress(newAddress, oldAddress)
      }
    } else {
      if ((newAddress.startsWith('0x') && newAddress.length === 42)) {
        // Final success checking
        this.setState({ qrCode: false, revAddress: newAddress, addressError: false }, () => {
          this.addressErrActive()
          this.checkOpenSending()
        })
      } else {
        // Final fail checking
        this.setState({revAddress: newAddress,
          qrCode: false,
          addressError: true,
          disable: 'none'}, () => {
          this.addressErrActive()
          this.shakeAnimation()
          this.visibilityActive(0.5)
        })
      }
    }
  }
  /* Check FINAL pass all conditions to active sending
    5 case check: 
    - Fill all address
    - Fill token amount
    - Fill money amount
    - Choose fee
    - Choose send type
  */
  checkOpenSending () {
    const { addressError, amountError, revAddress, revAmount } = this.state

    if (!addressError && !amountError) {
      if (revAddress.length > 0 && revAmount.length > 0) {
        this.setState({ disable: 'box-none' }, () => {
          this.visibilityActive(1)
        })
      }
    }
  }
  /**
   * _onFocus
   * @param {*} event 
   * @param {*} tag 
   */
  _onFocus (event, tag) {
    if (tag === 0) {
      if (!event) {
        this.setState({selectionAddress: {start: 0, end: 0}})
      } else {
        this.setState({selectionAddress: {start: this.state.revAddress.length, end: this.state.revAddress.length}}, () => this.setState({selectionAddress: null}))
      }
    } else {
      if (!event) {
        this.setState({selectionAmount: {start: 0, end: 0}})
      } else {
        this.setState({selectionAmount: {start: this.state.revAmount.length, end: this.state.revAmount.length}}, () => this.setState({selectionAmount: null}))
      }
    }
  }
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { selectionAddress, selectionAmount, disable, revAddress, addressError, shakeAddressAnim, addressErrAnim, qrCode, revAmount, shakeEthAnim, ethErrAnim, qrCodeAmount } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.addressStyle}>
          <CustomTextBold style={[styles.title, {marginTop: IOS ? (i18n.locale === 'jp' ? height(2) : 0) : 0}]}>{i18n.t('SendNoahToken.Send')}</CustomTextBold>
          <View style={styles.line} />
        </View>
        <View style={styles.borderContain}>

          {/* Address TextInput */}
          <InputError
            ref='addressInput'
            value={revAddress}
            txtHolder={i18n.t('SendNoahToken.Receiver')}
            containerStyle={styles.inputStyle}
            maxNum={42}
            inputStyle={styles.input}
            isError={addressError}
            btnViewRender={
              <TouchableOpacity onPress={this.openScanQRCode} style={styles.btnQRCode}>
                <Image source={Images.ic_qrCopy}/>
              </TouchableOpacity>
            }
            errorStyle={{
              transform: [
                {
                  translateX: shakeAddressAnim.interpolate({
                    inputRange: [0, 0.1, 0.3, 0.4, 1],
                    outputRange: [0, 2, -2, -2, 0]
                  })
                }
              ],
              borderColor: addressErrAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#bfbebe', '#ff0040']
              })
            }}
            returnKeyType='next'
            {
            ...selectionAddress ? { selection: selectionAddress } : null
            }

            onBlur={() => revAddress && this._onFocus(false, 0)}
            onFocus={() => this._onFocus(true, 0)}
            onChangeText={(text) => qrCode
              ? this.isAddressValid(text)
              : this.isAddressValid(text.trim())}
            autoFocus= {true}
            onSubmitEditing = {(event) => {
              this.refs.amountInput.focus()
            }}
          />

          {/* Error Address */}
          <Animated.View style={{
            height: height(5),
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
            <Text style={[styles.txtError, {fontSize: i18n.locale === 'jp' ? height(1.5) : height(2)}]}>{i18n.t('SendNoahToken.AddressError')}</Text>
          </Animated.View>

          {/* NOAH Money TextInput */}
          <ScrollView style={styles.scrollAmount} scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
            <InputError
              ref='amountInput'
              value={revAmount}
              txtLabel={'NOAH'}
              txtHolder={i18n.t('SendNoahToken.Amount')}
              keyboardType={'numeric'}
              inputStyle={styles.input}
              containerStyle={styles.inputStyleAmount}
              onChangeText={(ethAmount) => {
                qrCodeAmount
                  ? this.isAmountValid(ethAmount)
                  : this.isAmountValid(ethAmount.trim())
              }}
              returnKeyType='go'
              {
              ...selectionAmount ? { selection: selectionAmount } : null
              }

              onBlur={() => revAmount && this._onFocus(false, 1)}
              onFocus={() => this._onFocus(true, 1)}
              errorStyle={{
                transform: [
                  {
                    translateY: addressErrAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, height(0)]
                    })
                  },
                  {
                    translateX: shakeEthAnim.interpolate({
                      inputRange: [0, 0.1, 0.3, 0.4, 1],
                      outputRange: [0, 2, -2, -2, 0]
                    })
                  }
                ],
                borderColor: ethErrAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#bfbebe', '#ff0040']
                })
              }}/>
          </ScrollView>
          {/* Error ETH Money */}
          <Animated.View style={{
            height: height(5.5),
            position: 'absolute',
            zIndex: -1,
            width: width(90),
            alignSelf: 'center',
            opacity: ethErrAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            }),
            top: addressErrAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, height(0)]
            }),
            transform: [{
              translateY: ethErrAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [height(12), height(18.5)]
              })
            }]
          }}>
            <Text style={[styles.txtError, {fontSize: i18n.locale === 'jp' ? height(1.5) : height(2)}]}>{i18n.t('SendNoahToken.AmountError')}</Text>
          </Animated.View>

          <View style={styles.border2Button}>
            <TouchableOpacity style={[btnStyleDefault, {backgroundColor: '#7D7E7F'}]} onPress={this.cancelSendToken}>
              <CustomTextButton style={styles.btnTextStyle}>{i18n.t('button.Cancel')}</CustomTextButton>
            </TouchableOpacity>
            <Animated.View pointerEvents={disable} style={[btnStyleDefault, { opacity: this.state.opacityNumber }]}>
              <TouchableOpacity style={btnStyleDefault} onPress={this.goToSendComfirmScreen}>
                <CustomTextButton style={styles.btnTextStyle}>{i18n.t('button.Send')}</CustomTextButton>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }
}

//  Redux 
function mapStateToProps (state) {
  return {
    account: state.account,
    qrCodeValue: state.qrCode,
    balance: state.balance,
    language: state.language
  }
}
function mapDispatchToProps (dispatch) {
  return {
    setBalance: bindActionCreators(setBalance, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SendNoahToken)
