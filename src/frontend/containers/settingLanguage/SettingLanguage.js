import React, { Component } from 'react'
import {
  View
} from 'react-native'

// import Menu from './Menu'
import NavBarMenu from '$/navBarMenu'
import { whilteLineShort, backgroundMenu } from '$/globalStyles'
import Radio from '../../components/Radio/Radio'
import i18n from '$/translations'
import styles from './styles'
//  redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLanguage } from '#/actions/language'
// Data of type money

/**
 * NAME: Setting Langugae 
 * CREATOR: TUAN
 * change default language display
 * FUNCTION 
 * componentWillMount()
 *  _onClick()
 */
class SettingLanguage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valueDefault: null,
      item: []
    }
    this.datas = [
      { 'selecteId': 0, 'content': 'ENGLISH', 'value': 'en' },
      { 'selecteId': 1, 'content': '日本語', 'value': 'jp' }
    ]
  }
  componentWillReceiveProps (props) {
    this.setState({})
  }
  componentDidMount () {
    this.datas.map(item => this.props.language === item.value && this.setState({ valueDefault: item.selecteId }))
  }
  /**
     * NAME: _onClick
     * PARAMS: item, keyAsync.Currency
     * action click
     */
  _onClick (id, item) {
    // set value of  Currency = item
    this.props.setLanguage(this.datas[id].value)
    this.props.reset()
    this.props.clickBack()
  }
  // --------_END_---------
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    return (
      <View style={backgroundMenu} ref={'SettingLanguage'}>
        <NavBarMenu onPress={this.props.clickBack} title ={i18n.t('SettingLanguage.title')}/>
        <View style={whilteLineShort}/>
        <View style={styles.container}>
          {/* radio button view */}
          <Radio
            options={{id: 'selecteId', value: 'content', disabled: 'selected', contentName: 'contentName'}}
            innerStyle= {styles.innerStyle}
            txtColor={'white'}
            textStyle = {styles.textStyle}
            imageStyle = {styles.imageStyle}
            noneColor={'#efefef'}
            key={this.state.valueDefault}
            selectedValue={this.state.valueDefault}
            onValueChange={(id, item) => this._onClick(id, item)}
            seledImg={require('./imgs/selected.png')}
            selImg={require('./imgs/select.png')}
            selnoneImg={require('./imgs/selectnone.png')}
            dataOption={this.datas}
            /* can't move to style file */
            style={{
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignItems: 'flex-start'
            }}
            /* -------end------- */
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: bindActionCreators(setLanguage, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingLanguage)
