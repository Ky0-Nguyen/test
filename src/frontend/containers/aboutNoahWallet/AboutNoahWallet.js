import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

// redux
import { connect } from 'react-redux'

// base component
import { height } from 'react-native-dimension'

// style
import { background } from '$/globalStyles'

// custom component
import CustomText from '../../components/CustomText/CustomText'
import NavBarView from '$/navBarView'

// multi language
import i18n from '$/translations'

/**
 * NAME: AboutNoahWallet
 * CREATOR: Chau
 * Screen is discription about this app
 */
// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
const AboutNoahWallet = () => (
  <View style={background} >
    <NavBarView type='Back' title={i18n.t('AboutNoahWallet.Title')} />
    <ScrollView style={styles.container}>
      <CustomText>{i18n.t('AboutNoahWallet.About')}</CustomText>
    </ScrollView>
  </View>
)

export default connect()(AboutNoahWallet)
const styles = StyleSheet.create({
  container: {
    marginTop: height(1), flex: 1
  }
})
