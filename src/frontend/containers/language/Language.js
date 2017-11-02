import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '#/actions'

// style
import { background, primaryButton, secondaryButton } from '$/globalStyles'
import styles from './styles'

// image
import images from '$/constants/images'
import { Actions, ActionConst } from 'react-native-router-flux'

class Language extends Component {
  componentDidMount () {
    if (this.props.account.length > 0) {
      Actions.walletTop(ActionConst.RESET)
    } else {
      Actions.language(ActionConst.RESET)
    }
  }
  /**
   * onSelectLanguage
   * @param {*} language 
   * event click choose language for change
   */
  onSelectLanguage (language) {
    this.props.setLanguage(language)
    Actions.setupWallet()
  }
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    return <View style={background}>
      <View style={styles.topView}>
        <Image source={images.logo2} />
        <Text style={styles.noahTxt}>{'Noah Coin'}</Text>
      </View>

      <View style={styles.centerView}>
        <Text style={styles.langTxt}>{'Select language'}</Text>
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity onPress={() => this.onSelectLanguage('jp') }>
          <View style={[primaryButton, styles.btn]} elevation={10}>
            <Text style={styles.textStyle}>{'日本語'}</Text>
          </View>
        </TouchableOpacity>
        <View style ={{height: 20}}/>
        <TouchableOpacity onPress={() => this.onSelectLanguage('en') } >
          <View style={[secondaryButton, styles.btn]} elevation={10} >
            <Text style={styles.textStyle}>{'English'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  }
}

function mapStateToProps (state) {
  return {
    language: state.language,
    account: state.account
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Language)
