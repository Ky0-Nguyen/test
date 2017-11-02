import { StyleSheet } from 'react-native'
import { height } from 'react-native-dimension'

const styles = StyleSheet.create({
  text: {
    marginBottom: height(2),
    marginTop: height(0.2)
  },
  textWhiteBox: {
    textAlign: 'justify'
  },
  whiteBox: {
    padding: height(1.8),
    marginTop: height(1.25),
    marginBottom: height(2),
    backgroundColor: 'white'
  }
})

export default styles
