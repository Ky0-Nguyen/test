import React from 'react'
import {View, StyleSheet} from 'react-native'

// base component
import QRCode from 'react-native-qrcode'

// custom
import CustomText from '../CustomText/CustomText'

// redux
import { connect } from 'react-redux'

// translation
import i18n from '$/translations'

// style
import { width, height } from 'react-native-dimension'

// class ReceiveInfo extends React.Component {

// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
const ReceiveInfo = ({txtQR, amountReceive, account, isShowConfirmView}) => (
  // #region QRCodeAddress
  <View style={styles.container} >
    <View style={styles.containerAddr}>
      <CustomText style={styles.titleAddress}>{isShowConfirmView ? i18n.t('WalletTop.RequestedAmount') : i18n.t('WalletTop.ModalAddressTitle') }</CustomText>
      {
        isShowConfirmView &&
              <CustomText style={styles.titleAddress}>{amountReceive} NOAH</CustomText>
      }
      <CustomText style={styles.titleAddress} adjustsFontSizeToFitWidth={true} numberOfLines={1}>{account.length > 0 ? account[0].address : ''}</CustomText>
    </View>
    <View pointerEvents='none' style={styles.containerQr}>
      <QRCode
        value={txtQR}
        size={width(40)}
        bgColor='black'
        fgColor='white'
      />
    </View>
  </View>
  // #endregion
)

// Redux 
function mapStateToProps (state) {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(ReceiveInfo)
const styles = StyleSheet.create({
  container: {
    height: height(50),
    width: width(92),
    backgroundColor: 'white',
    paddingHorizontal: width(5),
    paddingTop: width(7.47),
    paddingBottom: width(9.5)
  },
  titleAddress: {
    fontSize: width(3.73)
  },
  address: {
    fontSize: width(3.5),
    marginTop: height(2)
  },
  containerAddr: {width: width(82)},
  containerQr: {
    height: height(30),
    width: width(82),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewQr: { justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    height: width(42),
    width: width(42) }
})
