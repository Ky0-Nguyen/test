import { StyleSheet } from 'react-native'
import { colors } from '$/globalStyles'
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  container: {
    height: height(63), width: width(92), position: 'absolute'
  },
  txtError: { color: '#ff0040' },
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
    flex: 1,
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
  btnQRCode: {
    width: width(8),
    height: width(8),
    alignItems: 'center',
    justifyContent: 'center',
    right: width(1),
    left: width(1)
  },
  inputStyle: {
    height: height(6),
    width: width(91),
    marginBottom: width(1),
    marginTop: width(4),
    backgroundColor: 'white',
    borderWidth: IOS ? 1 : height(0.15)
  },
  inputStyleAmount: {
    height: height(6),
    width: width(91),
    marginBottom: width(1),
    marginTop: width(2),
    backgroundColor: 'white',
    borderWidth: IOS ? 1 : height(0.15)
  },
  input: {
    flex: 1,
    fontSize: width(3.73),
    padding: width(1.5),
    left: width(2),
    right: width(2)
  },
  scrollAmount: {
    height: height(10)
  },
  inputError: {
    flex: 1,
    fontSize: width(3.73),
    padding: width(1.5),
    color: 'red'
  }
})

export default styles
