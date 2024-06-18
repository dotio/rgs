/* eslint-disable */
import { init } from '@rematch/core'
import modal, {initialState} from '../templates/modal/model'
import expect from 'expect'

const store = init({
  models: { modal },
})

describe('modal model', () => {
  it('reducer: should handle addModal()', () => {
    store.dispatch.modal.addModal({
      type: 'notification',
      title: 'Сообщение'
    })

    expect(store.getState().modal).toEqual({
      ...initialState,
      queue: [
        {
          type: 'notification',
          title: 'Сообщение'
        }
      ],
    })
  })
})
