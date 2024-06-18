module.exports = {
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60 * 2, // 2  часа
    pagesBufferLength: 20, // 20 страниц в кеше
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    DOMAIN: process.env.DOMAIN,
    WEBRTC_URL: process.env.WEBRTC_URL,
    WS_URL: process.env.WS_URL,
    WITH_MOCKS: process.env.WITH_MOCKS,
    WITH_LOCAL_MOCKS: process.env.WITH_LOCAL_MOCKS,
    YANDEX_API_KEY: process.env.YANDEX_API_KEY,
  }
}