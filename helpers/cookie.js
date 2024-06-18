/* global require */
import Cookies from 'universal-cookie'
const requestContext = require('request-context')
const cookies = new Cookies()

/**
 * Получить объект для работы с куками
 * @returns Cookies
 */
const getCookies = () => {
  if (process.env.NODE_ENV !== 'test' && !process.browser) {
    return requestContext.get('request:cookies')
  }
  return cookies
}

export const getCookie = (name) => {
  return getCookies().get(name)
}

export const setCookie = (name, value, options = {}) => {
  return getCookies().set(name, value, options)
}

export const removeCookie = (name) => {
  return getCookies().remove(name, {path: '/'})
}

export const getCookiesString = () => {
  const cookies = Object.entries(getCookies().getAll())
  if (cookies.length) {
    return cookies.map((cookie) => {
      return `${cookie[0]}=${cookie[1]}`
    }).join('; ')
  }
  return ''
}

/**
 * Прокидываем куки полученные на сервере во все следующие запросы
 * @param setCookieHeader
 */
export const parseAxiosSetCookieHeaderToCookies = (setCookieHeader) => {
  setCookieHeader.forEach(cookieString => {
    const cookieParts = cookieString.split(';')
    const [name, value] = cookieParts.shift().split('=')
    const options = {}
    cookieParts.forEach(cookiePart => {
      const [optName, optValue] = cookiePart.split('=')
      const formattedOptName = optName.trim().toLowerCase()
      if (!optValue) {
        return
      }
      options[formattedOptName] = formattedOptName === 'expires' ? new Date(optValue.trim()) : optValue.trim()
    })
    setCookie(name, value, options)
  })
}