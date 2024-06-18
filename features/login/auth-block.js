import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
//import {Link}        from '../../routes'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
//import {Wrapper} from '../../ui/wrapper'
import {Well} from '../../ui/well'
import {media} from '../../helpers/media'
//import {Button} from '../../ui/button'
import {getTranslator} from '../../utils/translation'

const OpacityText = styled(Text)`
  opacity: 0.5;
  font-size: 28px;
  line-height: 32px;
  width: 587px;
  
  ${media.mobile`
    width: auto;
    font-size: 20px;
    line-height: 24px;
  `}
`
// TODO Скрыли по просьбе бориса
export const AuthBlock = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <Well color={'gradPrimary'} mobilePadding={'16px 0'}>
      <Container>
        <Row>
          <Col lg={{cols: 12}} sm={{cols: 12}}>
            <Text size={'28px'} lineHeight={'32px'} smSize={'20px'} smLineHeight={'24px'} color={'white'}>{translator('login.main.title', true)}</Text>
            <OpacityText
              //padding={'0 0 24px'}
              color={'white'}
              dangerouslySetInnerHTML={{__html: translator('login.main.description')}}
            />
            {/*<Wrapper align={'center'}>*/}
            {/*  <Link route={'/login'} passHref>*/}
            {/*    <Button as={'a'} analyticsElement={'main-login'}>{translator('login.main.button', true)}</Button>*/}
            {/*  </Link>*/}
            {/*  <Text padding={'0 0 0 16px'} size={'16px'} lineHeight={'24px'} color={'white'}>*/}
            {/*    {translator('login.main.button.subtitle', true)}*/}
            {/*  </Text>*/}
            {/*</Wrapper>*/}
          </Col>
        </Row>
      </Container>
    </Well>
  )
}