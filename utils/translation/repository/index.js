/* istanbul ignore file */
import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  load = () => requestApi('get', '/dictionaries/content-texts')
}

export const TranslationRepository = new Repository('/')