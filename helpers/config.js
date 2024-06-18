import getNextConfig from 'next/config'

export const getConfig =  process.env.NODE_ENV === 'test'? () => ({
  publicRuntimeConfig: {
    API_URL: '/api/web',
    DOMAIN: 'https://it6.1003.ru',
    WEBRTC_URL: 'https://it6.1003.ru',
    WS_URL: 'ws://test-mock-server:8085/ws',
    WITH_MOCKS: 'true',
    WITH_LOCAL_MOCKS: 'false',
  }
}) : getNextConfig