import React from 'react'
import axios from 'axios'
import Qs from 'qs'
import {removeCookie, getCookiesString, parseAxiosSetCookieHeaderToCookies, getCookie} from '../helpers/cookie'
import MockAdapter from 'axios-mock-adapter'
import {createMocks, createLocalMocks} from '../mocks'
import {debouncePromise} from '../helpers/debounce'
import {container} from '../helpers/container'
import {getConfig} from '../helpers/config'
import {toast} from 'react-toastify'
import {NotificationBody} from '../features/notifications/components/notification-body'

const { publicRuntimeConfig } = getConfig()
const { DOMAIN, API_URL, WS_URL, WITH_MOCKS, WITH_LOCAL_MOCKS } = publicRuntimeConfig


console.log(API_URL, DOMAIN + API_URL)
const axiosInstance = axios.create({
  baseURL: (process.browser ? API_URL : DOMAIN + API_URL),
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  }
})

if (WITH_MOCKS) {
  createMocks(new MockAdapter(axiosInstance, { delayResponse: 100 }))
}

if (WITH_LOCAL_MOCKS) {
  createLocalMocks(new MockAdapter(axiosInstance, { delayResponse: 100 }))
}

export { axiosInstance }

export const checkAuth = () => {
  return !!getCookie('isAuth')
}

export const requestApi = async (method, url, data, multipart = false, uploadCallback = null, cancelToken = null, configParams = {}) => {
  const config = {
    method: method,
    url: url,
    params: {},
    ...configParams
  }
  if (uploadCallback) {
    config.onUploadProgress = uploadCallback
  }
  if (cancelToken) {
    config.cancelToken = cancelToken
  }
  if (data) {
    switch (method) {
      case 'post':
      case 'put':
      case 'patch':
        config.data = data
        break
      default:
        config.params = {...config.params, ...data}
        break
    }
  }

  if (multipart) {
    const formData = new FormData()
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key])
      }
    }
    config.headers = {'Content-Type': undefined, enctype: 'multipart/form-data'}
    config.data = formData
  } else if (method !== 'get') {
    config.data = data
  }

  if (!getCookie('token') && url !== '/registration') {
    await getDeviceToken()
  }

  //Проксируем куки
  if (!process.browser) {
    const cookiesString = getCookiesString()
    if (cookiesString.length) {
      config.headers = {
        Cookie: getCookiesString()
      }
    }
  }


  const oldToken = getCookie('token')
  try {
    let response = await axiosInstance.request(config)
    if (!process.browser && response.headers && response.headers['set-cookie']) {
      parseAxiosSetCookieHeaderToCookies(response.headers['set-cookie'])
    }
    updateTokenInWs(oldToken)
    if (response.data && response.data.notification && process.browser) {
      toast(
        <NotificationBody
          type={response.data.notification.type}
          text={response.data.notification.message}
        />,
        {type: response.data.notification.type}
      )
    }
    return response.data
  } catch (error) {
    updateTokenInWs(oldToken)
    //Не авторизован
    if (error.response.status === 403 || error.response.status === 401) {
      removeCookie('isAuth')
      removeCookie('token')
      removeCookie('refresh_token')
    }
    if ((error.response.status === 400 || error.response.status === 500) && process.browser) {
      toast(<NotificationBody type={'error'} text={error.response.data.message} />, {type: 'error'})
    }
    throw (error)
  }
}

const updateTokenInWs = (oldToken) => {
  if (process.browser) {
    const token = getCookie('token')
    if (token !== oldToken) {
      container.get('ws').changeWsUri(WS_URL, token)
    }
  }
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}


export const getDeviceToken = debouncePromise(async () => {
  try {
    await requestApi('put', '/registration', {login: uuidv4()})
    return true
  } catch (e) {
    return false
  }
})
