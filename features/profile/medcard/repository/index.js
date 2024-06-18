import {requestApi} from '../../../../lib/api'
import {BaseRepository} from '../../../../templates/repository/base'

export class Repository extends BaseRepository {

  /**
   * Полчения списка обращений по медкарте
   * @param id - ID медкарты
   * @param params
   */
  getOrders = (id, params) => requestApi('get', `${this.path}/${id}/orders`, params)

}

export const MedcardsRepository = new Repository('/medcards')