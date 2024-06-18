import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import {Img} from '../../ui/img'
import styled from 'styled-components'
import {media} from '../../helpers/media'
import {Link, Router} from '../../routes'
import {CircleButton} from '../../ui/circle-button'
import {Gap} from '../../ui/gap'
import moment from 'moment'
import {Well} from '../../ui/well'
import {Wrapper} from '../../ui/wrapper'
import {T} from '../../utils/translation'
import {Button} from '../../ui/button'
import {TitleText} from '../../ui/title-text'

const ActivationWell = styled(Well)`
  position: relative;
  min-height: 650px;
  z-index: 2;
  background: linear-gradient(162.04deg, #40b2c9 13.44%, #55df94 85.6%);
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
  }
  
  ${media.mobile`
    min-height: auto;
  `}
`

const StyledImg = styled(Img)`
   ${media.mobile`
     width: 80px;
     height: 80px;
   `}
`

const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    text-align: left;
  `}
`

const StyledRow = styled(Row)`
  flex-wrap: wrap;
  justify-content: center;
  ${media.mobile`
    justify-content: flex-start;
  `}
  
`

const ImageBox = styled.div`
  background: rgba(184, 235, 221, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ActivationSuccessComponent = ({id, type}) => {
  const dispatch = useDispatch()
  const successInfo = useSelector(state => state.activation.successInfo)

  useEffect(() => {
    if (Object.keys(successInfo).length === 0) {
      type === 'policy' && dispatch.activation.getPolicySuccess(id)
      type === 'promocode' && dispatch.activation.getPromocodeSuccess(id)
    }
  }, [successInfo])

  return (
    <>
      <ActivationWell>
        <Container>
          <StyledTitleText color={'white'} align={'center'}>
            {type === 'policy'
              ? <T ucFirst>activation.success.product</T>
              : <T ucFirst>activation.success.promo</T>
            } <T>activation.success.activated</T>
          </StyledTitleText>
          <CircleButton icon={'cross'} onClick={() => Router.pushRoute('/profile/products')}/>
          {Object.keys(successInfo).length > 0 && (
            <Wrapper flow={'column'} align={'center'} padding={'36px 0'}>
              <StyledImg src={successInfo.image} width={'160px'} borderRadius={'16px'} alt={''}/>
              <Text size={'16px'} color={'white'} lineHeight={'24px'} bold align={'center'} padding={'16px 0 0'}>
                {successInfo.name}
              </Text>
              <Text size={'16px'} color={'white50'} lineHeight={'24px'} align={'center'}>
                <T ucFirst>activation.success.before</T> {moment(successInfo.dateEnd).format('DD.MM.YYYY')}
              </Text>
            </Wrapper>
          )}
          {Object.keys(successInfo).length > 0 && (<>
              <TitleText
                padding={'0 0 16px'}
                align={'center'}
                color={'white'}
              >
                <T ucFirst>activation.success.avalible</T>
              </TitleText>
              <StyledRow>
                {successInfo.services.map((service, index) =>
                  <Col lg={{cols: 3, paddingBottom: '20px'}} sm={{cols: 6}} key={service.title}>
                    <Gap gap={'12px'}>
                      <ImageBox>
                        <Text
                          size={'48px'}
                          lineHeight={'64px'}
                          align={'center'}
                          color={'white'}
                        >
                          {index + 1}
                        </Text>
                        {/*{service.image && <Img src={service.image} height={'110px'} shrink={'0'}/>}*/}
                      </ImageBox>
                      <Text
                        size={'16px'}
                        color={'rgba(0, 0, 0, 0.7)'}
                        lineHeight={'24px'}
                        align={'center'}
                      >
                        {service.title}
                      </Text>
                    </Gap>
                  </Col>)}
              </StyledRow>
            </>
          )}
        </Container>
      </ActivationWell>
      <Container>
        <Wrapper padding={'44px 0'} justify={'center'}>
          <Link route={'/profile/products'} passHref>
            <Button as={'a'} color={'primary'}><T ucFirst>activation.success.promo.good</T></Button>
          </Link>
        </Wrapper>
      </Container>
    </>
  )
}