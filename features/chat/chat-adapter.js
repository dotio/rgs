import {container}   from '../../helpers/container'
import {requestApi} from '../../lib/api'

const generateUniqId = () => {
  return (+new Date()) + '_' + (Math.floor(Math.random() * (100000000 - 999999999)) + 999999999)
}

export const MESSAGE_REQUEST_TYPE_OLD = 'history'
export const MESSAGE_REQUEST_TYPE_NEW = 'update'

export class ChatAdapter {
  /**
   * @param {Ws} ws
   * @param chatId
   */
  constructor(ws, chatId) {
    this.ws = ws
    this.chatId = chatId

    this.events = {}

    this.messagesResolvers = {}
    ws.subscribe('message',       this.onMessages)
    ws.subscribe('messageStatus', this.onMessageStatus)
    ws.subscribe('reconnect',     this.onReconnect)
    ws.subscribe('subscribe',     this.onSubscribe)
  }

  removeAllSubscribes() {
    this.ws.unsubscribe('message',       this.onMessages)
    this.ws.unsubscribe('messageStatus', this.onMessageStatus)
    this.ws.unsubscribe('reconnect',     this.onReconnect)
  }

  subscribe(event, fn) {
    if (this.events[event] === undefined) {
      this.events[event] = []
    }
    this.events[event].push(fn)
  }

  unsubscribe(event, fn) {
    if (this.events[event] !== undefined) {
      this.events[event] = this.events[event].filter((subFn) => {
        if (subFn !== fn) {
          return fn
        }
      })
    }
  }

  getUsersStatus() {
    return new Promise((resolve, reject) => {
      const unsub = (data) => {
        this.ws.unsubscribe(unsub)
        if (data) {
          resolve(data.users)
        } else {
          reject()
        }
      }
      this.ws.subscribe('opponentStatus', unsub)
      this.ws.sendToSocket({data: {chatId: this.chatId}, type: 'opponentStatus'})
      setTimeout(unsub, 2000)
    })
  }

  emit(event, data) {
    if (this.events[event] !== undefined) {
      this.events[event].map((subFn) => {
        if (data) {
          subFn(data)
        } else {
          subFn()
        }
      })
    }
  }

  /**
   * Эвент подписки юзера на чат
   */
  onSubscribe = ({ chatId, user}) => {
    this.emit('subscribe', {chatId, user})
  }

  /**
   * Отправить сообщение
   * @param text
   * @returns {object}
   */
  sendMessage = (text) => {
    const clientMessageId = generateUniqId()
    const message = {
      clientMessageId,
      text,
      file: {},
      chatId: this.chatId,
      type: 'message',
    }
    const wsMessage = {
      type: 'message',
      data: {
        messages: [
          message
        ]
      }
    }
    const promise = new Promise((resolve, reject) => {
      this.messagesResolvers[clientMessageId] = resolve
      if (!this.ws.sendToSocket(wsMessage)) {
        reject()
      }
    })

    return {message, promise}
  }


  /**
   * Отправить статус сообщения
   * @param messageId
   * @param status
   * @returns {object}
   */
  sendStatus = (messageId, status) => {
    const wsMessage = {
      type: 'messageStatus',
      data: {
        messageId: messageId,
        status:    status,
        chatId:    this.chatId
      }
    }
    this.ws.sendToSocket(wsMessage)
  }

  /**
   * Отправка файла
   * @param file
   * @param data
   * @returns {{message: *|string|string|string, promise: Promise<any>}}
   */
  uploadFile = (file, data) => {
    const clientMessageId = generateUniqId()
    const message = {
      clientMessageId,
      file: {
        title: file.name,
        url: (file && file.type.match('image.*')) ? URL.createObjectURL(file) : '',
        percentage: 0,
      },
      chatId: this.chatId,
      type: 'message',
    }
    const promise = requestApi(
      'post',
      `/chat/${this.chatId}/file`,
      {clientMessageId, file},
      true,
      (progressEvent) => {
        data.uploadCallback(progressEvent, message)
      },
      data.cancelToken
    )

    // Сейчас не юзается, но без него будут прилетать лишние сообщения в чаты
    const socketPromise = new Promise((resolve) => {
      this.messagesResolvers[clientMessageId] = resolve
    })

    return {message, promise, socketPromise}
  }

  /**
   * Эвент при получении сообщений из сокета
   * @param wsMessage
   */
  onMessages = (wsMessage) => {
    const messages = wsMessage.messages
    messages.map((message) => {
      //Показываем только сообщения из этого чата
      if (message.chatId === this.chatId) {
        const uniqueId = message.clientMessageId
        //Если пришло отправленное нами, то резовлим промис
        if (this.messagesResolvers[uniqueId]) {
          this.messagesResolvers[uniqueId](message)
          delete this.messagesResolvers[uniqueId]
        } else {
          this.emit('message', message)
        }
      }
    })
  }

  /**
   * Эвент при получении статуса
   * @param wsMessage
   */
  onMessageStatus = (wsMessage) => {
    if (wsMessage.chatId === this.chatId) {
      this.emit('status', { messageId: wsMessage.messageId,  status: wsMessage.status })
    }
  }


  /**
   * Эвент при переподключении вебсокета
   */
  onReconnect = () => {
    this.emit('reconnect')
  }


  /**
   * Получить сообщения
   * @param type - old или new (старые или новые)
   * @param messageId
   * @param params
   * @returns {Promise<*>}
   */
  getMessages = async (type, messageId, params) => {
    let requestParams = {}
    if (messageId) {
      requestParams.messageId = messageId
    }

    if(params) {
      requestParams = {...requestParams, ...params}
    }

    return await requestApi('get', `/chat/${this.chatId}/${type}`, requestParams)
  }
}

const registry = {}

/**
 *
 * @param chatId
 * @returns {ChatAdapter}
 */
export const getChatAdapter = (chatId) => {
  if (!registry[chatId]) {
    const ws = container.get('ws')
    registry[chatId] = new ChatAdapter(ws, chatId)
  }
  return registry[chatId]
}

export const destroyChatAdapter = (chatId) => {
  if (registry[chatId]) {
    registry[chatId].removeAllSubscribes()
    delete registry[chatId]
  }
}
