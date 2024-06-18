import React from 'react'
import styled from 'styled-components'
import {media} from '../../helpers/media'
import {getColor} from '../../ui/helpers/getColor'
import {Text} from '../../ui/text'

const SpecializationCardImg = styled.div`
  width: 140px;
  height: 160px;
  border-radius: 16px;
  background-image: ${p => p.image ? `url(${p.image})` : 'none'};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border: 1px solid ${p => getColor(p.borderColor, p.theme)};
  background-color: ${p => getColor(p.color ? p.color : 'black10', p.theme)}};
  ${media.mobile`
    width: 100px;
    height: 120px;
  `}
`
const SpecializationCardWrapper = styled.div`
  padding: 8px;
  border-radius: 20px;
  margin-right: 4px;
  cursor: pointer;
  
  ${media.mobile`
    padding: 0;
    margin-right: 12px;
    
    &:hover {
      background: none;
    }
  `}
  &:hover {
    background: ${p => getColor('black10', p.theme)};
    & > div {
        border: none;
      } 
  }
  &:hover div:first-child {
    transform: scale(1.01, 1.01)
  } 
  &:last-child {
    margin-right: 0;
  }
`

const SpecializationCardText = styled(Text)`
  ${(p) => media.mobile(`
    font-size: 12px;
    line-height: 16px;
    ${p.isAll && `
      color: ${getColor('black50', p.theme)};
    `}
  `)}
`

export const SpecializationCard = ({color, title, isAll, image, onClick, borderColor}) => {
  return (
    <SpecializationCardWrapper onClick={onClick}>
      <SpecializationCardImg color={color} image={image} isAll={isAll} borderColor={borderColor}/>
      <SpecializationCardText align={'center'} color={'black'} padding={'12px 0 0'} isAll={isAll}>{title}</SpecializationCardText>
    </SpecializationCardWrapper>
  )
}