export class Ws {
  constructor(uri, token) {
    this.wsUri = uri + '?token=' + token
    this.retryCount = 0
    this.connected = false
    this.events = {}
    this.connectEvent = 'connect'
    this.tryToConnect()
  }

  subscribe(event, fn) {
    const events = event.split(' ')
    events.forEach((event) => {
      if (this.events[event] === undefined) {
        this.events[event] = []
      }
      this.events[event].push(fn)
    })
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
   * Вызывается при подключении/переподключении сокета, для оптравки всех сообщений пользователя
   */
  onWsOpen = () => {
    this.retryCount = 0
    this.connected = true
    this.emit(this.connectEvent)
    this.connectEvent = 'reconnect'
  }

  /**
   * Вызывается при закрытии сокета
   */
  onWsClose = () => {
    this.connected = false
    this.emit('disconnect')
    this.tryToConnect()
  }

  tryToConnect = () => {
    if (this.retryCount == 0) {
      this.initWs()
    } else {
      const  timeoutMs = this.retryCount <= 10 ? 5000 : 10000
      setTimeout(this.initWs, timeoutMs)
    }
    this.retryCount++
  }

  initWs = () => {
    const ws = new WebSocket(this.wsUri)
    ws.onopen = this.onWsOpen
    ws.onclose = this.onWsClose

    /**
     * Вызывается при получении нового сообщения из сокета
     * @param evt
     */
    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data)
      if (message.type) {
        this.emit(message.type, message.data)
      }
    }
    this.ws = ws
  }

  sendToSocket = (socketMessage) => {
    if (this.connected) {
      this.ws.send(JSON.stringify(socketMessage))
      return true
    } else {
      return false
    }
  }

  close = () => {
    this.ws.onclose = null
    this.ws.close()
  }

  changeWsUri = (uri, token) => {
    this.wsUri = uri + '?token=' + token
    if (this.connected) {
      this.close()
      this.retryCount = 0
      this.connected = false
      this.connectEvent = 'connect'
    }
    if (token) {
      this.tryToConnect()
    }
  }
}

/**
 * Метод для подписки на эвенты в вебсокете
 * @param eventsToFunctions {Object} - объект где ключ является названием эвента, а значение функцией которая обрабатывает это событие
 * @param ws {Ws} - инстанс вебсокета
 * @returns {function()} - функция с помощью которой можно отписаться от всех подписок созданных ранее
 */
export const subscriptionCreator = (eventsToFunctions, ws) => {
  const iterator = (fn) => {
    for (let event in eventsToFunctions) {
      if (eventsToFunctions.hasOwnProperty(event)) {
        fn(event, eventsToFunctions[event])
      }
    }
  }
  //Подвязываем все события
  iterator(ws.subscribe.bind(ws))
  let subscribed = true
  //Возвращаем функцию которой можно отписаться от всех подвязанных событий
  return () => {
    if (subscribed) {
      iterator(ws.unsubscribe.bind(ws))
      subscribed = false
    }
  }
}