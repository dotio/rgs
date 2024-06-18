import styled, {css} from 'styled-components'
import {media} from '../helpers/media'
import {useDispatch} from 'react-redux'
import {getColor, getElementColor} from './helpers/getColor'
import React from 'react'
import {Link} from '../routes'
import {Avatar} from './avatar'

const InfoContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 4px;
  
  ${p => p.withBorder && css`
    &::after {
      content: '';
      position: absolute;
      top: -16px;
      width: 100%;
      height: 1px;
      background-color: ${(p) => getElementColor('stroke', p.theme)};
    }
  `}
  
  ${media.mobile`
    padding-top: 4px;
  `}
`

const ListItemContainer = styled.div`
  cursor: ${p => p.as === 'a' ? 'pointer' : 'auto'};
  display: flex;
  padding: 16px;
  border-radius: 20px;
  flex-shrink: 0;
  width: 100%;
  cursor: pointer;
  
  ${p => p.clusterMobStyle && css`
    ${media.mobile`
      width: calc(100vw - 46px);
      padding: 0 16px 0 0;
      &:last-child {
        width: calc(100vw - 16px);
      }
    `}
  `}

  &:first-child {
    ${InfoContainer}::after {
      height: 0;
    }
  }
  
  ${p => p.as === 'a' && !p.withoutHover && css`
    &:hover {
      background: ${(p) => getColor('black05', p.theme)};
      
      ${InfoContainer}::after {
        height: 0;
      }
    }
    
    &:hover + & {
      ${InfoContainer}::after {
        height: 0;
      }
    }
  `}
`

const ListImgContainer = styled.div`
  position: relative;
  margin-right: 16px;
`

export const ListItem = ({
  src,
  imgIcon,
  href,
  withBottomPadding,
  withBorder,
  withoutHover,
  smPadding,
  children,
  clusterMobStyle,
  borderRadius,
  ...props
}) => {
  const dispatch = useDispatch()
  const isLink = !!href
  const clearForMap = () => {
    dispatch.doctors.setForMap(false)
    dispatch.clinics.setForMap(false)
  }
  const Item = (
    <ListItemContainer onClick={clearForMap} smPadding={smPadding} withBottomPadding={withBottomPadding} as={isLink ? 'a' : 'div'} {...props} withoutHover={withoutHover} clusterMobStyle={clusterMobStyle}>
      <ListImgContainer>
        {src && <Avatar src={src} fromList borderRadius={borderRadius}/>}
        {imgIcon}
      </ListImgContainer>
      <InfoContainer withoutHover={withoutHover} isLink={isLink} withBorder={withBorder}>
        {children}
      </InfoContainer>
    </ListItemContainer>
  )
  if (isLink) {
    return (
      <Link route={href} passHref>{Item}</Link>
    )
  }
  return Item
}

ListItem.defaultProps = {
  withoutHover: false,
  withBottomPadding: true,
}