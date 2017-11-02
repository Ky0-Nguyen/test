import React from 'react'
import { Animated, Text, TextInput, TouchableWithoutFeedback, View, StyleSheet } from 'react-native'

// Base Components
import BaseInput from './BaseInput'
import { width, height } from 'react-native-dimension'

/**
 * NAME: INPUT ERROR
 * CREATOR: KHIEM
 * Custom Input Text Style
 * FUNCTION
 */
const PADDING = height(1)
export default class InputError extends BaseInput {
  // Render Label View
  get renderLabel () {
    const {txtLabel, btnViewRender} = this.props

    return (
      txtLabel
        ? <View style={[styles.textLabelStyle, {right: width(3), width: width(txtLabel.length * 3)}]}>
          <Text>{txtLabel}</Text>
        </View>
        : <View style={[styles.textLabelStyle, {width: width(12)}]}>
          {btnViewRender}
        </View>

    )
  }

  // Render PlaceHolder View
  get renderPlaceHolder () {
    const { txtHolder } = this.props
    const { valueActive } = this.state
    return (
      <TouchableWithoutFeedback onPress={this.focus}>
        <Animated.View style={[styles.placeHolderStyle, {
          opacity: valueActive.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })
        }]}>
          <Text>{txtHolder}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  render () {
    const {containerStyle, value, errorStyle, inputStyle, maxNum} = this.props
    return (
      <View>
        <Animated.View style={[styles.container, containerStyle, errorStyle]} onLayout={this._onLayout}>
          {this.renderPlaceHolder}
          <TextInput
            {...this.props}
            ref='searchBar'
            style={[ styles.textInput, inputStyle ]}
            value={value}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            onChange={this._onChange}
            underlineColorAndroid={'transparent'}
          />
          {this.renderLabel}
        </Animated.View>
        {
          maxNum &&
          <Animated.View style={[styles.validateContent]}>
            <Text style={styles.smallText}>{(value ? value.length : 0) + '/' + maxNum}</Text>
          </Animated.View>
        }

      </View>
    )
  }
}

InputError.defaultProps = {
  txtLabel: '',
  btnViewRender: null
}

const styles = StyleSheet.create({
  validateContent: {
    width: width(89),
    height: height(2),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-end'
  },
  smallText: {
    fontSize: width(3.5),
    color: '#8aa2b0'
  },
  placeHolderStyle: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: width(3),
    width: width(90)
  },
  textLabelStyle: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },

  errorStyle: {
    alignItems: 'center',
    height: height(3),
    width: height(3),
    borderRadius: height(1.5),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  textInput: {
    flex: 1,
    paddingHorizontal: PADDING,
    paddingVertical: 0
  }

})
