import { StyleSheet } from 'react-native'
import { colors } from '$/globalStyles'
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  container: {
    height: height(63), width: width(92), position: 'absolute'
  },

  line: {
    marginTop: height(2),
    height: width(0.2),
    backgroundColor: '#CED0D0'
  },
  addressStyle: {
    paddingTop: height(1.5),
    paddingBottom: height(1)
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
  txtError: { color: '#ff0040' },
  borderButton: {
    width: width(45),
    height: width(13)
  },
  border2Button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: width(1)
  },
  inputStyle: {
    height: height(6),
    width: width(91),
    marginBottom: width(1),
    marginTop: width(4),
    borderWidth: IOS ? 1 : height(0.15),
    borderColor: '#bfbebe',
    backgroundColor: 'white'
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
  btnQRCode: {
    width: width(8),
    height: width(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width(1.5)
  },
  input: {
    flex: 1,
    fontSize: width(3.73),
    padding: width(1.5),
    left: width(2),
    right: width(2)
  },
  borderInput: {
    borderColor: '#CED0D0',
    borderWidth: width(0.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: width(0.95),
    paddingLeft: width(2),
    paddingRight: width(2)
  },
  borderInputError: {
    borderColor: 'red',
    borderWidth: width(0.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: width(0.95),
    paddingHorizontal: width(2)
  }
})

export default styles
