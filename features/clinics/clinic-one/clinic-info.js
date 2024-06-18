import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from '../../../ui/button'
import {Icon} from '../../../ui/icon'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Gap} from '../../../ui/gap'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {useSelector, useDispatch} from 'react-redux'
import {Well} from '../../../ui/well'
import {Divider} from '../../../ui/divider'
import {Accordion} from '../../../ui/accordion'
import {TextShow} from '../../../ui/text-show'
import {getTranslator} from '../../../utils/translation'
import {MediumText} from '../../../ui/medium-text'
import {DataRow} from '../../../ui/data-row'

const StyledButton = styled(Button)`
    margin-bottom: 8px;
    margin-right: 8px;
  
  &:last-child{
    margin-right: 0;
  }
`

export const ClinicOneInfo = ({goToOther}) => {
  const clinicInfo = useSelector((state) => state.clinics.currentClinic)
  const dispatch = useDispatch()
  const [showSchedule, setShowSchedule] = useState(false)
  const [showPriceCategory, setShowPrice] = useState(false)
  const translator = useSelector(state => getTranslator(state.localization))

  const {
    //name,
    address,
    metro,
    schedule,
    receptionMethods,
    priceCategory,
    phones,
    www,
    description,
    //otherFields,
    averageCost,
    medicalDirectionsList,
    medicalDirectionsListAdd,
    licenses,
  } = clinicInfo

  const prices = priceCategory ? [...new Array(Math.max(priceCategory.id, 4)).keys()] : []

  return (
    <Well>
      {/*TODO не реализованно на бэке*/}
      {/*<Container>*/}
      {/*  <Row>*/}
      {/*    <Col lg={{cols: 4}} sm={{cols: 12}}>*/}
      {/*      <MediumText color={'black50'}>*/}
      {/*        {translator('clinic.info.network.title', true)}*/}
      {/*      </MediumText>*/}
      {/*    </Col>*/}
      {/*    <Col lg={{cols: 8}} sm={{cols: 12}}>*/}
      {/*      <MediumText padding={'0 0 10px'}>*/}
      {/*        {name}*/}
      {/*      </MediumText>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</Container>*/}
      {/*<Divider margin={'30px 0 24px'} smMargin={'24px 0'}/>*/}
      <Container>
        <Gap direction={'top'} gap={'24px'}>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <MediumText color={'black50'}>
                {translator('clinic.info.address.title', true)}
              </MediumText>
            </Col>
            <Col lg={{cols: 8}} sm={{cols: 12}}>
              {address && <MediumText>
                {address}
              </MediumText>}
              {metro && metro.map(item => <MediumText key={item.id} color={item.color}>
                {`м. ${item.name}`}
              </MediumText>)}
              <Wrapper padding={'8px 0 0'}>
                <Button color={'black05'} onClick={() => dispatch.modal.addAndShowModal({
                  type: 'clinic-modal',
                  goToOtherMap: goToOther
                })}>
                  <Text>{translator('clinic.info.modal.button', true)}</Text>
                </Button>
              </Wrapper>
            </Col>
          </Row>
          {schedule && (
            <Row>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <MediumText color={'black50'}>
                  {translator('clinic.info.schedule.title', true)}
                </MediumText>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                <Wrapper justify={'flex-start'} align={'center'}>
                  <MediumText width={'auto'} padding={'0 6px 0 0'}>
                    {schedule.title}
                  </MediumText>
                  <Icon
                    width={20}
                    height={20}
                    shrink={'0'}
                    cursor={'pointer'}
                    onClick={() => setShowSchedule(!showSchedule)}
                    type={'info'}
                    color={showSchedule ? 'black' : 'black40'}
                  />
                </Wrapper>
                {showSchedule && (
                  <Wrapper flow={'column'} align={'flex-start'} padding={'8px 0 0 0'}>
                    {schedule.ranges.map(({title, timeRange}, index) => (
                      <MediumText width={'auto'} key={index}>
                        {`${title}: ${timeRange}`}
                      </MediumText>
                    ))}
                  </Wrapper>
                )}
              </Col>
            </Row>
          )}
          {receptionMethods && (
            <Row>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <MediumText color={'black50'}>
                  {translator('clinic.info.reception.title', true)}
                </MediumText>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                {receptionMethods.map(method => <MediumText key={method.id}>
                  {method.title}
                </MediumText>)}
              </Col>
            </Row>
          )}
          {priceCategory && (
            <Row>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <MediumText color={'black50'}>
                  {translator('clinic.info.price.title', true)}
                </MediumText>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                <Wrapper justify={'flex-start'} align={'center'}>
                  <Wrapper justify={'flex-start'} align={'center'}>
                    {prices.map((item, index) => {
                      const isColored = priceCategory.id - index  > 0
                      return (
                        <MediumText key={index} color={isColored ? 'black' : 'black50'} width={'auto'}>₽</MediumText>
                      )
                    })}
                    <MediumText width={'auto'} padding={'0 6px'}>
                      {priceCategory.name}
                    </MediumText>
                    {averageCost && <Icon
                      width={20}
                      height={20}
                      shrink={'0'}
                      cursor={'pointer'}
                      onClick={() => setShowPrice(!showPriceCategory)}
                      type={'info'}
                      color={showPriceCategory ? 'black' : 'black40'}
                    />}
                  </Wrapper>
                </Wrapper>
                {showPriceCategory && averageCost &&(
                  <MediumText padding={'10px 0'}>
                    {averageCost}
                  </MediumText>
                )}
              </Col>
            </Row>
          )}
          {phones && phones.map((phone, index) => {
            if(!phone.value) {
              return null
            }

            return <Row key={'phone-' + index}>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <MediumText color={'black50'}>
                  {phone.title}
                </MediumText>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                <MediumText key={index}>
                  {phone.value}
                </MediumText>
              </Col>
            </Row>
          })}
          {www && (
            <Row>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <MediumText color={'black50'}>
                  {translator('clinic.info.website.title', true)}
                </MediumText>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                <MediumText>
                  {www}
                </MediumText>
              </Col>
            </Row>
          )}
        </Gap>
      </Container>
      <Divider margin={'24px 0'} />
      <Container>
        {description && <TextShow text={description.slice(5,-6)} length={250}/>}
        {medicalDirectionsList && <Wrapper>
          {medicalDirectionsList.length >= 1 && <Wrapper padding={'34px 0 0'} mobilePadding={'36px 0 0'}>
            <Accordion title={translator('clinic.info.specializations.title', true)}>
              <MediumText padding={'6px 0 12px'}>Приоритетные</MediumText>
              <Wrapper flexWrap>
                {medicalDirectionsList.map(({id, title}) => (
                  <StyledButton key={id} color={'black05'}>{title}</StyledButton>
                ))}
              </Wrapper>
              <MediumText padding={'16px 0 12px'}>Остальные</MediumText>
              <Wrapper flexWrap>
                {medicalDirectionsListAdd && medicalDirectionsListAdd.map(({id, title}) => (
                  <StyledButton key={id} color={'black05'}>{title}</StyledButton>
                ))}
              </Wrapper>
            </Accordion>
          </Wrapper>}
        </Wrapper>}
        {licenses && licenses.length > 0 && <Wrapper padding={'26px 0 0'} mobilePadding={'20px 0 0'}>
          <Accordion title={translator('clinic.info.licenses.title', true)}>
            {licenses.map(({number, description}, index) => (
              <DataRow label={number} key={'license-' + index}>
                <MediumText padding={licenses.length - 1 === index ? '0' : '0 0 24px'} width={'auto'}>{description}</MediumText>
              </DataRow>
            ))}
          </Accordion>
        </Wrapper>}
        {/*{otherFields && otherFields.length >= 1 && <Wrapper padding={'24px 0 0'}>*/}
        {/*  <Wrapper gap={'12px'}>*/}
        {/*    {otherFields.slice(0, 5).map(({title}, index) => (*/}
        {/*      <Wrapper width={'110px'} key={index} >*/}
        {/*        <Text align={'center'}>{title}</Text>*/}
        {/*      </Wrapper>*/}
        {/*    ))}*/}
        {/*  </Wrapper>*/}
        {/*</Wrapper>}*/}
      </Container>
    </Well>
  )
}