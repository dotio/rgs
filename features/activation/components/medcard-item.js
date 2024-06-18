import React from 'react'
import styled, {css} from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {Avatar} from '../../../ui/avatar'

const MedcardBox = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
  height: 60px;  
  ${(p) => p.selected && css`
    background-color: ${p.selected === true ? getColor('primary', p.theme) : getColor('white', p.theme)};
    border-radius: 30px;
  `}
  ${p => p.bordered && css`
    &:not(:last-child){
      border-top: 1px solid ${getColor('black10', p.theme)};
    }
  `}
     ${(p) => p.disabled && css`
    background-color: ${p.disabled === true && getColor('black10', p.theme)};
    border: 1px solid ${p.disabled === true && getColor('black10', p.theme)};
    border-radius: 30px;
    cursor: default;
  `}

  ${p => p.isDutyDoctor && css`
      border-top: 1px solid ${p.isDutyDoctor === true && getColor('black10', p.theme)};
  `}
`

const ContentContainer = styled.div`
  padding-left: 8px;
`

export const MedcardItem = ({isDutyDoctor, disabled, selected, id, name, surname, relationship, photo, onClick}) => {

  return (
    <MedcardBox selected={selected} disabled={disabled} isDutyDoctor={isDutyDoctor} padding={'16px'} onClick={() => onClick ? onClick(id) : {}} bordered={onClick}>
      <Wrapper align={'center'}>
        <Avatar
          borderRadius={'50%'}
          bgColor={'secondary'}
          color={'white'}
          size={'36px'}
          bold
          shrink={'0'}
          src={photo}
          text={name && name[0]}
        />
        <ContentContainer>
          <Text breakWord size={'16px'} lineHeight={'24px'} color={selected && selected === true ? 'white' : disabled && disabled === true ? 'black20' : 'black'}>
            {name} {surname}
          </Text>
          <Text breakWord  size={'16px'} lineHeight={'24px'} color={selected && selected === true ? 'white' : disabled && disabled === true ? 'black20' : 'black50'}>
            {relationship}
          </Text>
        </ContentContainer>
      </Wrapper>
    </MedcardBox>
  )
}