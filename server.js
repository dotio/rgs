// server.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('Runs in development mode')
} else {
  console.log('Runs in production mode')
}

const next = require('next')
const proxy = require('http-proxy-middleware')
const routes = require('./routes')
const contextService = require('request-context')
const cookiesMiddleware = require('universal-cookie-express')
const IntlPolyfill = require('intl')
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  app.render(req, res, route.page, query)
})

// With express
const express = require('express')
app.prepare().then(() => {
  const expressApp = express()
  if (process.env.PROXY) {
    expressApp.use('/api', proxy({
      target: process.env.DOMAIN,
      changeOrigin: true,
      cookieDomainRewrite: "localhost",
      debug: true,
      preserveHeaderKeyCase: true,
    }));
    expressApp.use('/socket.io', proxy({
      target: process.env.WEBRTC_URL,
      changeOrigin: true,
      cookieDomainRewrite: "localhost",
      debug: true,
      preserveHeaderKeyCase: true,
      ws: true
    }));
  }

  expressApp
    .use(cookiesMiddleware())
    .use(contextService.middleware('request'))
    .use((req, res, next) => {
      contextService.set('request:cookies', req.universalCookies)
      next()
    })
    .use(handler).listen(3000)

  expressApp.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /")
  })
})
