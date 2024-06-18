export const CONSULTATION_STATUS_OPERATOR_WAIT        = 'operator_wait'
export const CONSULTATION_STATUS_OPERATOR_ACCEPT      = 'operator_accept'
export const CONSULTATION_STATUS_OPERATOR             = 'operator_active'
export const CONSULTATION_STATUS_DOCTOR_WAIT          = 'doctor_wait'
export const CONSULTATION_STATUS_DOCTOR_ACCEPT        = 'doctor_accept'
export const CONSULTATION_STATUS_DOCTOR               = 'doctor_active'
export const CONSULTATION_STATUS_DOCTOR_FILLING       = 'doctor_filling'
export const CONSULTATION_STATUS_ERROR                = 'error'
export const CONSULTATION_STATUS_CANCELED             = 'reject'
export const CONSULTATION_STATUS_DONE                 = 'close'
export const CONSULTATION_STATUS_LOAD                 = 'load'
export const CONSULTATION_STATUS_MISSED               = 'missed'

export const CONSULTATION_STATUSES = {
  [CONSULTATION_STATUS_OPERATOR_WAIT]: {
    id:    1,
    title: 'Ожидает',
    color: 'orange'
  },
  [CONSULTATION_STATUS_OPERATOR_ACCEPT]: {
    id:    2,
    title: 'Консультант назначен',
    color: 'green',
  },
  [CONSULTATION_STATUS_OPERATOR]:  {
    id:    3,
    title: 'Общение',
    color: 'green',
  },
  [CONSULTATION_STATUS_DOCTOR_WAIT]: {
    id:    4,
    title: 'Ожидает',
    color: 'orange',
  },
  [CONSULTATION_STATUS_DOCTOR_ACCEPT]: {
    id:    5,
    title: 'Врач назначен',
    color: 'green',
  },
  [CONSULTATION_STATUS_DOCTOR]: {
    id:    6,
    title: 'Общение',
    color: 'green',
  },
  [CONSULTATION_STATUS_DOCTOR_FILLING]: {
    id:    6,
    title: 'Общение',
    color: 'green',
  },
  [CONSULTATION_STATUS_DONE]: {
    id:    7,
    title: 'Закрыта',
    color: 'gray',
  },
  [CONSULTATION_STATUS_CANCELED]: {
    id:    8,
    title: 'Отклонена',
    color: 'red',
  },
  [CONSULTATION_STATUS_MISSED]: {
    title: 'Пропущеный вызов',
    color: 'red',
  },
  [CONSULTATION_STATUS_ERROR]: {
    title: 'Ошибка',
    color: 'red',
  },
  [CONSULTATION_STATUS_LOAD]: {
    title: 'Загрузка',
    color: 'blue',
  },
}