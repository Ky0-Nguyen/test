import { StyleSheet, Platform } from 'react-native'
import { colors } from '$/globalStyles'
import { width, height } from 'react-native-dimension'
const IOS = Platform.OS === 'ios'
const styles = StyleSheet.create({
  coinAmountContainer: {
    marginTop: 7
  },
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD'
  },
  navigator: {
    justifyContent: 'center'
  },

  menuIcon: {
    zIndex: 2,
    position: 'absolute'
  },

  navTitle: {
    textAlign: 'center',
    fontSize: width(4.5),
    color: colors.title
  },

  balanceContainer: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    shadowColor: '#C3C3C3',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 2,
    borderColor: colors.box,
    flexDirection: 'row',
    padding: width(2),
    justifyContent: 'space-between',
    height: height(18)
  },

  balanceBox: {
    width: width(60),
    padding: width(1)
  },

  balance: {
    fontSize: width(8),
    color: colors.text2
  },

  convertedBalance: {
    fontSize: width(5),
    color: colors.text2
  },

  qrCodeBox: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: height(16),
    width: IOS ? width(28) : width(26)
  },

  addressStyle: {
    paddingTop: height(1.5),
    paddingBottom: height(1)
  },

  address: {
    color: colors.title,
    fontSize: width(4)
  },

  line: {
    marginTop: height(2),
    height: width(0.2),
    backgroundColor: '#CED0D0'
  },

  itemContainer: {
    backgroundColor: colors.box,
    marginTop: width(3),
    padding: width(3)
  },

  itemText: {
    color: colors.title,
    fontSize: width(4)
  },
  titleFooter: { color: 'white', textAlign: 'center' },
  actionContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  styleSpinner: { marginTop: width(2), marginLeft: width(2) },
  styleComponentBody: {height: height(63)
  },
  btnStyle: {
    width: width(45),
    height: width(13),
    backgroundColor: colors.primary
  },

  btnViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.text2,
    borderWidth: width(0.2)
  },

  btnTextStyle: {
    color: colors.text2,
    fontSize: width(4)
  },

  tooltipBox: {
    width: width(13),
    height: width(9),
    backgroundColor: 'white',
    zIndex: 2,
    position: 'absolute',
    marginLeft: width(41),
    marginTop: width(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomText: {
    backgroundColor: colors.primary,
    flex: height(5),
    width: width(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(1.5),
    marginLeft: -width(4)
  },
  containerQr: {
    height: width(87),
    width: width(92),
    backgroundColor: 'white',
    paddingHorizontal: width(5),
    paddingTop: width(7.47),
    paddingBottom: width(9.5)
  },
  viewBorderBottom: {
    width: width(100),
    height: height(1),
    marginLeft: -width(4),
    marginBottom: height(2),
    backgroundColor: colors.primary,
    flexDirection: 'row'
  },
  viewBorderBottom1: {
    height: height(1),
    width: width(33),
    backgroundColor: colors.primary
  },
  viewBorderBottom2: {
    height: height(1),
    width: width(34),
    backgroundColor: '#B1242D'
  },
  viewBorderBottom3: {
    height: height(1),
    width: width(33),
    backgroundColor: '#29346A'
  },
  modalReceive: {
    height: height(50), width: width(92)
  },
  btnHideKeyboard: {
    width: width(40),
    height: height(3.5),
    borderRadius: height(0.8),
    borderWidth: IOS ? 1 : height(0.15),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF'
  },
  txtBtnHide: {
    color: '#FFFFFF'
  }
})

export default styles
