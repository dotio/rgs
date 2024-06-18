import React from 'react'
import {ModalTemplate} from '../../../../templates/modal'
import {Wrapper} from '../../../../ui/wrapper'
import styled from 'styled-components'
import {Container} from '../../../../ui/grid/container'
import {Text} from '../../../../ui/text'
import {Button} from '../../../../ui/button'
import {getColor} from '../../../../ui/helpers/getColor'
import {useDispatch, useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'
import {useRouter} from 'next/dist/client/router'

const TotalQualityWrapper = styled(Wrapper)`
  min-height: 562px;
  background: linear-gradient(159.4deg, #40B2C9 13.44%, #55DF94 85.6%);
  border-radius: 20px 20px 0px 0px;
`

const QualityWrapper = styled(Wrapper)`
  height: 100%;
`

const StyledButton = styled(Button)`
  color: ${p => getColor('primary', p.theme)};
  padding: 9px 16px;
`

export const TotalQualityModal = ({current}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {rating} = current.data
  const translator = useSelector(state => getTranslator(state.localization))
  const medcardId = useSelector(state => state.user.mainMedcardId)

  const closeModal = () => {
    dispatch.modal.deleteModal()
    router.push(`/profile/${medcardId}/medcard/orders`)
  }

  return (
    <ModalTemplate padding={'0'} mobilePadding={'0 !important'}>
      <TotalQualityWrapper padding={'24px 0'}>
        <Container>
          <QualityWrapper flow={'column'} justify={'space-between'}>
            <Wrapper flow={'column'}>
              <Text size={'28px'} lineHeight={'32px'} color={'white'}>
                {translator('profile.medcard.total-quality-modal.title', true)}
              </Text>
              <Text size={'48px'} lineHeight={'64px'} decoration={'underline'} color={'white'}>
                {parseFloat(rating)}
              </Text>
            </Wrapper>
            <Wrapper flow={'column'} gap={'24px'}>
              <Text color={'white'} size={'28px'} lineHeight={'32px'}>
                {translator('profile.medcard.total-quality-modal.info', true)}
              </Text>
              <Wrapper>
                <StyledButton
                  onClick={closeModal}
                  color={'white'}
                >
                  {translator('profile.medcard.total-quality-modal.button', true)}
                </StyledButton>
              </Wrapper>
            </Wrapper>
          </QualityWrapper>
        </Container>
      </TotalQualityWrapper>
    </ModalTemplate>
  )
}