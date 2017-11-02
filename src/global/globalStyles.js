import { height, width } from 'react-native-dimension'
import {Platform} from 'react-native'
const IOS = Platform.OS === 'ios'
export const colors = {
  main: '#fef6df',
  primary: '#d4aa51',
  secondary: '#7F7F7F',
  text: '#000000',
  text2: '#FFFFFF',
  box: '#FFFFFF',
  title: '#343536'
}
export const btnStyleDefault = {
  height: height(8),
  width: width(45),
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: IOS ? 1 : height(0.15),
  borderColor: colors.text2,
  backgroundColor: colors.primary,
  shadowColor: '#C3C3C3',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowOpacity: 2,
  zIndex: -1,
  alignSelf: 'center',
  elevation: 3
}

export const backgroundMenu = {
  backgroundColor: colors.primary,
  height: height(97),
  width: width(85),
  marginTop: height(IOS ? 3 : 0)
}
export const background = {
  backgroundColor: colors.main,
  flex: 1,
  paddingHorizontal: width(4),
  marginTop: height(IOS ? 3 : 0)
}

export const primaryButton = {
  backgroundColor: colors.primary,
  height: height(8),
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#FFFFFF',
  shadowColor: '#C3C3C3',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowOpacity: 2,
  elevation: 2
}

export const secondaryButton = {
  backgroundColor: colors.secondary,
  height: height(8),
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#FFFFFF',
  shadowColor: '#C3C3C3',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowOpacity: 2,
  elevation: 2
}

export const navTitle = {
  color: colors.primary,
  textAlign: 'center',
  fontSize: height(3),
  fontFamily: IOS ? 'UTMAvoBold' : 'utmAvoBold',
  fontWeight: 'bold'
}
export const navTitleMenu = {
  color: colors.title,
  textAlign: 'center',
  fontSize: height(3),
  fontFamily: IOS ? 'UTM-Avo' : 'utmAvo'
}
export const textDefault = {
  color: '#606060',
  fontSize: height(2),
  fontFamily: IOS ? 'UTM-Avo' : 'utmAvo'
}
export const whilteLine = {
  height: height(0.1),
  width: width(100),
  backgroundColor: 'white'
}
export const whilteLineShort = {
  height: height(0.15),
  width: width(77),
  marginHorizontal: width(8),
  backgroundColor: 'white',
  alignSelf: 'center'
}
export const colorsLink = {
  default: '#0C2342',
  link: '#219af1'
}
