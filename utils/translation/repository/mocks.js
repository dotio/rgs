/* istanbul ignore file */
import banner from './translations-mocks/banner'
import chat from './translations-mocks/chat'
import login from './translations-mocks/login'
import search from './translations-mocks/search'
import activation from './translations-mocks/activation'
import consultation from './translations-mocks/consultation'
import clinics from './translations-mocks/clinics'
import communication from './translations-mocks/communication'
import doctors from './translations-mocks/doctors'
import products from './translations-mocks/products'
import medcard from './translations-mocks/medcard'
import profile from './translations-mocks/profile'
import order from './translations-mocks/order'
import menu from './translations-mocks/menu'
import user from './translations-mocks/user'
import copyright from './translations-mocks/copyright'
import validation from './translations-mocks/validation'
import profileResearches from './translations-mocks/profileResearches'
import profileMedcard from './translations-mocks/profileMedcard'
import files from './translations-mocks/files'
import profileRecommendations from './translations-mocks/profileRecommedations'
import profileSettings from './translations-mocks/profileSettings'
import profileFamily from './translations-mocks/profileFamily'
import about from './translations-mocks/about'

export const createLocalizationsMock = mock => {
  mock.onGet('/dictionaries/content-texts').reply(200, translationsMock)
}

export const translationsMock = [
  ...about,
  ...login,
  ...chat,
  ...search,
  ...banner,
  ...activation,
  ...consultation,
  ...clinics,
  ...communication,
  ...doctors,
  ...medcard,
  ...products,
  ...profile,
  ...profileFamily,
  ...order,
  ...menu,
  ...user,
  ...copyright,
  ...validation,
  ...profileResearches,
  ...profileMedcard,
  ...files,
  ...profileRecommendations,
  ...profileSettings,
  ...profileFamily,
]