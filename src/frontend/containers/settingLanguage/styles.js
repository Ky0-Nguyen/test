import { StyleSheet } from 'react-native'
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  container: {
    height: height(85), width: width(85)
  },
  innerStyle: {
    width: width(77),
    height: height(6),
    borderBottomWidth: 1,
    borderBottomColor: '#fef6df',
    alignSelf: 'center',
    marginHorizontal: width(4)
  },
  textStyle: {
    color: 'white', fontSize: width(3.5)
  },
  imageStyle: { height: width(4), width: width(4) },
  radioStyle: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: height(1)
  }
})
export default styles
