import React, { Component } from 'react'
import { Text, View, Animated, TouchableHighlight } from 'react-native'
import { height } from 'react-native-dimension'

/**
 * NAME: Action Button
 * CREATOR: KHIEM
 * Create custom button for application
 */
export default class ActionButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      addOpacity: 1,
      resetToken: props.resetToken,
      active: props.active,
      clickAnim: new Animated.Value(0)
    }
  }

  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { size, btnColor, btnItems, txtFooter, txtFooterStyle, btnAction, isSquare, borderColor, glowColor } = this.props
    const { clickAnim } = this.state
    const btnStyle = {
      width: size,
      height: isSquare ? size / 3 : size,
      borderRadius: isSquare ? 8 : size / 2,
      borderWidth: 1,
      borderColor: borderColor || 'black',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: -1,
      backgroundColor: btnColor
    }
    const wrapperStyle = {
      width: size + height(0.7),
      height: isSquare ? (size + height(0.7)) / 3 : size + height(0.7),
      borderRadius: isSquare ? 8 : size + height(0.7) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      zIndex: 1
    }
    const footerStyle = {
      position: 'absolute',
      top: size + height(2)
    }
    return (
      <View style={{alignItems: 'center'}}>
        <Animated.View style={[wrapperStyle, {
          backgroundColor: clickAnim.interpolate({
            inputRange: [0, 0.3, 0.6, 1],
            outputRange: [btnColor, glowColor || '#fef6df', glowColor || '#f9efd1', glowColor || '#f9eeca']
          })
        }]}>
          <TouchableHighlight underlayColor={btnColor} style={btnStyle} onPress={() => {
            var self = this
            // Active glow animation
            this.clickActive()
            setTimeout(function () {
              Animated.spring(
                self.state.clickAnim, {
                  toValue: 0,
                  friction: 4,
                  tension: 10
                }).start()
            }, 100)
            // Do button action
            btnAction()
          }}>
            {/* Render content in button  */}
            <View style={{backgroundColor: 'transparent'}}>
              {btnItems}
            </View>
          </TouchableHighlight>
        </Animated.View>
        {/* Render text in footer */}
        <Text style={[footerStyle, txtFooterStyle]}>{txtFooter}</Text>
      </View>
    )
  }

  clickActive () {
    Animated.spring(
      this.state.clickAnim, {
        toValue: 1,
        friction: 4,
        tension: 10
      }
    ).start()
  }
}

ActionButton.defaultProps = {
  size: height(8),
  btnColor: '#DDDDDD',
  btnItems: null,
  txtFooter: null,
  btnAction: null,
  isSquare: false
}
