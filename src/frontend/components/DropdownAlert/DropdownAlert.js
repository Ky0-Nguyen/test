import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Animated, Platform, Image } from 'react-native'
import { width, height } from 'react-native-dimension'
import images from '$/constants/images'
import I18n from 'react-native-i18n'
import BaseAlert from './BaseAlert'
const IOS = Platform.OS === 'ios'
/**
 * NAME: DropdownAlert message
 * CREATOR: Khiem
 * Show alert message
 */

export default class DropdownAlert extends BaseAlert {
  renderAndroidImage (type) {
    return (
      <View style={{ width: width(13) }}>
        <Image style={{ width: width(12.5), height: height(7) }} resizeMode='contain'
          {...(type === 'error'
            ? {
              source: images.error
            }
            : { source: images.success }
          ) } />
      </View>
    )
  }

  renderAndroidText (text, style, numberOfLines, messageLength) {
    // let newLength = messageLength >= 80 ? width(messageLength * 0.8) : 'auto'
    if (text != null) {
      if (text.length > 0) {
        return (
          <View style={{ width: width(60), alignItems: 'center' }}>
            <Text style={ style} numberOfLines={numberOfLines}>{text}</Text>
          </View>
        )
      }
    }
    return null
  }

  // |------------------------------|
  // |--- RENDER MAIN VIEW START ---|
  // |------------------------------|
  render () {
    const { isOpen, type, message, animationValue } = this.state
    var messageLength = (message.length * width(I18n.locale === 'en' ? 4 : 7))
    if (messageLength >= width(77)) {
      messageLength = width(90)
    }
    return (
      isOpen
        ? <View style={styles.viewContainer}>
          {/* BackDrop Container */}
          <View style={styles.backDropContainer} />
          <Animated.View
            style={{
              transform: [{
                translateY: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-height(80), 0]
                })
              }],
              top: height(45),
              width: width(80),
              alignSelf: 'center'
            }}>
            <TouchableHighlight
              onPress={() => this.dismiss()}
              underlayColor={'white'}>
              {IOS
                ? <View style={[styles.defaultContainer, { opacity: 1, borderRadius: 10 }]}>
                  <View style={{ width: width(13) }}>
                    <Image style={{ width: height(7), height: height(7) }} resizeMode='cover'
                      {...(type === 'error'
                        ? {
                          source: images.error
                        }
                        : { source: images.success }
                      ) } />
                  </View>
                  <View style={{ marginTop: height(1), width: message.length * width(3) >= width(77) ? width(77) : width(65) }}>
                    <Text style={styles.messageStyle}>{this.state.message}</Text>
                  </View>
                </View>
                : <View style={[styles.defaultContainer, styles.containerStyle, { opacity: 1 }]}>
                  <View style={styles.textContainer}>
                    {this.renderAndroidImage(this.state.type)}
                    {this.renderAndroidText(this.state.message, styles.androidMessageStyle, 3, messageLength)}
                  </View>
                </View>}
            </TouchableHighlight>
          </Animated.View>
        </View> : null
    )
  }
}

var styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: height(15),
    backgroundColor: 'white'
  },
  messageModal: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: height(17),
    width: width(100),
    backgroundColor: 'white'
  },
  viewAlertContainer: {
    width: width(10),
    padding: width(1)
  },
  messageStyle: {
    textAlign: 'center',
    opacity: 1,
    marginLeft: width(1),
    fontWeight: 'normal',
    backgroundColor: 'transparent'
  },
  androidMessageStyle: {
    opacity: 1,
    marginLeft: width(1),
    fontWeight: 'normal',
    backgroundColor: 'transparent'
  },
  viewContainer: {
    position: 'absolute',
    height: height(100),
    width: width(100),
    zIndex: 5
  },
  backDropContainer: {
    position: 'absolute',
    opacity: 0.5,
    backgroundColor: 'black',
    height: height(100),
    width: width(100)
  },
  defaultContainer: {
    justifyContent: 'center',
    flexDirection: IOS ? 'column' : 'row',
    flexWrap: IOS ? 'nowrap' : 'wrap',
    alignItems: 'center',
    height: height(18),
    backgroundColor: 'white',
    opacity: 1,
    width: width(80),
    borderRadius: IOS ? 10 : 0
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: height(17),
    width: width(100),
    backgroundColor: 'white'
  },
  containerStyle: {
    flexDirection: 'row'
  }
})
