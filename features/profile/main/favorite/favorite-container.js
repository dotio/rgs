import styled from 'styled-components'
import React, {useState} from 'react'
import {ListItem} from '../../../../ui/list-item'
import {media} from '../../../../helpers/media'
import PropTypes from 'prop-types'
import {Wrapper} from '../../../../ui/wrapper'
import {Button} from '../../../../ui/button'
import {Icon} from '../../../../ui/icon'
import {Text} from '../../../../ui/text'
import {FavoriteRepository} from '../../repository/favorite'
import {T} from '../../../../utils/translation'

const AddRemoveButton = styled(Button)`
  display: flex;
  align-items: center;
  height: 36px;
  
  ${media.mobile`
    justify-content: center;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    padding: 0;
  `}
  
  ${Text} {
    ${media.mobile`
      display: none;
    `}
  }
`

export const FavoriteContainer = ({id, entity, img, href, initIsFavorite, children}) => {
  const [isFavorite, setIsFavorite] = useState(initIsFavorite)
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async (e) => {
    e.preventDefault()
    const fn = isFavorite ? FavoriteRepository.removeFavorite : FavoriteRepository.addFavorite
    setLoading(true)
    try {
      await fn(entity, id)
      setIsFavorite(!isFavorite)
    } finally {
      setLoading(false)
    }
  }

  return <ListItem
    src={img}
    borderRadius={entity === 'doctor' ? '50%' : '16px'}
    withBorder={true}
    href={href}
  >
    <Wrapper justify={'space-between'} gap={'16px'}>
      <Wrapper flow={'column'}>{children}</Wrapper>
      <AddRemoveButton onClick={toggleFavorite} showLoader={loading} color={isFavorite ? 'starred' : 'transparent'} gap={'6px'}>
        <Icon height={16} width={16} type={'star'} color={isFavorite ? 'white' : 'starred'} shrink={'0'} />
        <Text color={'inherit'} padding={'0 0 0 6px'}>
          {isFavorite ? <T ucFirst>profile.favorite.in-favorite</T> : <T ucFirst>profile.favorite.add-favorite</T>}
        </Text>
      </AddRemoveButton>
    </Wrapper>
  </ListItem>
}
FavoriteContainer.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  entity: PropTypes.string,
  initIsFavorite: PropTypes.bool,
}