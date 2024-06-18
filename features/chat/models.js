import moment from 'moment/moment'
import {
  destroyChatAdapter,
  getChatAdapter,
  MESSAGE_REQUEST_TYPE_NEW,
  MESSAGE_REQUEST_TYPE_OLD
} from './chat-adapter'
import {loadImage} from '../../helpers/image'
import {getTitleBlinker} from '../../helpers/dom-title-blinker'
import axios from 'axios/index'
import {requestApi} from '../../lib/api'
import {createdMimeTypeChecker} from '../../ui/helpers/mimeType-checker'

export const MESSAGE_STATUS_SENT     = 'sent'
export const MESSAGE_STATUS_RECEIVED = 'recd'
export const MESSAGE_STATUS_READ     = 'read'
export const MESSAGE_STATUS_ERROR    = 'error'

const uploadingFileList = {}

export const initialState = {
  id:   0,
  messages: [],
  users:    {},
  isLoading: true,
  isLoadingMessages: false,
  allMessagesLoaded: false,
  allMessagesNewLoaded: false,
  preview:  '',
  opponentId: 0,
  isError: false,
  errorMessage: {},
  fromSearch: false,
  historyMessages: [],
  usersHistory: [],
  searchMessages: []
}

export const chat = {
  state: initialState,
  reducers: {
    updateMessage(state, payload) {
      return {
        ...state,
        messages: state.messages.map((message) => {
          if (message[payload.searchField] === payload.searchValue) {
            return {
              ...message,
              ...payload.data,
            }
          }
          return message
        })
      }
    },
    setSearchMessages(state, payload) {
      return {
        ...state,
        searchMessages: payload
      }
    },
    setFromSearch(state, fromSearch) {
      return {
        ...state,
        fromSearch
      }
    },
    deleteMessage(state, searchField, searchValue) {
      return {
        ...state,
        messages: state.messages.filter((message) => {
          return message[searchField] !== searchValue
        })
      }
    },
    setId(state, id) {
      return {
        ...state,
        id,
        isError: false,
        errorMessage: {},
      }
    },
    addUser(state, user) {
      return {
        ...state,
        users: {...state.users, [user.id]: {...user}}
      }
    },
    loadMessagesStart(state) {
      return {
        ...state,
        isLoadingMessages: true,
      }
    },
    loadMessagesStop(state) {
      return {
        ...state,
        isLoadingMessages: false,
      }
    },
    setAllMessagesLoaded(state) {
      return {
        ...state,
        allMessagesLoaded: true,
        isLoadingMessages: false,
      }
    },
    setAllMessagesNewLoaded(state) {
      return {
        ...state,
        allMessagesNewLoaded: true,
        isLoadingMessages: false
      }
    },
    pushMessages(state, messages, users) {
      return {
        ...state,
        messages: [
          ...state.messages,
          ...prepareMessages(messages.filter(currentMessage => state.messages.filter(message => message.clientMessageId === currentMessage.clientMessageId).length === 0)),
        ],
        users: mapNewUsersToStateUsers(users, state.users, messages)
      }
    },
    unshiftMessagesSuccess(state, messages, users) {
      return {
        ...state,
        isLoading: false,
        messages: [
          ...prepareMessages(messages.filter(currentMessage => state.messages.filter(message => message.clientMessageId === currentMessage.clientMessageId).length === 0)),
          ...state.messages,
        ],
        users: mapNewUsersToStateUsers(users, state.users, messages)
      }
    },
    getMessageError(state, message) {
      return {
        ...state,
        isError: true,
        isLoading: false,
        errorMessage: message
      }
    },
    setHistoryMessages(state, messages) {
      return {
        ...state,
        historyMessages: messages,
      }
    },
    setHistoryUsers(state, users) {
      return {
        ...state,
        historyUsers: users,
      }
    },
    clearMessages(state) {
      return {
        ...state,
        messages: []
      }
    },
    clearSearchMessages(state) {
      return {
        ...state,
        searchMessages: []
      }
    },
    reset() {
      return initialState
    },
  },
  effects: (dispatch) => ({
    async addMessages({messages, users = []}, state) {
      const chatId = state.chat.id
      const chatAdapter = getChatAdapter(chatId)

      // читаем непрочитанные сообщения от клиента
      messages.forEach((item) => {
        if(item.id !== undefined && item.status !== MESSAGE_STATUS_READ) {
          !state.mediachat.hasUnreadMessages && dispatch.mediachat.changeUnread(true)
          chatAdapter.sendStatus(item.id, MESSAGE_STATUS_READ)
        }
      })
      return this.pushMessages(messages, users)
    },
    async unshiftMessages({messages, users = []}, state) {
      const chatId = state.chat.id
      const chatAdapter = getChatAdapter(chatId)

      // читаем непрочитанные сообщения от клиента
      messages.forEach((item) => {
        if(item.status !== MESSAGE_STATUS_READ) {
          chatAdapter.sendStatus(item.id, MESSAGE_STATUS_READ)
        }
      })
      return this.unshiftMessagesSuccess(messages, users)
    },
    async reconnectLoad(chatAdapter, state) {
      const messages = state.chat.messages

      if(!chatAdapter) {
        chatAdapter = getChatAdapter(state.chat.id)
      }

      //Найдем первое сообщение у которого есть id
      const firstMessage = messages.length > 0 ? getFirstMessage(messages) : null
      try {
        const data = await chatAdapter.getMessages(MESSAGE_REQUEST_TYPE_NEW, firstMessage.id)
        await loadImagesFromMessages(data.messages)
        this.addMessages({messages: data.messages, users: data.users}, state)
      } catch (e) {
      }
    },
    async initChat({chatId, force = false}, state) {
      const prevChatId = state.chat.id
      if(force || (prevChatId !== chatId)) {
        this.setId(chatId)
        const chatAdapter = getChatAdapter(chatId)

        //Добавление сообщений
        chatAdapter.subscribe('message', (message) => {
          if(message.type === 'system') {
            return
          }
          getTitleBlinker().add('Новое сообщение в чате')
          this.addMessages({messages:[message]}, state.chat)
          chatAdapter.sendStatus(message.id, MESSAGE_STATUS_READ)
        })

        //Обновление статуса сообщений
        chatAdapter.subscribe('status', (data) => {
          this.updateMessage({
            searchField: 'id',
            searchValue: data.messageId,
            data: {
              status: data.status
            }
          })
        })

        chatAdapter.subscribe('consultationUpdate', () => {
          const {consultation} = state.consultation.current

          const consultationId = consultation ? consultation.id : null
          dispatch.consultation.getConsultation({id: consultationId, force: true}, state)
        })

        chatAdapter.subscribe('subscribe', ({ chatId, user }) => {
          const storeChatId = state.chat.id
          if(chatId === storeChatId) {
            dispatch.chat.addUser(user)
          }
        })

        //Догружаем с сервера после реконнекта в вебсокете
        chatAdapter.subscribe('reconnect', async () => {
          this.reconnectLoad(chatAdapter)
        })

        //Получаем первые сообщения
        const data = await chatAdapter.getMessages(MESSAGE_REQUEST_TYPE_OLD)
        await loadImagesFromMessages(data.messages)
        this.unshiftMessages({messages: data.messages, users: data.users}, state)
      }
    },
    async getPrevMessages(payload, state) {
      const chat = state.chat
      const chatAdapter = getChatAdapter(chat.id)

      if (chat.isLoadingMessages || chat.isLoading || chat.allMessagesLoaded) {
        return false
      }
      dispatch.chat.loadMessagesStart()

      /* jshint ignore:start*/
      const firstMessageId = chat.messages[0] ? chat.messages[0].id : null
      try {
        const data = await chatAdapter.getMessages(MESSAGE_REQUEST_TYPE_OLD, firstMessageId, {newMessages: 0})
        await loadImagesFromMessages(data.messages)
        if(data.messages.length === 0) {
          dispatch.chat.setAllMessagesLoaded()
          return
        }

        this.unshiftMessages({messages: data.messages, users: data.users}, state)

        //Если загрузили много системных сообщений, то загрузим еще
        if (data.messages.length > 0 && data.messages.filter((message) => message.type === 'message') < 10) {
          this.getPrevMessages(state)
        }
        dispatch.chat.loadMessagesStop()
      } catch (e) {
        dispatch.chat.loadMessagesStop()
        return false
      } finally {
        this.setFromSearch(false)
      }
      return true
    },
    async getNextMessages(payload, state) {
      const chat = state.chat
      const chatAdapter = getChatAdapter(chat.id)

      if (chat.isLoadingMessages || chat.isLoading || chat.allMessagesNewLoaded) {
        return false
      }
      dispatch.chat.loadMessagesStart()

      /* jshint ignore:start*/
      const lastMessageId = chat.messages[chat.messages.length - 1] ? chat.messages[chat.messages.length - 1].id : null
      try {
        const data = await chatAdapter.getMessages(MESSAGE_REQUEST_TYPE_OLD, lastMessageId, {newMessages: 1})
        await loadImagesFromMessages(data.messages)
        if(data.messages.length < 5) {
          dispatch.chat.setAllMessagesNewLoaded()
          return
        }

        this.pushMessages(data.messages, data.users, state)

        //Если загрузили много системных сообщений, то загрузим еще
        if (data.messages.length > 0 && data.messages.filter((message) => message.type === 'message') < 10) {
          this.getNextMessages(state)
        }
        dispatch.chat.loadMessagesStop()
      } catch (e) {
        dispatch.chat.loadMessagesStop()
        return false
      } finally {
        this.setFromSearch(false)
      }
      return true
    },
    async cancelFileUpload(clientMessageId) {
      const source = uploadingFileList[clientMessageId]
      source.cancel('Operation canceled by the user.')
      dispatch.chat.deleteMessage('clientMessageId', clientMessageId)
      delete uploadingFileList[clientMessageId]
    },
    async sendFile(file, state) {
      const chatId = state.chat.id

      const chatAdapter = getChatAdapter(chatId)

      const CancelToken = axios.CancelToken
      const source = CancelToken.source()

      const {message, promise} = chatAdapter.uploadFile(file, {
        uploadCallback: (progressEvent, message) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          this.updateMessage({
            searchField: 'clientMessageId',
            searchValue: message.clientMessageId,
            data: {
              file: {
                ...message.file,
                percentage: percentCompleted
              },
            }
          })
        },
        cancelToken: source.token
      })
      uploadingFileList[message.clientMessageId] = source

      try {
        this.addMessages({messages: [{
          ...message,
          status: MESSAGE_STATUS_SENT,
          sender: 'client',
          userId: state.user.id
        }]}, state)
        const result = await promise
        if (!result.messages || !result.messages[0] || !result.messages[0].file || !result.messages[0].file.url) {
          throw 'no file path'
        }
        !createdMimeTypeChecker(result.messages[0].file.mimeType) && await loadImage(result.messages[0].file.url)
        this.updateMessage({
          searchField: 'clientMessageId',
          searchValue: message.clientMessageId,
          data: {
            status: MESSAGE_STATUS_RECEIVED,
            id: result.messages[0].id,
            file: {
              ...message.file,
              percentage: 100,
              url: result.messages[0].file.url
            },
          }
        })
      } catch (e) {
        if (!axios.isCancel(e)) {
          this.updateMessage({
            searchField: 'clientMessageId',
            searchValue: message.clientMessageId,
            data:{
              status: MESSAGE_STATUS_ERROR,
            }
          })
        }
      }
    },
    async sendMessage(text, state) {

      const chatId = state.chat.id,
        promises = []

      const chatAdapter = getChatAdapter(chatId)
      const result = []

      let textArr = text.split(' ') // разбиваем текст на слова
      let string = ''

      // далаем массив текста с максимально близкими к 1000 символов кусками
      textArr.forEach((word, index, arr) => {
        if((string + ' ' + word).length < 1000) {
          string += index === 0 ? word : ' ' + word

          if (arr.length === index + 1) {
            result.push(string)
            string = ''
          }
        } else {
          result.push(string)
          string = word
        }
      })

      // отправляем каждый кусок текста как отдельное сообщение
      result.forEach((text) => {
        const {promise, message} = chatAdapter.sendMessage(text)

        this.addMessages({
          messages: [{
            ...message,
            status: MESSAGE_STATUS_SENT,
            sender: 'client',
            userId: state.user.id
          }]
        }, state)

        promises.push(promise.then(
          (message) => this.updateMessage('clientMessageId', message.clientMessageId, {
            status: MESSAGE_STATUS_RECEIVED,
            id: message.id
          }),
          () => this.updateMessage('clientMessageId', message.clientMessageId, {status: MESSAGE_STATUS_ERROR})
        ))
      })

      return Promise.all(promises).then((results) => results)
    },
    async endChat(payload, state) {
      destroyChatAdapter(state.chat.id)
    },
    async getHistoryBeforeChat(chatId) {
      if(!chatId) {
        return
      }
      this.setId(chatId)
      const data = await await requestApi('get', `/chat/${chatId}/history`)
      await loadImagesFromMessages(data.messages)
      this.unshiftMessagesSuccess(data.messages, data.users)
      return data.messages.length
    },
    async getHistoryMessages({id, onlyOneChat}) {
      try {
        const result = await requestApi('get', `/chat/${id}/history`, {onlyOneChat})
        this.setHistoryMessages(result.messages)
        this.setHistoryUsers(result.users)
        return true
      } catch (e) {
        return false
      }
    },
    async getSearchMessages(filters, state) {
      const { id } = state.chat

      if(!id) return

      try {
        const chatAdapter = getChatAdapter(id)

        const {messages} = await chatAdapter.getMessages(MESSAGE_REQUEST_TYPE_OLD, null, {
          ...filters
        })

        if(filters.date && !filters.search) {
          await this.fetchSearchHistory(messages[0])
        } else {
          this.setSearchMessages(messages)
          this.clearMessages()
        }
      } catch (e) {

      }

      this.setFromSearch(false)
    },
    async fetchSearchHistory(message, state) {
      const { id } = state.chat

      const chatAdapter = getChatAdapter(id)

      const oldMessages = await chatAdapter.getMessages(MESSAGE_REQUEST_TYPE_OLD, message.id, {newMessages: 0})

      this.clearMessages()
      dispatch.chat.loadMessagesStart()


      await loadImagesFromMessages(oldMessages.messages)
      this.unshiftMessages({messages: oldMessages.messages, users: oldMessages.users}, state)

      this.pushMessages([message], [], state)

      const newMessages = await chatAdapter.getMessages(MESSAGE_REQUEST_TYPE_OLD, message.id, {newMessages: 1})
      await loadImagesFromMessages(newMessages.messages)
      this.setFromSearch(true)
      this.pushMessages(newMessages.messages,newMessages.users, state)

      dispatch.chat.setAllMessagesLoaded()

    }
  })
}

/**
 *
 * @param {Array} newUsers
 * @param {Object} stateUsers
 * @param {Array} messages
 */
export const mapNewUsersToStateUsers = (newUsers, stateUsers, messages) => {
  if (!newUsers || newUsers.length === 0) {
    return stateUsers
  }

  const botMessage = messages.find(message => message.sender === 'bot')
  const botId = botMessage ? botMessage.userId : null

  const mappedNewUsers = newUsers.reduce((map, user) => {
    map[user.id] = user

    if(user.id === botId) {
      map[user.id] = {
        id: 9861,
        firstName: user.middleName || 'Мой_Сервис',
        lastName:'',
        middleName: '',
        photo: '/static/mocks/my_service.png',
      }
    }
    return map
  }, {})

  const users = {...stateUsers}

  for (let userId in mappedNewUsers) {
    if (mappedNewUsers.hasOwnProperty(userId)) {
      if (!users.hasOwnProperty(userId)) {
        users[userId] = mappedNewUsers[userId]
      }
    }
  }
  return users
}
const formatMessage = (message) => {
  return {
    ...message,
    time: (message.insertDate ? moment(message.insertDate) : moment()).format('HH:mm'),
    insertDate: (message.insertDate? message.insertDate : moment().format())
  }
}

export const prepareMessages = (messages) => {
  return messages.map(formatMessage)
}

const loadImagesFromMessages = async (messages) => {
  //const promises = messages.filter(message => message.file !== undefined).map(message => message.file.url)
  const promises = messages.reduce((result, message) => {
    if (message.file && message.file.mimeType.match(/image\/(png|jpeg|jpg)/)) {
      result.push(loadImage(message.file.url))
    }
    return result
  }, [])
  return Promise.all(promises)
}


export const getFirstMessage = (messages) => {
  for(let m = messages.length - 1; m >= 0; m--) {
    if(messages[m].id) {
      return messages[m]
    }
  }

  return null
}