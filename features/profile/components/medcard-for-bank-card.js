import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { media } from '../../../helpers/media'
import { getColor } from '../../../ui/helpers/getColor'
import { Text } from '../../../ui/text'
import { Wrapper } from '../../../ui/wrapper'
import { FormButton } from '../../../ui/buttons/form-button'
import { Avatar } from '../../../ui/avatar'

const MedcardBlock = styled(Wrapper)`
  width: 232px;
  height: 176px;
  background-color: ${(p) => p.linked ? getColor('white', p.theme) : getColor('black05', p.theme)};
  border: 1px solid ${p => p.linked ? getColor('black20', p.theme) : getColor('transparent', p.theme)};
  border-radius: 16px;
`

const StyledAvatar = styled(Avatar)`
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: bold;
  color: ${(p) => getColor('white', p.theme)};
  background-color: ${(p) => getColor('secondary', p.theme)};
`

const LinkCardButton = styled(FormButton)`
  margin-top: 12px;
  border: none;
  background-color: ${(p) => p.linked ? getColor('black05', p.theme) : getColor('white', p.theme)};

  ${p => !p.linked && `
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.05);
  `}
`

const StyledText = styled(Text)`
  color: ${(p) => p.linked ? getColor('black', p.theme) : getColor('black50', p.theme)};

  ${media.mobile`
    font-size: 16px;
  `}
`

export const MedcardForBankCard = ({name, relationship, photo, linked, onClick}) => {
  return (
    <MedcardBlock flow={'column'} justify={'space-between'} padding={'16px'} linked={linked}>
      <StyledAvatar borderRadius={'100px'} size={'36px'} shrink={'0'} src={photo} text={name[0]}/>
      <StyledText size={'20px'} linked={linked}>{name}</StyledText>
      <StyledText size={'20px'} color={'black50'}>{linked ? relationship : 'Отвязана'}</StyledText>
      <LinkCardButton linked={linked} onClick={onClick}>
        {linked ? 'Отвязать' : 'Привязать'}
      </LinkCardButton>
    </MedcardBlock>
  )
}

MedcardForBankCard.propTypes = {
  name: PropTypes.string,
  relationship: PropTypes.string,
  photo: PropTypes.string,
  linked: PropTypes.bool,
  onClick: PropTypes.func
}
