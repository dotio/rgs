/* istanbul ignore file */
import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  sendCode = login => requestApi('post', `${this.path}/send-code`, {login})
  authorize = params => requestApi('post', `${this.path}/authorize`, params)
  logout = () => requestApi('post', '/logout')
  // not in swagger
  authorizeWithAgreement = params => requestApi('post', `${this.path}/authorize-with-agreement`, params)
  refresh = refreshToken => requestApi('post', `${this.path}/refresh`, {refreshToken})
}

export const AuthRepository = new Repository('/authentication')