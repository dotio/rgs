import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Col} from '../../../../ui/grid/col'
import {Row} from '../../../../ui/grid/row'
import {Img} from '../../../../ui/img'
import {Router} from '../../../../routes'
import {CircleButton} from '../../../../ui/circle-button'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
//import {Button} from '../../../../ui/button'
import {Wrapper} from '../../../../ui/wrapper'
import {T} from '../../../../utils/translation'
import {getRandomIntInclusive} from '../../../../ui/helpers/getRandomIntInclusive'
import {media} from '../../../../helpers/media'

const productIncludesMock = [
  {
    'title': 'Срочные консультации терапевтов 24/7',
    'text': 'Текст',
    'image': '/static/mocks/product-urgent-consultations.svg'
  },
  {
    'title': 'Консультации профильных врачей- специалистов по записи',
    'text': 'Текст',
    'image': '/static/mocks/product-consultations.svg'
  },
  {
    'title': 'Все консультации — в онлайне. В чате или по видеосвязи',
    'text': 'Текст',
    'image': '/static/mocks/product-consultations-online.svg'
  },
  {
    'title': 'Второе экспертное мнение по ранее поставленному диагнозу',
    'text': 'Текст',
    'image': '/static/mocks/product-second-opinion.svg'
  },
]

// const ProductManageButton = styled(Button)`
//   margin-top: 24px;
// `

const MoreAboutProductText = styled(TitleText)`
  padding-top: 48px;
  ${media.mobile`
    padding-top: 24px;
  `}
`

export const ProductHeader = () => {
  //const {id, price, image, name, subtitle} = useSelector(state =>
  // state.profileProducts.currentProduct)
  const {image, name, subtitle} = useSelector(state => state.profileProducts.currentProduct)
  //const myProducts = useSelector(state => state.profileProducts.myProducts)
  //const isActive = myProducts.filter(product => product.id === id).length > 0

  return <Well color={'transparent'} mobilePadding={'20px 0 24px'}>
    <Container>
      <Wrapper  flow={'column'} align={'center'}>
        <Img src={image ? image : '/static/banners/docOnline.svg'} width={'120px'} height={'120px'}  shrink={'0'}/>
        <CircleButton icon={'long_arrow_left'} onClick={() => Router.pushRoute('/profile/products')} />
        <Text size={'36px'} lineHeight={'48px'} smSize={'24px'} smLineHeight={'28px'} padding={'24px 0 0'} bold align={'center'}>
          {name}
        </Text>
        {subtitle && <TitleText color={'black50'} align={'center'}>{subtitle}</TitleText>}
        {/*{isActive &&*/}
        {/*<ProductManageButton  color={'black'} onClick={() => {}}>*/}
        {/*<T ucFirst>product.current.manage.button</T>*/}
        {/*</ProductManageButton>*/}
        {/*}*/}
        {/*<ProductManageButton color={'primary'} onClick={() => Router.pushRoute(`/profile/products/${id}/buy`)}>*/}
        {/*  {isActive ? <T ucFirst>product.current.button.more</T> : <T ucFirst>product.current.button.buy</T>} за {price && price}*/}
        {/*</ProductManageButton>*/}
      </Wrapper>
      <TitleText color={'black50'} padding={'48px 0 24px'}><T ucFirst>product.current.about.short</T></TitleText>
      <Row>
        {productIncludesMock.map(({image, title}, index)=> {
          const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [title])
          return (
            <Col lg={{cols: 3}} sm={{cols: 6, paddingBottom: '24px'}} key={index}>
              <Img src={image ? image : `/static/mocks/clinic${memoizedRandom}.svg`} width={'80px'} height={'80px'}  shrink={'0'}/>
              <Text size={'16px'} lineHeight={'24px'} padding={'15px 0 0px'} width={'98%'}>{title}</Text>
            </Col>
          )})}
      </Row>
      <MoreAboutProductText color={'black50'}><T ucFirst>product.current.about.more</T></MoreAboutProductText>
    </Container>
  </Well>
}