import {Router} from '../routes'
import {checkAuth} from './api'

export const redirect = (target, ctx = {}) => {
  if (ctx.res) {
    // If on the server, an HTTP 303 response with a "Location"
    // is used to redirect.
    ctx.res.writeHead(303, { Location: target })
    ctx.res.end()
  } else {
    // On the browser, next/router is used to "replace" the current
    // location for the new one, removing it from history.
    Router.replaceRoute(target)
  }
}

export const redirectNotAuth = (ctx = {}) => {
  const redirected = !checkAuth() && ctx.asPath.split('?')[0] !== '/login'
  if (redirected) {
    const redirectUrl = ctx && ctx.asPath ? `/login?backUrl=${ctx.asPath}` : '/login'
    redirect(redirectUrl, ctx)
  }
  return redirected
}

export const redirectNotMedcard = (ctx = {}) => {
  if(ctx.pathname !== '/medcards/new') {
    const redirectUrl = ctx && ctx.pathname ? `/medcards/new?backUrl=${ctx.pathname}` : '/medcards/new'
    redirect(redirectUrl, ctx)
  }
  return true
}

export const redirectAuth = (ctx = {}) => {
  if (checkAuth()) {
    redirect('/', ctx)
  }
}