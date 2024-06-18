export const mockMedcardList = [
  'Иван',
  'Степан',
  'Фёдор',
  'Петр',
].map((name, key) => ({
  id: ++key,
  name: name,
  main: key === 1,
  hasAccess: key !== 2,
  surname: `${name}ов`,
  lastName: `${name}oвич`,
  gender: 'male',
  birthDate: '1985-12-12',
  relationship: key === 1 ? 'Моя медкарта' : 'Я' + key,
  photo: 'https://image.freepik.com/free-vector/doctor-background-design_1270-62.jpg',
}))
const anamnesisMock = [{
  code: 'injuries',
  title: 'Перенесённые заболевания, травмы',
  selectedItems: [{
    id: 0,
    title: 'Вывих локтя'
  }]
}, {
  code: 'surgery',
  title: 'Перенесённые операции',
  selectedItems: [],
}, {
  code: 'diseases',
  title: 'Хронические заболевания',
  selectedItems: [{
    id: 0,
    title: 'Хронический гастрит'
  }]
}, {
  code: 'drugs',
  title: 'Постоянный приём лекарств',
  selectedItems: []
}, {
  code: 'heredity',
  title: 'Наследственность',
  selectedItems: []
}, {
  code: 'allergies',
  title: 'Аллергии',
  selectedItems: []
}, {
  code: 'vaccination',
  title: 'Проведённые вакцинации',
  selectedItems: [{
    id: 0,
    title: 'Корь'
  }, {
    id: 1,
    title: 'ветряная оспа'
  }, {
    id: 2,
    title: 'гепатит А'
  }, {
    id: 3,
    title: 'клещевой энцефалит'
  }]
}, {
  code: 'bloodType',
  title: 'Группа крови, резус фактор',
  selectedItems: [{
    id: 0,
    title: 'A(II) Rh"-"'
  }]
}, {
  code: 'other',
  title: 'Прочее',
  selectedItems: []
}]

const medcardStatus = {
  filledPercent: 50,
  fields: anamnesisMock
    .map((field) => ({
      title: field.title,
      filled: field.selectedItems.length > 0
    }))
}

const relativeMedcardSettings = {
  id: 1,
  name: 'Иван',
  surname: 'Иванов',
  lastName: 'Иванoвич',
  main: false,
  hasAccess: true,
  gender: 'male',
  birthDate: '1985-12-12',
  relationship: 'Отец',
  photo: 'https://image.freepik.com/free-vector/doctor-background-design_1270-62.jpg',
  phone: '+7 999 420-30-60',
  confirmation: {
    active: false,
    date: '29.01.2020',
    time: '14:59',
  },
  cards: [
    {
      id: 1,
      linked: false,
      lastNumbers: '4276',
    },
    {
      id: 2,
      linked: true,
      lastNumbers: '6724',
    },
  ],
  product: {
    id: 1,
    name: 'Медконсультант+',
    img: '../../../static/icons/productM+.jpg',
  },
  createdDate: '29.01.2020',
  activationDate: '30.01.2020',
}

const currentMedcard = {
  id: 56,
  name: 'Сергей',
  surname: 'Генадько',
  lastName: 'Олегович',
  relationship: 'Отец',
  photo: '',
  gender: 'male',
  birthDate: '1994-03-25T00:00:00+00:00',
  phone: '+7 999 420-39-50',
  email: '',
  subscribeNews: false,
  oms: '',
  snils: '',
  passport: {
    isResident: true,
    series: '4524',
    number: '039100',
    issuedBy: '',
    issueDate: '',
    unitCode: ''
  },
  measurement: {
    height: '',
    weight: '',
    bloodType: '',
    weightIndex: ''
  },
  boxes: [
    {
      title: 'название коробки 1',
      number: 41241241241,
      expirationDate: '2005-08-09T18:31:42-03:30'
    }
  ]
}

export const createMedcardsMocks = mock => {
  return mock
}

export const createMedcardsLocalMocks = mock => {
  mock.onGet('/medcards').reply(200, mockMedcardList)
  mock.onPost('/medcards').reply(200, {})
  mock.onGet(/medcards\/\d+\/anamnesis/).reply(200, anamnesisMock)
  mock.onGet(/medcards\/\d+\/status/).reply(200, medcardStatus)
  mock.onGet('/medcards/1').reply(200, currentMedcard)
  mock.onPut('/medcards/1').reply(200, {})
  mock.onGet(/medcards\/\d+\/settings/).reply(200, relativeMedcardSettings)
}
