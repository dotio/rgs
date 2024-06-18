import React from 'react'
import {BackTemplate} from '../../../features/profile/back-template'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {DocBlock} from '../../../features/about/documents/doc-block'
import {Well} from '../../../ui/well'

const Documents = () => {
  return (
    <BackTemplate
      title={'Документы'}
      parent={'О проекте'}
      backUrl={'/about'}
      parentLink={'/about'}
    >
      <Well padding={'8px 0 0'} mobilePadding={'8px 0 0'} color={'transparent'}>
        <Container>
          <Row>
            <Col lg={{cols: 4, paddingBottom: '12px'}} sm={{cols: 6, paddingBottom: '6px'}}>
              <DocBlock
                bgColor={'white'}
                route={'documents/terms-of-use'}
                title={'documents.title.terms.of.use'}
                color={'black05'}
              />
            </Col>
            {/*<Col lg={{cols: 4, paddingBottom: '12px'}} sm={{cols: 6, paddingBottom: '6px'}}>*/}
            {/*<DocBlock*/}
            {/*bgColor={'white'}*/}
            {/*route={'/'}*/}
            {/*title={'documents.title.personal.data'}*/}
            {/*color={'black05'}*/}
            {/*/>*/}
            {/*</Col>*/}
            <Col lg={{cols: 4, paddingBottom: '12px'}} sm={{cols: 6, paddingBottom: '6px'}}>
              <DocBlock
                bgColor={'white'}
                route={'documents/personal-data'}
                title={'documents.title.confidentiality'}
                color={'black05'}
              />
            </Col>
            <Col lg={{cols: 4, paddingBottom: '12px'}} sm={{cols: 6, paddingBottom: '6px'}}>
              <DocBlock
                bgColor={'white'}
                route={'documents/offer'}
                title={'documents.title.service.offer'}
                color={'black05'}
              />
            </Col>
            {/*<Col lg={{cols: 4}} sm={{cols: 6, paddingBottom: '6px'}}>*/}
            {/*<DocBlock*/}
            {/*bgColor={'white'}*/}
            {/*route={'/'}*/}
            {/*title={'documents.title.medical.interventions'}*/}
            {/*color={'black05'}*/}
            {/*/>*/}
            {/*</Col>*/}
            {/*<Col lg={{cols: 4}} sm={{cols: 6}}>*/}
            {/*<DocBlock*/}
            {/*bgColor={'white'}*/}
            {/*route={'/'}*/}
            {/*title={'documents.title.service.offer'}*/}
            {/*color={'black05'}*/}
            {/*/>*/}
            {/*</Col>*/}
            {/*<Col lg={{cols: 4}} sm={{cols: 6}}>*/}
            {/*<DocBlock*/}
            {/*bgColor={'white'}*/}
            {/*route={'/documents'}*/}
            {/*title={'documents.title.medicine.offer'}*/}
            {/*color={'black05'}*/}
            {/*/>*/}
            {/*</Col>*/}
          </Row>
        </Container>
      </Well>
    </BackTemplate>
  )
}

export default Documents