export const timeSlots = [
  {
    title: '10:00-12:00',
    value: 1
  },
  {
    title: '12:00-14:00',
    value: 2
  },
  {
    title: '14:00-16:00',
    value: 3
  },
  {
    title: '16:00-18:00',
    value: 4
  }
]

export const createAboutMocks = mock => {
  mock.onPost('/callback').reply(200, {})
  mock.onGet('/callback/slots').reply(200, timeSlots)
}
