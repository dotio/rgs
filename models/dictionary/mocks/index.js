export const createDictionaryLocalMocks = (mock) => {
  mock.onGet('/dictionaries/doctor-specializations').reply(() => {
    return [
      200,
      [
        {
          id: 1,
          title: 'Гинеколог',
          description: 'Запись к гинекологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 2,
          title: 'Кардиолог',
          description: 'Запись к кардиологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 3,
          title: 'Кардиолог детский',
          description: 'Запись к кардиологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 4,
          title: 'Маммолог',
          description: 'Запись к маммологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 5,
          title: 'Медсестра',
          description: '',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 6,
          title: 'Невролог',
          description: 'Запись к неврологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 7,
          title: 'Невролог детский',
          description: 'Запись к неврологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 8,
          title: 'Офтальмолог',
          description: 'Запись к офтальмологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 9,
          title: 'Педиатр',
          description: 'Запись к педиатру',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 10,
          title: 'Пульмонолог детский',
          description: 'Запись к пульмонологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 11,
          title: 'Терапевт',
          description: 'Запись к терапевту',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 12,
          title: 'Уролог',
          description: 'Запись к урологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 13,
          title: 'Уролог детский',
          description: 'Запись к урологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 14,
          title: 'Гастроэнтеролог',
          description: 'Запись к гастроэнтерологу',
          image: '/static/mocks/doctor.png',
        },
        {
          id: 15,
          title: 'Окулист',
          description: 'Запись к окулисту',
          image: '/static/mocks/doctor.png',
        },
      ],
    ]
  })
  mock.onGet('/dictionaries/metro').reply(({params}) => {
    return [
      200,
      params.cityId === '1'
        ? [
          {id: 1, title: 'Авиамоторная', color: '#F8CB54'},
          {id: 2, title: 'Автозаводская', color: '#F3ACB0'},
        ]
        : [],
    ]
  })
  mock.onGet('/dictionaries/doctors/clinics').reply(() => {
    return [
      200,
      [
        {id: 1, title: 'Клиника 1'},
        {id: 2, title: 'Клиника 2'},
      ],
    ]
  })
  mock.onGet('/dictionaries/order-types').reply(() => {
    return [
      200,
      [
        {id: 1, title: 'Онлайн', description: 'По видео- или аудио- связи'},
        {id: 2, title: 'Вызов на дом', description: ''},
        {id: 3, title: 'В клинике', description: ''},
      ],
    ]
  })

  mock.onGet('/dictionaries/anamnesis/drugs').reply(() => {
    return [
      200,
      [
        '1-ацетиламино-5-нитро-2-пропоксибензол',
        '1-Хлорметилсилатран',
        '1,3-Диэтилбензимидазолия трийодид',
        '1,4-Диокси-5,8-ди (п-толуидино) антрахинон',
        '13-цис-Ретиноевая кислота',
        '2-(4-нитрофенил)-фуран',
        '2-(Диметиламино) этанол',
        '2-Аллилоксиэтанол',
        '2-альфа-Метилдигидротестостерона капронат',
        '2-альфа-Метилдигидротестостерона этантат',
        '2-Бром-альфа-эргокриптина мезилат',
        '2-этил-6-метил-3-гидроксипиридина сукцинат',
      ].map((value, i) => ({
        id: i + 1,
        title: value,
        description: value,
      }))
    ]
  })
  mock.onGet('/dictionaries/relationships').reply(() => {
    return [
      200,
      [
        {
          title: 'Отец',
          id: 1,
        },
        {
          title: 'Мать',
          id: 2,
        },
        {
          title: 'Сын',
          id: 3,
          isChild: true,
        },
        {
          title: 'Дочь',
          id: 4,
          isChild: true,
        },
        {
          title: 'Муж',
          id: 5,
        },
        {
          title: 'Жена',
          id: 6,
        },
        {
          title: 'Подопечный',
          id: 7,
          isChild: true,
        },
        {
          title: 'Подопечная',
          id: 8,
          isChild: true,
        }
      ]
    ]
  })
}
export const createDictionaryMocks = (mock) => {
  mock.onGet('/dictionaries/experience').reply(() => {
    return [
      200,
      [
        {id: 3, title: 'До 5 лет'},
        {id: 4, title: 'От 5 до 10 лет'},
        {id: 5, title: 'От 10 лет и более'},
      ],
    ]
  })
  mock.onGet('/dictionaries/genders').reply(() => {
    return [
      200,
      [
        {id: 3, title: 'Мужской'},
        {id: 4, title: 'Женский'},
      ],
    ]
  })
  mock.onGet('/dictionaries/qualifications').reply(() => {
    return [
      200,
      [
        {id: 1, title: 'Кандидат медицинских наук'},
        {id: 2, title: 'Доктор медицинских наук'},
        {id: 3, title: 'Профессор'},
        {id: 4, title: 'Академик'},
        {id: 5, title: 'Врач второй категории'},
        {id: 6, title: 'Врач первой категории'},
        {id: 7, title: 'Врач высшей категории'},
      ],
    ]
  })
  /* mock.onGet('/dictionaries/blood-types').reply(() => {
    return [
      200,
      [
        {id: 1, title: 'O(I) Rh"+"'},
        {id: 2, title: 'O(I) Rh"-"'},
        {id: 3, title: 'A(II) Rh"+"'},
        {id: 4, title: 'A(II) Rh"-"'},
        {id: 5, title: 'B(III) Rh"+"'},
        {id: 6, title: 'B(III) Rh"-"'},
        {id: 7, title: 'AB(IV) Rh"+"'},
        {id: 8, title: 'AB(IV) Rh"-"'},
      ],
    ]
  }) */
  // mock.onGet('/dictionaries/feedback-types').reply(() => {
  //   return [
  //     200,
  //     [
  //       {id: 1, title: 'Тема 1', description: ''},
  //       {id: 2, title: 'Тема 2', description: ''},
  //       {id: 3, title: 'Тема 3', description: ''},
  //     ],
  //   ]
  // })
}
