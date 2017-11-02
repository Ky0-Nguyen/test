import React from 'react'
// import { StyleSheet } from 'react-native'
import { Actions, Scene } from 'react-native-router-flux'

// --------------Component--------------

import SplashScreen from '@/containers/SplashScreen/SplashScreen'
import Language from '@/containers/language/Language'
import SetupWallet from '@/containers/setupWallet/SetupWallet'
import RestoreWallet from '@/containers/restoreWallet/RestoreWallet'
import TermOfService from '@/containers/termOfService/TermOfService'
import PrivacyPolicy from '@/containers/privacyPolicy/PrivacyPolicy'
import WalletTop from '@/containers/walletTop/WalletTop'
import DisplayBackupPhrase from '@/containers/displayBackupPhrase/DisplayBackupPhrase'
import DisplayPrivateKey from '@/containers/displayPrivateKey/DisplayPrivateKey'
import PinCode from '@/containers/pinCode/PinCode'
import AboutNoahWallet from '@/containers/aboutNoahWallet/AboutNoahWallet'
import QrCode from '@/containers/qrCode/QrCodeScanner'
//  --------------end------------

const scenes = Actions.create(
  <Scene key="root" duration={0} hideNavBar hideTabBar>
    <Scene key="splashScreen" component={SplashScreen} initial={true} />
    <Scene key="language" component={Language} />
    <Scene key="setupWallet" component={SetupWallet} />
    <Scene key="restoreWallet" component={RestoreWallet} />
    <Scene key="termOfService" component={TermOfService} />
    <Scene key="privacyPolicy" component={PrivacyPolicy} />
    <Scene key="walletTop" component={WalletTop} />
    <Scene key="displayBackupPhrase" component={DisplayBackupPhrase} />
    <Scene key="displayPrivateKey" component={DisplayPrivateKey} />
    <Scene key="pinCode" component={PinCode} />
    <Scene key="about" component={AboutNoahWallet} />
    <Scene key="qr" component={QrCode} />

  </Scene>
)
export default scenes
