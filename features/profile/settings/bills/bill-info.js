import React, {useMemo} from 'react'
import moment from 'moment'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
import {EditableDataRow} from '../../../../ui/editable-data-row'
import {Gap} from '../../../../ui/gap'
import {Wrapper} from '../../../../ui/wrapper'
import {Button} from '../../../../ui/button'
import {DataRow} from '../../../../ui/data-row'
import {Router} from '../../../../routes'
import {DataRowWithImage} from './data-row-with-image'
import {media} from '../../../../helpers/media'
import {useDispatch, useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'
import {MediumText} from '../../../../ui/medium-text'
import {getRandomIntInclusive} from '../../../../ui/helpers/getRandomIntInclusive'
import {Divider} from '../../../../ui/divider'

const Address = styled(Wrapper)`
  display: none;

  ${media.mobile`
    display: flex;
  `}
`

const Product = styled(MediumText)`
  &:not(:last-child){
    padding-bottom: 12px;
    ${media.mobile`
      padding: 0;
  `}
  }
`

const StyledDivider = styled(Divider)`
  position: absolute;
  left: 0;
`

const StyledWrapper = styled(Wrapper)`
    ${media.mobile`
      flex-direction: column;
  `}
`

const StyledMediumText = styled(MediumText)`
    ${media.mobile`
      text-align: left;
      padding-bottom: 24px;
  `}
`

export const BillInfo = ({bill}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [bill.id])

  const handleBuy = () => {
    dispatch.modal.addAndShowModal({type: 'bill-info-modal', billId: bill.id})
  }

  return (
    <Well>
      <Container>
        <TitleText padding={'0 0 24px'} mobilePadding={'0 0 20px'}>{bill.title}</TitleText>
        {bill.products && bill.products.length > 1 && <>
          <StyledDivider/>
          <Wrapper padding={'0 0 24px'}/>
        </>}

        <Gap gap={'24px'} >
          {bill.serviceType === 'cart' && bill.products && bill.products.map(product => <div key={product.id}>
            <DataRowWithImage
              isCart
              label={translator('settings.bill-info.clinic', true)}
              src={product.logo || `/static/mocks/clinic${memoizedRandom}.svg`}
              value={product.name}
              imageAlign={'flex-start'}
            />
            <Wrapper padding={'24px 0 12px'}>
              <DataRow label={'Услуги'} isCart>
                {product.items.map(item => <StyledWrapper key={product.id} justify={'space-between'}>
                  <Product>{item.name}</Product>
                  <StyledMediumText align={'right'} width={'171px'}>{item.quantity > 1 && item.quantity + 'x'} {`${item.price} ${translator('settings.bill-info.rubl', true)}`}</StyledMediumText>
                </StyledWrapper>)}
              </DataRow>
            </Wrapper>
            {bill.products && bill.products.length > 1 && <>
              <StyledDivider/>
              <Wrapper padding={'24px 0 0'}/>
            </>}
            {bill.payment && bill.payment.type === 'card' && <DataRowWithImage
              label={translator('settings.bill-info.pay', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon}
              value={bill.payment && bill.payment.title}
            />}
            {bill.payment && bill.payment.type === 'product' ? <DataRowWithImage
              label={translator('settings.bill-info.sum', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon || '/static/mocks/m_plus.svg'}
              value={bill.payment && bill.payment.title}
            /> :
              <DataRow label={translator('settings.bill-info.sum', true)}>
                <MediumText>{`${bill.sum} ${translator('settings.bill-info.rubl', true)}`}
                  {bill.status && <MediumText as={'span'} padding={'0 0 0 12px'} color={bill.status.name === 'not_paid' ? 'dangerousRed' : 'primary'}>{bill.status.title}</MediumText>}
                </MediumText>
              </DataRow>
            }
          </div>)}

          {bill.serviceType === 'telemed' && <>
            {bill.doctor &&<DataRowWithImage
              label={translator('settings.bill-info.doctor', true)}
              src={bill.doctor.photo ? bill.doctor.photo : '/static/doctor/male_doctor.svg'}
              borderRadius={'100px'}
              value={`${bill.doctor.surname} ${bill.doctor.name} ${bill.doctor.middlename}`}
            />}
            {bill.type && <DataRow label={translator('settings.bill-info.type', true)}>
              <MediumText>{bill.type}</MediumText>
            </DataRow>}
            {bill.date && <EditableDataRow
              label={'Дата и время консультации'}
              value={moment(bill.date).format('DD MMMM, HH:mm')}
            />}
            {bill.client && <DataRow label={translator('settings.bill-info.client', true)}>
              <MediumText>{`${bill.client.surname} ${bill.client.name} ${bill.client.middlename ? bill.client.middlename : ''}`}</MediumText>
            </DataRow>}

            {bill.payment && bill.payment.type === 'card' && <DataRowWithImage
              label={translator('settings.bill-info.pay', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon}
              value={bill.payment && bill.payment.title}
            />}
            {bill.payment && bill.payment.type === 'product' ? <DataRowWithImage
              label={translator('settings.bill-info.sum', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon || '/static/mocks/m_plus.svg'}
              value={bill.payment && bill.payment.title}
            /> :
              <DataRow label={translator('settings.bill-info.sum', true)}>
                <MediumText>{`${bill.sum} ${translator('settings.bill-info.rubl', true)}`}
                  {bill.status && <MediumText as={'span'} padding={'0 0 0 12px'} color={bill.status.name === 'not_paid' ? 'dangerousRed' : 'primary'}>{bill.status.title}</MediumText>}
                </MediumText>
              </DataRow>
            }
          </>}

          {bill.serviceType === 'home' &&  <>
            {bill.doctor &&<DataRowWithImage
              label={translator('settings.bill-info.doctor', true)}
              src={bill.doctor.photo ? bill.doctor.photo : '/static/doctor/male_doctor.svg'}
              borderRadius={'100px'}
              value={`${bill.doctor.surname} ${bill.doctor.name} ${bill.doctor.middlename}`}
            />}
            {bill.type && <DataRow label={translator('settings.bill-info.type', true)}>
              <MediumText>{bill.type}</MediumText>
            </DataRow>}
            {bill.date && <EditableDataRow
              label={'Дата и время визита'}
              value={moment(bill.date).format('DD MMMM, HH:mm')}
            />}
            {bill.address && <EditableDataRow
              label={'Адрес'}
              value={`${bill.address.country && bill.address.country}, ${bill.address.city && bill.address.city}, ${bill.address.address && bill.address.address}`}
            />}
            {bill.sickList && <EditableDataRow
              label={'Больничный'}
              value={bill.sickList ? 'Нужен' : 'Не нужен'}
            />}
            {bill.client && <DataRow label={translator('settings.bill-info.client', true)}>
              <MediumText>{`${bill.client.surname} ${bill.client.name} ${bill.client.middlename ? bill.client.middlename : ''}`}</MediumText>
            </DataRow>}

            {bill.payment && bill.payment.type === 'card' && <DataRowWithImage
              label={translator('settings.bill-info.pay', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon}
              value={bill.payment && bill.payment.title}
            />}
            {bill.payment && bill.payment.type === 'product' ? <DataRowWithImage
              label={translator('settings.bill-info.sum', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon || '/static/mocks/m_plus.svg'}
              value={bill.payment && bill.payment.title}
            /> :
              <DataRow label={translator('settings.bill-info.sum', true)}>
                <MediumText>{`${bill.sum} ${translator('settings.bill-info.rubl', true)}`}
                  {bill.status && <MediumText as={'span'} padding={'0 0 0 12px'} color={bill.status.name === 'not_paid' ? 'dangerousRed' : 'primary'}>{bill.status.title}</MediumText>}
                </MediumText>
              </DataRow>
            }
          </>}

          {bill.serviceType === 'pack' &&  <>
            {bill.type && <DataRow label={translator('settings.bill-info.type', true)}>
              <MediumText>{bill.type}</MediumText>
            </DataRow>}
            {bill.date && <EditableDataRow
              label={'Дата и время консультации'}
              value={moment(bill.date).format('DD MMMM, HH:mm')}
            />}
            {bill.client && <DataRow label={translator('settings.bill-info.client', true)}>
              <MediumText>{`${bill.client.surname} ${bill.client.name} ${bill.client.middlename ? bill.client.middlename : ''}`}</MediumText>
            </DataRow>}

            {bill.payment && bill.payment.type === 'card' && <DataRowWithImage
              label={translator('settings.bill-info.pay', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon}
              value={bill.payment && bill.payment.title}
            />}
            {bill.payment && bill.payment.type === 'product' ? <DataRowWithImage
              label={translator('settings.bill-info.sum', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon || '/static/mocks/m_plus.svg'}
              value={bill.payment && bill.payment.title}
            /> :
              <DataRow label={translator('settings.bill-info.sum', true)}>
                <MediumText>{`${bill.sum} ${translator('settings.bill-info.rubl', true)}`}
                  {bill.status && <MediumText as={'span'} padding={'0 0 0 12px'} color={bill.status.name === 'not_paid' ? 'dangerousRed' : 'primary'}>{bill.status.title}</MediumText>}
                </MediumText>
              </DataRow>
            }
          </>}

          {bill.serviceType === 'booking' && <>
            {bill.doctor && <DataRowWithImage
              imageAlign={'flex-start'}
              label={translator('settings.bill-info.doctor', true)}
              src={bill.doctor.photo ? bill.doctor.photo : '/static/doctor/male_doctor.svg'}
              borderRadius={'50%'}
              value={`${bill.doctor.surname} ${bill.doctor.name} ${bill.doctor.middlename}`}
            />}
            {bill.clinic && <DataRowWithImage
              label={translator('settings.bill-info.clinic', true)}
              src={bill.clinic.logo || `/static/mocks/clinic${memoizedRandom}.svg`}
              value={bill.clinic.name}
              imageAlign={'flex-start'}
            >
              <Address justify={'flex-start'} flexWrap flow={'column'}>
                <Text width={'auto'} color={'black50'} padding={'0 6px 0 0'}>
                  {bill.clinic.address}
                </Text>
                {bill.clinic.metro && <Text width={'auto'} color={'secondary'}>
                  {bill.clinic.metro.map(item => <MediumText key={item.id} color={item.color}>{`м. ${item.name}`}</MediumText>)}
                </Text>
                }
              </Address>
            </DataRowWithImage>}
            {bill.type && <DataRow label={translator('settings.bill-info.type', true)}>
              <MediumText>{bill.type}</MediumText>
            </DataRow>}
            {bill.date && <EditableDataRow
              label={translator('settings.bill-info.date', true)}
              value={moment(bill.date).format('DD MMMM, HH:mm')}
            />}
            {bill.client && <DataRow label={translator('settings.bill-info.client', true)}>
              <MediumText>{`${bill.client.surname} ${bill.client.name} ${bill.client.middlename ? bill.client.middlename : ''}`}</MediumText>
            </DataRow>}

            {bill.payment && bill.payment.type === 'card' && <DataRowWithImage
              label={translator('settings.bill-info.pay', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon}
              value={bill.payment && bill.payment.title}
            />}
            {bill.payment && bill.payment.type === 'product' ? <DataRowWithImage
              label={translator('settings.bill-info.sum', true)}
              description={bill.payment && bill.payment.description}
              src={bill.payment && bill.payment.icon || '/static/mocks/m_plus.svg'}
              value={bill.payment && bill.payment.title}
            /> :
              <DataRow label={translator('settings.bill-info.sum', true)}>
                <MediumText>{`${bill.sum} ${translator('settings.bill-info.rubl', true)}`}
                  {bill.status && <MediumText as={'span'} padding={'0 0 0 12px'} color={bill.status.name === 'not_paid' ? 'dangerousRed' : 'primary'}>{bill.status.title}</MediumText>}
                </MediumText>
              </DataRow>
            }
          </>}

          {bill.product && <DataRowWithImage
            label={translator('settings.bill-info.product', true)}
            src={bill.product.image || '/static/mocks/clinic.png'}
            value={bill.product.name}
          />}

        </Gap>
        <Wrapper padding={'24px 0 0'} mobilePadding={'20px 0 0'}>
          {!bill.paid && <Button onClick={handleBuy} color={'black05'}>{translator('settings.bill-info.bill', true)}</Button>}
          {bill.orderId && <Button onClick={() => Router.pushRoute(`/profile/medcard/order/${bill.orderId}`)} color={'black05'}>
            {translator('settings.bill-info.results', true)}
          </Button>}
        </Wrapper>
      </Container>
    </Well>
  )
}

BillInfo.defaultProps = {
  bill: {},
}