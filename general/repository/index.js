import {requestApi} from '../../lib/api'
import {BaseRepository} from '../../templates/repository/base'

export class Repository extends BaseRepository {
  getList = () => requestApi('get', `${this.path}/list`)
  getCalendar = () => requestApi('get', `${this.path}/calendar`)
  // not in swagger
  getNextEvent = () => requestApi('get', `${this.path}/next`)
}

export const GeneralRepository = new Repository('/events')