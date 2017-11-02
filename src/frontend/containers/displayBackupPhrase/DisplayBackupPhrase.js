import React from 'react'
import {View} from 'react-native'

// redux
import { connect } from 'react-redux'

// style
import { background } from '$/globalStyles'
import styles from './styles'

// custom component
import CustomText from '../../components/CustomText/CustomText'
import NavBarView from '$/navBarView'

// multi language
import i18n from '$/translations'

/**
 * NAME: DisplayBackupPhrase
 * CREATOR: Chau
 * Show the passphrase of current Noah Main account
 */
// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
const DisplayBackupPhrase = ({account}) => (
  <View style={background} >
    <NavBarView type='back' title={i18n.t('DisplayBackupPhrase.Title')} />
    <CustomText style={styles.text}>{i18n.t('DisplayBackupPhrase.String1')}</CustomText>
    <View style={styles.whiteBox} elevation={10} >
      <CustomText style={styles.textWhiteBox}>{account[0].mnemonic}</CustomText>
    </View>
    <CustomText style={styles.text}>{i18n.t('DisplayBackupPhrase.String3')}</CustomText>
    <CustomText style={styles.text}>{i18n.t('DisplayBackupPhrase.String4')}</CustomText>
  </View>
)
function mapStateToProps (state) {
  return {
    account: state.account
  }
}
export default connect(mapStateToProps)(DisplayBackupPhrase)
