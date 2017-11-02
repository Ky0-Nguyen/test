
import React, { Component } from 'react'
import { View, TouchableOpacity, Keyboard } from 'react-native'

// base component
import QRCode from 'react-native-qrcode'
import { width, height } from 'react-native-dimension'
import Modal from 'react-native-modalbox'
import _ from 'lodash'
// import numeral from 'numeral'
import SpinnerKit from 'react-native-spinkit'
import { Actions } from 'react-native-router-flux'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAccount } from '#/actions/accountActions'
import { setBalance } from '#/actions/mainAction'

// backend
import EtherLib from '~/lib/noahLibrary'
import EtherScan from '~/services/etherscanService'

// style
import styles from './styles'

// global
import { background } from '$/globalStyles'
import NavBarView from '$/navBarView'
import i18n from '$/translations'
import { WalletTopComponents, formatNumber } from '$/constants/constants'
import { commaGlobal } from '$/global-constants'

// custom component
import CustomText from '@/components/CustomText/CustomText'
import CustomTextButton from '@/components/CustomText/CustomTextButton'
import DropdownAlert from '@/components/DropdownAlert/DropdownAlert'
import TransactionHistory from '@/components/transactionHistory/TransactionHistory'
import SendNoahToken from '@/components/sendNoahToken/SendNoahToken'
import ConfirmSendToken from '@/components/confirmSendToken/ConfirmSendToken'
import ReceiveToken from '@/components/receiveToken/ReceiveToken'
import ReceiveInfo from '@/components/receiveToken/ReceiveInfo'
import InternetAlert from '@/components/InternetAlert/InternetAlert'
import Drawer from 'react-native-drawer'
import Menu from '../drawer/Menu'

// const

class WalletTop extends Component {
  // #region constructor
  constructor (props) {
    super(props)
    this.state = {
      // hide or show spiner
      visible: props.account.length === 0,
      account: props.account,
      tokenData: props.tokenData,
      revAddress: '',
      revAmount: '',
      qrCodeModalReceive: '',
      amountReceive: 0,
      balance: this.props.balance,
      dataSource: [],
      refreshing: props.account.length !== 0,
      showInternet: true,
      isShowFooter: null,
      isSetButtonShow: true,
      isShowConfirmView: false,
      isClear: false,
      changeLanguage: false,
      subComponentID: WalletTopComponents.TRANSACTION_HISTORY
    }
    this.changeParentComponentID = this.changeParentComponentID.bind(this)
    this.showAlert = this.showAlert.bind(this)
    this.openQRScanner = this.openQRScanner.bind(this)
    this.genarateQRCode = this.genarateQRCode.bind(this)
    this.openQRCodeAddress = this.openQRCodeAddress.bind(this)
    this.updateOldBalance = this.updateOldBalance.bind(this)
    this.showToustInternet = this.showToustInternet.bind(this)
    this.changeBalance = this.changeBalance.bind(this)
  }
  // #endregion
  componentWillReceiveProps (props) {
    if (props.internet) {
      this.loadData()
    } else {
      this.setState({
        visible: false
      })
    }
  }

  // #region componentWillMount
  componentWillMount () {
    this.createAccount()
  }
  // #endregion

  // #region createAccount
  createAccount () {
    const { mnemonic, setAccount } = this.props
    this.state.visible &&
    setTimeout(async function () {
      let accountData = await EtherLib.generateWallet(mnemonic, 0)
      let newAccount = [{
        key: 0,
        address: accountData.currentReceiveAddress,
        mnemonic: accountData.mnemonic,
        privateKey: accountData.privatekey,
        accountName: 'NOAH',
        balance: 0,
        isMain: true
      }]
      setAccount(newAccount)
    }, 700)
  }
  // #endregion

  async loadData () {
    const self = this
    const { account } = this.props
    const { tokenData } = this.state
    let address = account.length === 0 ? '' : account[0].address
    this.setState({visible: true})
    try {
      setTimeout(async function () {
        let balance = await EtherScan.getERC20TokenAccountBalanceByContractAddress(tokenData.address, address)
        tokenData.balance = await EtherLib.convertWeiToBalance(balance)
        self.props.setBalance(_.round(tokenData.balance, 8).toFixed(8))
        self.setState({
          visible: false,
          balance: _.round(tokenData.balance, 8).toFixed(8)
        })
      }, 500)
    } catch (error) {
      self.setState({
        visible: false
      })
    }
  }
  // #region componentDidMount
  componentDidMount () {
    if (this.props.internet) {
      this.loadData()
    }
  }
  // #endregion

  // #region changeParentComponentID
  /**
   * changeParentComponentID: change this.subComponentID from child Component
   */
  changeParentComponentID (_subComponentID, _index, _revAddress, _revAmount) {
    this.setState({
      refreshing: this.props.account.length !== 0,
      subComponentID: _subComponentID,
      isSetButtonShow: true
    })
    if (_subComponentID === WalletTopComponents.CONFIRM_SEND_TOKEN) {
      this.setState({
        revAddress: _revAddress,
        revAmount: _revAmount
      })
    }
  }
  // #endregion

  // #region  changeBalance
  changeBalance (_balance) {
    this.setState({balance: _balance})
  }
  // #endregion

  // #region  updateOldBalance
  /**
   * FUNCTION: updateOldBalance
   * Update Old balance, when confirm send successful
   */
  updateOldBalance (success, message) {
    if (success) {
      this.showAlert(message)
      this.setState({isClear: true})
      this.props.setBalance(this.state.balance)
    } else {
      this.setState({balance: this.props.balance})
    }
    const self = this
    setTimeout(function () {
      self.setState({
        isShowConfirmView: false,
        isClear: false
      })
    }, 500)
  }
  // #endregion

  // #region openQRScanner
  /**
   * Open QR Scanner camera
   * Called from ComfirmSendToken child view
   */
  openQRScanner () {
    Actions.qr({ title: i18n.t('QrCodeScanner.titleQrScanner') })
  }
  // #endregion

  // #region showAlert
  /**
   * NAME: showAlert
   * PARAMS: message
   * Show message 
   * RETURN
   */
  showAlert (message, type) {
    if (!type) {
      this.dropdown.alertWithType('info', message)
    } else {
      this.dropdown.alertWithType(type, message)
    }
  }
  // #endregion

  // #region showToustInternet
  showToustInternet () {
    this.setState({showInternet: false})
    const self = this
    setTimeout(function () {
      self.setState({showInternet: true})
    }, 200)
  }
  // #endregion

  // #region genarateQRCode
  /**
   * FUNCTION: genarateQRCode
   * @param {*} amount 
   * Receive amount from subView Receive,
   * ganarate QRCode and show modal
   */
  genarateQRCode (amount) {
    const { account } = this.props
    let address = account.length > 0 ? account[0].address : 0
    this.setState({
      qrCodeModalReceive: address + commaGlobal.semicolon + amount,
      amountReceive: amount,
      isShowConfirmView: true
    })
    this.refs.modalReceive.open()
  }
  // #endregion

  // #region openQRCodeAddress
  /**
   * FUNCTION: openQRCodeAddress
   * Open QRCode for curren account address s
   */
  openQRCodeAddress () {
    Keyboard.dismiss()
    const { account } = this.props
    let address = account.length > 0 ? account[0].address : 0
    this.setState({ isShowConfirmView: false, qrCodeModalReceive: address }, () => this.refs.modalReceive.open())
  }
  // #endregion

  /**
   * FUNCTION: renderMoney
   * render view money
   */
  get renderMoney () {
    const { account } = this.props
    const { visible, balance } = this.state
    let address = account.length > 0 ? account[0].address : 0
    return (
      <View style={styles.balanceContainer} elevation={10} >
        <View style={styles.balanceBox}>
          {visible
            ? <SpinnerKit style={styles.styleSpinner} isVisible={visible} size={height(5)} type={'Wave'} color={'white'} />
            : <CustomText numberOfLines={1} style={[styles.balance]}>{formatNumber(balance)}</CustomText>
          }
        </View>
        <TouchableOpacity style={styles.qrCodeBox} onPress={this.openQRCodeAddress}>
          <View pointerEvents='none'>
            <QRCode
              value={address}
              size={height(14)}
              bgColor='black'
              fgColor='white'
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  /**
 * dataSimpleConfirmSend
 * @param {*} revAddress 
 * @param {*} revAmount 
 * set data when on click cancel button at screen send token
 */
  dataSimpleConfirmSend (revAddress, revAmount) {
    this.setState({
      revAddress,
      revAmount
    })
    this.changeBalance((_.round((this.props.balance - Number(revAmount)), 8)).toFixed(8))
  }

  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { showInternet, visible, dataSource, subComponentID,
      refreshing, isShowFooter, isClear, isSetButtonShow } = this.state
    const {pincode} = this.props
    const menu = (<Menu showAlert={this.showAlert.bind(this)} reload={(message) => {
      this.setState({})
    }}
    clickBack={() => {
      this.setState({ changeLanguage: true })
      this.drawer && this.drawer.close()
    }}
    />)
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref }}
        content={menu}
        openDrawerOffset={width(15)}
      >
        <View style={styles.container}>
          <View style={background}>
            <NavBarView onPress={() => {
              if (subComponentID === WalletTopComponents.CONFIRM_SEND_TOKEN) {
                console.log('function : open menu')
              } else {
                this.drawer && this.drawer.open()
                Keyboard.dismiss()
              }
            }} type='Menu' title={i18n.t('Initial.NoahCoin')} />
            <View style={styles.viewBorderBottom}>
              <View style={styles.viewBorderBottom1}/>
              <View style={styles.viewBorderBottom2}/>
              <View style={styles.viewBorderBottom3}/>
            </View>
            {this.renderMoney}
            {/* WalletTopBody */}
            <View style={styles.styleComponentBody}>
              {
                subComponentID === WalletTopComponents.TRANSACTION_HISTORY
                  ? <TransactionHistory
                    changeParentComponentID={this.changeParentComponentID}
                    showAlert={this.showAlert}
                    dataSource={dataSource}
                    reload={() => this.props.reload()}
                    refreshing={refreshing}
                    loadData={() => this.loadData()}
                    visible={visible}
                    mnemonic={this.props.mnemonic}
                    dataSimple={(revAddress, revAmount) => this.dataSimpleConfirmSend(revAddress, revAmount)}
                  />
                  : (subComponentID === WalletTopComponents.RECEIVE_TOKEN
                    ? <ReceiveToken
                      changeParentComponentID={this.changeParentComponentID}
                      genarateQRCode={this.genarateQRCode}
                    />
                    : (
                      subComponentID === WalletTopComponents.CONFIRM_SEND_TOKEN
                        ? <ConfirmSendToken
                          changeParentComponentID={this.changeParentComponentID}
                          revAddress={this.state.revAddress} revAmount={this.state.revAmount}
                          updateOldBalance={this.updateOldBalance}
                          showToustInternet={this.showToustInternet}
                          showAlert={this.showAlert}
                          setShowButton={(isSetButtonShow) => this.setState({isSetButtonShow})}
                          isShowFooter={isShowFooter}
                          dataSimple={(revAddress, revAmount) => this.dataSimpleConfirmSend(revAddress, revAmount)}
                        />
                        : <SendNoahToken
                          changeParentComponentID={this.changeParentComponentID}
                          openQRScanner={this.openQRScanner}
                          changeBalance={this.changeBalance}
                          updateOldBalance={this.updateOldBalance}
                          revAddress={this.state.revAddress}
                          revAmount={this.state.revAmount}
                          changeLanguage={this.state.changeLanguage}
                          isClear={isClear}
                        />))
              }
            </View>
            {/* </View> */}
            <View style={styles.bottomText}>
              {
                isSetButtonShow &&
                pincode &&
              subComponentID === WalletTopComponents.CONFIRM_SEND_TOKEN
                  ? <TouchableOpacity style={styles.btnHideKeyboard} onPress={() => this.setState({ isShowFooter: true })}>
                    <CustomTextButton x={0.1} style={styles.txtBtnHide}>{i18n.t('button.ShowKeyboard')}</CustomTextButton>
                  </TouchableOpacity>
                  : <CustomTextButton style={styles.titleFooter}>{i18n.t('SetupWallet.TitleFooter')}</CustomTextButton>
              }
            </View>

          </View>
          {showInternet && <InternetAlert/>}
          <Modal
            ref='modalReceive'
            style ={styles.modalReceive}
            transparent={true}
            position={'center'}
            backdropPressToClose={true}>
            <ReceiveInfo
              isShowConfirmView = {this.state.isShowConfirmView}
              txtQR = {this.state.qrCodeModalReceive}
              amountReceive = {this.state.amountReceive}/>
          </Modal>
          <DropdownAlert
            updateStatusBar={false}
            closeInterval={2500}
            ref={(ref) => { this.dropdown = ref }}
          />
        </View>
      </Drawer>
    )
  }
}

WalletTop.navigatorStyle = {
  navBarHidden: true
}

// Redux 
function mapStateToProps (state) {
  return {
    account: state.account,
    tokenData: state.tokenData,
    internet: state.internet,
    balance: state.balance,
    pincode: state.pincode
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setAccount: bindActionCreators(setAccount, dispatch),
    setBalance: bindActionCreators(setBalance, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletTop)
