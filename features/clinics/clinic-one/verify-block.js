import React from 'react'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {MediumText} from '../../../ui/medium-text'
import {Wrapper} from '../../../ui/wrapper'
import {Icon} from '../../../ui/icon'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {media} from '../../../helpers/media'


const StyledMediumText = styled(MediumText)`
  min-width: 232px;
  
  ${media.mobile`
    min-width: 100%;
    width: 100%;
  `}
`

// const StyledButton = styled(Button)`
//   width: 112px;
// `

const StyledWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-direction: column;
  `}
`

export const VerifyBlock = () => {

  const {verified} = useSelector((state) => state.clinics.currentClinic)

  return (
    verified && <Well color={'transparent'}>
      <Container>
        <StyledWrapper gap={'12px'} mobileGap={'0'}>
          <StyledMediumText color={'primary'} width={'232px'}>Клиника следит за актуальностью информации</StyledMediumText>
          <Wrapper width={'auto'} flow={'column'} gap={'8px'}>
            <MediumText>
              Клиника подтвердила аккаунт и следит за актуальностью данных. Клиника не влияет на рейтинг или отзывы.
              &nbsp;<Icon type={'check'} width={16} height={16} color={'primary'}/>
            </MediumText>
            {/*<StyledButton color={'transparent'}>Подробнее</StyledButton>*/}
          </Wrapper>
        </StyledWrapper>
      </Container>
    </Well>
  )
}