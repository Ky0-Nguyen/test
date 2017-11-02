import { width, height } from 'react-native-dimension'

export const colors = {
  default: '#0C2342'
  // default: '#0D2442'
}
export const font = {
  normal: width(4)
}
export const iconSize = {
  navBar: width(10),
  button: height(10)
}

export const navBar = {
  iconColor: 'white',
  iconSize: width(7)
}

export const txtMain = {
  fontSize: font.normal,
  color: 'white'
  // fontFamily: 'Roboto-Light'
}
export const backgroundDefault = {
  flex: 1,
  backgroundColor: colors.default
}
export const backgroundImage = {
  flex: 1,
  resizeMode: 'stretch',
  width: width(100)
}
