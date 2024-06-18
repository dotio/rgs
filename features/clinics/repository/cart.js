import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  getCart = () => requestApi('get', this.path)
  updateCart = data => requestApi('post', this.path, data)
}

export const CartRepository = new Repository('/cart')
