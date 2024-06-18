import React from 'react'
import styled from 'styled-components'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Text} from '../../../../ui/text'
import {useSelector} from 'react-redux'
import {TitleText} from '../../../../ui/title-text'
import {media} from '../../../../helpers/media'
import {getColor} from '../../../../ui/helpers/getColor'
import {T} from '../../../../utils/translation'

const StyledContainer = styled(Container)`
  background: ${p => getColor('white', p.theme)};
`

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

export const ExaminationResultComponent = () => {
  const {symptoms, currentAnamnesis, organ} = useSelector(state => state.profileMedcard.currentOrder.examinationResults)

  return (
    <StyledContainer>
      <TitleText padding={'0 0 16px'}><T ucFirst>profile.medcard.order-examination.title</T></TitleText>
      {symptoms &&
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <StyledText size={'20px'} lineHeight={'30px'} color={'black50'}><T ucFirst>profile.medcard.order-examination.complaints</T></StyledText>
          </Col>
          <Col lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
            <StyledText size={'20px'} lineHeight={'30px'} color={'black'} width={'auto'}>{symptoms}</StyledText>
          </Col>
        </Row>
      }
      {currentAnamnesis &&
        <Row>
          <Col lg={{cols: 4, paddingBottom: '24px'}} sm={{cols: 12, paddingBottom: '0'}}>
            <StyledText size={'20px'} lineHeight={'30px'} color={'black50'}><T ucFirst>profile.medcard.order-examination.anamnesis</T></StyledText>
          </Col>
          <Col lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
            <StyledText size={'20px'} lineHeight={'30px'} color={'black'} width={'auto'}>{currentAnamnesis}</StyledText>
          </Col>
        </Row>
      }
      {organ &&
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <StyledText size={'20px'} lineHeight={'30px'} color={'black50'}>{organ.name}</StyledText>
          </Col>
          <Col lg={{cols: 8}} sm={{cols: 12}}>
            <StyledText size={'20px'} lineHeight={'30px'} color={'black'} width={'auto'}>{organ.comment}</StyledText>
          </Col>
        </Row>
      }
    </StyledContainer>
  )
}
