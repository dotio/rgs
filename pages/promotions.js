import React from 'react'
import {DiscountList} from '../features/discount/discount-list'
import {DiscountRepository} from '../features/discount/repository'
import {Wrapper} from '../ui/wrapper'


const Promotions = ({discounts}) => {
  return (
   <>
     {(discounts.length > 0) && (
       <Wrapper padding={'20px 0'} flow={'column'}>
         <DiscountList title={'Акции'} discounts={discounts}/>
       </Wrapper>
     )}
   </>
  )
}
Promotions.getInitialProps = async () => {
  const discounts = await DiscountRepository.getDiscounts()
  return {
    discounts
  }
}

export default Promotions