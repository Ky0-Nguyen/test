import React from 'react'
import {
  View,
  TouchableHighlight,
  FlatList,
  StyleSheet
} from 'react-native'

// base component
import { width, height } from 'react-native-dimension'
import { Actions } from 'react-native-router-flux'

// custom component
import NavBarMenu from '$/navBarMenu'
import Text from '../../components/CustomText/CustomText'
// style
import { backgroundMenu } from '$/globalStyles'

// multilanguage
import i18n from '$/translations'

// redux
import { connect } from 'react-redux'

/*
 * NAME: PinCodeSetting
 * CREATOR: TUAN
 * show button setup pincode, change pincode, remove pincode
 * FUNCTION
 * onClick
 * renderRow s
 */
/*
  * NAME: onClick
  * PARAM: key
  * route to Wallet Detail
  */
const onClick = (key) => {
  switch (key) {
  case 1:
    Actions.pinCode({types: 'SetupPinCode', title: i18n.t('SettingPinCode.titleSetup')})
    break
  case 2:
    Actions.pinCode({types: 'ChangePinCode', title: i18n.t('SettingPinCode.titleChange')})
    break
  case 3:
    Actions.pinCode({types: 'RemovePinCode', title: i18n.t('SettingPinCode.titleRemove')})
    break
  default:
    break
  }
}
/*
  * NAME: renderRow
  * PARAM: item ->  item of list data button 
  * render button 
  */
const renderRow = ({ item }) => {
  return (
    <TouchableHighlight onPress={() => onClick(item.key)} underlayColor= {'#fef6df'}>
      <View style={styles.buttonView}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )
}

// |------------------------------|
// |--- RENDER MAIN VIEW START ---|
// |------------------------------|
class PinCodeSetting extends React.Component {
  render () {
    const {clickBack, pincode} = this.props
    let data = [
      { key: 1, title: i18n.t('SettingPinCode.titleSetup').toUpperCase() }

    ]
    let data1 = [
      { key: 2, title: i18n.t('SettingPinCode.titleChange').toUpperCase() },
      { key: 3, title: i18n.t('SettingPinCode.titleRemove').toUpperCase() }
    ]
    return (
      <View style={backgroundMenu}>
        <NavBarMenu onPress={clickBack} title ={i18n.t('SettingPinCode.title')}/>
        <View style={styles.containers}>
          <FlatList
            data={!pincode ? data : data1}
            renderItem={renderRow} />
        </View>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    pincode: state.pincode, language: state.language
  }
}
export default connect(mapStateToProps)(PinCodeSetting)
const styles = StyleSheet.create({
  containers: {
    height: height(100), width: width(100)
  },
  textView: {
    margin: width(1),
    height: height(10),
    marginBottom: height(1)
  },
  leftBottom: {
    height: height(89)
  },
  buttonView: {
    width: width(100),
    height: height(7),
    justifyContent: 'center'
  },
  txtVersion: {
    color: 'white',
    fontSize: height(4),
    marginLeft: width(4),
    marginBottom: height(1)
  },
  title: {
    marginLeft: width(4), color: '#FFFFFF'
  }
})
