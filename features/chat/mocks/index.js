/* istanbul ignore file */
import moment from 'moment'
const Id = 1000 + Math.floor((5000 - 1000) * Math.random())

export const ServiceUserChat = {
  id: Id,
  photo: '/static/image_service_message.png',
  firstName: 'Арина',
  lastName: 'Иванова'
}

export const ServiceMessageChat = {
  'id': 1,
  'clientMessageId': '1526993750889_240035022',
  'chatId': 10,
  'status': 'sent',
  'type': 'message',
  'text': 'Добрый день. Я медконсультант с медицинским образованием. Если есть вопросы — пишите или звоните, я или мои коллеги ответим в течение пары минут.',
  'params': {},
  'insertDate': moment().toDate(),
  'sender': 'operator',
  'userId': Id
}

export const createChatMocks = mock => {
  mock.onPost('/chat/1/file').reply(200, {
    file: {
      'id': 1,
      'title': 'analises.pdf',
      'url': 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'thumbnail': 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'mimeType': 'application/pdf',
      'insertDate': '2005-08-09T18:31:42-03:30',
      'size': 234412333
    }
  })
  mock.onGet('/chat/1/update').reply(200, {})
  mock.onGet(/chat\/\d+\/history/).reply(({params}) => {
    const {messageId} = params
    const uniqueId = (messageId || 0) + Math.floor(Math.random() * Math.floor(10000))

    return [200, {
      users: [
        {
          id: 1,
          photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/67DE2C98-87AB-4AC4-A595-F80FCC1F3173.png',
          firstName: 'Андрей',
          lastName: 'Батьков'
        }
      ],
      messages: [
        {
          'id': uniqueId + 1,
          'clientMessageId': '1526993750889_240035022',
          'chatId': 10,
          'status': 'sent',
          'type': 'message',
          'text': 'раньше лечили травмыраньше лечили травмыраньше лечили травмыраньше лечили травмыраньше лечили травмыраньше лечили травмыраньше лечили травмыраньше лечили травмыраньше лечили травмыраньше лечили травмы',
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-07-09T18:31:42-03:30',
          'sender': 'client',
          'userId': 1
        },
        {
          'id': uniqueId + 12,
          'clientMessageId': '1526993750889_240035022',
          'chatId': 10,
          'status': 'sent',
          'type': 'message',
          'text': 'раньше лечили травмы',
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-07-09T18:31:42-03:30',
          'sender': 'client',
          'userId': 1
        },
        {
          'id': uniqueId + 11,
          'clientMessageId': '1526993750889_240035022',
          'chatId': 10,
          'status': 'sent',
          'type': 'message',
          'text': 'раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2раньше лечили травмы2',
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-07-09T18:31:42-03:30',
          'sender': 'client',
          'userId': 1
        },
        {
          'id': uniqueId + 2,
          'clientMessageId': '1526993750889_240035023',
          'chatId': 10,
          'status': 'sent',
          'type': 'message',
          'text': 'Раньше все лечили травами и маслами, однако сейчас можно просто нажать на кнопку.',
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-08-09T18:31:42-03:30',
          'sender': 'operator',
          'userId': 1
        },
        {
          'id': uniqueId + 3,
          'clientMessageId': '1526993750889_240035024',
          'chatId': 10,
          'status': 'sent',
          'type': 'service',
          'text': 'подключился доктор',
          'file': {
            'id': 1,
            'title': 'analises.pdf',
            'url': 'https://goo.gl/images/Ja3Zxw',
            'thumbnail': 'https://goo.gl/images/Ja3Zxw',
            'mimeType': 'application/pdf',
            'insertDate': '2005-08-09T18:31:42-03:30',
            'size': 234412333,
            'percentage': 0
          },
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-08-09T18:31:42-03:30',
          'sender': 'operator',
          'userId': 1
        },
        {
          'id': uniqueId + 4,
          'clientMessageId': '1526993750889_240035025',
          'chatId': 10,
          'status': 'sent',
          'type': 'message',
          'text': 'Раньше все лечили травами и маслами, однако сейчас можно просто нажать на кнопку.',
          'file': {
            'id': 1,
            'title': 'analises.jpeg',
            'url': 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'thumbnail': 'https://goo.gl/images/Ja3Zxw',
            'mimeType': 'application/pdf',
            'insertDate': '2005-08-09T18:31:42-03:30',
            'size': 234412333,
            'percentage': 0
          },
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-08-09T18:31:42-03:30',
          'sender': 'client',
          'userId': 1
        },
        {
          'id': uniqueId + 5,
          'clientMessageId': '1526993750889_240035026',
          'chatId': 10,
          'status': 'sent',
          'type': 'user',
          'text': 'раньше лечили травмы',
          'file': {
            'id': 1,
            'title': 'analises.pdf',
            'url': 'https://goo.gl/images/Ja3Zxw',
            'thumbnail': 'https://goo.gl/images/Ja3Zxw',
            'mimeType': 'application/pdf',
            'insertDate': '2005-08-09T18:31:42-03:30',
            'size': 234412333,
            'percentage': 0
          },
          user: {
            surname: 'Минаева',
            name: 'Екатерина',
            middlename: 'Петровна',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/5D5AB59E-AB5E-461F-810B-924B66449BE6.png',
            subtitle: 'Терапевт'
          },
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-08-09T18:31:42-03:30',
          'sender': 'operator',
          'userId': 1
        },
        {
          'id': uniqueId + 6,
          'clientMessageId': '1526993750889_240035027',
          'chatId': 10,
          'status': 'sent',
          'type': 'message',
          'text': 'Раньше все лечили травами и маслами, однако сейчас можно просто нажать на кнопку.',
          'file': {
            'id': 1,
            'title': 'analises.pdf',
            'url': 'https://goo.gl/images/Ja3Zxw',
            'thumbnail': 'https://goo.gl/images/Ja3Zxw',
            'mimeType': 'application/pdf',
            'insertDate': '2005-08-09T18:31:42-03:30',
            'size': 234412333,
            'percentage': 0
          },
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-08-09T18:31:42-03:30',
          'sender': 'client',
          'userId': 1
        },
        {
          'id': uniqueId + 7,
          'clientMessageId': '1526993750889_240035028',
          'chatId': 10,
          'status': 'sent',
          'type': 'user',
          'text': 'раньше лечили травмы',
          user: {
            surname: 'Минаева',
            name: 'Екатерина',
            middlename: 'Петровна',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/5D5AB59E-AB5E-461F-810B-924B66449BE6.png',
            subtitle: 'Терапевт'
          },
          'file': {
            'id': 1,
            'title': 'analises.pdf',
            'url': 'https://goo.gl/images/Ja3Zxw',
            'thumbnail': 'https://goo.gl/images/Ja3Zxw',
            'mimeType': 'application/pdf',
            'insertDate': '2005-08-09T18:31:42-03:30',
            'size': 234412333,
            'percentage': 0
          },
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-08-09T18:31:42-03:30',
          'sender': 'operator',
          'userId': 1
        },
        {
          'id': uniqueId + 8,
          'clientMessageId': '1526993750889_240035028',
          'chatId': 10,
          'status': 'sent',
          'type': 'appointment',
          'text': 'раньше лечили травмы',
          notification: 'Скоро прием в клинике',
          date: '2020-03-01T16:10:00+03:00',
          specialization: {
            title: 'Офтальмолог'
          },
          buttonText: 'Посмотреть',
          doctor: {
            name: 'Вячеслав',
            surname: 'Злодеев',
            middlename: 'Олегович',
            img: '/static/mocks/doctor.png'
          },
          clinic: {
            name: 'Глазная клиника 3Z',
            img: '/static/mocks/clinic.png',
            address: 'ул. Кастанаевская, 9к1',
            showplace: {
              name: 'м. Багратионовская',
              distance: '→ 0.3 км от ',
              color: '#439dda',
            },
          },
          'params': {
            'additionalProp1': 'string',
            'additionalProp2': 'string',
            'additionalProp3': 'string'
          },
          'insertDate': '2005-08-09T18:31:42-03:30',
          'sender': 'operator',
          'userId': 1
        },
        {
          'id': uniqueId + 9,
          'clientMessageId': '1526993750889_240035022',
          'chatId': 10,
          'status': 'sent',
          'type': 'call',
          'callType': 'audio',
          'insertDate': moment().toDate(),
        },
        {
          'id': uniqueId + 13,
          'clientMessageId': '1526993750889_240035025',
          'chatId': 10,
          'status': 'sent',
          'type': 'message',
          'text': 'Всё просто. Вы можете активировать промокод по ссылке',
          'params': {},
          'insertDate': '2005-08-09T18:31:42-03:30',
          'sender': 'operator',
          'userId': 1
        },
        {
          'id': uniqueId + 14,
          'clientMessageId': '1526993750889_240035022',
          'chatId': 10,
          'status': 'sent',
          'type': 'promocode_link',
          'link' : '/',
          'callType': 'audio',
          'insertDate': moment().toDate(),
        },
        {
          'id': uniqueId + 15,
          'clientMessageId': '1526993750889_240035022',
          'chatId': 10,
          'status': 'sent',
          'type': 'product_link',
          'link' : '/',
          'callType': 'audio',
          'insertDate': moment().toDate(),
        },
        {
          'id': uniqueId + 16,
          'clientMessageId': '1526993750889_240035022',
          'chatId': 10,
          'status': 'sent',
          'type': 'message-temporary',
          'textPermanent' : 'Начало консультации дежурного врача',
          'textTemp' : 'Чат видете только вы и врач',
          'iconType' : 'safety',
          'insertDate': moment().toDate(),
        },
        {
          'id': uniqueId + 17,
          'clientMessageId': '1526993750889_240035022',
          'chatId': 10,
          'status': 'sent',
          'type': 'notice',
          'textPermanent' : 'Консультация дежурного врача завершена',
          'textTemp' : 'Итоги приёма появятся через 15 минут',
          'iconType' : 'timeFill',
          'insertDate': moment().toDate(),
        },
      ]
    }]})

  mock.onPost('/chat/1/subscribe').reply(200)

  mock.onPost('/chat/2/subscribe').reply(() => {
    return [
      400, {
        message: {
          title: 'С этим клиентом уже работает оператор Анастасия',
        }
      }
    ]
  })
}

export let messages = [
  {
    'id': 5435,
    'clientMessageId': '1526993750889_240035022',
    'chatId': 10,
    'status': 'sent',
    'type': 'message',
    'text': 'раньше лечили травмы',
    'params': {
      'additionalProp1': 'string',
      'additionalProp2': 'string',
      'additionalProp3': 'string'
    },
    'insertDate': '2005-07-09T18:31:42-03:30',
    'sender': 'client',
    'userId': 1
  },
  {
    'id': 5437,
    'clientMessageId': '1526993750889_240035023',
    'chatId': 10,
    'status': 'sent',
    'type': 'message',
    'text': 'раньше лечили травмы',
    'params': {
      'additionalProp1': 'string',
      'additionalProp2': 'string',
      'additionalProp3': 'string'
    },
    'insertDate': '2005-07-09T18:31:42-03:30',
    'sender': 'client',
    'userId': 1
  }
]

export const users = [
  {
    id: 1,
    photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/67DE2C98-87AB-4AC4-A595-F80FCC1F3173.png',
    name: 'Андрей',
    surname: 'Батьков'
  }
]