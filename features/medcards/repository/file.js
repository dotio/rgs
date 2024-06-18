import {BaseRepository} from '../../../templates/repository/base'
import {requestApi} from '../../../lib/api'

export class Repository extends BaseRepository {
  create = (data) => {
    return requestApi('post', this.path, data, true)
  }
}

export const FilesRepository = new Repository('/file')