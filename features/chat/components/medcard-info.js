import React from 'react'
import styled from 'styled-components'
import {Avatar} from '../../../ui/avatar'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {media} from '../../../helpers/media'
import {T} from '../../../utils/translation'

const StyledMedcard = styled(Wrapper)`
  border-radius: 16px;
  background-color: ${(p) => getColor(p.bgColor, p.theme)};
  border: 1px solid ${(p) => getColor('black15', p.theme)};
  max-width: 232px;

  ${media.mobile`
    &:first-child {
      margin-bottom: 6px;
    }
  `}
`

export const MedcardInfo = ({name, surname, photo, relationship, id, textColor, bgColor, children}) => (
  <StyledMedcard
    flow={'column'}
    gap={'12px'}
    padding={'16px'}
    key={id}
    bgColor={bgColor}
  >
    <Avatar
      borderRadius={'50%'}
      text={name && name[0]}
      src={photo}
      size={'36px'}
      bgColor={'lightPurple'}
    />
    <Wrapper flow={'column'}>
      <Text size={'20px'} lineHeight={'24px'} color={textColor}>
        {name} {surname}
      </Text>
      <Text size={'20px'} lineHeight={'24px'} color={'black50'}>
        {!relationship || relationship.toUpperCase() === 'Я'? <T ucFirst>chat.message-choose-medcard.my-medcard</T> : relationship}
      </Text>
    </Wrapper>
    {children}
  </StyledMedcard>
)