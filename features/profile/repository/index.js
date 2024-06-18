import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  getCurrentProducts = () => requestApi('get', `${this.path}/current-product`)
  getAvalibleServices = () => requestApi('get', `${this.path}/available-services`)
  getSubscription = data => requestApi('post', `${this.path}/subscription`, data)
  //нет в сваггере
  getSettings = data => requestApi('post', `${this.path}/settings`, data)
  getHistory = data => requestApi('get', `${this.path}/history`, data)
  getDiscounts = () => requestApi('get', `${this.path}/discounts`)
}

export const ProfileRepository = new Repository('/profile')