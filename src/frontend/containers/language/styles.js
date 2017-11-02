import { StyleSheet } from 'react-native'
import {width, height} from 'react-native-dimension'

const styles = StyleSheet.create({
  topView: {
    height: height(50),
    width: width(92),
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerView: {
    height: height(6), justifyContent: 'center', marginHorizontal: width(5)
  },
  bottomView: {
    height: height(16),
    width: width(92),
    justifyContent: 'space-between'
  },
  langTxt: {
    color: '#7F7F7F',
    textAlign: 'center',
    fontSize: width(5)
  },
  noahTxt: {
    marginTop: height(2),
    fontSize: width(10),
    color: '#7F7F7F'
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: height(2.5)
  },
  btn: {
    marginHorizontal: width(5),
    marginVertical: height(2)
  }
})

export default styles
