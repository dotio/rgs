import {Text} from '../../../../ui/text'
import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {FavoriteContainer} from './favorite-container'
import {getRandomIntInclusive} from '../../../../ui/helpers/getRandomIntInclusive'

export const FavoriteClinic = ({id, name, address, showplace, logo, isFavorite}) => {
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1, 5), [id])
  return (
    <FavoriteContainer
      initIsFavorite={isFavorite}
      img={logo ? logo : `/static/mocks/clinic${memoizedRandom}.svg`}
      id={id}
      entity={'clinic'}
      href={`/clinic/${id}`}
    >
      <Text>{name}</Text>
      <Text color={'black50'}>{address}</Text>
      {showplace && <Text color={'black50'}>{showplace.name}</Text>}
    </FavoriteContainer>
  )
}
FavoriteClinic.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  showplace: PropTypes.object,
  img: PropTypes.string,
}