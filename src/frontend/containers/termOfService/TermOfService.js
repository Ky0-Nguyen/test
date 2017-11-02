import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { width, height } from 'react-native-dimension'
import { Actions } from 'react-native-router-flux'

import { background, primaryButton, secondaryButton, colors } from '$/globalStyles'
import Text, {CustomTextBold} from '../../components/CustomText/CustomText'
import NavBarView from '$/navBarView'
import i18n from '$/translations'

/**
 * NAME: TermOfService
 * CREATOR: TUAN
 * display Terms Of Service
 * FUNCTION
 * handleScroll
 * onPressedNext
 * visibilityTransform
 */
class TermOfService extends Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: 'none',
      opacityNumber: new Animated.Value(0.7),
      isOnBack: false
    }
  }

  /**
   * FUNCTION onPressDisagree
   * PARAM: 
   * back to pre-screen
   * 
   */
  onPressDisagree () {
    if (!this.state.isOnBack) {
      this.setState({isOnBack: true})
      this.props.onBack()
    }
  }
  /**
   * FUNCTION onPressedNext
   * PARAM: 
   * push to screen Privacy Policy
   * 
   */
  onPressedNext () {
    Actions.privacyPolicy({mnemonic: this.props.mnemonic})
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
    const { disabled } = this.state
    const { parentView } = this.props
    return (
      <View style= {background}>
        <NavBarView type='Back' title = {i18n.t('TermsOfService.title')}/>
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
        {/* if parrentView is Menu not button  */}
        {
          parentView !== 'Menu' &&
            <View style={styles.viewBtn}>
              <TouchableOpacity ref='btnDisagree' style={[secondaryButton, styles.btn]} onPress={this.onPressDisagree.bind(this)} elevation={10}>
                <Text style={{color: 'white'}}>{i18n.t('TermsOfService.Disagree')}</Text>
              </TouchableOpacity>
              <Animated.View pointerEvents={disabled} style= {[primaryButton, styles.btn, { opacity: this.state.opacityNumber }]}>
                <TouchableOpacity
                  pointerEvents={disabled}
                  style={[primaryButton, styles.btn]}
                  elevation={10}
                  onPress= { () => this.onPressedNext()}>
                  <Text style={{color: 'white'}}>{i18n.t('TermsOfService.Agree')}</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
        }

      </View>
    )
  }
}
TermOfService.navigatorStyle = {
  navBarHidden: true
}
function mapStateToProps (state) {
  return {
    onBack: state.onBack
  }
}

export default connect(mapStateToProps)(TermOfService)
const styles = StyleSheet.create({
  container: {
    height: height(80)
  },
  viewBtn: {
    height: height(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btn: {
    height: height(8),
    width: width(30)
  },
  title: {
    marginTop: height(2),
    marginBottom: height(1),
    color: colors.primary,
    fontWeight: 'bold'
  },
  content: {

  }
})
