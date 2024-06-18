import React from 'react'
import {Avatar} from '../../../../ui/avatar'
import {Wrapper} from '../../../../ui/wrapper'
import {Text} from '../../../../ui/text'
import styled, {css} from 'styled-components'
import {getColor} from '../../../../ui/helpers/getColor'
import {media} from '../../../../helpers/media'
import {Icon} from '../../../../ui/icon'
import {getTheme} from '../chat-bubble'
import {T} from '../../../../utils/translation'

const ButtonWrapper = styled(Wrapper)`
  border-radius: 100px;
  background-color: ${p => getColor(p.bgColor, p.theme)};
  transition: background-color 0.3s linear;
  cursor: pointer;
`

const StyledMedcard = styled(Wrapper)`
  border-radius: 16px;
  background-color: ${p => getColor(p.bgColor, p.theme)};
  cursor: pointer;
  border: 1px solid ${p => getColor(p.borderColor, p.theme)};
  width: 232px;
  min-height: 176px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.3s linear;
  &:hover{
    background-color: ${p => getColor('black10', p.theme)};
    
    ${p => p.darkHover && 'background-color: rgba(255, 255, 255, 0.1);'}
    
    ${p => !p.active && css`
      ${ButtonWrapper} {
        background-color: ${p => getColor('black15', p.theme)};
      }
    `}   
  }
  ${p => p.chatIsSmall && css`
    width: 169px;
  `}
  
  ${media.mobile`
    width: 169px;
  `}
`

export const MedcardItem = ({chatIsSmall, name, surname, avatar, relationship, id, active, theme, setSelectedMedcard}) => {
  const {textColor, backgroundColor, borderColor} = getTheme(theme)

  return (
    <StyledMedcard
      flow={'column'}
      gap={'12px'}
      align={'flex-start'}
      padding={'16px'}
      active={active}
      key={id}
      bgColor={backgroundColor}
      borderColor={borderColor}
      darkHover={theme === 'widget'}
      chatIsSmall={chatIsSmall}
    >
      <Wrapper flow={'column'}>
        <Avatar
          src={avatar}
          borderRadius={'50%'}
          text={name && name[0]}
          size={'36px'}
          bgColor={'secondary'}
          color={'white'}
        />
        <Wrapper flow={'column'} padding={'12px 0 0'}>
          <Text color={textColor} size={chatIsSmall ? '16px' : '20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
            {name.length > 16 ? name.substring(0, 15) + '...' : name} {surname.length > 16 ? surname.substring(0, 15) + '...' : surname}
          </Text>
          <Text color={'black50'} size={chatIsSmall ? '16px' : '20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
            {!relationship || relationship.toUpperCase() === 'Я'? <T ucFirst>chat.message-choose-medcard.my-medcard</T> : relationship}
          </Text>
        </Wrapper>
      </Wrapper>
      <ButtonWrapper
        width={'auto'}
        padding={'5px 11px'}
        bgColor={active ? 'green' : 'black05'}
        onClick={() => setSelectedMedcard(id)}
        align={'center'}
        gap={'6px'}
      >
        {active && (
          <Icon
            shrink={'0'}
            type={'check'}
            color={'white'}
            height={16}
            width={16}
          />
        )}
        <Text
          width={'auto'}
          color={active ? 'white' : 'black'}
        >
          {active ? 'Выбрано' : 'Выбрать'}
        </Text>
      </ButtonWrapper>
    </StyledMedcard>
  )
}

MedcardItem.defaultProps = {
  theme: 'blue',
}