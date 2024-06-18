export const createMediaChatMocks = mock => {
  mock.onPost('/app/event', {params: {
    event: 'webrtc_disconnect',
    clientId: 1,
    chatId: 1,
    consultationId: 1
  }}).reply(200, {})
}