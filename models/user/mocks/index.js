export const mockUser = {
  id:            1,
  mainMedcardId: 1,
  phone:         null,
  registered:    null,
  hasNotifications: true,
  shortNotification: 'Вы записаны к терапевту через 2 дня',
  addresses: [
    {
      id: '123',
      title: 'Дом',
      street: 'Старокирочный переулок',
      house: '17',
      photo: ''
    },
    {
      id: '1234',
      title: 'Дом',
      street: 'Старокирочный переулок',
      house: '17',
      photo: ''
    }
  ],
  currency: '₽',
  subscriptions: [
    {
      id: 1,
      title: 'Уведомления',
      description: 'Уведомления о новых сообщениях в чате',
      emailFlag: true,
      smsFlag: false,
      pushFlag: true
    },
    {
      id: 2,
      title: 'Рассылки',
      description: 'Информация об акциях и промокоды',
      emailFlag: true,
      smsFlag: false,
    },
  ],
}

export const createUserMocks = mock => {
  mock.onGet('/profile').reply(200, mockUser)
  mock.onPost('/medcards/1/set-active').reply(200, {})
}
