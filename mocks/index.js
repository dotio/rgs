import {createLoginMocks} from '../features/login/repository/mocks'
import {createActivationMocks, createActivationLocalMocks} from '../features/activation/repository/mocks'
import {createMedcardsMocks, createMedcardsLocalMocks} from '../features/medcards/mocks'
import {createDoctorsMocks, createDoctorsLocalMocks} from '../features/doctors/mocks'
import {createUserMocks} from '../models/user/mocks'
import {createDictionaryMocks, createDictionaryLocalMocks} from '../models/dictionary/mocks'
import {createChatMocks} from '../features/chat/mocks'
import {createConsultationMocks} from '../features/consultation/repository/mocks'
import {createMediaChatMocks} from '../features/media-chat/mocks'
import {createDiscountsMocks} from '../features/discount/repository/mocks'
import {createProfileMocks, createProfileLocalMocks, createSettingsLocalMocks} from '../features/profile/repository/mocks'
import {createLocalizationsMock} from '../utils/translation/repository/mocks'
import {createOrderMocks} from '../features/order/repository/mocks'
import {createProfileMedcardMocks, createProfileMedcardLocalMocks} from '../features/profile/medcard/repository/mocks'
import {createClinicsMocks} from '../features/clinics/repository/mocks'
import {createAboutMocks} from '../features/about/repository/mocks'

const passThrough = (mock) => {
  // createChatMocks(mock)
  // createLoginMocks(mock)
  // createActivationMocks(mock)
  // createUserMocks(mock)
  createMedcardsMocks(mock)
  createDoctorsMocks(mock)
  createDictionaryMocks(mock)
  // createConsultationMocks(mock)
  // createMediaChatMocks(mock)
  // createOrderMocks(mock)
  createDiscountsMocks(mock)
  // createProfileMocks(mock)
  // createLocalizationsMock(mock)
  createProfileMedcardMocks(mock)
  createAboutMocks(mock)
  mock.onAny().passThrough()
}

export const createMocks = (mock) => {
  passThrough(mock)
}

const passThroughLocal = (mock) => {
  createChatMocks(mock)
  createLoginMocks(mock)
  createActivationMocks(mock)
  createActivationLocalMocks(mock)
  createUserMocks(mock)
  createMedcardsMocks(mock)
  createMedcardsLocalMocks(mock)
  createDoctorsMocks(mock)
  createDoctorsLocalMocks(mock)
  createDictionaryMocks(mock)
  createDictionaryLocalMocks(mock)
  createConsultationMocks(mock)
  createMediaChatMocks(mock)
  createDiscountsMocks(mock)
  createProfileMocks(mock)
  createProfileLocalMocks(mock)
  createSettingsLocalMocks(mock)
  createOrderMocks(mock)
  createProfileMedcardMocks(mock)
  createProfileMedcardLocalMocks(mock)
  createLocalizationsMock(mock)
  createClinicsMocks(mock)
  mock.onAny().passThrough()
}

export const createLocalMocks = (mock) => {
  passThroughLocal(mock)
}

