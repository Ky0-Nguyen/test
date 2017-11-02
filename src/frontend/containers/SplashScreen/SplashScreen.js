import React, { Component } from 'react'
import { Image, NetInfo, View, StyleSheet } from 'react-native'
import { width, height } from 'react-native-dimension'
// Other Components
import { connect } from 'react-redux'
import images from '$/constants/images'
import { bindActionCreators } from 'redux'
import { setInternet } from '#/actions/mainAction'
import { setOnBack } from '#/actions/buttonActions'
import { Actions, ActionConst } from 'react-native-router-flux'

/**
 * NAME: SPLASH SCREEN
 * CREATOR: Chau
 * Display Splash Screen for HBWallet
 */
class SplashScreen extends Component {
  componentDidMount () {
    var self = this
    this.props.setOnBack(this.onBack.bind(this))
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
    // SET time for display splash screen
    setTimeout(function () {
      if (self.props.account.length > 0) {
        Actions.walletTop({type: ActionConst.RESET})
      } else {
        Actions.language({type: ActionConst.RESET})
      }
    }, 700)
  }
  /**
   * onBack
   */
  onBack () {
    Actions.pop()
  }
  // Handle Connection when internet Change
  /**
   * handleConnectionChange
   */
  handleConnectionChange = (isConnected) => {
    this.props.setInternet(isConnected)
  }

  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    return (
      <View style={styles.container}>
        <Image source={images.splash} style={styles.img} />
      </View>
    )
  }
}

// Redux Content
const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setInternet: bindActionCreators(setInternet, dispatch),
    setOnBack: bindActionCreators(setOnBack, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  img: {
    width: width(100),
    height: height(100),
    resizeMode: 'stretch'
  }
})
