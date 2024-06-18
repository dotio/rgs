import React, {useState} from 'react'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import {getColor} from '../../../ui/helpers/getColor'
import {Well} from '../../../ui/well'
import {Wrapper} from '../../../ui/wrapper'
import {Button} from '../../../ui/button'
import {ProductRepository} from '../repository/product'
import {Router} from '../../../routes'

const ProductWrapper = styled(Well)`
  position: relative;
  border-radius: 20px;
  min-height: calc(100vh - 14px);
  overflow-y: auto;
  border: 1px solid ${(p) => getColor('black20', p.theme)};
  
  ${media.mobile` 
    min-height: auto;
    border-radius: 0;
    padding: 16px 0;
    border: none;
  `}
`

const StyledWrapper = styled(Wrapper)`
  min-height: calc(100vh - 14px);
`

export const ProductCheckComponent = ({orderId}) => {
  const [status, setStatus] = useState('')

  const check = async () => {
    const result = await ProductRepository.checkPayment(orderId)

    result.success ? Router.pushRoute('profile/products/success', {productId: result.id}) : setStatus('send')
  }

  return (
    <ProductWrapper color={'transparent'}>
      <StyledWrapper width={'100%'} justify={'center'} align={'center'} gap={'12px'}>
        <Button color={'primary'} onClick={check}>Проверить оплату</Button>
        {status === 'send' && <Text color={'secondary'}>Статус платежа: отправлено в GW</Text>}
      </StyledWrapper>
    </ProductWrapper>
  )
}