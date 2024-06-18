/* istanbul ignore file */

/**
 * Склоняет слово согласно числителя
 * @param number
 * @param forms
 * @returns {*}
 */
const pluralRu = (number, forms) => {
  const n100 = Math.abs(number) % 100

  if (n100 >= 5 && n100 <= 20) return forms['5']

  const n10 = n100 % 10

  if (n10 === 1) return forms['1']
  if (n10 >= 2 && n10 <= 4) return forms['2']

  return forms['5']
}

/**
 * Склоняет слово согласно числителя
 * @param number
 * @param forms
 * @returns {*}
 */
const pluralEn = (number, forms) => {
  return number === 1 ? forms['1'] : forms['2']
}



export const langsToPluralFns = {
  'ru-ru': pluralRu,
  'en': pluralEn,
}