import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import {Provider} from 'react-redux'
import {ModalRoot} from '../templates/modal/modal-root'
import {redirectNotAuth} from '../lib/redirect'
import {ThemeWrapper} from '../ui/theme'
import {initApp, initEvents} from './bootstrap'
import {BaseTemplate} from '../templates/base'
import {LeftMenu} from '../features/left-menu'
import {TabBar} from '../features/tabbar'
import {Notifications} from '../features/notifications'
import {redirectNotMedcard} from '../lib/redirect'
import moment from 'moment-timezone'
import {NotificationContainer} from '../features/notifications/components/notification-container'
import {GTM} from '../general/gtm'
import {ErrorTemplate} from '../templates/error'
import {getCookie, setCookie} from '../helpers/cookie'

initApp(!!process.browser)

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}
    const {reduxStore} = ctx
    let isEdge = false
    if(!process.browser) {
      isEdge = /Edg/.test(ctx.req.headers['user-agent'])
    }

    if(!isEdge) {
      await reduxStore.dispatch.login.checkLoggedIn()

      reduxStore.dispatch.user.setUtcOffset(moment().utcOffset())
      reduxStore.dispatch.user.setTimezone(moment.tz.guess())

      const promises = []

      try {
        if (reduxStore.getState().login.loggedIn) {
          promises.push(
            reduxStore.dispatch.consultation.getActiveConsultation(),
            reduxStore.dispatch.user.fetchUserData(),
            reduxStore.dispatch.medcards.fetchMedcards(),
            reduxStore.dispatch.clinics.fetchCart(),
            reduxStore.dispatch.profileSettings.getCards()
          )
        }
        promises.push(reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'cities'}))
        await Promise.all(promises)

        if (!process.browser) {
          await reduxStore.dispatch.localization.loadLocalization()
        }

        if (reduxStore.getState().login.loggedIn && !reduxStore.getState().user.mainMedcardId) {
          redirectNotMedcard(ctx)
        }

        if(reduxStore.getState().login.loggedIn && reduxStore.getState().login.loginType.length > 0) {
          GTM.pushEvent({
            'event': reduxStore.getState().login.loginType,
            'userId': reduxStore.getState().user.id,
          })
          reduxStore.dispatch.login.changeLoginType('')
        }

        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
      } catch (e) {
        //Если нас разавторизовало кидаем на логин
        if (e.response && e.response.status && (e.response.status === 401 || e.response.status === 403)) {
          redirectNotAuth(ctx)
        } else {
          throw e
        }
      }

      return {
        pageProps
      }
    } else {
      return {
        isEdge
      }
    }
  }

  componentDidMount() {
    const {reduxStore, router} = this.props
    this.destruct = initEvents(router, reduxStore)

    GTM.init({
      gtmId: 'GTM-P2NDTMS',
      dataLayer: reduxStore.getState().user.id ? {
        event: 'userId',
        userId: reduxStore.getState().user.id,
      } : {}
    })

    if(reduxStore.getState().login.loggedIn) {
      reduxStore.dispatch.chat.getHistoryBeforeChat(
        reduxStore.dispatch.consultation.chat
          ? reduxStore.dispatch.consultation.chat.id
          : reduxStore.getState().user.lastChatId
      )
    }

    if (!getCookie('isSelectCity')) {
      let today = new Date(Date.now())
      let nextWeek = new Date()
      nextWeek.setDate(today.getDate() + 7)
      setCookie('isSelectCity', true, {path: '/', expires: nextWeek})
      reduxStore.dispatch.modal.addAndShowModal({type: 'city-area'})
    }
  }

  get isConsultation() {
    const {router} = this.props

    return router.pathname === '/consultation'
  }

  get isLoginScreen() {
    const {router} = this.props

    return router.pathname === '/login'
      || router.pathname === '/medcards/new'
      || router.pathname === '/medcards/exist'
      || router.pathname === '/medcards/login'
      || router.pathname.includes('activation')
      || router.pathname.includes('products') && router.pathname.includes('buy')
      || router.pathname.includes('products') && router.pathname.includes('check')
  }

  componentWillUnmount() {
    this.destruct()
  }

  render() {
    const {Component, pageProps, isEdge, reduxStore} = this.props

    if(isEdge) {
      return (
        <ErrorTemplate/>
      )
    }

    //Тут на каких-то страницах левое меню, а на каких-то просто лого
    const leftBlock = <LeftMenu/>

    //Таббар
    const bottomBlock = <TabBar />

    return (
      <Provider store={reduxStore}>
        <ThemeWrapper>
          <Head>
            <title>{reduxStore.getState().router.pageTitle} – Мой_Сервис Мед</title>
            <link href='/static/fonts/style-fonts.css' rel='stylesheet' type='text/css'/>
          </Head>
          <BaseTemplate
            leftBlock={this.isLoginScreen ? null : leftBlock}
            bottomBlock={this.isLoginScreen ? null : bottomBlock}
            isConsultation={this.isConsultation}
            isLoginScreen={this.isLoginScreen}
          >
            <Component {...pageProps} />
            <Notifications/>
            <NotificationContainer />
          </BaseTemplate>
          <ModalRoot/>
        </ThemeWrapper>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)