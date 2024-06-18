/* istanbul ignore file */
import {removeCookie, setCookie} from '../../../helpers/cookie'

export const createLoginMocks = mock => {
  mock.onPost('/api/authentication/send-code').reply(() => {
    return [
      200,
      {
        step: 1,
        count: 4,
        resending: 60,
      }
    ]
  })
  mock.onPost('/api/authentication/authorize').reply(() => {
    setCookie('isAuth',  1, {path: '/'})
    setCookie('token', 'registration', {path: '/'})
    setCookie('refresh_token',  'registration_refresh', {path: '/'})
    return [
      200,
      {
        personalAgreementStatus: true,
        auth: true
      }
    ]
  })
  mock.onPost('/api/authentication/authorize-with-agreement').reply(() => {
    setCookie('isAuth',  1, {path: '/'})
    return [
      200,
      {
        auth: true
      }
    ]
  })
  mock.onPost('/api/logout').reply(() => {
    removeCookie('token', {path: '/'})
    removeCookie('refresh_token', {path: '/'})
    removeCookie('isAuth', {path: '/'})
    return [
      200,
      {}
    ]
  })
  mock.onPost('/api/authentication/refresh').reply((config) => {
    const data = JSON.parse(config.data)
    setCookie('token', data.refreshToken, {path: '/'})
    setCookie('refresh_token',  data.refreshToken, {path: '/'})
    setCookie('isAuth',  1, {path: '/'})
    return [
      200,
      {}
    ]
  })
  mock.onPut('/registration').reply(() => {
    setCookie('token', 'registration', {path: '/'})
    setCookie('refresh_token',  'registration_refresh', {path: '/'})
    return [
      200,
      {}
    ]
  })
}