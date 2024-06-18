import {BaseRepository} from '../../../templates/repository/base'
import {requestApi} from '../../../lib/api'

export class Repository extends BaseRepository {
  getOrderQuality = id => requestApi('get', `${this.path}/${id}/quality`)
  postOrderQuality = id => requestApi('post', `${this.path}/${id}/quality`)
  getOrderInformation = id => requestApi('get', `${this.path}/${id}/information`)
  // нет в сваггере
  getOrdersPayments = params => requestApi('get', `${this.path}/payment`,params)
  getQuality = id => requestApi('get', `${this.path}/${id}/quality`)
  setQuality = (id, data) => requestApi('post', `/order/${id}/quality`, data)
}

export const OrderRepository = new Repository('/order')