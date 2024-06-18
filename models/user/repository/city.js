import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  getCity = () => requestApi('get', this.path)
  addCity = id => requestApi('post', `${this.path}/${id}`)
}

export const CityRepository = new Repository('/city')
