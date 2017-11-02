import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'

// base component
import { Actions } from 'react-native-router-flux'

// redux
import { connect } from 'react-redux'

// style
import { background, primaryButton, secondaryButton } from '$/globalStyles'
import styles from './styles'

// constants
import images from '$/constants/images'

// multilanguage
import i18n from '$/translations'

// custom component
import NavBarView from '$/navBarView'

// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
const SetupWallet = () => (
  <View style={background}>
    <NavBarView title={' '}/>
    <View style={styles.topView}>
      <Image source={images.logo2}/>
      <Text style={styles.noahTxt}>{i18n.t('Initial.NoahCoin')}</Text>
    </View>
    <View style={styles.bottomView}>
      <TouchableOpacity onPress={() => Actions.termOfService() }>
        <View style={[primaryButton, styles.btn]} elevation={10} >
          <Text style={styles.textStyle}>{i18n.t('SetupWallet.Create')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Actions.restoreWallet() }>
        <View style={[secondaryButton, styles.btn]} elevation={10}>
          <Text style={styles.textStyle}>{i18n.t('SetupWallet.Restore')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
)

function mapStateToProps (state) {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(SetupWallet)
