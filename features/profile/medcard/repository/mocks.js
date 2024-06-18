export const createProfileMedcardMocks = (mock) => {
  mock.onGet('/order/1').reply(200,
    {
      id: 1,
      date: '2020-02-20T11:26:19+03:00',
      dateStart: '2020-05-14T11:26:19+03:00',
      doctor: {
        id: 8115,
        name: 'Игорь',
        surname: 'Потапов',
        middlename: 'Алексеевич',
        photo: '/static/mocks/doctor.png',
      },
      specialization: 'Гастроэнтеролог',
      files: [
        {
          'id': 1675172,
          'typeId': '1',
          'title': 'analises.pdf',
          'url': '/static/mocks/image_preview.png',
          'thumbnail': 'https://goo.gl/images/Ja3Zxw',
          'mimeType': 'application/pdf',
          'insertDate': '2005-08-09T18:31:42-03:30',
          'size': 234412333
        }
      ],
      //typeIcon: 'telemed',
      typeIcon: '/static/mocks/m_plus.svg',
      clinic: {
        id: 1,
        name: 'Глазная клиника 3Z',
        img: '/static/mocks/clinic.png',
      },
      recommendations: 'Урософальк (или Урсосан) 250 мг по 2 капс на ночь — 1.5 мес. Одестон 0,2 по 1 т за 30 мин до еды 3 р в день — 14 дней.',
      serviceTitle: 'Плановая консультация в клинике с профильным врачом-специалистом',
      priceTitle: 'Посещение узких специалистов входит в ваш продукт ',
      ratingTitle: 'Оцените приём врача в целом',
    },
    {
      id: 2,
      date: '2019-10-09T11:26:19+03:00',
      dateStart: '2020-05-14T11:26:19+03:00',
      doctor: {
        id: 8115,
        name: 'Игорь',
        surname: 'Потапов',
        middlename: 'Алексеевич',
        photo: '/static/mocks/doctor.png',
      },
      specialization: 'Терапевт',
      //typeIcon: 'telemed',
      typeIcon: '/static/mocks/m_plus.svg',
      online: {
        title: 'Консультация в онлайне',
        typeTitle: 'Видеосвязь'
      },
      redirectionSpecialities: ['гастроэнтеролог'],
      recommendations: 'Не есть жирное, полуфабрикаты. Не есть за 3 часа до сна. Дробное питание',
      nextAppointmentDate: 'После посещения гастроэнтеролога',
      examinationResults: {
        symptoms:'Вздутие живота',
        currentAnamnesis: 'Есть хронический гастрит, избыток жиров',
        organ: {
          name: 'Пищеварительная система',
          comment: 'ДЖП по гипокинетич типу. Сладж ЖП'
        }
      },
      serviceTitle: 'Онлайн-консультация, видеосвязь',
      priceTitle: 'Онлайн-консультации входят в ваш продукт ',
      ratingTitle: 'Оцените приём врача в целом',
    },
    {
      id: 3,
      date: '2020-02-20T11:26:19+03:00',
      dateStart: '2020-03-09T11:26:19+03:00',
      futureOrder: true,
      paid: true,
      paymentDate: '2020-03-09T11:26:19+03:00',
      creditCard: '4276',
      comment: 'Не забудьте с собой паспорт.',
      doctor: {
        id: 8115,
        name: 'Мария',
        surname: 'Сысоева',
        middlename: 'Владимировна',
        photo: '/static/mocks/doctor.png',
      },
      specialization: 'Офтальмолог',
      //typeIcon: 'telemed',
      typeIcon: '/static/mocks/m_plus.svg',
      clinic: {
        id: 1,
        name: 'Глазная клиника 3Z',
        img: '/static/mocks/clinic.png',
      },
      recommendations: 'Урософальк (или Урсосан) 250 мг по 2 капс на ночь — 1.5 мес. Одестон 0,2 по 1 т за 30 мин до еды 3 р в день — 14 дней.',
      serviceTitle: 'Плановая консультация в клинике с профильным врачом-специалистом',
      priceTitle: '2400 ₽',
      ratingTitle: 'Оцените приём врача в целом',
    }
  )

  // mock.onGet(/recommendation\/\d+/).reply(200, {
  //   'id': 1,
  //   'type': 'created',
  //   'specialization': 'Окулист',
  //   'date': '2018-06-21T15:20:00+04:00',
  //   'serviceType': 'на дом',
  //   'comment': 'В оба глаза капли Тобрадекс 3 раза в день — 7 дней. В оба глаза увлажняющие капли Хилозар-Комод или Стиллавит.',
  //   'files': [
  //     {
  //       'id': 1675172,
  //       'typeId': '1',
  //       'title': 'analises1.pdf',
  //       'url': '/static/mocks/card.png',
  //       'thumbnail': 'https://goo.gl/images/Ja3Zxw',
  //       'mimeType': 'application/pdf',
  //       'insertDate': '2005-08-09T18:31:42-03:30',
  //       'size': 234412333
  //     },
  //     {
  //       'id': 25525,
  //       'typeId': '1',
  //       'title': 'analises2.pdf',
  //       'url': '/static/mocks/check-up.png',
  //       'thumbnail': 'https://goo.gl/images/Ja3Zxw',
  //       'mimeType': 'application/pdf',
  //       'insertDate': '2005-08-09T18:31:42-03:30',
  //       'size': 234412333
  //     },
  //     {
  //       'id': 2552589,
  //       'typeId': '1',
  //       'title': 'analises3.pdf',
  //       'url': '/static/mocks/mrt.png',
  //       'thumbnail': 'https://goo.gl/images/Ja3Zxw',
  //       'mimeType': 'application/pdf',
  //       'insertDate': '2005-08-09T18:31:42-03:30',
  //       'size': 234412333
  //     },
  //   ]
  // })
}

export const createProfileMedcardLocalMocks = (mock) => {
  mock.onGet(/medcards\/\d+\/orders/).reply(200, [
    {
      id: 1,
      date: '2020-03-01T16:10:00+03:00',
      appointment: true,
      specialization: 'Терапевт',
      note: 'Скоро прием в клинике',
      comment: 'Не забудьте с собой пасспорт',
      doctor: {
        id: 1,
        name: 'Вячеслав',
        surname: 'Злодеев',
        middlename: 'Олегович',
        specializations: [{
          title: 'Педиатр'
        }],
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
      },
    },
    {
      id: 2,
      date: '2020-04-02T16:10:00+03:00',
      specialization: 'Инфекционист',
      recommendations: 'Урософальк (или Урсосан) 250 мг по 2 капс на ночь — 1.5 мес. Одестон 0,2 по 1 т за 30 мин до еды 3 р в день — 14 дней.',
      doctor: {
        id: 1,
        name: 'Вячеслав',
        surname: 'Злодеев',
        middlename: 'Олегович',
        img: '/static/mocks/doctor.png',
        specializations: [{
          title: 'Гастроэнтеролог'
        }],
      },
      online: {
        title: 'Консультация в онлайне',
        typeTitle: 'Видеосвязь'
      },
      showPoll: true
    },
    {
      id: 3,
      date: '2020-05-03T16:10:00+03:00',
      specialization: 'Офтальмолог',
      doctor: {
        id: 1,
        name: 'Вячеслав',
        surname: 'Злодеев',
        middlename: 'Олегович',
        img: '/static/mocks/doctor.png',
        specializations: [{
          title: 'Терапевт'
        }],
      },
      online: {
        title: 'Консультация в онлайне',
        typeTitle: 'Видеосвязь'
      }
    },
    {
      id: 4,
      date: '2020-05-03T17:10:00+03:00',
      specialization: 'Терапевт',
      doctor: {
        id: 1,
        name: 'Вячеслав',
        surname: 'Злодеев',
        middlename: 'Олегович',
        img: '/static/mocks/doctor.png',
        specializations: [{
          title: 'Терапевт'
        }],
      },
      online: {
        title: 'Консультация в онлайне',
        typeTitle: 'Видеосвязь'
      }
    }
  ])

  mock.onGet(/medcards\/\d+\/recommendations/).reply(200, [
    {
      id: 1,
      date: '2020-02-12T11:26:19+03:00',
      specialization: 'Терапевт',
      files: [{
        id: 1,
        url: '/static/mocks/image_preview.png',
        thumbnail: '/static/mocks/image_preview.png',
        mimeType: 'image/png',
        title: 'Рекомендация',
      }]
    }, {
      id: 2,
      date: '2020-02-04T12:26:19+03:00',
      specialization: 'Окулист',
      files: [{
        id: 2,
        url: '/static/mocks/image_preview.png',
        thumbnail: '/static/mocks/image_preview.png',
        mimeType: 'image/png',
        title: 'Рекомендация',
      }, {
        id: 3,
        url: '/static/mocks/image_preview.png',
        thumbnail: '/static/mocks/image_preview.png',
        mimeType: 'image/png',
        title: 'Рекомендация',
      }]
    }, {
      id: 3,
      date: '2019-12-29T12:26:19+03:00',
      specialization: 'Гастроэнтеролог',
      files: [],
      recommendation: 'Урософальк (или Урсосан) 250 мг по 2 капс на ночь — 1.5 мес...',
    }, {
      id: 4,
      date: '2020-01-29T12:26:19+03:00',
      specialization: 'Окулист',
      files: [{
        id: 4,
        url: '/static/mocks/image_preview.png',
        thumbnail: '/static/mocks/image_preview.png',
        mimeType: 'image/png',
        title: 'Рекомендация',
      }],
    }
  ])
  mock.onGet(/medcards\/\d+\/researches/).reply(200, [
    {
      id: 1,
      date: '2020-06-30T11:26:19+03:00',
      name: 'Чек-ап в клинике на 1905',
      files: [
        {
          id: 1,
          url: '/static/mocks/check-up.png',
          thumbnail: '/static/mocks/check-up.png',
          mimeType: 'image/png',
          title: 'Рекомендация',
        },
        {
          id: 2,
          url: '/static/mocks/check-up.png',
          thumbnail: '/static/mocks/check-up.png',
          mimeType: 'image/png',
          title: 'Рекомендация',
        }
      ]
    },
    {
      id: 2,
      date: '2020-08-09T12:26:19+03:00',
      name: 'МРТ',
      files: [{
        id: 2,
        url: '/static/mocks/mrt.png',
        thumbnail: '/static/mocks/mrt.png',
        mimeType: 'image/png',
        title: 'Рекомендация',
      }]
    }
  ])
  mock.onGet(/medcards\/\d+\/files/).reply(200, [...new Array(6)].map((item, index) => ({
    id: index,
    thumbnail: '/static/mocks/image_preview.png',
    url: '/static/mocks/image_preview.png',
  })))
}