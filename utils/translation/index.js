/* istanbul ignore file */

import { connect } from 'react-redux'
import {pathOr} from 'ramda'
import PropTypes from 'prop-types'
import {langsToPluralFns} from './plural'
import {getCookie} from '../../helpers/cookie'

const LANG_GEORGIAN = 'ge-ge'
const NO_UPPERCASE = [LANG_GEORGIAN]

export const isUpperCaseAvailable = () => {
  return !NO_UPPERCASE.includes(getLang())
}

export const getLang = () => {
  return getCookie('lang') || 'ru-ru'
}

export const ucFirstFn = (string) => {
  return isUpperCaseAvailable() ? string.charAt(0).toUpperCase() + string.slice(1) : string
}

const translate = (translations, lang, path, ucFirst, count) => {
  let result = path

  const translation = pathOr(null, path.split('.'),  translations)
  //Если нашли перевод то выведем его
  if (translation) {
    if (count) {
      //Если передали число, то нужно вывести одну из форм
      result = langsToPluralFns[lang](count, translation)
    } else {
      //Если count не передан то всегда возвращаем форму для единственного числа
      result = translation.plural['1']
    }
  }
  return ucFirst ? ucFirstFn(result) : result
}

export const getTranslator = (localization) => (path, ucFirst, count) => {
  return translate(localization.translations, localization.lang, path, ucFirst, count)
}

const TranslationPure = (props) => {
  const {children, count, translations, lang, ucFirst} = props
  if (typeof children !== 'string') {
    throw 'Translation component accepts only strings as child'
  }
  return translate(translations, lang, children, ucFirst, count)
}

const mapStateToProps = state => ({
  translations: state.localization.translations,
  lang: state.localization.lang,
})

export const T = connect(mapStateToProps)(TranslationPure)

T.propTypes = {
  ucFirst: PropTypes.bool,
  count: PropTypes.number,
}

T.defaultProps = {
  ucFirst: false,
}