import moment from 'moment'
import {getConfig} from '../helpers/config'
import {WebSocketMock} from '../mocks/websocket-mock'
import {container} from '../helpers/container'
import {subscriptionCreator, Ws} from '../helpers/websocket'
import {getCookie} from '../helpers/cookie'
import {askForPermissions, initializeFirebase} from '../helpers/push-notifications'
import {Router} from '../routes'
import {LOADER_TYPES} from '../models/loaders'

moment.locale('ru')
const { WS_URL, WITH_WS_MOCKS } = getConfig().publicRuntimeConfig

export const initApp = (isBrowser) => {
  if (isBrowser) {
    container.register('ws', () => {
      return new Ws(WS_URL, getCookie('token'), WITH_WS_MOCKS ? WebSocketMock : WebSocket)
    }, (ws) => {
      ws.close()
    })
  }
}

export const initEvents = (router, reduxStore) => {

  initializeFirebase().then(askForPermissions)
  let unsub = startStopWsEvents(reduxStore, router.pathname)
  Router.onRouteChangeStart = () => {
    reduxStore.dispatch.router.routeChangeStart()
    reduxStore.dispatch.modal.deleteAllModals()
  }
  Router.onRouteChangeComplete = (route) => {
    const path = reduxStore.getState().router.currentPath ? reduxStore.getState().router.currentPath.split('?')[0] : null
    const nextPath = route.split('?')[0]

    if(path && path !== nextPath && !window.location.hash) {
      window.scrollTo(0, 0)
    }
    nextPath.includes('consultation') && reduxStore.dispatch.mediachat.changeUnread(false)
    if(path && path.includes('clinics') && path !== nextPath
      || path && path.includes('clinic') && path !== nextPath
      || path && path.includes('doctors') && path !== nextPath
      || path && path.includes('doctor') && path !== nextPath) {
      reduxStore.dispatch.doctors.setForMap(false)
      reduxStore.dispatch.clinics.setForMap(false)
    }
    reduxStore.dispatch.loaders.hideLoader(LOADER_TYPES.CENTER)
    reduxStore.dispatch.router.routeChangeEnd(route)
    unsub = startStopWsEvents(reduxStore, route, unsub)
  }
  Router.onRouteChangeError = () => {
    reduxStore.dispatch.router.routeChangeEnd()
  }

  return () => {
    unsub && unsub()
  }
}

const startStopWsEvents = (reduxStore, route, unsub = null) => {
  if (route !== '/login') {
    if (!unsub) {
      let subscriptions = {}
      return subscriptionCreator(subscriptions, container.get('ws'))
    }
  } else {
    if (unsub) {
      unsub()
    }
    container.remove('ws')
  }
}