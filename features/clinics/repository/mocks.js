const clinics = [
  {
    id: 1,
    name: 'Глазная клиника 3Z',
    img: '/static/mocks/clinic.png',
    address: 'ул. Кастанаевская, 9к1',
    metro: {
      id: 1,
      name: 'Багратионовская',
      distance: 300,
      color: '#439dda',
    },
    latitude: 59.964723,
    longitude: 30.298576,
    receptionMethods: ['Платный прием', 'Бесплатный прием'],
    phones: ['+7 499 116 81 72', '+7 499 116 81 72'],
    schedule: {
      title: 'Сегодня с 9 до 21',
      ranges: [
        {
          title: 'Будни',
          timeRange: '09:00 - 21:00',
        },
        {
          title: 'Выходные',
          timeRange: '12:00 - 18:00',
        },
      ],
    },
    price: {
      currency: '₽',
      name: 'Высокая',
      type: 4,
      description: 'Цена первичного приема разных специалистов и цены в среднем - 1500-2500 ₽',
    },
    ratings: [
      {title: 'Рейтинг лечения', value: '4.83'},
      {title: 'Рейтинг обслуживания', value: '4.5'}
    ],
  },
  {
    id: 2,
    name: 'Городская клиничеcкая больница № 67 имени Л.А. Ворохобова',
    img: '/static/mocks/clinic.png',
    address: 'ул. Кастанаевская, 9к1',
    metro: {
      id: 1,
      name: 'Багратионовская',
      distance: 300,
      color: '#439dda',
    },
    latitude: 55.897892,
    longitude: 37.739761,
    receptionMethods: ['Платный прием', 'Бесплатный прием'],
    price: {
      currency: '₽',
      name: 'Высокая',
      type: 4,
      description: 'Цена первичного приема разных специалистов и цены в среднем - 1500-2500 ₽',
    },
    phones: ['+7 499 116 81 72', '+7 499 116 81 72'],
    schedule: {
      title: 'Сегодня с 9 до 21',
      ranges: [
        {
          title: 'Будни',
          timeRange: '09:00 - 21:00',
        },
        {
          title: 'Выходные',
          timeRange: '12:00 - 18:00',
        },
      ],
    },
    ratings: [
      {title: 'Рейтинг лечения', value: '4.75'},
      {title: 'Рейтинг обслуживания', value: '4.77'}
    ],
  },
  {
    id: 3,
    name: 'Глазная клиника 3Z',
    img: '/static/mocks/clinic.png',
    address: 'ул. Кастанаевская, 9к1',
    metro: {
      id: 1,
      name: 'Багратионовская',
      distance: 300,
      color: '#439dda',
    },
    latitude: 55.78612,
    longitude: 37.636986,
    receptionMethods: ['Платный прием', 'Бесплатный прием'],
    price: {
      currency: '₽',
      name: 'Высокая',
      type: 3,
      description: 'Цена первичного приема разных специалистов и цены в среднем - 1500-2500 ₽',
    },
    phones: ['+7 499 116 81 72', '+7 499 116 81 72'],
    schedule: {
      title: 'Сегодня с 9 до 21',
      ranges: [
        {
          title: 'Будни',
          timeRange: '09:00 - 21:00',
        },
        {
          title: 'Выходные',
          timeRange: '12:00 - 18:00',
        },
      ],
    },
    ratings: [
      {title: 'Рейтинг лечения', value: '4.3'},
      {title: 'Рейтинг обслуживания', value: '4.2'}
    ],
  },
  {
    id: 4,
    name: 'Глазная клиника 3Z',
    img: '/static/mocks/clinic.png',
    address: 'ул. Кастанаевская, 9к1',
    metro: {
      id: 1,
      name: 'Багратионовская',
      distance: 300,
      color: '#439dda',
    },
    receptionMethods: ['Платный прием', 'Бесплатный прием'],
    latitude: 55.74870503619248,
    longitude: 37.63726414680478,
    price: {
      currency: '₽',
      name: 'Высокая',
      type: 2,
      description: 'Цена первичного приема разных специалистов и цены в среднем - 1500-2500 ₽',
    },
    phones: ['+7 499 116 81 72', '+7 499 116 81 72'],
    schedule: {
      title: 'Сегодня с 9 до 21',
      ranges: [
        {
          title: 'Будни',
          timeRange: '09:00 - 21:00',
        },
        {
          title: 'Выходные',
          timeRange: '12:00 - 18:00',
        },
      ],
    },
    ratings: [
      {title: 'Рейтинг лечения', value: '4.61'},
      {title: 'Рейтинг обслуживания', value: '4.85'}
    ],
  },
  {
    id: 5,
    name: 'Глазная клиника 3Z',
    img: '/static/mocks/clinic.png',
    address: 'ул. Кастанаевская, 9к1',
    metro: {
      id: 1,
      name: 'Багратионовская',
      distance: 300,
      color: '#439dda',
    },
    receptionMethods: ['Платный прием', 'Бесплатный прием'],
    latitude: 53.74870503619248,
    longitude: 35.63726414680478,
    price: {
      currency: '₽',
      name: 'Высокая',
      type: 1,
      description: 'Цена первичного приема разных специалистов и цены в среднем - 1500-2500 ₽',
    },
    phones: ['+7 499 116 81 72', '+7 499 116 81 72'],
    schedule: {
      title: 'Сегодня с 9 до 21',
      ranges: [
        {
          title: 'Будни',
          timeRange: '09:00 - 21:00',
        },
        {
          title: 'Выходные',
          timeRange: '12:00 - 18:00',
        },
      ],
    },
    ratings: [
      {title: 'Рейтинг лечения', value: '4.26'},
      {title: 'Рейтинг обслуживания', value: '4.53'}
    ],
  },
]

const researches = [
  {
    id: 1,
    title: 'Лабораторная диагностика',
    items: [
      {
        id: 11,
        name: 'Лабораторная диагностика 1',
        price: '1 500.50',
      },
      {
        id: 12,
        name: 'Лабораторная диагностика 2',
        price: '2 000',
      },
    ],
  },
  {
    id: 2,
    title: 'УЗИ',
    items: [
      {
        id: 21,
        name: 'УЗИ почек',
        price: '1 000',
      },
      {
        id: 22,
        name: 'УЗИ молочных желез',
        price: '2 200',
      },
      {
        id: 23,
        name: 'УЗИ щитовидной железы',
        price: '1 800',
      },
      {
        id: 24,
        name: 'УЗИ печени',
        price: '1 800',
      },
      {
        id: 25,
        name: 'УЗИ органов малого таза',
        price: '2 000',
      },
      {
        id: 26,
        name: 'УЗИ мочевого пузыря',
        price: '1 600',
      },
      {
        id: 27,
        name: 'УЗИ желчного пузыря',
        price: '1 400',
      },
      {
        id: 28,
        name: 'УЗИ поджелудочной железы',
        price: '1 600',
      },
      {
        id: 29,
        name: 'УЗИ органов брюшной полости',
        price: '2 700',
      },
      {
        id: 30,
        name: 'УЗИ предстательной железы',
        price: '3 600',
      },
    ],
  },
  {
    id: 3,
    title: 'Функциональная диагностика (ЭКГ, спирография, спирометрия)',
    items: [
      {
        id: 31,
        name: 'ЭКГ',
        price: '1 000',
      },
      {
        id: 32,
        name: 'Спирография',
        price: '2 000',
      },
    ],
  },
  {
    id: 4,
    title: 'КТ',
    items: [
      {
        id: 41,
        name: 'КТ1',
        price: '1 000',
      },
      {
        id: 42,
        name: 'КТ2',
        price: '2 000',
      },
    ],
  },
  {
    id: 5,
    title: 'МРТ',
    items: [
      {
        id: 51,
        name: 'МРТ1',
        price: '1 000',
      },
      {
        id: 52,
        name: 'МРТ2',
        price: '2 000',
      },
    ],
  },
  {
    id: 6,
    title: 'Эндоскопические исследования',
    items: [
      {
        id: 61,
        name: 'Эндоскопические исследования 1',
        price: '1 000',
      },
      {
        id: 62,
        name: 'Эндоскопические исследования 2',
        price: '2 000',
      },
    ],
  },
]

const clinicFull = {
  id: 1,
  name: 'Глазная клиника 3Z',
  subtitle: 'Многопрофильный медицинский центр',
  address: 'ул. Кастанаевская, 9к1',
  latitude: '55.74870503619248',
  longitude: '37.63726414680478',
  metro: {
    id: 24,
    name: 'Багратионовская',
    color: '#439dda',
  },
  img: '/static/mocks/clinic.png',
  payments: ['наличными'],
  phones: ['+7 495 504-40-20'],
  schedule: {
    title: 'Сегодня с 9 до 21',
    ranges: [
      {
        title: 'Будни',
        timeRange: '09:00 - 21:00',
      },
      {
        title: 'Выходные',
        timeRange: '12:00 - 18:00',
      },
    ],
  },
  ratings: [
    {
      title: 'Рейтинг лечения',
      value: '4.57',
    },
    {
      title: 'Рейтинг сервиса',
      value: '4.92',
    },
  ],
  rating: 9.33,
  reception: 'Платный приём',
  price: {
    currency: '₽',
    type: 3,
    name: 'Средняя',
    description: 'Цена первичного приема разных специалистов и цены в среднем - 1500-2500 ₽',
  },
  website: '3z.ru',
  specializations: [
    {
      title: '2017',
      description: 'Сертификационный цикл, Ультразвуковая диагностика ',
    },
    {
      title: '2018',
      description:
        'Тематическое усовершенствование, Травматология-ортопедия Московский государственный медико-стоматологический университет имени А.И.Евдокимова  ',
    },
    {
      title: '2019',
      description:
        'Тематическое усовершенствование, Ультразвуковая диагностика заболеваний сосудов нижних конечностей Российская медицинская академия последипломного образования (РМАПО) ',
    },
    {
      title: '2020',
      description:
        'Профессиональная переподготовка, Организация здравоохранения и общественное здоровье  ',
    },
  ],
  licenses: [
    {
      title: '2000',
      description: 'Сертификационный цикл, Ультразвуковая диагностика ',
    },
    {
      title: '2001',
      description:
        'Тематическое усовершенствование, Травматология-ортопедия Московский государственный медико-стоматологический университет имени А.И.Евдокимова  ',
    },
    {
      title: '2010',
      description:
        'Тематическое усовершенствование, Ультразвуковая диагностика заболеваний сосудов нижних конечностей Российская медицинская академия последипломного образования (РМАПО) ',
    },
    {
      title: '2019',
      description:
        'Профессиональная переподготовка, Организация здравоохранения и общественное здоровье  ',
    },
  ],
  about:
    'Клиника специализируется на современных методах лечения и диагностики различных видов заболеваний. Квалификация врачей клиники позволяет проводить свыше 1000 видов медицинских услуг. Собственная клиническая лаборатория дает возможность получать результаты по 1185 видам анализов в максимально короткие сроки. Клиника специализируется на современных методах лечения и диагностики различных видов заболеваний. Квалификация врачей клиники позволяет проводить свыше 1000 видов медицинских услуг. Собственная клиническая лаборатория дает возможность получать результаты по 1185 видам анализов в максимально короткие сроки.',
  advantage: [
    {
      name: 'Доступно для инвалидов',
      disabled: false,
    },
    {
      name: 'Есть лифт',
      disabled: false,
    },
    {
      name: 'Есть парковка',
      disabled: false,
    },
    {
      name: 'Нет аптеки',
      disabled: true,
      img: '/static/mocks/badge.png',
    },
    {
      name: 'Нет кафе',
      disabled: true,
      img: '/static/mocks/badge.png',
    },
    {
      name: 'Есть детское отделения',
      disabled: false,
    },
  ],
}

const images = [
  'https://image2.yell.ru/imager/NzUxYWZlNTRjMzhhODVhMTFiM/565x318/responses/3/0/2/r_alan-klinik-9788181-sq26fm9b8m_1483599379.jpg',
  'https://kovalskii.group/upload/000/u1/28/58/73268723.jpg',
  'https://polyclinika.ru/upload/iblock/d21/%D0%9F%D0%BE%D0%BB%D0%B8.jpg',
  'https://kovalskii.group/upload/000/u1/56/bd/c01c5de8.jpg',
  'https://www.yuga.ru/media/71/a3/764a3515__6zq0sts.jpg',
  'https://image2.yell.ru/imager/NzUxYWZlNTRjMzhhODVhMTFiM/565x318/responses/3/0/2/r_alan-klinik-9788181-sq26fm9b8m_1483599379.jpg',
  'https://kovalskii.group/upload/000/u1/28/58/73268723.jpg',
  'https://polyclinika.ru/upload/iblock/d21/%D0%9F%D0%BE%D0%BB%D0%B8.jpg',
  'https://kovalskii.group/upload/000/u1/56/bd/c01c5de8.jpg',
  'https://www.yuga.ru/media/71/a3/764a3515__6zq0sts.jpg',
  'https://image2.yell.ru/imager/NzUxYWZlNTRjMzhhODVhMTFiM/565x318/responses/3/0/2/r_alan-klinik-9788181-sq26fm9b8m_1483599379.jpg',
  'https://kovalskii.group/upload/000/u1/28/58/73268723.jpg',
  'https://polyclinika.ru/upload/iblock/d21/%D0%9F%D0%BE%D0%BB%D0%B8.jpg',
  'https://kovalskii.group/upload/000/u1/56/bd/c01c5de8.jpg',
  'https://www.yuga.ru/media/71/a3/764a3515__6zq0sts.jpg',
]

export const createClinicsMocks = (mock) => {
  mock.onGet(/clinic\/\d+\/images/).reply(200, images)
}

export const createClinicsLocalMocks = (mock) => {
  mock.onGet('/clinic').reply(200, clinics)
  mock.onGet(/clinic\/\d+\/full/).reply(200, clinicFull )
  mock.onGet(/clinic\/\d+\/researches/).reply(200, researches )
  mock.onGet(/clinic\/\d+/).reply((data) => {
    const id = parseInt(data.url.split('/')[2])
    const clinic = clinics.find((item) => item.id % 5 === id)
    return [200, clinic]
  })
  mock.onGet(/clinic\/\d+\/images/).reply(200, images)
}