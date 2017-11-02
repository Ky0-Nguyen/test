import { Component } from 'react'
import { Animated, Platform } from 'react-native'

/**
 * NAME: DropdownAlert message
 * CREATOR: Khiem
 * Show alert message
 */
var closeTimeoutId = null
const duration = 450
export default class BaseAlert extends Component {
  constructor (props) {
    super(props)
    this.state = {
      animationValue: new Animated.Value(0),
      type: '',
      message: '',
      isOpen: false
    }
    // this.props.styles = styles
  }

  // Alert type
  alertWithType (type, message) {
    var self = this
    // Check type of message
    if (typeof message !== 'string') {
      message = message.toString()
    }
    // Open alert 
    if (this.state.isOpen === false) {
      this.setState({ type, message, isOpen: true })
    }
    this.animate(1)
    // Close after delay time
    if (this.props.closeInterval > 1) {
      closeTimeoutId = setTimeout(function () {
        self.dismiss()
      }, this.props.closeInterval)
    }
  }

  // Dismiss Alert message
  dismiss () {
    if (this.state.isOpen) {
      // Close alert message
      if (closeTimeoutId != null) {
        clearTimeout(closeTimeoutId)
      }
      this.animate(0)
      setTimeout(function () {
        this.setState({ isOpen: false })
      }.bind(this), (duration))
    }
  }

  // Animated for alert message
  animate (toValue) {
    Animated.spring(
      this.state.animationValue, {
        toValue: toValue,
        duration: duration,
        friction: 9,
        useNativeDriver: (IOS)
      }
    ).start()
  }
}
