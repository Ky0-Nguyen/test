import React from 'react'
import { Text, Platform } from 'react-native'
import { height } from 'react-native-dimension'
import { connect } from 'react-redux'
const IOS = Platform.OS === 'ios'
function CustomTextButton ({
  language,
  x,
  children,
  style,
  ...props
}) {
  return (
    <Text
      {...props}
      style={[{ marginTop: IOS ? (language === 'jp' ? height(x || 0.5) : 0) : 0, marginBottom: IOS ? (language === 'en' ? height(x || 0.5) : 0) : 0 }, style]}
    >
      {children}
    </Text>
  )
}
const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}
export default connect(mapStateToProps)(CustomTextButton)
