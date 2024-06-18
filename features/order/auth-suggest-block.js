import React from 'react'
import styled from 'styled-components'
import {Text} from '../../ui/text'
import {Well} from '../../ui/well'
import {Container} from '../../ui/grid/container'
import {media} from '../../helpers/media'
import {StyledButton} from '../profile/components/logout-modal'
import {useRouter} from 'next/dist/client/router'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../utils/translation'

const StyledContainer = styled(Container)`
  display: flex;
`

const TextContainer = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  margin-right: 184px;
  
  ${media.mobile`
    margin-right: 36px;
  `}
`

const StyledText = styled(Text)`
  font-size: 16px;
  line-height: 24px;

  ${media.mobile`
    font-size: 14px;
    line-height: 20px;
  `}
`

const CustomButton = styled(StyledButton)`
  font-size: 16px;
  height: 36px;
  line-height: 24px;
  padding: 6px 12px;
`

export const AuthSuggestBlock = () => {
  const router = useRouter()
  const translator = useSelector(state => getTranslator(state.localization))

  const {doctorId} = router.query

  const showAuthPage = () => {
    router.push(`/login?backUrl=/order/doctor/${doctorId}`)
  }

  return (
    <Well padding={'20px'}>
      <StyledContainer>
        <TextContainer>
          <StyledText>{translator('order.doctor.auth_suggest.title', true)}</StyledText>
          <StyledText color={'black50'}>{translator('order.doctor.auth_suggest.text', true)}</StyledText>
        </TextContainer>
        <CustomButton color={'green'} onClick={showAuthPage}>{translator('order.doctor.auth_suggest.button', true)}</CustomButton>
      </StyledContainer>
    </Well>
  )
}