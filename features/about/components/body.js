import React from 'react'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {AboutBlock} from './about-block'

export const AboutBody = () => {
  return (
    <Well color={'transparent'}>
      <Container>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 6, paddingBottom: '6px'}}>
            <AboutBlock
              bgColor={'white'}
              route={'/about/rating'}
              img={'/static/icons/about_rating.svg'}
              title={'about.block.rating'}
              color={'black05'}
            />
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 6, paddingBottom: '6px'}}>
            <AboutBlock
              bgColor={'white'}
              route={'/about/payment-and-refund'}
              img={'/static/icons/about_pay.svg'}
              title={'about.block.pay'}
              color={'black05'}
            />
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 6}}>
            <AboutBlock
              bgColor={'white'}
              route={'about/documents'}
              img={'/static/icons/about_doc.svg'}
              title={'about.block.doc'}
              color={'black05'}
            />
          </Col>
        </Row>
      </Container>
    </Well>
  )
}