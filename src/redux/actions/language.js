import * as types from '$/constants/types'
import store from 'react-native-simple-store'

export function setLanguage (language) {
  store.save(types.SET_LANGUAGE, language)

  return {
    type: types.SET_LANGUAGE,
    language
  }
}
