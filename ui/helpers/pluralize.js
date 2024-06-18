/**
 * pluralize - Склоняет слово согласно числителя
 *
 * @param {type} number Числитель
 * @param {type} one    Форма склонения для xxx1
 * @param {type} two    Форма склонения для xxx2 - xxx4
 * @param {type} five   Форма склонения для xxx5 - xxx9, xx11 - xx19, xxx0
 *
 * @return {type} Соответствующее числителю склонение
 */
export const pluralize = (number, one, two, five) => {
  const n100 = Math.abs(number) % 100

  if (n100 >= 5 && n100 <= 20) return five

  const n10 = n100 % 10

  if (n10 == 1) return one
  if (n10 >= 2 && n10 <= 4) return two

  return five
}