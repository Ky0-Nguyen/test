import i18n from 'react-native-i18n'
import en from './locales/en'
import jp from './locales/jp'

i18n.fallbacks = true
i18n.translations = {
  en,
  jp
}

export default i18n
