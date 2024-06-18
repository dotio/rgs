import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
   setActive = id => requestApi('post', `${this.path}/${id}/set-active`)
}
export const CardRepository = new Repository('/card')