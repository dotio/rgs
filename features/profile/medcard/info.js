import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container} from '../../../ui/grid/container'
import {Well} from '../../../ui/well'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {TitleText} from '../../../ui/title-text'
import {Link} from '../../../routes'
import {CardWithIcon} from './components/card-with-icon'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import {getTranslator} from '../../../utils/translation'

const StyledWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-wrap: nowrap;
    overflow-x: auto;
  `}
`

const CardWrapper = styled(Wrapper)`
  width: 171px;
  height: 120px;
  ${media.mobile`
    width: 146px;
    height: 120px;
  `}
`

export const MedcardInfo = ({medcardId}) => {
  const dispatch = useDispatch()
  const filledPercent = useSelector((state) => state.profileMedcard.status.filledPercent)
  const addToMedcard = () => dispatch.modal.addAndShowModal({type: 'add-to-medcard', data: {medcardId}})
  const translator = useSelector(state => getTranslator(state.localization))

  return <Well color={'transparent'}>
    <Container>
      <Wrapper flow={'column'}>
        <TitleText padding={'0 0 16px'}>{translator('profile.medcard.info.title', true)}</TitleText>
        <StyledWrapper gap={'12px'}>
          <CardWrapper>
            <Link route={`/profile/${medcardId}/medcard/anamnesis`} passHref>
              <CardWithIcon
                icon={'info'}
                iconColor={'primary'}
                bgColor={'white'}
                labelComponent={
                  <Text width={'120px'}>{translator('profile.medcard.info.subtitle', true)}</Text>
                }
                rightLabel={`${filledPercent}%`}
              />
            </Link>
          </CardWrapper>
          <CardWrapper>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'secondary'}
              bgColor={'transparent'}
              label={translator('profile.medcard.info.add-to', true)}
              border={'black20'}
              onClick={addToMedcard}
            />
          </CardWrapper>
        </StyledWrapper>
      </Wrapper>
    </Container>
  </Well>
}