/* istanbul ignore file */

const getEventsToResponses = (data) => {
  switch (data.type) {
    case 'ping':
      return {
        message: {
          type: 'pong'
        }
      }
    case 'notification-clicked':
      return {
        message: {
          type: 'delete-notification',
          data: {
            id: data.id
          }
        }
      }
    default:
      return false
  }
}

export class WebSocketMock {
  constructor(uri) {
    this.uri = uri
    this.log('mocked')
    setTimeout(() => {
      this.log('emulated open')
      this.onopen()
    }, 500)
    this.messagesLog = []
    window.WebSocketMockInstance = this
    this.delayedEvents()
  }

  showLogs = () => {
    this.messagesLog.forEach((log) => {
      console.log(log.type, log.message);
    })
  }

  delayedEvents = () => {
    let count = 0
    this.emulateSocketMessage({
      message: {
        type: 'call-update',
        data: {phone: 79999999999}
      },
      timeout: 2000,
    })
    this.emulateSocketMessage({
      message: {
        type: 'call-update',
        data: null
      },
      timeout: 5000,
    })

    this.emulateSocketMessage({
      message: {
        type: 'call-update',
        data: {phone: 79265803528, clientId: 2}
      },
      timeout: 7000,
    })
    this.emulateSocketMessage({
      message: {
        type: 'call-update',
        data: null
      },
      timeout: 10000,
    })

    this.emulateSocketMessage({
      message: {
        type: 'call-update',
        data: {phone: 79265803528, clientId: 1, medcardId: 1}
      },
      timeout: 11000,
    })
    this.emulateSocketMessage({
      message: {
        type: 'call-update',
        data: null
      },
      timeout: 14000,
    })

    this.emulateSocketMessage({
      message: {
        type: 'web-push',
        data: {
          title: 'Оформлена консультация на ближайшее время.',
          routeName: 'index'
        }
      },
      timeout: 2000,
    })

    const interval = setInterval(() => {
      const data = [
        {
          id: 455000,
          title: 'Врач не вышел на смену',
          date: '2019-03-16T10:23:13+03:00',
          type: 'doctorMissedShift',
          doctorId: 1
        },
        {
          id: 506932,
          title: 'Врач не подключился к консультации',
          date: '2019-03-16T10:23:13+03:00',
          type: 'doctorDidNotConnect',
          clientId: 1,
          medcardId: 1,
          orderId: 1
        },
        {
          id: 303921,
          title: 'Клиент не подключился к консультации',
          date: '2019-03-16T10:23:13+03:00',
          type: 'clientDidNotConnected',
          clientId: 1,
          medcardId: 1,
        },
        {
          id: 303292,
          title: 'Клиент не оплатил консультацию',
          date: '2019-03-16T10:23:13+03:00',
          type: 'clientDidNotPayed',
          clientId: 1,
          medcardId: 1,
        },
        {
          id: 303293,
          title: 'Клиент не подписал согласие на мед.вмешательство',
          date: '2019-03-16T10:23:13+03:00',
          type: 'clientDidNotAgreement',
          clientId: 1,
          medcardId: 1,
        },
        {
          id: 303296,
          title: 'Новое сообщение в чате',
          date: '2019-03-16T10:23:13+03:00',
          type: 'newChatMessage',
          clientId: 1,
          medcardId: 1,
        },
      ]


      count++
      if (count >= 6) clearInterval(interval)

      this.emulateSocketMessage({
        message: {
          type: 'notification',
          data: data[count-1]
        }
      })
    }, 3000)
  }

  log = (message) => {
    console.warn(`WS ${this.uri}: ${message}`)
  }

  onopen = () => {}
  onclose = () => {}
  onmessage = () => {}


  close = () => {
    this.log('close called')
    if (this.onclose) {
      this.onclose()
    }
  }

  emulateSocketMessage = (response) => {
    const timeout = response.timeout || 100
    setTimeout(() => {
      const message = {
        data: JSON.stringify(response.message)
      }
      this.messagesLog.push({
        type: 'server',
        message: response.message,
      })
      this.onmessage(message)
    }, timeout)
  }

  send = (message) => {
    const data = JSON.parse(message)
    this.messagesLog.push({
      type: 'client',
      message: data,
    })

    const socketMessage = getEventsToResponses(data)
    if (socketMessage) {
      this.emulateSocketMessage(socketMessage)
    }
  }
}