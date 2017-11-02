import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native'
// base component
import { width, height } from 'react-native-dimension'
import Spinner from 'react-native-loading-spinner-overlay'
import { Actions, ActionConst } from 'react-native-router-flux'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setToken } from '#/actions/mainAction'

// styles
import { background, primaryButton, colors } from '$/globalStyles'

// custom components
import Text, {CustomTextBold} from '../../components/CustomText/CustomText'

// global
import NavBarView from '$/navBarView'
import i18n from '$/translations'
import { contractAddressNoah, tokenDecimalsNoah } from '$/global-constants'

/**
 * NAME: PrivacyPolicy
 * CREATOR: TUAN
 * display Privacy Policy
 * FUNCTION
 * handleScroll
 * onPressedNext
 * visibilityTransform
 */

class PrivacyPolicy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      disabled: 'none',
      opacityNumber: new Animated.Value(0.7)
    }
  }
/**
 * FUNCTION handleScroll
 * PARAM: e -> scroll value 
 * handle scroll when scroll to finish, set disable button to 'box-none'
 * 
 */
handleScroll=(e) => {
  let windowHeight = Dimensions.get('window').height
  let height = e.nativeEvent.contentSize.height
  let offset = e.nativeEvent.contentOffset.y
  let viewContent = windowHeight / 100 * 10
  if (windowHeight + offset >= (height + viewContent)) {
    this.setState({
      disabled: 'box-none'
    })
    this.visibilityTransform(1)
  }
}
/**
 * FUNCTION onPressedNext
 * PARAM: 
 * resetTo WalletTop
 * 
 */
onPressedNext () {
  this.createToken()
}
/**
 * FUCTION: createToken
 * PARAM:
 * create token
 */
createToken () {
  const { setToken } = this.props

  var newData = {
    key: 0,
    tokenId: 'tokenID', // TODO: tokenID
    name: 'Noah',
    address: contractAddressNoah,
    cardImage: '',
    iconImage: '',
    symbol: 'Noah',
    url: '',
    balance: 0,
    decimal: tokenDecimalsNoah,
    checked: true
  }
  setToken(newData)
  // const self = this
  Actions.walletTop({mnemonic: this.props.mnemonic, type: ActionConst.RESET})
  // setTimeout(function () {
  //   self.setState({visible: false})
  // }, 1500)
}
/**
 * FUNCTION visibilityTransform
 * PARAM: bgTo ->  opacity value
 * set visibility opacity 
 * 
 */
visibilityTransform (bgTo) {
  Animated.timing(this.state.opacityNumber, {
    toValue: bgTo,
    delay: 0,
    duration: 300
  }).start()
}
// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
render () {
  const { disabled, visible } = this.state
  const { parentView } = this.props
  return (
    <View style= {background}>
      <NavBarView type='Back' title = {i18n.t('PrivacyContent.title1')}/>
      <Spinner visible={visible} textContent={'Loading...'} textStyle={{ color: 'white', fontSize: 15 }} />
      <ScrollView style= {styles.container} ref="myScrollView" onScroll={ (x) => this.handleScroll(x) }>
        {/* content0 */}
        <Text>{i18n.t('TermsOfService.content.content0')}</Text>

        {/* Article 1  General Provisions */}
        <CustomTextBold style={styles.title}>{i18n.t('TermsOfService.content.title1')}</CustomTextBold>
        <Text>{i18n.t('TermsOfService.content.content1_1')}</Text>
        <Text>{i18n.t('TermsOfService.content.content1_2')}</Text>
        <Text>{i18n.t('TermsOfService.content.content1_3')}</Text>

        {/* Article 2  Definitions */}
        <CustomTextBold style={styles.title}>{i18n.t('TermsOfService.content.title2')}</CustomTextBold>
        <Text>{i18n.t('TermsOfService.content.content2_1')}</Text>
        <Text>{i18n.t('TermsOfService.content.content2_2')}</Text>
        <Text>{i18n.t('TermsOfService.content.content2_3')}</Text>
        <Text>{i18n.t('TermsOfService.content.content2_4')}</Text>
        {/* Article 3  Usage Fee */}
        <CustomTextBold style={styles.title}>{i18n.t('TermsOfService.content.title3')}</CustomTextBold>
        <Text>{i18n.t('TermsOfService.content.content3_1')}</Text>

        {/* Article 4  Use of this service */}
        <CustomTextBold style={styles.title}>{i18n.t('TermsOfService.content.title4')}</CustomTextBold>
        <Text>{i18n.t('TermsOfService.content.content4_1')}</Text>
        <Text>{i18n.t('TermsOfService.content.content4_2')}</Text>
        <Text>{i18n.t('TermsOfService.content.content4_3')}</Text>

        {/* Article 5  Management of passwords and passphrases */}
        <CustomTextBold style={styles.title}>{i18n.t('TermsOfService.content.title5')}</CustomTextBold>
        <Text>{i18n.t('TermsOfService.content.content5_1')}</Text>
        <Text>{i18n.t('TermsOfService.content.content5_2')}</Text>

        {/* Article 6  Prohibited Matters */}
        <CustomTextBold style={styles.title}>{i18n.t('TermsOfService.content.title6')}</CustomTextBold>
        <Text>{i18n.t('TermsOfService.content.content6')}</Text>
        <Text>{i18n.t('TermsOfService.content.content6_1')}</Text>
        <Text>{i18n.t('TermsOfService.content.content6_2')}</Text>
        <Text>{i18n.t('TermsOfService.content.content6_3')}</Text>
        <Text>{i18n.t('TermsOfService.content.content6_4')}</Text>
        <Text>{i18n.t('TermsOfService.content.content6_5')}</Text>
        <Text>{i18n.t('TermsOfService.content.content6_6')}</Text>
        <Text>{i18n.t('TermsOfService.content.content6_7')}</Text>
        <Text>{i18n.t('TermsOfService.content.content6_8')}</Text>

        {/* Article 7  Disclaimer */}
        <CustomTextBold style={styles.title}>{i18n.t('TermsOfService.content.title7')}</CustomTextBold>
        <Text>{i18n.t('TermsOfService.content.content7_1')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_2')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_3')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_4')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_5')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_6')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_7')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_8')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_9')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_10')}</Text>
        <Text>{i18n.t('TermsOfService.content.content7_11')}</Text>

        {/* Article 8  Effective Period */}
        <CustomTextBold style={styles.title}>{i18n.t('TermsOfService.content.title8')}</CustomTextBold>
        <Text>{i18n.t('TermsOfService.content.content7_1')}</Text>

        {/* Established */}
        <Text style={{marginVertical: height(2)}}>{i18n.t('TermsOfService.content.Established')}</Text>

      </ScrollView>
      {
        parentView !== 'Menu' &&
            <Animated.View pointerEvents={disabled} style={[styles.viewBtn, { opacity: this.state.opacityNumber }]}>
              <TouchableOpacity style={[primaryButton, styles.btn]} onPress={() => this.onPressedNext()} elevation={10}>
                <Text style={{color: 'white'}}>{i18n.t('button.Confirm')}</Text>
              </TouchableOpacity>
            </Animated.View>
      }
    </View>
  )
}
}
PrivacyPolicy.navigatorStyle = {
  navBarHidden: true
}
function mapStateToProps (state) {
  return {
    onBack: state.onBack
  }
}
function mapDispatchToProps (dispatch) {
  return {
    setToken: bindActionCreators(setToken, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy)
const styles = StyleSheet.create({
  container: {
    height: height(80)
  },
  viewBtn: {
    height: height(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    height: height(8),
    width: width(30)
  },
  title: {
    marginVertical: height(1.5),
    color: colors.primary,
    fontWeight: 'bold'
  },
  content: {

  }
})
