import React, { Component } from 'react'
import { View, TouchableOpacity,
  Image, Clipboard, FlatList, Animated,
  ActivityIndicator } from 'react-native'

// base component
import { width } from 'react-native-dimension'
import PopoverTooltip from 'react-native-popover-tooltip'

// redux
import { connect } from 'react-redux'

// global
import Images from '$/constants/images'
import { WalletTopComponents,
  ComponentTransitionType, formatNumber } from '$/constants/constants'
import i18n from '$/translations'

// style
import styles from './styles'
import { btnStyleDefault } from '$/globalStyles'
// custom component
import CustomText, { CustomTextBold } from '../../components/CustomText/CustomText'
import CustomTextButton from '../../components/CustomText/CustomTextButton'
// backend
import EthPlorerService from '~/services/ethplorerService'
// import EtherScan from '~/services/etherscanService'
import EtherLib from '~/lib/noahLibrary'
import DateTimeUtil from '~/utils/datetimeUtil'

class TransactionHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      _address: this.props.account.length > 0 ? this.props.account[0].address : '',
      refreshing: props.refreshing,
      disabled: 'none',
      opacityNumber: new Animated.Value(0.7),
      dataSource: this.props.dataSource,
      opacityButtons: new Animated.Value(0.7),
      visible: false,
      isEmpty: false
    }
    this.gotoSendTokenView = this.gotoSendTokenView.bind(this)
    this.gotoReceiveTokenView = this.gotoReceiveTokenView.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.loadTransaction = this.loadTransaction.bind(this)
  }
  /**
 * loadData
 * load data of pagae
 */
  async loadData () {
    if (this.props.internet) {
      try {
        this.setState({
          visible: true,
          isEmpty: false
        })
        this.loadTransaction()
      } catch (error) {
        this.setState({
          visible: false
        })
      }
    } else {
      this.setState({
        isEmpty: true,
        visible: false,
        refreshing: false
      })
    }
  }

  componentDidMount () {
    if (this.props.visible !== null) {
      this.refs.TransactionHistory && this.loadData()
    }
    this.visibilityOpacityBtn(this.props.internet ? 1 : 0.7)
  }

  /**
   * Load transaction from server
   */
  async loadTransaction () {
    var _address = this.props.account.length > 0 ? this.props.account[0].address : ''
    var self = this
    var tokenArr = []

    if (this.state.refreshing && this.props.internet) {
      var data = await EthPlorerService.getTokenTransactions(_address, this.props.tokenData.address)
      // let data = await EtherLib.getTxChildListFromAddressByPageAndOffset(_address, 1, 150)
      data.operations.map((item, index) => {
        tokenArr.push({
          from: item.from,
          to: item.to,
          value: formatNumber(EtherLib.convertWeiToBalance(item.value, this.props.tokenData.decimal)),
          timeStamp: DateTimeUtil.convertTimestampToDateTime(item.timestamp)
        })
      })

      // for (let newData of data) {
      //   let receiptData = await EtherScan.getReceiptTransaction(newData.hash)
      //   if (receiptData.logs.length > 0) {
      //     let contractSendAddress = receiptData.logs[0].address
      //     if (this.props.tokenData.address.toLowerCase() === contractSendAddress) {
      //       var tokenDecValue = parseInt(receiptData.logs[0].data) / Math.pow(10, this.props.tokenData.decimal)
      //       let toAddress = receiptData.logs[0].topics[2]
      //       tokenArr.push({
      //         from: newData.from,
      //         to: '0x' + toAddress.slice(26, 64),
      //         value: tokenDecValue,
      //         transactionIndex: newData.transactionIndex,
      //         confirmations: newData.confirmations,
      //         timeStamp: DateTimeUtil.convertTimestampToDateTime(newData.timeStamp),
      //         gas: newData.gas,
      //         gasPrice: newData.gasPrice
      //       })
      //     }
      //   }
      // }
      self.setState({
        visible: false,
        dataSource: tokenArr,
        loading: false,
        refreshing: false,
        isEmpty: !(tokenArr.length > 0)
      })
      const etheAmountLimit = 0.01
      let etheAmount = await EtherLib.getEtherBalance(_address)
      if (etheAmount) {
        this.setState({
        // If (etheAmount < etheAmountLimit) -> disable Gass button
          disabled: etheAmount < etheAmountLimit ? 'none' : 'box-none',
          opacityNumber: etheAmount < etheAmountLimit ? 0.7 : 1
        })
      }
    } else {
      self.setState({
        visible: false,
        loading: false,
        refreshing: false
      })
    }
  }

  /**
   * handle Refresh list
   */
  handleRefresh () {
    this.setState(
      {
        refreshing: true,
        isEmpty: false
      },
      () => {
        this.loadTransaction()
      }
    )
    // this.props.loadData()
  }

  renderFooter = () => {
    if (!this.state.loading) return null
    return (
      <View style={styles.viewFooterHistory} >
        <ActivityIndicator animating size="small" color='white'/>
      </View>
    )
  }
  /**
  * gotoSendTokenView: go to SendNoahToken screen
  */
  gotoSendTokenView () {
    this.props.changeParentComponentID(WalletTopComponents.SEND_NOAH_TOKEN, ComponentTransitionType.SlideUp)
    this.props.dataSimple('', '')
  }
  /**
   * gotoReceiveTokenView
   */
  gotoReceiveTokenView () {
    this.props.changeParentComponentID(WalletTopComponents.RECEIVE_TOKEN, ComponentTransitionType.SlideUp)
  }
  /**
  * Copy private key to clipboard
  */
  onPressedCopy () {
    let _address = this.props.account.length > 0 ? this.props.account[0].address : ''
    Clipboard.setString(_address)
    this.props.showAlert(i18n.t('TransactionHistory.Copied'))
  }
  /**
 * 
 * @param {*} props 
 */
  componentWillReceiveProps (props) {
    // this.loadData()
    if (props.visible !== null) {
      this.props.mnemonic && this.handleRefresh()
      this.visibilityOpacityBtn(props.internet ? 1 : 0.7)
    }
  }

  /**
   * FUNCTION visibilityOpacityBtn
   * PARAM: bgTo ->  opacity value
   * set visibility opacity 
   */
  visibilityOpacityBtn (visible) {
    Animated.timing(this.state.opacityButtons, {
      toValue: visible,
      useNativeDriver: true,
      duration: 100
    }).start()
  }
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { disabled, isEmpty } = this.state
    const { internet, account } = this.props
    return (
      <View style={styles.container} ref='TransactionHistory'>
        {/* header of history view */}
        <View style={styles.topView}>
          <View style={styles.addressStyle}>
            <CustomText style={styles.address} numberOfLines={1}>{i18n.t('TransactionHistory.Address')}: {account.length > 0 ? account[0].address : ''}</CustomText>
            <TouchableOpacity style={styles.buttonCopy} onPress={this.onPressedCopy.bind(this)} >
              <CustomTextButton x={0.7} style={styles.txtBtn}>{i18n.t('button.Copy')}</CustomTextButton>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
        </View>
        {/* --------------end-------------- */}
        {/* bottom view -  view history */}
        <View style={styles.bottomView}>

          <View style={styles.viewHistory}>
            {isEmpty &&
            <View style={styles.viewEmpty}>
              <CustomText style={styles.txtEmpty}>{i18n.t('TransactionHistory.Empty')}</CustomText>
            </View>
            }
            <FlatList
              style={{flex: 1}}
              data={this.state.dataSource}
              renderItem={({ item }) => this._renderItem(item)}
              keyExtractor={(item, index) => index}
              onRefresh={() => {
                this.props.loadData()
                this.handleRefresh()
              }}
              refreshing={this.state.refreshing}
              // onEndReached={() => this.handleLoadMore()}
              ListFooterComponent={this.renderFooter}
              onEndReachedThreshold={0.5}
              scrollEventThrottle={500}
            />
          </View>

          <View style={styles.actionContainer}>
            <Animated.View pointerEvents={internet ? 'box-none' : 'none'}
              style={[btnStyleDefault, { opacity: this.state.opacityButtons }]}>
              <TouchableOpacity style={btnStyleDefault} onPress={this.gotoReceiveTokenView}>
                <CustomTextButton style={styles.btnTextStyle}>{i18n.t('TransactionHistory.Receive')}</CustomTextButton>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.viewToolTip}>
              <PopoverTooltip ref='tipGass'
                items={[ { label: i18n.t('TransactionHistory.GassTip'), onPress: () => {} } ]}
                buttonComponent= { <View/> }
                animationType='spring'
                overlayStyle={{ backgroundColor: 'transparent' }} // set the overlay invisible
                tooltipContainerStyle={{
                  borderRadius: width(0),
                  shadowColor: '#C3C3C3',
                  shadowOffset: {
                    width: 0,
                    height: 0
                  },
                  shadowOpacity: 2,
                  justifyContent: 'center',
                  alignSelf: 'center'
                }}
                labelContainerStyle={{
                  borderRadius: width(0),
                  backgroundColor: 'white',
                  width: width(92),
                  height: 'auto',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  shadowColor: '#C3C3C3',
                  shadowOffset: {
                    width: 0,
                    height: 0
                  },
                  shadowOpacity: 2,
                  elevation: 1}}
                labelStyle={{ textAlign: 'justify' }}
              />
              <Animated.View pointerEvents={disabled} style={styles.tooltipBox}>
                <TouchableOpacity onPress={() => this.refs.tipGass.toggle()}>
                  <CustomText style={[styles.txtBtnGas, { color: this.state.opacityNumber === 1 ? 'green' : '#bfbebe' }]}>
                    {i18n.t('TransactionHistory.Gass')}
                  </CustomText>
                  <Image source={Images.ic_gass} style={styles.imgGas}/>
                </TouchableOpacity>
              </Animated.View>
            </View>
            <Animated.View pointerEvents={internet ? 'box-none' : 'none'}
              style={[btnStyleDefault, { opacity: this.state.opacityButtons }]} >
              <TouchableOpacity style={btnStyleDefault} onPress={this.gotoSendTokenView}>
                <CustomTextButton style={styles.btnTextStyle}>{i18n.t('TransactionHistory.Send')}</CustomTextButton>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }

  _renderItem = (item) => {
    var isSend = (this.props.account.length > 0 ? this.props.account[0].address : '') === item.from
    var strTitle = isSend ? (i18n.t('TransactionHistory.Sent')) : (i18n.t('TransactionHistory.Received'))

    return (
      <View style={styles.itemContainer}>
        <CustomTextBold style={styles.itemText} >{item.timeStamp}</CustomTextBold>
        <CustomText numberOfLines={1} style={styles.itemText} >
          <CustomText style={{color: isSend ? 'red' : 'green'}}>{strTitle}: </CustomText>
          {isSend ? item.to : item.from}
        </CustomText>
        <CustomText style={styles.itemText} >
          <CustomText style={{color: isSend ? 'red' : 'green'}}>{isSend ? '-' : '+'}{item.value}</CustomText> NOAH
        </CustomText>
      </View>
    )
  }
}
//  Redux 
function mapStateToProps (state) {
  return {
    account: state.account,
    tokenData: state.tokenData,
    internet: state.internet,
    language: state.language
  }
}
export default connect(mapStateToProps)(TransactionHistory)
