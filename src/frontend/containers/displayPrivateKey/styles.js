import { StyleSheet } from 'react-native'
import { colors } from '$/globalStyles'
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  container: {
    height: height(20),
    marginTop: height(1),
    justifyContent: 'space-between'
  },
  containerPri: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row' },
  buttonCopy: {
    width: width(17),
    height: height(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    borderWidth: IOS ? 1 : height(0.15),
    borderRadius: height(0.8)
  },
  img: {
    width: width(4),
    height: width(4),
    resizeMode: 'contain'
  },
  txtBtn: {
    color: colors.primary
  },
  privateKey: {
    height: height(6),
    width: width(75),
    justifyContent: 'center'
  }
})

export default styles
