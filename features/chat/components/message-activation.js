import React, {memo} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Img} from '../../../ui/img'
import {media} from '../../../helpers/media'
import {Icon} from '../../../ui/icon'
import {Router} from '../../../routes'
import {getTranslator} from '../../../utils/translation'

const MessageWrapper = styled(Wrapper)`
  background-color: ${p => getColor('white', p.theme)};
  border-radius: 20px;
  padding: 12px 14px 12px 12px;
  width: ${p => p.width};
  border: 1px solid ${p => getColor('black15', p.theme)};
  ${media.mobile`
    width: 100%;
  `}
  cursor: pointer;
`

const activationMap = {
  product: {
    link: '/activation/policy',
    img: '/static/mocks/chat_products.svg',
    title: 'chat.activation.product.title',
  },
  promocode: {
    link: '/activation/promocode',
    img: '/static/mocks/chat_promocode.svg',
    title: 'chat.activation.promocode.title',
  }
}

const ActivationMessage = ({typeObj, isWidget}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <MessageWrapper width={isWidget ? '100%' : 'fit-content'} gap={'22px'} align={'center'} onClick={() => Router.push(typeObj.link)}>
      <Wrapper gap={'12px'} align={'center'}>
        <Img height={'48px'} width={'48px'} src={typeObj.img}/>
        <Text color={'primary'}>{translator(typeObj.title, true)}</Text>
      </Wrapper>
      <Icon type={'arrow-up'} color={'primary'} width={24} height={24} />
    </MessageWrapper>
  )
}

export const MessageProduct = memo(({isWidget}) => {
  return <ActivationMessage typeObj={activationMap.product} isWidget={isWidget} />
})

export const MessagePromocode = memo(({isWidget}) => {
  return <ActivationMessage typeObj={activationMap.promocode} isWidget={isWidget} />
})