import {append, equals, reject} from 'ramda'

//Добавляет или удаляет значение из массива
export const addRemove = (value, array) => {
  if (array.includes(value)) {
    return reject(equals(value), array)
  } else {
    return append(value, array)
  }
}