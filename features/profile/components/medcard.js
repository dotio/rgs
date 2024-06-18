import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Router } from '../../../routes'
import { Wrapper } from '../../../ui/wrapper'
import { Gap } from '../../../ui/gap'
//import { Text } from '../../../ui/text'
import { getColor } from '../../../ui/helpers/getColor'
import { Button } from '../../../ui/button'
import { Avatar } from '../../../ui/avatar'
import {T} from '../../../utils/translation'
import {MediumText} from '../../../ui/medium-text'
import {media} from '../../../helpers/media'

const MedcardWrapper = styled(Wrapper)` 
  padding: 16px;
  border: 1px solid ${p => getColor('black10', p.theme)};
  border-radius: 16px;
`
const NameBox = styled.div`
  display: flex;
    ${media.mobile`
      flex-direction: column;
    }
  `}
`
const ButtonsBox = styled(Gap)`
  display: flex;
  padding-top: 12px;
`
// TODO скрыл предпреждение временно. Добавить isRegistered
export const Medcard = ({id, name, surname, hasAccess, relationship, photo, }) => (
  <MedcardWrapper padding={'16px'} justify={'space-between'}>
    <Wrapper flow={'column'} justify={'flex-start'} align={'flex-start'}>
      <NameBox>
        <MediumText width={'auto'} padding={'0 6px 0 0'}>{`${name} ${surname}`}</MediumText>
        <MediumText width={'auto'} color={'black50'}>{relationship}</MediumText>
      </NameBox>
      {/*{!hasAccess && !isRegistered &&*/}
      {/*  <Text padding={'4px 0 0'} color={'dangerousRed'}>*/}
      {/*    <T ucFirst>family.medcard.notification</T>*/}
      {/*  </Text>*/}
      {/*}*/}
      <ButtonsBox direction={'left'} gap={'8px'}>
        {hasAccess && <Button color={'black05'} onClick={() => Router.pushRoute(`/profile/family/${id}/medcard`)}><T ucFirst>profile.medcard.button.medcard</T></Button>}
        <Button color={'black05'} onClick={() => Router.pushRoute(`/profile/family/${id}/settings`)}>
          <T ucFirst>profile.medcard.button.settings</T>
        </Button>
      </ButtonsBox>
    </Wrapper>
    <Avatar src={photo} size={'36px'} bgColor={'secondary'} color={'white'} text={name && name[0]} />
  </MedcardWrapper>
)

Medcard.propTypes = {
  hasAccess: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  surname: PropTypes.string,
  phone: PropTypes.string,
  relationship: PropTypes.string
}