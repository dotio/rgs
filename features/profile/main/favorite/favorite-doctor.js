import React from 'react'
import PropTypes from 'prop-types'
import {Text} from '../../../../ui/text'
import {FavoriteContainer} from './favorite-container'

export const FavoriteDoctor = ({id, name, surname, middlename, photo, specializations, isFavorite}) => {
  return (
    <FavoriteContainer
      initIsFavorite={isFavorite}
      img={photo ? photo : '/static/avatars/doctor_empty_big.svg'}
      id={id}
      entity={'doctor'}
      href={`/doctor/${id}`}
    >
      <Text>{surname} {name} {middlename}</Text>
      <Text color={'black50'}>{specializations.map(specialization => specialization.title).join(', ')}</Text>
    </FavoriteContainer>
  )
}

FavoriteDoctor.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  middlename: PropTypes.string,
  img: PropTypes.string,
  specializations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
}