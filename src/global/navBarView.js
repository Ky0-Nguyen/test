import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { height, width } from 'react-native-dimension'
import { navTitle, colors } from './globalStyles'
import Images from './constants/images'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CustomTextBold } from '@/components/CustomText/CustomText'
import { connect } from 'react-redux'
import { setTouchMenu } from '#/actions/accountActions'
import { bindActionCreators } from 'redux'
import i18n from './translations'

const navBarView = ({onPress, title, type, onBack, setTouchMenu, language}) => (
  <View style={{justifyContent: 'center', height: height(7)}}>
    {
      type === 'Menu'
        ? (<TouchableOpacity onPress={onPress} style={styles.menu} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Image source={Images.ic_menu} style={styles.img}/>
        </TouchableOpacity>)
        : (<TouchableOpacity onPress={() => {
          setTouchMenu(true)
          onBack()
        }} style={styles.menu} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Ionicons name='ios-arrow-back' color={colors.primary} size={height(4.5)} />
        </TouchableOpacity>)
    }
    <CustomTextBold style={[navTitle, { paddingTop: IOS ? (language === 'jp' ? height(1.2) : 0) : 0, paddingBottom: IOS ? (language === 'en' ? height(0.5) : 0) : 0 }]}>{title === undefined ? i18n.t('Initial.NoahCoin') : title}</CustomTextBold>
  </View>
)
function mapStateToProps (state) {
  return {
    onBack: state.onBack,
    language: state.language
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTouchMenu: bindActionCreators(setTouchMenu, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(navBarView)
const styles = StyleSheet.create({
  menu: {
    zIndex: 2,
    position: 'absolute',
    paddingTop: 2
  },
  img: {
    height: height(2.3),
    width: width(4.5)
  }
})
