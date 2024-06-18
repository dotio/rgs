// const discounts = [
//   {
//     photo: '/static/banners/docOnline.svg',
//     title: 'Доктор Онлайн',
//     subtitle: 'Личный медицинский консультант и телемедицинские консультации с врачами 24/7',
//     price: '4900 ₽',
//     oldprice: '5990 ₽'
//   },
//   {
//     photo: '/static/banners/medsi.svg',
//     title: '4 анализа в клиниках «Медси» со скидкой 25%',
//     subtitle: 'Хватит для полного чек-апа и последующего анализа терапевтом',
//     price: '2990 ₽',
//     oldprice: '3990 ₽'
//   },
// ]

const history = [
  {
    id: 782,
    buttonText: 'Редактировать',
    notification: 'Скоро прием в клинике',
    date: '2020-03-03T16:10:00+03:00',
    specialization: {
      title: 'Офтальмолог'
    },
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
        name: 'Багратионовская',
        distance: '→ 0.3 км от ',
        color: '#439dda',
      },
    }
  },
  {
    id: 782,
    buttonText: 'Редактировать',
    notification: 'Скоро прием в клинике',
    date: '2020-02-01T16:10:00+03:00',
    specialization: {
      title: 'Офтальмолог'
    },
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
        name: 'Багратионовская',
        distance: '→ 0.3 км от ',
        color: '#439dda',
      },
    }
  },
  {
    id: 782,
    buttonText: 'Редактировать',
    notification: 'Скоро прием в клинике',
    date: '2020-03-01T16:10:00+03:00',
    specialization: {
      title: 'Офтальмолог'
    },
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
        name: 'Багратионовская',
        distance: '→ 0.3 км от ',
        color: '#439dda',
      },
    }
  },
  {
    id: 782,
    buttonText: 'Редактировать',
    notification: 'Скоро прием в клинике',
    date: '2020-03-01T16:10:00+03:00',
    specialization: {
      title: 'Офтальмолог'
    },
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
        name: 'Багратионовская',
        distance: '→ 0.3 км от ',
        color: '#439dda',
      },
    }
  },
  {
    id: 782,
    buttonText: 'Редактировать',
    notification: 'Скоро прием в клинике',
    date: '2020-01-02T16:10:00+03:00',
    specialization: {
      title: 'Офтальмолог'
    },
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
        name: 'Багратионовская',
        distance: '→ 0.3 км от ',
        color: '#439dda',
      },
    }
  },
  {
    id: 782,
    buttonText: 'Редактировать',
    notification: 'Скоро прием в клинике',
    date: '2020-01-02T16:10:00+03:00',
    specialization: {
      title: 'Офтальмолог'
    },
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
        name: 'Багратионовская',
        distance: '→ 0.3 км от ',
        color: '#439dda',
      },
    }
  }
]

const favorite = {
  doctors: [
    {
      id: 1,
      name: 'Игорь',
      surname: 'Потапов',
      middlename: 'Алексеевич',
      isFavorite: true,
      img: '/static/mocks/doctor.png',
      specializations: [
        {
          title: 'Педиатр'
        }
      ],
    },
    {
      id: 2,
      name: 'Игорь',
      surname: 'Потапов',
      middlename: 'Алексеевич',
      isFavorite: true,
      img: '/static/mocks/doctor.png',
      specializations: [
        {
          title: 'Педиатр'
        }
      ],
    },
    {
      id: 3,
      name: 'Игорь',
      surname: 'Потапов',
      middlename: 'Алексеевич',
      isFavorite: true,
      img: '/static/mocks/doctor.png',
      specializations: [
        {
          title: 'Педиатр'
        }
      ],
    },
    {
      id: 4,
      name: 'Игорь',
      surname: 'Потапов',
      middlename: 'Алексеевич',
      isFavorite: true,
      img: '/static/mocks/doctor.png',
      specializations: [
        {
          title: 'Педиатр'
        }
      ],
    },
  ],
  clinics: [
    {
      id: 5,
      name: 'Глазная клиника 3Z',
      isFavorite: true,
      img: '/static/mocks/clinic.png',
      address: 'ул. Кастанаевская, 9к1',
      showplace: {
        name: 'Багратионовская',
        distance: '→ 0.3 км от ',
        color: '#439dda',
      },
    },
    {
      id: 12,
      name: 'Глазная клиника 3Z',
      isFavorite: true,
      img: '/static/mocks/clinic.png',
      address: 'ул. Кастанаевская, 9к1',
      showplace: {
        name: 'Багратионовская',
        distance: '→ 0.3 км от ',
        color: '#439dda',
      },
    }
  ]
}

const events = {
  id: 782,
  buttonText: 'Редактировать',
  notification: 'Скоро прием в клинике',
  date: '2020-03-04T16:10:00+03:00',
  specialization: {
    title: 'Офтальмолог'
  },
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
      name: 'Багратионовская',
      distance: '→ 0.3 км от ',
      color: '#439dda',
    },
  }
}

const currentProducts = [
  {
    photo: '/static/banners/docOnline.svg',
    title: 'Доктор Онлайн',
    date: '2020-03-03T16:10:00+03:00',
    id: 343
  },
  {
    photo: '/static/banners/m-plus.svg',
    title: 'Медсоветник',
    date: '2020-03-03T16:10:00+03:00',
    id: 234
  },
]

const services = [
  {
    title: 'Приём в клинике',
    type: 'normal',
    count: 6
  },
  {
    title: 'Онлайн-консультация',
    type: 'infinity',
    info: 'hello'
  },
  {
    title: 'Вызов врача на дом',
    type: 'buy',
    count: 0,
    link: '/profile'
  },
  {
    title: 'Анализы',
    type: 'normal',
    count: 2
  },
  {
    title: 'Сервисные услуги',
    type: 'infinity',
    info: 'hello'
  },
  {
    title: 'Приём в клинике',
    type: 'normal',
    count: 6
  },
  {
    title: 'Онлайн-консультация',
    type: 'infinity',
    info: 'hello'
  },
  {
    title: 'Вызов врача на дом',
    type: 'buy',
    count: 0,
    link: '/profile'
  },
  {
    title: 'Анализы',
    type: 'normal',
    count: 2
  },
  {
    title: 'Сервисные услуги',
    type: 'infinity',
    info: 'hello'
  },
]

const addresses = [{
  id: 343,
  iconUrl: 'http://via.placeholder.com/50x50',
  name: 'Дом',
  city: 'Москва',
  address: 'Садовая',
  floor: '12',
  entrance: '',
  flat: '',
  latitude: '',
  longitude: '',
  intercomeCode: '',
  comment: 'добро пожаловать'
}, {
  id: 453,
  iconUrl: 'http://via.placeholder.com/50x50',
  name: 'Работа',
  city: 'Москва',
  address: 'Медовая',
  floor: '12',
  entrance: '',
  flat: '',
  latitude: '',
  longitude: '',
  intercomeCode: '',
  comment: 'Работай давай'
}, {
  id: 99,
  iconUrl: 'http://via.placeholder.com/50x50',
  name: 'Садик',
  city: 'Москва',
  address: 'Столешный переулок',
  floor: '142',
  entrance: '',
  flat: '',
  latitude: '',
  longitude: '',
  intercomeCode: '',
  comment: 'Для детей'
}]

const product = {
  'id': 553,
  'image': '/static/banners/docOnline.svg',
  'name': 'Доктор Онлайн',
  'subtitle': 'Квалифицированная медицинская помощь через удаленный доступ',
  'price': '4900 ₽',
  'products': [
    {
      'id': 553,
      'title': 'Детский врач',
      'price': '3000 руб.'
    }
  ],
  'description': 'Инновационный продукт «Детский врач» направлен на оказание онлайн-консультаций (видео/аудио/текстовых) лучшими врачами-педиатрами 24 часа в сутки, 7 дней в неделю. В рамках продукта мы сотрудничаем с лучшими профильными врачами-педиатрами.',
  'information': [
    'Срок страхования – 1 год'
  ],
  'advantages': [
    'Не приходя в клинику, оперативно получить медицинскую консультацию, когда она Вам необходима, и возможность своевременно выявлять и предупреждать заболевания у ребенка'
  ],
  'medicalText': 'Медицинские услуги в формате дистанционной медицинской консультации онлайн (телемедицинские консультации) – срочные консультации дежурного врача- педиатра: письменное заключение с рекомендациями по результатам дистанционных консультаций.',
  'serviceText': 'Сервисные услуги по организации медицинской помощи: - Услуги сервиса «Личный кабинет» Застрахованного, где сохраняются история обращений по Застрахованному и письменные рекомендации врачей по результатам проведенных онлайн-консультаций в рамках Программы. - Справочно-консультационная помощь по вопросам:',
  'legalText': '* Предоставляется только в отношении медицинских услуг, рекомендованных в соответствии с письменным заключением врача по результатам онлайн-консультации в рамках Программы.',
  'serviceBullets': [
    'Порядка получения необходимых медицинских услуг, в рамках программы ОМС;'
  ],
  'productIncludes': [
    {
      'title': 'Срочные консультации терапевтов 24/7',
      'text': 'Текст',
      'image': '/static/mocks/product-urgent-consultations.svg'
    },
    {
      'title': 'Консультации профильных врачей- специалистов по записи',
      'text': 'Текст',
      'image': '/static/mocks/product-consultations.svg'
    },
    {
      'title': 'Все консультации — в онлайне. В чате или по видеосвязи',
      'text': 'Текст',
      'image': '/static/mocks/product-consultations-online.svg'
    },
    {
      'title': 'Второе экспертное мнение по ранее поставленному диагнозу',
      'text': 'Текст',
      'image': '/static/mocks/product-second-opinion.svg'
    }
  ],
  'expiryDate': {
    'expiryDate': '182 дня с даты оплаты',
    'daysLeft': 'Осталось 142 дня'
  },
}

const products = [
  {
    id: 1,
    name: '10 вызовов врача на дом по цене 6',
    subtitle: 'Самая полная медицинская страховка за 14 990 ₽',
    price: '9 950 ₽',
    discountPrice: '5 970 ₽'
  },
  {
    id: 2,
    name: '2 вызова врача на дом',
    subtitle: 'Самая полная медицинская страховка за 14 990 ₽',
    price: '1990 ₽'
  }
]

const productSuccess = {
  items: [
    'Срочные консультации терапевтов 24/7',
    'Консультации профильных врачей- специалистов по записи',
    'Все консультации — в онлайне. В чате или по видеосвязи',
    'Второе экспертное мнение по ранее поставленному диагнозу',
    'Срочные консультации терапевтов 24/7',
    'Консультации профильных врачей- специалистов по записи',
    'Все консультации — в онлайне. В чате или по видеосвязи',
    'Второе экспертное мнение по ранее поставленному диагнозу'
  ],
  logo: '/static/banners/docOnline.svg'
}

export const createProfileMocks = mock => {
  // mock.onGet('/profile/discounts').reply(200, discounts)
  mock.onGet('/profile/history').reply(200, history)
  mock.onPost('/profile/subscription').reply(200, {})
  mock.onGet(/product\/\d+\/success/).reply(200, productSuccess)
  mock.onGet(/product\/\d+/).reply(200, product)
  mock.onGet('/product').reply(200, products)
}

export const createProfileLocalMocks = mock => {
  mock.onGet('/favorite').reply(200, favorite)
  mock.onPost(/\/favorite\/.+\/\d+$/).reply(200)
  mock.onDelete(/\/favorite\/.+\/\d+$/).reply(200)
  mock.onGet('/events/next').reply(200, events)
  mock.onGet('/profile/current-products').reply(200, currentProducts)
  mock.onGet('/profile/available-services').reply(200, services)
  mock.onPut('/push-token/web').reply(200, {})
}

export const createSettingsLocalMocks = mock => {
  mock.onGet('/addresses').reply(200, addresses)
  mock.onGet('/bills').reply(200, [{
    'id': 1,
    'description': 'Не оплачено оплатить до 5 сентября',
    'type': 'в клинике',
    'serviceType': 'booking',
    'title': 'Первичный приём врача в клинике',
    'sum': 499,
    'date': '2018-03-22T15:20:00+04:00',
    'paid': false,
    'status': {
      'title': 'Отменен',
      'color': '#ff6464'
    },
    'doctor': {
      'id': 0,
      'name': 'Игорь',
      'surname': 'Потапов',
      'middlename': 'Алексеевич',
      'photo': '/static/mocks/doctor.png'
    },
    'clinic': {
      'id': 1,
      'name': 'Северная клиника 15',
      'title': 'Лаборатория номер 15',
      'address': 'ул. Кастанаевская, 9к1',
      'metro': {
        'id': 24,
        'name': 'Багратионовская',
        'color': 'green',
      },
    },
    'paymentCard': {
      'id': 0,
      'title': 'БАНК',
      'number': '**** 1234',
      'active': true,
      'cardColor': '#00FF00',
      'icon': 'https://goo.gl/images/Ja3Zxw'
    },
    'client': {
      'id': 0,
      'name': 'Иван',
      'surname': 'Иванов',
      'lastName': 'Иванович',
      'photo': 'string'
    },
  }, {
    'id': 2,
    'description': 'Не оплачено оплатить до 5 сентября',
    'type': 'в клинике',
    'serviceType': 'telemed',
    'title': 'Медсоветник НМС++',
    'sum': 499,
    'date': '2018-03-18T15:20:00+04:00',
    'paid': true,
    'status': {
      'title': 'Отменен',
      'color': '#ff6464'
    },
    'product': {
      'id': 0,
      'name': 'Медконсультант+',
      'image': '/static/mocks/m_plus.svg'
    },
    'paymentCard': {
      'id': 0,
      'title': 'БАНК',
      'number': '**** 1234',
      'active': true,
      'cardColor': '#00FF00',
      'icon': 'https://goo.gl/images/Ja3Zxw'
    },
  }, {
    'id': 3,
    'description': 'Не оплачено оплатить до 5 сентября',
    'type': 'Видеосвязь',
    'serviceType': 'telemed',
    'title': 'Плановая онлайн-консультация с профильным врачом-специалистом',
    'sum': 499,
    'date': '2018-06-21T15:20:00+04:00',
    'paid': true,
    'status': null,
    'doctor': {
      'id': 0,
      'name': 'Игорь',
      'surname': 'Потапов',
      'middlename': 'Алексеевич',
      'photo': '/static/mocks/doctor.png'
    },
    'paymentCard': {
      'id': 0,
      'title': 'БАНК',
      'number': '**** 1234',
      'active': true,
      'cardColor': '#00FF00',
      'icon': 'https://goo.gl/images/Ja3Zxw'
    },
    'client': {
      'id': 0,
      'name': 'Иван',
      'surname': 'Иванов',
      'lastName': 'Иванович',
      'photo': 'string'
    },
    'orderId': 1
  }])
  mock.onGet('/card').reply(200, [{
    'id': 0,
    'title': 'БАНК',
    'number': '**** 1234',
    'active': true,
    'cardColor': '#00FF00',
    'icon': 'https://goo.gl/images/Ja3Zxw'
  }, {
    'id': 1,
    'title': 'БАНК',
    'number': '**** 1234',
    'active': false,
    'cardColor': '#00FF00',
    'icon': 'https://goo.gl/images/Ja3Zxw'
  }, {
    'id': 2,
    'title': 'БАНК',
    'number': '**** 1234',
    'active': false,
    'cardColor': '#00FF00',
    'icon': 'https://goo.gl/images/Ja3Zxw'
  }
  ])
  mock.onGet('/profile/settings').reply(200, {})
  mock.onPost('/profile/settings').reply(function () {
    return [200, {}]
  })
}