import React from 'react'
import styled from 'styled-components'
import {media} from '../../../../helpers/media'
import {getColor} from '../../../../ui/helpers/getColor'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {MediumText} from '../../../../ui/medium-text'

const DateText = styled.div`
  flex-basis: 110px;
  flex-shrink: 0;
  
  margin-right: 12px;
  font-size: 20px;
  line-height: 30px;
  color: ${p => getColor('black50', p.theme)};
  
  & .highlighted {
    color: ${p => getColor('green', p.theme)};
  }
  
  ${media.mobile`
    flex-basis: auto;
    flex-shrink: auto;      
  
    flex-basis: 65px;  
    font-size: 16px;
    line-height: 24px;    
  `}
`

const Description = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${p => getColor('black50', p.theme)};
  
  ${media.mobile`
    font-size: 12px;
    line-height: 20px;    
  `}
`

export const AdditionalInfo = ({date, title, description}) => (
  <Row>
    <Col lg={{cols: 4}} sm={{cols: 4}}>
      <DateText>{date}</DateText>
    </Col>
    <Col lg={{cols: 8}} sm={{cols: 8}}>
      <MediumText>{title}</MediumText>
      {description && <Description>{description}</Description>}
    </Col>
  </Row>
)