import React, {useState} from 'react'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {useSelector} from 'react-redux'
import {InfinityCard} from '../service-cards/infinity-card'
import {NormalCard} from '../service-cards/normal-card'
import {RangeCard} from '../service-cards/range-card'
import {BuyCard} from '../service-cards/buy-card'
import {splitEvery} from 'ramda'
import {Wrapper} from '../../../../ui/wrapper'
import {Button} from '../../../../ui/button'
import {TitleText} from '../../../../ui/title-text'
import styled from 'styled-components'
import {T} from '../../../../utils/translation'
import {media} from '../../../../helpers/media'

const CARD_MAPPER = {
  normal: NormalCard,
  infinity: InfinityCard,
  range: RangeCard,
  buy: BuyCard,
  operator: BuyCard,
  limited: InfinityCard
}

const AvailableServicesBlockWell = styled(Well)`
  background-color: #fff;
  position: relative;
`

const ButtonWrapper = styled(Wrapper)`
  ${media.mobile`
    justify-content: center;
  `}
`
const ColumnCardWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    & > div:first-child {
      @media (min-width: 468px) {
        margin-right: 0;
      }
      margin-bottom: 6px;
    }
    
    
    & > div:last-child {
      margin-right: 0px;
      margin-bottom: 6px;
    }
  `}
`

export const AvailableServicesBlock = () => {
  const availableServices = useSelector(state => state.profileProducts.myServices)
  const [isOpenedList, setOpenedList] = useState(false)

  const currentServices = isOpenedList? availableServices : availableServices.slice(0, 6)

  return (
    <AvailableServicesBlockWell>
      <Container>
        <TitleText padding={'0 0 16px 0'}><T ucFirst>profile.product.avalivale.title</T></TitleText>
        <Wrapper flow={'column'} gap={'12px'} mobileGap={'0px'}>
          {splitEvery(2, currentServices).map((group, index) => {
            return (
              <ColumnCardWrapper key={index} gap={'12px'} mobileGap={'0px'}>
                {group.map((service, index) => {
                  const Card = CARD_MAPPER[service.type]
                  return <Card key={index}{...service} />
                })}
              </ColumnCardWrapper>
            )})}
        </Wrapper>
        {availableServices.length > 6 && (
          <ButtonWrapper margin={{top: '16px'}} justify={'center'}>
            <Button onClick={() => setOpenedList(!isOpenedList)} color={'black05'}>
              {isOpenedList ? <T ucFirst>profile.product.avalivale.hide</T> : <T ucFirst>profile.product.avalivale.look</T>}
            </Button>
          </ButtonWrapper>
        )}
      </Container>
    </AvailableServicesBlockWell>
  )
}