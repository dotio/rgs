import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  sendCode = phone => requestApi('post', `${this.path}/send-code`, {phone})
  confirm = params => requestApi('post', `${this.path}/confirm`, params)
}

export const RelationshipRepository = new Repository('/relationship')