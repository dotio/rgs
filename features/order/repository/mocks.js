
const quality = {

  'id': 1,
  'description': 'Качество работы МК',
  'description2': 'Оцените качество работы Медицинского консультанта',
  'questions': [
    {
      'id': 1,
      'name': 'Насколько в целом Вы удовлетворены работой медицинского консультанта?',
      'description': 'Пояснение: во время консультации консультант развернуто и полно отвечали на все вопросы, проявляли активную заинтересованность в решение вопроса клиента.',
      'isComment': 1,
      'isReview': 0,
      'required': 1,
      'answers': [
        {
          'id': 76,
          'name': 'полностью согласен с утверждением'
        },
        {
          'id': 77,
          'name': 'полностью согласен с утверждением'
        },
        {
          'id': 78,
          'name': 'полностью согласен с утверждением'
        },
        {
          'id': 79,
          'name': 'полностью согласен с утверждением'
        },
        {
          'id': 80,
          'name': 'полностью согласен с утверждением'
        },
      ]
    },
    {
      'id': 2,
      'name': 'Насколько в целом Вы удовлетворены работой медицинского консультанта?2',
      'description': 'Пояснение: во время консультации консультант развернуто и полно отвечали на все вопросы, проявляли активную заинтересованность в решение вопроса клиента.',
      'isComment': 1,
      'isReview': 0,
      'required': 1,
      'answers': [
        {
          'id': 81,
          'name': 'полностью согласен с утверждением'
        },
        {
          'id': 82,
          'name': 'полностью согласен с утверждением'
        },
        {
          'id': 83,
          'name': 'полностью согласен с утверждением'
        },
        {
          'id': 84,
          'name': 'полностью согласен с утверждением'
        },
        {
          'id': 85,
          'name': 'полностью согласен с утверждением'
        },
      ]
    }
  ]
}


export const createOrderMocks = (mock, id) => {
  mock.onPost(`/doctor/${id}/order`).reply(200, {})
  mock.onGet('/order/payment').reply(200, {
    price: '1000 руб.',
    product: {
      id: 100,
      title: 'Вы ничего не платите',
      image: '/path/to/image.png',
      name: 'Медконсультант+'
    }
  })
  mock.onGet('/order/1/quality').reply(200, quality)
  mock.onPost('/order/1/quality').reply(200, {total: 4.1})
}