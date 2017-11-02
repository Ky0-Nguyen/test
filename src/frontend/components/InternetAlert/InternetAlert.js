import React, { Component } from 'react'
import { Animated, Text } from 'react-native'

// base component
import { width, height } from 'react-native-dimension'

// redux
import { connect } from 'react-redux'

// global
import i18n from '$/translations'

class InternetAlert extends Component {
  constructor (props) {
    super(props)
    this.state = {
      internetOpacity: new Animated.Value(0),
      zIndexPage: -10
    }
  }

  internetShow () {
    var self = this
    this.setState({zIndexPage: 500})
    Animated.timing(this.state.internetOpacity, {
      toValue: 0.8,
      delay: 0,
      duration: 500
    }).start()

    setTimeout(() => {
      Animated.timing(self.state.internetOpacity, {
        toValue: 0,
        delay: 0,
        duration: 500
      }).start()
      this.setState({zIndexPage: -10})
    }, 2000)
  }

  componentWillReceiveProps (props) {
    !props.internet && this.internetShow()
  }

  componentDidMount () {
    !this.props.internet && this.internetShow()
  }

  render () {
    const { internetOpacity, zIndexPage } = this.state
    const { internet } = this.props
    return (
      !internet &&
      <Animated.View style={{
        top: height(45),
        height: height(10),
        width: width(85),
        borderRadius: 30,
        opacity: internetOpacity,
        backgroundColor: '#4a4f54',
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: zIndexPage
      }}>
        <Text style={{ opacity: 1, fontSize: width(3.5), textAlign: 'center', color: 'white' }}>{i18n.t('GlobalError.NetworkConErr')}</Text>
      </Animated.View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    internet: state.internet
  }
}

export default connect(mapStateToProps)(InternetAlert)
