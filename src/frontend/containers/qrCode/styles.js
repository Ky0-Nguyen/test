import {StyleSheet} from 'react-native'

import { width, height } from 'react-native-dimension'
import { colors, colorsLink } from '$/globalStyles'
const scanCoverColor = '#44444488'
const scanRectWidth = width(70)
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    flex: 1,
    marginTop: height(IOS ? 3 : 0)
  },
  header: {
    marginLeft: width(4)
  },
  bottomView: { height: height(85),
    backgroundColor: colorsLink.default },
  cameraView: { width: width(100), height: height(85) },
  rouderCamera: { position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0 },
  view1: {
    width: width(100),
    height: scanRectWidth / 2,
    backgroundColor: scanCoverColor,
    flexDirection: 'row' },
  view1_1: { borderBottomWidth: 4, borderBottomColor: colors.primary, width: scanRectWidth / 7 + 4, height: scanRectWidth / 2, marginLeft: (width(100) - scanRectWidth) / 2 - 4 },
  view1_2: { borderBottomWidth: 4, borderBottomColor: colors.primary, width: scanRectWidth / 7 + 4, height: scanRectWidth / 2, marginLeft: scanRectWidth - (scanRectWidth / 3.5) },
  view2: { width: width(100), height: scanRectWidth, flexDirection: 'row' },
  view2_1: { flex: 1, backgroundColor: scanCoverColor },
  view2_1_1: { borderRightWidth: 4, borderRightColor: colors.primary, height: scanRectWidth / 7 },
  view2_1_2: { borderRightWidth: 4, borderRightColor: colors.primary, height: scanRectWidth / 7, marginTop: scanRectWidth - (scanRectWidth / 3.5) },
  view2_1_3: { borderLeftWidth: 4, borderLeftColor: colors.primary, height: scanRectWidth / 7 },
  view2_1_4: { borderLeftWidth: 4, borderLeftColor: colors.primary, height: scanRectWidth / 7, marginTop: scanRectWidth - (scanRectWidth / 3.5) },
  view2_2: { width: scanRectWidth },
  view3: { flex: 1, width: width(100), backgroundColor: scanCoverColor, flexDirection: 'row' },
  view3_1: { borderTopWidth: 4, borderTopColor: colors.primary, width: scanRectWidth / 7 + 4, height: scanRectWidth / 2, marginLeft: (width(100) - scanRectWidth) / 2 - 4 },
  view3_2: { borderTopWidth: 4, borderTopColor: colors.primary, width: scanRectWidth / 7 + 4, height: scanRectWidth / 2, marginLeft: scanRectWidth - (scanRectWidth / 3.5) }
})
export default styles
