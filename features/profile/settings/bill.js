import React from 'react'
import PropTypes from 'prop-types'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {Button} from '../../../ui/button'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import {useSelector} from 'react-redux'
import {Router} from '../../../routes'
import {T} from '../../../utils/translation'

const BillContainer = styled.div`
  padding-bottom: 12px;
  svg {
    flex-shrink: 0;
    flex-grow: 0;
  }
  ${media.mobile`
    display: block;
    padding-top: 4px;
    & svg {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  `}
`

const StyledText = styled(Text)`
  display: inline;
  ${media.mobile`
    display: block;
    font-size: 16px;
    line-height: 24px;
  `}
`

const BillWrapper = styled(Wrapper)`
  flex-direction: column;
  ${media.mobile `
    display: block;
    flex-direction: column;
    align-items: flex-start;
  `}
`

const BillDescriptionWrapper = styled(Wrapper)`
  display: inline;
  ${media.mobile `
    display: block;
    flex-direction: column;
    align-items: flex-start;
  `}
`

export const Bills = () => {
  const bills = useSelector(state => state.profileSettings.bills)

  return <Row>
    <Col lg={{cols: 4}} sm={{cols: 12}}>
      <StyledText size={'20px'} lineHeight={'30px'} color={'black50'}><T ucFirst>settings.bill.title</T></StyledText>
    </Col>
    <Col lg={{cols: 8}} sm={{cols: 12}}>
      {bills.length > 0 ? <>
          {bills.slice(0, 3).map((bill, index) => (
            <BillContainer width={'100%'} key={'bill-' + index}>
              <BillWrapper width={'100%'}>
                <BillDescriptionWrapper width={'100%'}>
                  <StyledText>{bill.title || bill.type} </StyledText>
                  <StyledText color={'black50'}>&nbsp;{bill.sum} ₽</StyledText>
                </BillDescriptionWrapper>
                {bill.status && (
                  <StyledText color={bill.status && bill.status.color ? bill.status.color : 'black'}>{bill.status.title}</StyledText>
                )}
              </BillWrapper>
            </BillContainer>
          ))}
          <Wrapper>
            <Button color={'black05'} onClick={() => {Router.pushRoute('/profile/settings/bills')}}><T ucFirst>settings.bill-payment.title</T></Button>
          </Wrapper>
        </>
        : <StyledText size={'20px'} lineHeight={'30px'} color={'black50'}><T ucFirst>settings.bill-no-payment.title</T></StyledText>
      }
    </Col>
  </Row>
}

Bills.propTypes = {
  bills: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    type: PropTypes.string,
    serviceType: PropTypes.string,
    title: PropTypes.string,
    sum: PropTypes.number,
    date: PropTypes.string,
    paid: PropTypes.string,
    status: PropTypes.objectOf(PropTypes.shape({
      title: PropTypes.string,
      color: PropTypes.string
    }))
  }))
}
