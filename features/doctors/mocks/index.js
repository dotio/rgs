export const mockDoctorsList = [
  'Иван',
  'Степан',
  'Фёдор'
].map((name, key) => ({
  id: ++key,
  name: name,
  surname: `${name}ов`,
  lastName: `${name}oвич`,
  relationship: key === 1 ? 'Моя медкарта' : 'Я',
  photo: 'https://image.freepik.com/free-vector/doctor-background-design_1270-62.jpg'
}))

export const createDoctorsMocks = (mock) => {
  mock.onGet('/medcard/specializations').reply(200, [
    {
      id: 35,
      title: 'Терапевт',
      image: '/static/doctor/therapist.png'
    },
    {
      id: 23,
      title: 'Педиатр',
      image: '/static/doctor/pediatrician.png'
    },
    {
      id: 57,
      title: 'Невролог',
      image: '/static/doctor/neurologist.png'
    },
    {
      id: 2,
      title: 'Аллерголог',
      image: '/static/doctor/allergist.png'
    },
    {
      id: 12,
      title: 'Иммунолог',
      image: '/static/doctor/immunologist.png'
    },
    {
      id: 60,
      title: 'Офтальмолог',
      image: '/static/doctor/ophthalmologis.png'
    },
    {
      id: 68,
      title: 'Эндокринолог',
      image: '/static/doctor/endocrinologist.png'
    }
  ])
}
export const createDoctorsLocalMocks = (mock) => {
  mock.onGet('/doctor').reply((data) => {
    if (data.params.offset > 30) {
      return [200, []]
    }
    return [
      200, [
        {
          id: data.params.offset + 1,
          name: 'Игорь',
          surname: 'Потапов',
          middlename: 'Алексеевич',
          isFavorite: true,
          img: '/static/mocks/doctor.png',
          specializations: [{
            title: 'Педиатр'
          }],
          achievement: {
            icon: 'heart',
            texts: [
              {text: 'Последний год у специалиста рейтинг не опускается ниже 4.56. Это '},
              {text: 'больше, чем у 72% педиатров ', highlight: true},
              {text: 'на сервисе.'},
            ]
          },
          rating: 4.8
        },
        {
          id: data.params.offset + 2,
          name: 'Мария',
          surname: 'Семенова',
          middlename: 'Андреевна',
          isFavorite: false,
          img: '/static/mocks/doctor.png',
          specializations: [{
            title: 'Педиатр'
          }],
          achievement: {
            icon: 'heart',
            texts: [
              {text: 'Последний год у специалиста рейтинг не опускается ниже 4.46. Это '},
              {text: 'больше, чем у 72% педиатров ', highlight: true},
              {text: 'на сервисе.'},
            ]
          },
          rating: 4.35
        },
        {
          id: data.params.offset + 3,
          name: 'Игорь',
          surname: 'Потапов',
          middlename: 'Алексеевич',
          img: '/static/mocks/doctor.png',
          specializations: [{
            title: 'Педиатр'
          }],
          achievement: {
            icon: 'heart',
            texts: [
              {text: 'Последний год у специалиста рейтинг не опускается ниже 4.46. Это '},
              {text: 'больше, чем у 72% педиатров ', highlight: true},
              {text: 'на сервисе.'},
            ]
          },
          rating: 4.73
        },
        {
          id: data.params.offset + 4,
          name: 'Игорь',
          surname: 'Потапов',
          middlename: 'Алексеевич',
          img: '/static/mocks/doctor.png',
          specializations: [{
            title: 'Педиатр'
          }],
          achievement: {
            icon: 'heart',
            texts: [
              {text: 'Последний год у специалиста рейтинг не опускается ниже 4.46. Это '},
              {text: 'больше, чем у 72% педиатров ', highlight: true},
              {text: 'на сервисе.'},
            ]
          },
          rating: 4.73
        },
        {
          id: data.params.offset + 5,
          name: 'Игорь',
          surname: 'Потапов',
          middlename: 'Алексеевич',
          img: '/static/mocks/doctor.png',
          specializations: [{
            title: 'Педиатр'
          }],
          achievement: {
            icon: 'heart',
            texts: [
              {text: 'Последний год у специалиста рейтинг не опускается ниже 4.46. Это '},
              {text: 'больше, чем у 72% педиатров ', highlight: true},
              {text: 'на сервисе.'},
            ]
          },
          rating: 4.73
        },
        {
          id: data.params.offset + 6,
          name: 'Игорь',
          surname: 'Потапов',
          middlename: 'Алексеевич',
          img: '/static/mocks/doctor.png',
          specializations: [{
            title: 'Педиатр'
          }],
          achievement: {
            icon: 'heart',
            texts: [
              {text: 'Последний год у специалиста рейтинг не опускается ниже 4.46. Это '},
              {text: 'больше, чем у 72% педиатров ', highlight: true},
              {text: 'на сервисе.'},
            ]
          },
          rating: 4.73
        },
      ]
    ]
  })
  mock.onGet(/doctor\/\d+\/full/).reply(200, {
    id: 1,
    name: 'Игорь',
    surname: 'Потапов',
    middlename: 'Сергеевич',
    photo: '/static/mocks/doctor.png',
    rating: 4.86,
    experience: '4 года',
    education: 'Сибирский государственный медицинский университет',
    academicDegree: 'Кандидат медицинских наук, Высшая квалификационная категория',
    additionalRating:
    [
      {
        id: 1,
        title: 'Соблюдение гигиены и чистоты',
        value: 4.24,
        description: '',
      },
      {
        id: 2,
        title: 'Доброжелательность',
        value: 4.49,
        description: '',
      },
      {
        id: 3,
        title: 'Понятность и доступность консультации',
        value: 4.95,
        description: '',
      },
      {
        id: 4,
        title: 'Болезненность ощущений',
        value: 4.92,
        description: '',
      },
      {
        id: 5,
        title: 'Полнота приёма',
        value: 4.99,
        description: 'Врач во время приёма не торопится, при этом приём не затянут. Времени приёма достаточно для полной консультации.',
      },
    ],
    clinics: [
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
      }
    ],
    achievement: {
      texts: [
        {
          text: 'Последний год у специалиста рейтинг не опускается ниже 4.46. '
        },
        {
          text: 'Это больше, чем у 72% педиатров.',
          highlight: true
        },
      ]
    },
    specializations: [
      {
        id: 1,
        title: 'Педиатр'
      },
      {
        id: 2,
        title: 'Травматолог-ортопед'
      },
    ],
    additionalInfo: [
      {
        title: 'Ценовая категория',
        value: 'Приём в клинике от 2500 ₽',
        info: 'Цена первичного приема разных специалистов в среднем - 1500-2500 ₽'
      },
    ],
    description: 'Кузнецов Александр Николаевич — врач хирург, врач травматолог, врач ортопед, врач ультразвуковой ' +
      'диагностики. Александр Николаевич окончил Первый Московский государственный медицинский университет имени ' +
      'И. М. Сеченова в 1988 году, в 1989 году окончил интернатуру по специальности Хирургия, клиническую ординатуру ' +
      'по специальности Хирургия окончил в 1998 году. В 2001 году окончил очную аспирантуру на базе ГКБ №61 ММА им. ' +
      'И.М. Сеченова.',
    certificates: [
      {
        date: '2018',
        title: 'Сертификационный цикл, Ультразвуковая диагностика'
      },
      {
        date: '2017',
        title: 'Тематическое усовершенствование, Травматология-ортопедия Московский государственный ' +
          'медико-стоматологический университет имени А.И.Евдокимова'
      }
    ],
    educations: [
      {
        dateRange: '2015-2017',
        title: 'Экспертиза качества медицинской помощи',
        description: 'Центр дополнительного медицинского образования, дополнительное образование'
      },
      {
        dateRange: '2015-2017',
        title: 'Экспертиза качества медицинской помощи',
        description: 'Центр дополнительного медицинского образования, дополнительное образование'
      },
    ],
  })
  mock.onGet('/doctor/1').reply(200, {
    id: 1,
    name: 'Игорь',
    surname: 'Потапов',
    middlename: 'Сергеевич',
    img: '/static/mocks/doctor.png',
    rating: 4.86,
    specializations: [
      {
        id: 1,
        title: 'Педиатр',
      },
      {
        id: 2,
        title: 'Травматолог-ортопед',
      },
    ],
    additionalInfo: {
      title: 'Ценовая категория',
      value: 'Приём в клинике от 2500 ₽',
      info: 'Цена первичного приема разных специалистов в среднем - 1500-2500 ₽',
    },
    clinic: {
      id: 1,
      name: 'Глазная клиника 3Z',
      address: 'ул. Кастанаевская, 9к1',
      latitude: '55.74870503619248',
      longitude: '37.63726414680478',
      metro: {
        id: 24,
        name: 'Багратионовская',
        color: '#439dda',
      },
      img: '/static/mocks/clinic.png',
    }
  })
}