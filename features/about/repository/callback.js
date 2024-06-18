import {BaseRepository} from '../../../templates/repository/base'
import {requestApi} from '../../../lib/api'

export class Repository extends BaseRepository {
  getTimeSlots = () => requestApi('get', `${this.path}/slots`, {})
}

export const CallbackRepository = new Repository('/callback')
