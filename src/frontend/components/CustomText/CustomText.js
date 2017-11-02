import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function CustomText ({
  children,
  style,
  ...props
}) {
  return (
    <Text
      {...props}
      style={style}
    >
      {children}
    </Text>
  )
}

export function CustomTextBold ({
  children,
  style,
  ...props
}) {
  return (
    <Text
      {...props}
      style={[styles.txt, style]}
    >
      {children}
    </Text>
  )
}
const styles = StyleSheet.create({
  txt: {
    fontWeight: 'bold'
  }
})
