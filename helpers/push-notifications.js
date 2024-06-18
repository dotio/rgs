import firebase from 'firebase/app'
import 'firebase/messaging'
import {requestApi} from '../lib/api'
import {Router} from '../routes'

const onMessage = (payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(notificationTitle, notificationOptions)
    notification.onclick = function(event) {
      event.preventDefault()
      Router.pushRoute(payload.notification.click_action)
      notification.close()
    }
  }
}

export const initializeFirebase = async () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      messagingSenderId: '98932691122'
    })

    // if (!firebase.messaging.isSupported()) {
    //   return
    // }

    const messaging = firebase.messaging.isSupported() && firebase.messaging()

    const sw = await navigator.serviceWorker.register('/static/sw.js')

    messaging.useServiceWorker(sw)
    messaging.onTokenRefresh(() => {
      messaging.getToken().then((refreshedToken) => {
        sendTokenToServer(refreshedToken)
      }).catch(function() {})
    })

    firebase.messaging().onMessage(onMessage)
  }
  return true
}

export const askForPermissions = async () => {
  try {
    if (!firebase.messaging.isSupported()) {
      return
    }
    const messaging = firebase.messaging()
    await messaging.requestPermission()
    const token = await messaging.getToken()
    sendTokenToServer(token)

    return token
  } catch (error) {
    //TODO show popup
  }
}

export const clearPushToken = () => {
  window.localStorage.removeItem('sentFirebaseMessagingToken')
}

const sendTokenToServer = (pushToken) => {
  if (!isTokenSentToServer(pushToken)) {
    requestApi('put', '/push-token/web', {pushToken}).then(() => {
      setTokenSentToServer(pushToken)
    })
  }
}


// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
const isTokenSentToServer = (currentToken) => {
  return window.localStorage.getItem('sentFirebaseMessagingToken') === currentToken
}

const setTokenSentToServer = (currentToken) => {
  window.localStorage.setItem(
    'sentFirebaseMessagingToken',
    currentToken ? currentToken : ''
  )
}