import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import {Button} from '../../ui/button'
import {Wrapper} from '../../ui/wrapper'
import {Well} from '../../ui/well'
import {Img} from '../../ui/img'
import {media} from '../../helpers/media'
import {Link}        from '../../routes'
import {T} from '../../utils/translation'

const StyledImg = styled(Img)`
  ${media.mobile`
    width: 60px;
    height: 60px;
  `}
`

export const ActivationBlock = () => {
  const loggedIn = useSelector(state => state.login.loggedIn)
  return (
    <Well padding={'26px 0'} mobilePadding={'32px 0'} color={'transparent'}>
      <Container>
        <Row>
          <Col lg={{cols: 10}} sm={{cols: 9, order: 1}}>
            <Wrapper width={'auto'} flow={'column'} align={'flex-start'} justify={'center'}>
              <Text width={'auto'} padding={'0 0 8px'} smPadding={'0 0 12px'}>
                <T ucFirst>activation.main.title.policy</T> <T>activation.main.title.promo</T>
              </Text>
              <Link route={loggedIn ? '/activation' : '/login?backUrl=/activation'} passHref>
                <Button><T ucFirst>activation.main.button</T></Button>
              </Link>
            </Wrapper>
          </Col>
          <Col lg={{cols: 2}} sm={{cols: 3, order: 2}}>
            <Wrapper justify={'flex-end'} align={'center'}>
              <StyledImg width={'80px'} height={'80px'} src={'/static/icons/policy.png'} shrink={'0'}/>
            </Wrapper>
          </Col>
        </Row>
      </Container>
    </Well>
  )
}