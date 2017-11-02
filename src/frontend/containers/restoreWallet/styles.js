import {
  StyleSheet, Platform
} from 'react-native'
import { height, width } from 'react-native-dimension'
const IOS = Platform.OS === 'ios'
const styles = StyleSheet.create({
  view1: {
    height: height(6),
    justifyContent: 'center',
    alignItems: 'center'
  },
  view2: {
    height: height(25)
  },
  view3: {
    height: height(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: height(15),
    backgroundColor: 'white',
    textAlign: 'center',
    padding: width(2),
    fontSize: height(2),
    fontFamily: IOS ? 'UTM-Avo' : 'utmAvo'
  },
  btn: {
    height: height(7),
    borderRadius: height(4),
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#C3C3C3',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 2,
    elevation: 5
  },
  textStyleSpinner: { color: 'white' }
})
export default styles
