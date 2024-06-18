import { Icon } from '../../../../ui/icon'
import { Wrapper } from '../../../../ui/wrapper'
import { Text } from '../../../../ui/text'
import React from 'react'
import styled from 'styled-components'
import { getColor } from '../../../../ui/helpers/getColor'
import {Router} from '../../../../routes'
import {media} from '../../../../helpers/media'
import {Avatar} from '../../../../ui/avatar'

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  
  ${media.mobile`
    width: 60px;
    height: 60px;
  `}
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 24px;
  height: 24px;
  background-color: ${p => getColor(p.color, p.theme)};
  border-radius: 20px;
  right: -4px;
  top: -4px;
`

const FavoriteWrapper = styled(Wrapper)`
  ${p => p.pointer && `
    cursor: pointer;
  `}
`

export const FavoriteShortCard = ({pointer, isDoctor, img, isFavorite, title, description, link}) => {
  return (
    <FavoriteWrapper pointer={pointer} gap={'6px'} flow={'column'} align={'center'} justify={'center'} shrink={'0'} onClick={()=>Router.pushRoute(link)}>
      <ImageWrapper>
        <Avatar
          src={img && img}
          width={'80px'}
          height={'80px'}
          minHeight={'80px'}
          borderRadius={isDoctor ? '50%' : '16px'}
          fromList
        />
        <IconWrapper color={isFavorite ? 'starred' : 'transparent'}>
          <Icon height={16} width={16} type={'star'} color={isFavorite ? 'white' : 'starred'}/>
        </IconWrapper>
      </ImageWrapper>
      <Wrapper flow={'column'}>
        <Text align={'center'}>{title}</Text>
        <Text align={'center'} color={'black50'}>{description}</Text>
      </Wrapper>
    </FavoriteWrapper>
  )
}