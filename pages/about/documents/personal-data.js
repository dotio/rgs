import React from 'react'
import styled from 'styled-components'
import {BackTemplate} from '../../../features/profile/back-template'
import {Container} from '../../../ui/grid/container'
import {Well} from '../../../ui/well'
import {Text} from '../../../ui/text'
import {media} from '../../../helpers/media'
import {PersonalDataText} from '../../../features/about/documents/personal-data'

const PersonalDataTitle = styled(Text)`
  font-size: 48px;
  line-height: 64px;
  ${media.mobile`
    font-size: 36px;
    line-height: 48px;
  `}
`

const StyledWell = styled(Well)`
  position: absolute;
  top: 0;
  left: 0;
  
  ${p => media.mobile(`margin: ${p.mobileMargin};`)}
`

const PersonalData = () => {
  return <BackTemplate backUrl={'/about/documents'} withText={false}>
    <StyledWell mobilePadding={'20px 0 64px'} mobileMargin={'0 0 58px'}>
      <Container>
        <PersonalDataTitle padding={'0 0 48px'} width={'90%'} dangerouslySetInnerHTML = {{__html: 'Политика конфиденциальности'}} />
        <PersonalDataText />
      </Container>
    </StyledWell>
  </BackTemplate>
}

export default PersonalData