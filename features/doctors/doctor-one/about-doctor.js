import React from 'react'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import {Accordion} from '../../../ui/accordion'
import {AdditionalInfo} from './components/additional-info'
import {useSelector} from 'react-redux'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {Divider} from '../../../ui/divider'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {T,getTranslator} from '../../../utils/translation'
import {TextShow} from '../../../ui/text-show'
import {TitleText} from '../../../ui/title-text'
import {MediumText} from '../../../ui/medium-text'
import {Wrapper} from '../../../ui/wrapper'

const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    padding-bottom: 16px;      
  `} 
`

const InfoRow = styled(Row)`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;  
  }
     
`

export const AboutDoctorFeature = () => {
  const doctor = useSelector(state => state.doctors.currentDoctor)
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <Well>
      <Container>
        <StyledTitleText padding={'0 0 24px'}><T ucFirst>doctor.about.title</T></StyledTitleText>
        {doctor.additionalInfo && doctor.additionalInfo.map((info, index) => {
          if(!info.value) {
            return null
          }
          return <InfoRow key={'info-' + index}>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <MediumText color={info.experienced ? 'primary' : 'black50'}><T ucFirst>{info.title}</T></MediumText>
            </Col>
            <Col lg={{cols: 8}} sm={{cols: 12}}>
              <MediumText>{info.value}</MediumText>
            </Col>
          </InfoRow>
        })}
      </Container>
      <Divider margin={'24px 0'}/>
      <Container>
        {doctor.description && <TextShow text={doctor.description.slice(5,-6)} length={250}/>}

        {/*<AccordionWrapper>*/}
        {/*<Accordion title={'Должности'}/>*/}
        {/*</AccordionWrapper>*/}

        {doctor.specializations && doctor.specializations.length > 0 && <Wrapper padding={'34px 0 0'} mobilePadding={'32px 0 0'}>
          <Accordion title={translator('doctor.about.accordion.specializations', true)}>
            {doctor.specializations.map((item, index) => <AdditionalInfo key={'specialization-' + index}  title={item.title} />)}
          </Accordion>
        </Wrapper>}

        {doctor.educations && doctor.educations.length > 0 && <Wrapper padding={'34px 0 0'} mobilePadding={'28px 0 0'}>
          <Accordion title={translator('doctor.about.accordion.education', true)}>
            {doctor.educations.map((item, index) => <AdditionalInfo  key={'education-' + index} {...item} date={item.dateRange} />)}
          </Accordion>
        </Wrapper>}

        {doctor.certificates && doctor.certificates.length > 0 && <Wrapper padding={'34px 0 0'} mobilePadding={'32px 0 0'}>
          <Accordion title={translator('doctor.about.accordion.certificates', true)}>
            {doctor.certificates.map((item, index) => <AdditionalInfo key={'certificate-' + index} date={item.year} title={`${item.title ? item.title : ''} ${item.university ? item.university : ''}`} />)}
          </Accordion>
        </Wrapper>}
      </Container>
    </Well>
  )
}