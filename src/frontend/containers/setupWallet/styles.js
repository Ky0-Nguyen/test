import { StyleSheet } from 'react-native'
import {width, height} from 'react-native-dimension'

const styles = StyleSheet.create({
  topView: {
    height: height(50),
    width: width(92),
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomView: {
    height: height(20),
    width: width(92),
    justifyContent: 'space-between'
  },
  noahTxt: {
    marginTop: height(2),
    fontSize: width(10),
    color: '#7F7F7F'
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: height(2.5)
  },
  btn: {
    marginHorizontal: width(5),
    marginVertical: height(2)
  }
})

export default styles
