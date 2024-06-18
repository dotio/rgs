import React from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {CircleButton} from '../../../ui/circle-button'
import {Container} from '../../../ui/grid/container'
import {Well} from '../../../ui/well'
import {TitleText} from '../../../ui/title-text'
import {Router} from '../../../routes'
import {Icon} from '../../../ui/icon'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {T} from '../../../utils/translation'
import {media} from '../../../helpers/media'

const CARDS = [
  {
    type: 'MasterCard',
    icon: {
      title: 'bank_card',
      width: 32
    }
  },
  {
    type: 'VISA',
    icon: {
      title: 'visa_card_25',
      width: 25
    }
  },
  {
    type: 'Maestro',
    icon: {
      title: 'maestro_card',
      width: 32
    }
  },
  {
    type: 'МИР',
    icon: {
      title: 'mir_card',
      width: 49
    }
  }
]

const StyledWrapper = styled(Wrapper)`
  position: relative;
`

const StyledText = styled(Text)`
  ${media.mobile`
    display: inline-block;
  `}
`

const CardsWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-wrap: nowrap;
    overflow: auto;
  `}
`

const Card = styled.div`
  min-width: 150px;
  height: 86px;
  border-radius: 16px;
  background-color: ${p => getColor('black05', p.theme)};
  padding: 16px;
  margin-bottom: 12px;

  &:not(:nth-child(3)) {
    margin-right: 12px;
  }

  ${media.mobile`
    margin-right: 12px;
  `}
`

export const PaymentAndRefundBlock = () => {
  return (
    <StyledWrapper>
      <Well padding={'24px 0'} mobilePadding={'20px 0'}>
        <CircleButton icon={'long_arrow_left'} onClick={() => Router.pushRoute('/about')} />
        <Container>
          <Wrapper gap={'24px'} flow={'column'}>
            <TitleText><T>about.payment-and-refund</T></TitleText>
            <Row>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'}><T>about.accept-payments</T></Text>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} padding={'0 0 16px 0'}><T>about.russian-banks-cards</T></Text>
                <CardsWrapper gap={'0'} flexWrap>
                  {CARDS.map(card =>
                    <Card>
                      <Text padding={'0 0 10px 0'}>{card.type}</Text>
                      <Icon type={card.icon.title} width={card.icon.width} height={20}/>
                    </Card>)
                  }
                </CardsWrapper>
                <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} padding={'4px 0 0'}><T>about.no-comission</T></Text>
              </Col>
            </Row>
            <Row>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'}><T>about.security</T></Text>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}><T>about.security-text</T></Text>
              </Col>
            </Row>
            <Row>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <StyledText size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'} width={'auto'} padding={'0 5px 0 0'}>
                  <T>about.problem</T>
                </StyledText>
                <StyledText size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'} width={'auto'}>
                  <T>about.with-payment</T>
                </StyledText>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}><T>about.contact-to-processing-center</T></Text>
                <Wrapper>
                  <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'} width={'auto'} padding={'0 8px 0 0'}>
                    <T>about.phone</T>
                  </Text>
                  <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}>
                    <T>about.payment.contact-phone</T>
                  </Text>
                </Wrapper>
                <Wrapper>
                  <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'} width={'auto'} padding={'0 8px 0 0'}>
                    <T>about.email</T>
                  </Text>
                  <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}>
                    <T>about.payment.contact-email</T>
                  </Text>
                </Wrapper>
              </Col>
            </Row>
            <Row>
              <Col lg={{cols: 4}} sm={{cols: 12}}>
                <StyledText size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'} width={'auto'} padding={'0 5px 0 0'}>
                  <T>about.refund</T>
                </StyledText>
                <StyledText size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'} width={'auto'}>
                  <T>about.money</T>
                </StyledText>
              </Col>
              <Col lg={{cols: 8}} sm={{cols: 12}}>
                <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}><T>about.write-email</T></Text>
                <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}>
                  <T>about.payment.money-back</T>
                </Text>
              </Col>
            </Row>
          </Wrapper>
        </Container>
      </Well>
    </StyledWrapper>
  )
}
