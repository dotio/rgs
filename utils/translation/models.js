import {assocPath} from 'ramda'
import {TranslationRepository} from './repository'
import {getLang} from './index'

export const initialState = {
  lang: 'ru',
  translations: {},
}

const localization = {
  state: initialState,
  reducers: {
    setTranslations(state, lang, translations) {
      return {
        ...state,
        lang: lang,
        translations: translations.reduce((result, value) => {
          const path = value.name.split('.')

          result = path.includes('plural')
            ? assocPath(path, value.string, result)
            : assocPath([...path, 'plural', '1'], value.string, result)

          return result
        }, {})
      }
    },
    reset() {
      return initialState
    }
  },
  effects: {
    async loadLocalization() {
      const translations = await TranslationRepository.load()
      this.setTranslations(getLang(), translations)
    },
  }
}

export default localization