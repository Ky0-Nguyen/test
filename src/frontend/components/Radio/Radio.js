import React, {Component} from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native'
var Dimensions = require('Dimensions')
var width = Dimensions.get('window').width
// var height = Dimensions.get('window').height
export default class RadioModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: true,
      radioInit: this.props.radioInit,
      indexa: this.props.selectedValue === undefined ? '0' : this.props.selectedValue
    }
  }
  click (id, item) {
    this.setState({indexa: id})
    this.props.onValueChange(id, item)
  }
  componentDidMount () {
    const indexInit = this.props.selectedValue === undefined ? '0' : this.props.selectedValue
    this.setState({
      indexa: indexInit
    })
    // this.props.onValueChange(indexInit)
  }
  createInner (child, index, props) {
    const disabled = props ? child[this.props.options.disabled] : child.props.disabled
    const childC = props ? child[this.props.options.value] : child.props.children
    const childContentName = props ? child[this.props.options.contentName] : child.props.textValue
    const values = props ? child[this.props.options.id] : child.props.value
    const hightlight = props ? this.state.indexa === child[this.props.options.id] : this.state.indexa === child.props.value
    return <Raio2
      child={childC}
      index={index}
      value={values}
      key={index}
      initStyle={this.props.innerStyle}
      txtColor={this.props.txtColor}
      noneColor={this.props.noneColor}
      onclick={this.click.bind(this)}
      hightlight={hightlight}
      disabled={disabled}
      seledImg={this.props.seledImg}
      selImg={this.props.selImg}
      selnoneImg={this.props.selnoneImg}
      textStyle = {this.props.textStyle}
      imageStyle = {this.props.imageStyle}
      textValue= {childContentName}
    />
  }
  render () {
    // const that = this
    return (
      <View {...this.props.style}>
        {
          !this.props.dataOption && React.Children.map(this.props.children, (child, index) => this.createInner(child, index))
        }
        {
          this.props.dataOption && this.props.dataOption.map((item, index) => this.createInner(item, index, true))
        }</View>
    )
  }
}

class Raio2 extends Component {
  click (id, item) {
    if (!this.props.disabled) {
      this.props.onclick(id, item)
    }
  }
  render () {
    var imgUrl = this.props.hightlight ? this.props.seledImg || require('./imgs/selted.png') : this.props.selImg || require('./imgs/selt.png')
    var imgUrlNone = this.props.selnoneImg || require('./imgs/seltnone.png')
    return (
      <TouchableHighlight
        underlayColor='transparent'
        style={[{marginRight: 15, width: (width - 80) / 2, height: 24}, this.props.initStyle]}
        onPress={this.click.bind(this, this.props.value, this.props.child)}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
          {this.props.disabled && !this.props.hightlight && <Image source={imgUrlNone} style={[{width: 14, height: 14, marginRight: 7}, this.props.imageStyle]}/>}
          {this.props.disabled && this.props.hightlight && <Image source={imgUrl} style={[{width: 14, height: 14, marginRight: 7}, this.props.imageStyle]}/>}
          {!this.props.disabled && <Image source={imgUrl} style={[{width: 14, height: 14, marginRight: 7}, this.props.imageStyle]}/>}
          <Text style={[{color: this.props.disabled ? this.props.noneColor || '#dfdfdf' : this.props.txtColor || '#414141', width: width, marginRight: width / 4, marginLeft: 10, fontSize: 20}, this.props.textStyle]}>{this.props.child} {this.props.textValue}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
