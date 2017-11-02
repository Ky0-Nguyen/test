import { StyleSheet } from 'react-native'
import { colors } from '$/globalStyles'
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  container: { height: height(63), width: width(92) },
  addressStyle: {
    paddingTop: height(1.5),
    paddingBottom: height(1)
  },
  line: {
    marginTop: height(2),
    height: width(0.2),
    backgroundColor: '#CED0D0'
  },
  title: {
    fontSize: width(4),
    textAlign: 'center'
  },
  borderContain: {
    height: height(61),
    width: width(92),
    padding: 1,
    justifyContent: 'space-between'
  },
  btnCancelStyle: {
    flex: 1,
    backgroundColor: '#7D7E7F'
  },
  borderButton: {
    width: width(45),
    height: width(13)
  },
  border2Button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: width(1)
  },
  btnStyle: {
    flex: 1,
    backgroundColor: colors.primary
  },
  btnViewStyle: {
    height: height(8),
    width: width(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.text2,
    shadowColor: '#C3C3C3',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 2,
    zIndex: -1
  },
  btnTextStyle: {
    color: colors.text2,
    fontSize: width(4)
  },
  bottomView: {
    height: height(35),
    alignItems: 'center'
  },
  textStyle: {
    fontSize: width(3.5),
    color: '#484848',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height(3),
    marginBottom: height(1)
  },
  pin: {
    fontSize: width(5),
    fontWeight: '300'
  },
  btnHideKeyboard: {
    width: width(40),
    height: height(3.5),
    borderRadius: height(0.8),
    borderWidth: IOS ? 1 : height(0.15),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary
  },
  txtBtnHide: {
    color: colors.primary
  }
})

export default styles
