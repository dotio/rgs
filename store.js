import {init} from '@rematch/core'
import router from './models/router'
import loaders from './models/loaders'
import {user} from './models/user'
import login from './features/login/model'
import activation from './features/activation/model'
import {medcards} from './features/medcards/model'
import {doctors} from './features/doctors/model'
import {dictionary} from './models/dictionary'
import {chat} from './features/chat/models'
import {consultation} from './features/consultation/models'
import {mediachat} from './features/media-chat/models'
import {profileHistory} from './features/profile/history/profile-history-model'
import {profileProducts} from './features/profile/products/profile-products-model'
import {clinics} from './features/clinics/model'
import {notifications} from './features/notifications/model'
import localization from './utils/translation/models'
import modal from './templates/modal/model'
import {order} from './features/order/models'
import {profileMedcard} from './features/profile/medcard/model'
import {profileSettings} from './features/profile/settings/model'
import {about} from './features/about/model'
import {filtersSearch} from './features/search/model'

export function initializeStore(initialState) {
  return init({
    models: {
      router,
      loaders,
      modal,
      user,
      login,
      activation,
      medcards,
      doctors,
      dictionary,
      chat,
      consultation,
      mediachat,
      profileHistory,
      profileProducts,
      profileMedcard,
      profileSettings,
      clinics,
      notifications,
      localization,
      order,
      about,
      filtersSearch,
    },
    redux: {
      initialState
    },
  })
}
