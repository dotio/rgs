import {WEBRTC_STATUS_DISCONNECTED} from './constants'

export const initialState = {
  type: 'chat',
  connectionStatus: WEBRTC_STATUS_DISCONNECTED,
  acceptStatus: '',
  hasUnreadMessages: false,
}

export const mediachat = {
  state: initialState,
  reducers: {
    init(state, webrtcRoom, connectionType) {
      return {
        ...initialState,
        webrtcRoom: webrtcRoom,
        type: connectionType,
      }
    },
    setConnectionStatus(state, connectionStatus) {
      return {
        ...state,
        connectionStatus,
      }
    },
    reset() {
      return initialState
    },
    setType(state, type) {
      return {
        ...state,
        type
      }
    },
    setAcceptStatus(state, value) {
      return {
        ...state,
        acceptStatus: value
      }
    },
    changeUnread(state, value) {
      return {
        ...state,
        hasUnreadMessages: value
      }
    },
  },
}