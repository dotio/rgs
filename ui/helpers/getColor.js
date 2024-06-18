import {getThemeValueByPath} from './getThemeValue'

/**
 * Получить цвет по его названиию (если нет возвращает переданный текст)
 *
 * @param color - название цвета или цвет
 * @param theme - тема переданная через ThemeProvider (если не передана берется дефолтная)
 * @returns {*}
 */
export const getColor = (color, theme) => {
  if (theme === undefined) {
    console.warn('getColor called without "theme" parameter')
  }
  const colorsMap = getThemeValueByPath(['color'], theme)
  return colorsMap[color] ? colorsMap[color] : color
}


export const getElementColor = (element, theme) => {
  if (theme === undefined) {
    console.warn('getColor called without "theme" parameter')
  }
  const colorName = getThemeValueByPath(['elementsColors'], theme)[element]
  const colorsMap = getThemeValueByPath(['color'], theme)
  return colorsMap[colorName]
}