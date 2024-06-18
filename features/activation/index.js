import React from 'react'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import styled from 'styled-components'
import {getColor} from '../../ui/helpers/getColor'
import {media} from '../../helpers/media'
import {CircleButton} from '../../ui/circle-button'
import {Router} from '../../routes'
import {getTranslator} from '../../utils/translation'
import {useSelector} from 'react-redux'
import {TitleText} from '../../ui/title-text'
import {CardWithIcon} from '../profile/medcard/components/card-with-icon'

const ActivationWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  min-height: calc(100vh - 14px);
  overflow-y: auto;
  padding: 24px;
  border: 1px solid ${(p) => getColor('black20', p.theme)};
  
  ${media.mobile`
    min-height: auto;
    border-radius: 0;
    padding: 16px 0;
    border: none;
  `}
`

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 24px;
  
  ${media.mobile`
    justify-content: flex-start;
    padding: 0 0 16px;
  `}
`

const Description = styled(Text)`
  text-align: center;
  
  ${media.mobile`
    text-align: left;
  `}
`

const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    text-align: left;
  `}
`

export const ActivationComponent = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <ActivationWrapper>
      <Container>
        <Row>
          <Col>
            <TitleBox>
              <StyledTitleText align={'center'}>{translator('activation.block.title', true)}</StyledTitleText>
              <CircleButton icon={'cross'} onClick={() => Router.pushRoute('/')} />
            </TitleBox>
            <Description size={'16px'} lineHeight={'24px'} padding={'0 0 16px'} color={'black50'}>{translator('activation.block.subtitle', true)}</Description>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 4, offset: 2}} sm={{cols: 12, paddingBottom: '12px'}}>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'primary'}
              labelComponent={
                <Text size={'20px'} lineHeight={'24px'}>
                  {translator('activation.block.product', true)}
                </Text>
              }
              bgColor={'white'}
              onClick={() => Router.pushRoute('/activation/policy')}
              hoverColor={'black10'}
            />
          </Col>
          {/*<Col lg={{cols: 4}} sm={{cols: 12, paddingBottom: '12px'}}>*/}
          {/*<CardWithIcon*/}
          {/*icon={'opened_plus'}*/}
          {/*iconColor={'green'}*/}
          {/*label={translator('activation.block.dms', true)}*/}
          {/*bgColor={'white'}*/}
          {/*onClick={() => Router.pushRoute('/activation/dms')}*/}
          {/*hoverColor={'black10'}*/}
          {/*/>*/}
          {/*</Col>*/}
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'primary'}
              labelComponent={
                <Text size={'20px'} lineHeight={'24px'}>
                  {translator('activation.block.promo', true)}
                </Text>
              }
              bgColor={'white'}
              onClick={() => Router.pushRoute('/activation/promocode')}
              hoverColor={'black10'}
            />
          </Col>
        </Row>
      </Container>
    </ActivationWrapper>
  )
}