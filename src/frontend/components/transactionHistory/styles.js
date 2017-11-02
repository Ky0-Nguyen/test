import { StyleSheet } from 'react-native'
import { colors } from '$/globalStyles'
import { width, height } from 'react-native-dimension'
const styles = StyleSheet.create({
  container: {
    height: height(63), width: width(92)
  },
  bottomView: {
    paddingTop: height(2.5),
    height: height(54),
    justifyContent: 'space-between'
  },

  topView: {
    paddingTop: height(1.5),
    height: height(6.5)
  },
  addressStyle: {
    height: height(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row' },
  address: {
    color: colors.title,
    fontSize: width(4),
    width: width(75),
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtBtn: {
    color: colors.primary
  },
  viewHistory: { height: height(45) },
  viewFooterHistory: { paddingVertical: height(2), borderTopWidth: 0, borderColor: 'white' },
  line: {
    marginTop: height(2),
    height: width(0.2),
    backgroundColor: '#CED0D0'
  },
  viewToolTip: { height: height(8), justifyContent: 'center' },
  buttonCopy: {
    width: width(17),
    height: height(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    borderWidth: IOS ? 1 : height(0.15),
    borderRadius: height(0.8)

  },

  itemContainer: {
    backgroundColor: colors.box,
    marginTop: width(3),
    padding: width(3)
  },

  itemText: {
    fontSize: width(4)
  },

  actionContainer: {
    height: height(8),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnTextStyle: {
    fontSize: width(4),
    color: colors.text2
  },

  tooltipBox: {
    width: width(13),
    height: height(6),
    backgroundColor: 'white',
    zIndex: 15,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5
  },
  img: {
    width: width(4),
    height: width(4),
    resizeMode: 'contain'
  },
  imgGas: {
    alignSelf: 'center'
  },
  txtBtnGas: {
    color: 'green',
    alignSelf: 'center'
  },
  viewEmpty: {
    height: height(6),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtEmpty: {
    fontSize: width(3.5),
    zIndex: 2,
    position: 'absolute'
  },
  tooltipContainer: {
    borderRadius: width(0),
    shadowColor: '#C3C3C3',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 2,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  labelContainerStyle: {
    borderRadius: width(0),
    backgroundColor: 'white',
    width: width(92),
    height: 'auto',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#C3C3C3',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 2
  },
  labelStyle: {
    textAlign: 'justify', color: 'red', fontSize: width(3.47)
  }
})

export default styles
