import { StyleSheet } from 'react-native'
import { width, height } from 'react-native-dimension'
const styles = StyleSheet.create({
  textView: {
    margin: width(1),
    height: height(10),
    marginBottom: height(1)
  },
  leftBottom: {
    height: height(89)
  },
  titleButton: {
    marginLeft: width(4)
  },
  buttonView: {
    width: width(100),
    height: height(7),
    justifyContent: 'center'
  },
  txtVersion: {
    fontSize: height(2),
    marginLeft: width(4),
    marginBottom: height(1),
    color: '#FFFFFF'
  }
})
export default styles
