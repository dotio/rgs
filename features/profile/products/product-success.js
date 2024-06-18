import React from 'react'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {Text} from '../../../ui/text'
import {Button} from '../../../ui/button'
import {Wrapper} from '../../../ui/wrapper'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {T} from '../../../utils/translation'

const StyledWell = styled(Well)`
  background: url('/static/banners/product-success.png') 100% 65% no-repeat;
  background-size: 100%;
  background-color: ${(p) => getColor('lightenAquamarin', p.theme)};
  min-height: 640px;
`

const StyledWrapper = styled(Wrapper)`
  min-height: 544px;
`

export const ProductSuccess = ({data}) => {
  const {items} = data
  return (
    <Wrapper flow={'column'} gap={'6px'}>
      <StyledWell>
        <Container>
          <Row>
            <Col lg={{cols: 6.5}} sm={{cols: 6}}>
              <StyledWrapper flow={'column'} align={'flex-start'} justify={'space-between'}>
                <Wrapper flow={'column'}>
                  <Text size={'28px'} lineHeight={'32px'}><T ucFirst>product.success.title</T></Text>
                  <Text size={'28px'} lineHeight={'32px'} color={'black50'} padding={'0 0 48px 0'}><T ucFirst>product.success.subtitle</T></Text>
                </Wrapper>
                <Wrapper flow={'column'}>
                  {items.map((item, index) =>
                    <Wrapper margin={'0 0 24px 0'} key={index}>
                      <Text width={'auto'} size={'28px'} lineHeight={'32px'}>{index + 1}</Text>
                      <Text width={'auto'} size={'20px'} lineHeight={'30px'} padding={'0 0 0 24px'}>{item}</Text>
                    </Wrapper>
                  )}
                </Wrapper>
              </StyledWrapper>
              <Button color={'primary'} padding={'8px 15px'}><Text color={'white'} width={'auto'} size={'20px'} lineHeight={'30px'}><T ucFirst>product.success.exellent</T></Text></Button>
            </Col>
          </Row>
        </Container>
      </StyledWell>
    </Wrapper>
  )
}