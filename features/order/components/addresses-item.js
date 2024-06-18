import React from 'react'
import styled, {css} from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {Icon} from '../../../ui/icon'

const MedcardBox = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
  height: 60px;
  
  ${p => p.bordered && css`
    &:not(:last-child){
      border-top: 1px solid ${getColor('black10', p.theme)};
    }
  `}
`

const IconWrapper = styled(Wrapper)`
  border-radius: 50%;
  background: ${p => getColor(p.color, p.theme)};
  height: 36px;
  flex-shrink: 0;
`

const ContentContainer = styled.div`
  padding-left: 8px;
  width: 100%;
`

export const AddressesItem = ({id, title, street, onClick}) => {
  return (
    <MedcardBox padding={'16px'} onClick={() => onClick ? onClick(id) : {}} bordered={onClick}>
      <Wrapper align={'center'}>
        <IconWrapper align={'center'} justify={'center'} width={'36px'} color={title === 'Дом' ? 'secondary' : title === 'Работа' ? 'secondary' : 'primary'}>
          <Icon color={'white'} width={24} height={24} shrink={'0'} type={title === 'Дом' ? 'home_simple' : title === 'Работа' ? 'work' : 'location_settings_addresses'}/>
        </IconWrapper>
        <ContentContainer>
          <Text breakWord size={'16px'} lineHeight={'24px'} >
            {title}
          </Text>
          <Text ellipsis padding={'0 60px 0 0'} size={'16px'} lineHeight={'24px'} color={'black50'}>
            {street}
          </Text>
        </ContentContainer>
      </Wrapper>
    </MedcardBox>
  )
}