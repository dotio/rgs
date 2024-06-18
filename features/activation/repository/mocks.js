/* istanbul ignore file */

export const createActivationLocalMocks = mock => {
  mock.onPost('/api/activation/policies/search').reply(() => {
    return [
      200,
      {
        number: 'S993638-59215941',
        code: 608901,
        name: 'Доктор Онлайн',
        dateEnd: '2021-01-19 00:00:00',
        image: '/static/banners/docOnline.svg',
      }
    ]
  })
  mock.onPost('/api/activation/policies/activate').reply(200, {id: 15})
  mock.onPost('/api/activation/promo-codes/activate').reply(200, {id: 15})
}

export const createActivationMocks = mock => {
  mock.onGet('/api/activation/policies/15').reply(200, {
    name: 'Доктор Онлайн',
    dateEnd: '2021-01-19 00:00:00',
    image: '/static/banners/docOnline.svg',
    medcardId: 167,
    services: [
      {
        title: 'Безлимитные записи в клинику к терапевту или педиатру',
        image: '/static/mocks/service_doctor_small.png'
      },
      {
        title: 'Безлимитные онлайн-консультации экспертов"',
        image: '/static/mocks/service_doctor_small.png'
      },
      {
        title: 'Полный чек-ап (12 анализов) в «Медси»',
        image: '/static/mocks/service_doctor_small.png'
      },
    ]
  })
  mock.onGet('/api/activation/promo-codes/15').reply(200, {
    name: 'Промокод RGS341934011',
    dateEnd: '2021-03-26T00:00:00+00:00',
    image: '/static/mocks/gift.png',
    medcardId: 167,
    services: [
      {
        title: 'Содействие в вызове скорой помощи и оповещение служб спасения',
        image: '/static/mocks/service_doctor_small.png'
      },
      {
        title: 'Услуга "Второе мнение"',
        image: '/static/mocks/service_doctor_small.png'
      },
      {
        title: 'Плановая онлайн консультация с профильным врачом-специалистом',
        image: '/static/mocks/service_doctor_small.png'
      },
    ]
  })
}