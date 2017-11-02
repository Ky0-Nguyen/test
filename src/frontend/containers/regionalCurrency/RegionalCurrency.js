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
import { setCurrency } from '#/actions/currencyActions'
// Data of type money
let datas = [
  {
    'selecteId': 0,
    'content': 'USD',
    'contentName': 'UNITED STATES DOLLAR',
    'selected': false
  },
  {
    'selecteId': 1,
    'content': 'JPY',
    'contentName': 'JAPANESE YEN',
    'selected': false
  }
]
/**
 * NAME: Regional Currency
 * CREATOR: TUAN
 * default display type money
 * FUNCTION 
 * componentWillMount()
 *  _onClick()
 */
class RegionalCurrency extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valueDefault: null,
      item: []
    }
  }

  componentDidMount () {
    const { currency } = this.props
    var self = this
    if (currency !== undefined && currency !== null && currency !== '') {
      datas.forEach(function (element) {
        if (currency === element.content) {
          // change valueDefault  to selecteId
          self.setState({valueDefault: element.selecteId})
        }
      })
    } else {
      this.props.setCurrency('USD')
      datas.forEach(function (element) {
        if (element.content === 'USD') {
          // change valueDefault  to selecteId
          self.setState({valueDefault: element.selecteId})
        }
      })
    }
  }
  /**
     * NAME: _onClick
     * PARAMS: item, keyAsync.Currency
     * action click
     */
  _onClick (id, item) {
    // set value of  Currency = item
    this.props.setCurrency(item)
    this.props.clickBack()
  }
  // --------_END_---------
  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    return (
      <View style={backgroundMenu}>
        <NavBarMenu onPress={this.props.clickBack} title ={i18n.t('Currency.title')}/>
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
            dataOption={datas}
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
    currency: state.currency
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: bindActionCreators(setCurrency, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegionalCurrency)
