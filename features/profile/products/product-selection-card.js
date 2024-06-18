import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Wrapper } from '../../../ui/wrapper'
import { Text } from '../../../ui/text'
import { media } from '../../../helpers/media'
import { Icon } from '../../../ui/icon'
import { getColor } from '../../../ui/helpers/getColor'
import { T } from '../../../utils/translation'

const CardWrapper = styled(Wrapper)`
  border: 1px solid ${p => getColor('black15', p.theme)};
  border-radius: 16px;
  cursor: pointer;
  ${p => p.active && css`
    border: transparent;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.05);
  `}

  ${media.mobile`
    padding: 16px 14px;
  `}
`

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const DiscountPrice = styled(StyledText)`
  text-decoration-color: ${p => getColor('dangerousRed', p.theme)};
`

const SpecialOffer = styled.div`
  background-color: ${p => getColor('secondary', p.theme)};
  border-radius: 100px;
  margin: 24px 0 0 0;
  width: 58px;
`

export const ProductSelectionCard = ({name, discountPrice, price, active}) => (
  <CardWrapper flow={'column'} padding={'16px'} active={active} justify={'space-between'}>
    <Wrapper flow={'column'}>
      <Icon type={active ? 'mark' : 'circle_plus'} color={active ? 'positiveGreen' : 'primary'}/>
      {discountPrice &&
        <SpecialOffer>
          <Text size={'14px'} lineHeight={'16px'} color={'white'} padding={'6px 8px'}>
            <T ucFirst>profile.product.special-offer</T>
          </Text>
        </SpecialOffer>
      }
    </Wrapper>
    <Wrapper flow={'column'} margin={{top: '8px'}}>
      <StyledText size={'20px'}>{name}</StyledText>
      <Wrapper>
        {discountPrice &&
          <StyledText size={'20px'} color={'secondary'} width={'auto'} padding={'0 6px 0 0'} discount>
            {discountPrice}
          </StyledText>
        }
        <DiscountPrice size={'20px'} color={'black50'} width={'auto'} decoration={discountPrice ? 'line-through' : 'none'}>
          {price}
        </DiscountPrice>
      </Wrapper>
    </Wrapper>
  </CardWrapper>
)

ProductSelectionCard.propTypes = {
  name: PropTypes.string,
  discountPrice: PropTypes.string,
  price: PropTypes.string,
  active: PropTypes.bool
}