import React from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../ui/wrapper'
import {AboutSlider} from '../../features/about/components/about-slider'
import {AboutBody} from '../../features/about/components/body'
import {FooterBody} from '../../features/about/components/footer'

const StyledWrapper = styled(Wrapper)`
  position: relative;
`

const About = ({medcardId}) => {
  return (
    <StyledWrapper flow={'column'} gap={'6px'}>
      <AboutSlider/>
      <AboutBody/>
      <FooterBody medcardId={medcardId}/>
    </StyledWrapper>
  )
}

About.getInitialProps = async ({reduxStore}) => {
  const currentMedcardId = Number(reduxStore.getState().user.mainMedcardId)
  reduxStore.dispatch.router.setPageTitle('О сервисе')
  await reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'feedback-types'})

  return {
    medcardId: currentMedcardId,
  }
}

export default About