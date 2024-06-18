/* istanbul ignore file */
import {getCookie} from '../../../helpers/cookie'
export const consultation = {
  id: 1,
  active: false,
  chat: {
    id: 1
  },
  room: '12323131',
  type: 'chat',
  specialistId: 1,
  clientId: 1,
  medcardId: 1,
  doctorId: 1,
  status: {
    name: 'new',
    title: 'Новая',
    color: 'green'
  },
  doctor: {
    name: 'Батько',
    surname: 'Консультант',
    middlename: 'Консультантович',
    specialization: {
      name: 'Терапевт'
    },
    photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
  },
  fieldsBlocks: [
    {
      name: 'anamnesis',
      title: 'Анамнез жизни',
      fields: [
        {
          title: 'Перенесенные заболевания',
          path: 'pastIllness',
        },
        {
          title: 'Постоянный прием лекарств',
          path: 'drugs',
        },
        {
          title: 'Травмы/операции',
          path: 'injuries',
        },
        {
          title: 'Вредные привычки',
          path: 'habits',
        },
        {
          title: 'Семейный анамнез',
          path: 'family',
        },
        {
          title: 'Комментарий',
          path: 'comment',
        }
      ]
    },
    {
      name: 'card',
      title: 'Данные карты',
      fields: [
        {
          title: 'Жалобы',
          path: 'complaints',
          required: true,
        },
        {
          title: 'Анамнез текущего заболевания',
          path: 'anamnesis',
        },
        {
          title: 'Аллергологический анамнез',
          path: 'allergies',
          required: true,
        },
        {
          title: 'Перенесенные заболевания',
          path: 'pastIllness',
        },
        {
          title: 'Комментарий',
          path: 'comment',
        },
        {
          title: 'Заключение',
          path: 'conclusion',
        },
        {
          title: 'Возможный диагноз (по МКБ-10)',
          path: 'possibleDiagnosis',
        }
      ]
    },
  ],
  anamnesis: {
    pastIllness: 'Краснуха',
    drugs: '',
    injuries: '',
    habits: '',
    family: '',
    comment: ''
  },
  card: {
    complaints: 'Болит горло',
    anamnesis: 'Воспаление носа',
    allergies: '',
    pastIllness: 'Свинка',
    comment: '',
    conclusion: '',
    possibleDiagnosis: '',
    redirections: [
      {id:1, title: 'Акушер'},
      {id:2, title: 'Аллерголог'}
    ],
    instrumental: [
      {id:1, title: 'УЗИ'}
    ],
    analyzes: [
      {id:1, title: 'Кровь'},
      {id:2, title: 'Почки'},
    ],
    drugs: [
      {id:1, title: 'АЦЦ'}
    ],
  }
}

export const createConsultationMocks = mock => {
  mock.onPut('/consultation/1').reply(200, {...consultation, status: {
    name: 'ended',
    title: 'Завершена',
    color: 'blue'
  }})
  mock.onGet('/consultation/1').reply(200, consultation)
  mock.onPost('/consultation').reply(200, consultation)
  mock.onDelete('/consultation/1').reply(200, {})
  mock.onPost('/consultation/1/status').reply((config) => {
    const data = JSON.parse(config.data)
    return [
      200, {
        ...consultation,
        active: true,
        status: data.status
      }
    ]
  })
  mock.onGet('/consultation', {params: {doctorId:'1'}}).reply(() => {
    if (!['operator', 'doctor'].includes(getCookie('token'))) {
      // return [401]
    }
    return [
      200, consultationsForUser
    ]
  })
  mock.onGet('/consultation').reply(() => {
    if (!['operator', 'doctor'].includes(getCookie('token'))) {
      // return [401]
    }
    return [
      200, [
        {
          active: true,
          chatId: null,
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было, темп. 38-39 Диагностировали ранее пневмонию, лечение было, темп. 38-39Диагностировали ранее пневмонию, лечение было, темп. 38-39Диагностировали ранее пневмонию, лечение было, темп. 38-39',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          specialization: 'Терапевт',
          type: 'chat',
          date: '2019-03-16T10:23:13+03:00',
          status: {
            color: '#fff4bf',
            code: 'operator_active',
          },
          chat: {
            id: 1
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Мария',
            middlename: 'Федоровна',
            surname: 'Гончарова',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E7D11C6D-71B3-42D7-B307-E6196273F085.png',
          },
          user: {
            id: 1
          },
          orderId: 1,
          reasons: 'Боль в горле, кашель, темп 38,5',
          doctor: {
            id: 12321,
            name: 'Анна',
            middlename: 'Борисовна',
            surname: 'Красюкова',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0ACA2A7-AFDE-4D3B-900E-6C48E737A659.png'
          },
          specialization: 'ЛОР',
          date: '2019-03-16T10:23:13+03:00',
          type: 'video',
          status: {
            color: '#daf2aa',
            title: 'соединена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
        {
          id: 1,
          medcard: {
            id: 1,
            name: 'Артем',
            middlename: 'Федорович',
            surname: 'Гончаров',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
          },
          orderId: 1,
          user: {
            id: 1,
          },
          reasons: 'Диагностировали ранее пневмонию, лечение было',
          doctor: {
            id: 12321,
            name: 'Артем',
            middlename: 'Валерьевич',
            surname: 'Николенко',
            photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
          },
          type: 'chat',
          date: '2019-03-16T17:00:13+03:00',
          specialization: 'Гастроэнтеролог',
          status: {
            color: '#f0f0f0',
            title: 'завершена',
          }
        },
      ]
    ]
  })
}

const consultationsForUser = {
  item: [
    {
      id: 1,
      medcard: {
        id: 1,
        name: 'Артем',
        middlename: 'Федорович',
        surname: 'Гончаров',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
      },
      orderId: 1,
      user: {
        id: 1,
      },
      reasons: 'Диагностировали ранее пневмонию, лечение было, темп. 38-39 Диагностировали ранее пневмонию, лечение было, темп. 38-39Диагностировали ранее пневмонию, лечение было, темп. 38-39Диагностировали ранее пневмонию, лечение было, темп. 38-39',
      doctor: {
        id: 12321,
        name: 'Артем',
        middlename: 'Валерьевич',
        surname: 'Николенко',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
      },
      specialization: 'Терапевт',
      type: 'chat',
      date: '2019-03-16T10:23:13+03:00',
      status: {
        color: '#fff4bf',
        title: 'ожидает соединения',
      },
      chat: {
        id: 1
      }
    },
    {
      id: 2,
      medcard: {
        id: 1,
        name: 'Мария',
        middlename: 'Федоровна',
        surname: 'Гончарова',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E7D11C6D-71B3-42D7-B307-E6196273F085.png',
      },
      user: {
        id: 1
      },
      orderId: 1,
      reasons: 'Боль в горле, кашель, темп 38,5',
      doctor: {
        id: 12321,
        name: 'Артем',
        middlename: 'Валерьевич',
        surname: 'Николенко',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
      },
      specialization: 'ЛОР',
      date: '2019-03-16T10:23:13+03:00',
      type: 'video',
      status: {
        color: '#daf2aa',
        title: 'соединена',
      }
    },
    {
      id: 3,
      medcard: {
        id: 1,
        name: 'Артем',
        middlename: 'Федорович',
        surname: 'Гончаров',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
      },
      orderId: 1,
      user: {
        id: 1,
      },
      reasons: 'Диагностировали ранее пневмонию, лечение было',
      doctor: {
        id: 12321,
        name: 'Артем',
        middlename: 'Валерьевич',
        surname: 'Николенко',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
      },
      type: 'chat',
      date: '2019-03-16T17:00:13+03:00',
      specialization: 'Гастроэнтеролог',
      status: {
        color: '#f0f0f0',
        title: 'завершена',
      }
    },
    {
      id: 4,
      medcard: {
        id: 1,
        name: 'Артем',
        middlename: 'Федорович',
        surname: 'Гончаров',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
      },
      orderId: 1,
      user: {
        id: 1,
      },
      reasons: 'Диагностировали ранее пневмонию, лечение было',
      doctor: {
        id: 12321,
        name: 'Артем',
        middlename: 'Валерьевич',
        surname: 'Николенко',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
      },
      type: 'chat',
      date: '2019-03-16T17:00:13+03:00',
      specialization: 'Гастроэнтеролог',
      status: {
        color: '#f0f0f0',
        title: 'завершена',
      }
    },
    {
      id: 5,
      medcard: {
        id: 1,
        name: 'Артем',
        middlename: 'Федорович',
        surname: 'Гончаров',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/E0DF6C2B-9A5A-4710-9E0B-62748F3443C6.png',
      },
      orderId: 1,
      user: {
        id: 1,
      },
      reasons: 'Диагностировали ранее пневмонию, лечение было',
      doctor: {
        id: 12321,
        name: 'Артем',
        middlename: 'Валерьевич',
        surname: 'Николенко',
        photo: 'https://cdn.zeplin.io/5d0bad5b9d476859d618c665/assets/C79581DF-3609-4A69-88AA-C849922CDD0A.png'
      },
      type: 'chat',
      date: '2019-03-16T17:00:13+03:00',
      specialization: 'Гастроэнтеролог',
      status: {
        color: '#f0f0f0',
        title: 'завершена',
      }
    },
  ],
  total: 5
}