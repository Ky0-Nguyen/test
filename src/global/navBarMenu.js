import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import {width, height} from 'react-native-dimension'

import { navTitleMenu } from './globalStyles'
import images from './constants/images'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import Text from '@/components/CustomText/CustomText'
import { setTouchMenu } from '#/actions/accountActions'
import { bindActionCreators } from 'redux'
import i18n from './translations'

class navBarMenu extends React.Component {
  render () {
    const {title, setTouchMenu, onPress, type, language} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.view1}>
          { type === 'main' &&
            <Image source={images.logo2} style={styles.img}/>
          }
          <Text style={[navTitleMenu, styles.title, { paddingTop: IOS ? (language === 'jp' ? height(1.5) : 0) : 0, paddingBottom: IOS ? (language === 'en' ? height(0.5) : 0) : 0 }]}>{title === null ? i18n.t('Initial.title') : title}</Text>
        </View>
        <TouchableOpacity style={styles.touchView} onPress={() => {
          setTouchMenu(true)
          onPress()
        }}>
          <Ionicons name='ios-arrow-back' color='white' size={height(3.5)} />
        </TouchableOpacity>
      </View>
    )
  }
}
function mapStateToProps (state) {
  return {
    language: state.language
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTouchMenu: bindActionCreators(setTouchMenu, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(navBarMenu)
const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent', height: height(11)},
  img: {height: width(12), width: width(12), marginLeft: width(4), resizeMode: 'contain'},
  view1: {flex: 8, flexDirection: 'row', height: 'auto', justifyContent: 'flex-start', alignItems: 'center'},
  title: {marginLeft: width(4), height: 'auto', color: 'white'},
  touchView: {flex: 1, alignItems: 'center'}
})
