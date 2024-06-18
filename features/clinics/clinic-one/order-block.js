import React from 'react'
import {Container} from '../../../ui/grid/container'
import {getTranslator} from '../../../utils/translation'
import {useSelector} from 'react-redux'
import {Well} from '../../../ui/well'
import {TitleText} from '../../../ui/title-text'
import {CardWithIcon} from '../../profile/medcard/components/card-with-icon'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {media} from '../../../helpers/media'

const OrderContentWrapper = styled(Wrapper)`
  overflow: auto;
  flex-wrap: nowrap;
`

const CardWrapper = styled(Wrapper)`
  height: 120px;
  width: 232px;
  ${media.mobile`
    min-width: 146px;
    width: 146px;
    height: 134px;
  `}
`

const DesktopText = styled(Text)`
  ${media.mobile`
    display: none;
  `}
`

const MobileText = styled(Text)`
  display: none;
  ${media.mobile`
    display: block;
  `}
`

export const ClinicOrderBlock = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <Well color={'transparent'}>
      <Container>
        <TitleText>{translator('clinic.order.title', true)}</TitleText>
        <TitleText color={'black50'} padding={'0 0 16px'}>{translator('clinic.order.subtitle', true)}</TitleText>
        <OrderContentWrapper gap={'12px'}>
          <CardWrapper>
            <CardWithIcon
              onClick={() => console.log('no route')}
              icon={'mk_logo'}
              bgColor={'white'}
              labelComponent={
                <>
                <DesktopText size={'20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
                  {translator('clinic.order.mk', true)}
                </DesktopText>
                <MobileText size={'20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
                  {translator('clinic.order.mk.mobile', true)}
                </MobileText>
                </>
              }
            />
          </CardWrapper>
          <CardWrapper>
            <CardWithIcon
              onClick={() => console.log('no route')}
              icon={'bg_arrow_down'}
              iconColor={'black40'}
              bgColor={'white'}
              labelComponent={
                <Text size={'20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
                  {translator('clinic.order.doctor', true)}
                </Text>
              }
            />
          </CardWrapper>
          <CardWrapper>
            <CardWithIcon
              onClick={() => console.log('no route')}
              icon={'bg_arrow_down'}
              iconColor={'black40'}
              bgColor={'white'}
              labelComponent={
                <Text size={'20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
                  {translator('clinic.order.diagnostics', true)}
                </Text>
              }
            />
          </CardWrapper>
        </OrderContentWrapper>
      </Container>
    </Well>
  )
}