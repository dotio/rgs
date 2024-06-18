export const noSelectedItemsOptionMap = {
  drugs: {
    id: 0,
    title: 'Не принимаю лекарств на постоянной основе',
  },
  allergies: {
    id: 0,
    title: 'Не имею аллергий',
  },
  injuries: {
    id: 0,
    title: 'Не имею травм',
  },
  diseases: {
    id: 0,
    title: 'Не имею хронических заболеваний',
  },
  surgery: {
    id: 0,
    title: 'Не имею перенесённых операций',
  },
  vaccinationPlanned: {
    id: 0,
    title: 'Нет плановых вакцинаций',
  },
  prostheses: {
    id: 0,
    title: 'Не имею установленных протезов',
  },
  bloodType: {
    id: 0,
    title: 'Неизвестно',
  }
}

export const addNoSelectedItemsOption = (code, items) => noSelectedItemsOptionMap[code]
  ? [noSelectedItemsOptionMap[code], ...items]
  : items