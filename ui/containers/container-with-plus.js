import React from 'react'
import styled from 'styled-components'
import {Icon} from '../icon'
import {Text} from '../text'
import {Well} from '../well'
import {media} from '../../helpers/media'

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 88px;
  cursor: pointer;
  
  ${media.mobile`
    text-align: left;
  `}
`


export const ContainerWithPlus = ({onClick, title}) => {
  return (
    <Well padding={'16px'} color={'white'} onClick={onClick}>
      <ContentBox>
        <Icon type={'circle_plus'} color={'primary'} width={20} height={20}/>
        <Text size={'20px'} lineHeight={'24px'}>{title}</Text>
      </ContentBox>
    </Well>
  )
}