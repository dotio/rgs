import {pathOr} from 'ramda'
import {getTheme} from '../theme'
/**
 * Получить цвет по его названиию (если нет возвращает переданный текст)
 *
 * @param path - название цвета или цвет
 * @param theme - тема переданная через ThemeProvider (если не передана берется дефолтная)
 * @returns {*}
 */
export const getThemeValueByPath = (path, theme) => {
  if (theme === undefined) {
    console.warn('getThemeValueByPath called without "theme" parameter, default will be used')
  }
  return pathOr(null, path, theme) || pathOr(null, path, getTheme())
}