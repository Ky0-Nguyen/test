import React from 'react'

import {Animated} from 'react-native'

/**
 * NAME: BASE INPUT CUSTOM
 * CREATOR: KHIEM
 * Custom Input Text Style
 * FUNCTION
 */
export default class BaseInput extends React.Component {
  constructor (props, context) {
    super(props, context)

    this._onLayout = this._onLayout.bind(this)
    this._onChange = this._onChange.bind(this)
    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
    this.focus = this.focus.bind(this)

    const value = props.value || props.defaultValue

    this.state = {
      value,
      focusedAnim: new Animated.Value(value ? 1 : 0),
      activeAnim: new Animated.Value(1),
      errorAnim: new Animated.Value(1),
      valueActive: new Animated.Value(0),
      activeIcon: false
    }
  }

  componentWillReceiveProps (newProps) {
    const newValue = newProps.value
    newProps.isError ? this.errorActive(1) : this.errorActive(0)
    newValue ? this.valueActive(1) : this.valueActive(0)
    if (newProps.hasOwnProperty('value') && newValue !== this.state.value) {
      this.setState({
        value: newValue
      })
      // animate input if it's active state has changed with the new value
      // and input is not focused currently.
      const isFocused = this.refs.searchBar.isFocused()
      if (!isFocused) {
        const isActive = Boolean(newValue)
        if (isActive !== this.isActive) {
          this._toggle(isActive)
        }
      }
    }
  }

  _onLayout (event) {
    this.setState({
      width: event.nativeEvent.layout.width
    })
  }

  _onChange (event) {
    this.setState({
      value: event.nativeEvent.text
    })

    const onChange = this.props.onChange
    if (onChange) {
      onChange(event)
    }
  }

  _onBlur (event) {
    !this.props.value && this._toggle(false)

    const onBlur = this.props.onBlur
    if (onBlur) {
      onBlur(event)
    }
  }

  _onFocus (event) {
    this._toggle(true)

    const onFocus = this.props.onFocus
    if (onFocus) {
      onFocus(event)
    }
  }

  _toggle (isActive) {
    this.isActive = isActive
    Animated.timing(
      this.state.focusedAnim, {
        toValue: isActive ? 1 : 0,
        duration: this.props.animationDuration,
        easing: this.props.easing
      }
    ).start()
  }

  active (isActive) {
    Animated.timing(
      this.state.activeAnim, {
        toValue: this.state.activeIcon ? 1 : 0,
        duration: this.props.animationDuration,
        easing: this.props.easing
      }
    ).start()
  }

  valueActive (opacity) {
    Animated.timing(
      this.state.valueActive, {
        toValue: opacity,
        duration: 5
      }
    ).start()
  }

  errorActive (opacity) {
    Animated.timing(
      this.state.errorAnim, {
        toValue: opacity,
        duration: 400
      }
    ).start()
  }

  // public methods

  inputRef () {
    return this.refs.searchBar
  }

  focus () {
    if (this.props.editable !== false) {
      return this.refs.searchBar
    }
  }

  blur () {
    this.inputRef().blur()
  }

  isFocused () {
    return this.inputRef().isFocused()
  }

  clear () {
    this.inputRef().clear()
  }
}
