import React, { Component } from 'react'
import { View, Vibration, Animated, Easing } from 'react-native'

// base component
import { width, height } from 'react-native-dimension'
import Camera from 'react-native-camera'
import { Actions } from 'react-native-router-flux'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setQRCode } from '#/actions/mainAction'

// custom component
import NavBarView from '$/navBarView'

// multilanguage
import i18n from '$/translations'

// styles
import styles from './styles'
/**
 * NAME: QrCodeScanner
 * CREATOR: TUAN
 * QrCode Scan
 * FUNCTION
 * componentWillMount()
 * scanLineAnimation()
 * onRouteTo()
 * onBarCodeRead()
 */
class QrCodeScanner extends Component {
  // define props and state of function
  constructor (props) {
    super(props)
    this.state = {
      scanTranslte: new Animated.Value(0),
      scanSuccess: false,
      results: ''
    }
  }
  /*
  * NAME: componentDidMount
  */
  componentDidMount () {
    this.scanLineAnimation()
  }
  /*
  * NAME: scanLineAnimation
  * scan Line run
  */
  scanLineAnimation () {
    Animated.sequence([
      Animated.timing(this.state.scanTranslte, {
        toValue: height(40),
        duration: 3000,
        easing: Easing.linear
      }),
      Animated.timing(this.state.scanTranslte, {
        toValue: 0,
        duration: 3000,
        easing: Easing.linear
      })
    ]).start(() => this.scanLineAnimation())
  }

  componentWillUnmout () {
    this.camera && this.camera.shouldQR()
  }

  /*
  * NAME: onBarCodeRead
  * read qrcode, barcode
  */
  onBarCodeRead (results) {
    if (results.data !== this.state.results) {
      this.setState({ results: results.data })
      Vibration.vibrate()

      this.props.setQRCode(results.data)
      Actions.pop()
      this.props.setQRCode('')
    }
  }
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const scanRectWidth = width(70)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <NavBarView type='back' title={i18n.t('QrCodeScanner.titleQrScanner')} />
        </View>
        <View style={styles.bottomView}>
          <Camera style={styles.cameraView}
            type={Camera.constants.Type.back}
            ref={(cam) => { this.camera = cam }}
            onBarCodeRead={this.onBarCodeRead.bind(this)} />

          {/* Rounded camera */}
          <View style={styles.rouderCamera}>
            <View style={styles.view1}>
              <View style={styles.view1_1} />
              <View style={styles.view1_2} />
            </View>
            <View style={styles.view2}>
              <View style={styles.view2_1}>
                <View style={styles.view2_1_1} />
                <View style={styles.view2_1_2} />
              </View>
              <View style={styles.view2_2}>
                <Animated.View style={{ width: scanRectWidth, height: 2, backgroundColor: '#fef6df', transform: [{ translateY: this.state.scanTranslte }] }} />
              </View>
              <View style={styles.view2_1}>
                <View style={styles.view2_1_3}/>
                <View style={styles.view2_1_4}/>
              </View>
            </View>
            <View style={styles.view3}>
              <View style={styles.view3_1} />
              <View style={styles.view3_2} />
            </View>
          </View>

        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setQRCode: bindActionCreators(setQRCode, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(QrCodeScanner)
