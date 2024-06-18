import React from 'react'
import {ModalTemplate} from '../../../templates/modal'
import {Container} from '../../../ui/grid/container'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Icon} from '../../../ui/icon'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../utils/translation'
import styled, {css} from 'styled-components'
import {Img} from '../../../ui/img'
import {getColor} from '../../../ui/helpers/getColor'

const AvatarBox = styled.div`
  overflow: hidden;
  width: 48px;
  height: 48px;
  border-radius: 100px;
  ${(p) => p.primary && `
    z-index: 1;
  `}
`
const StyledImg = styled(Img)`
  background: linear-gradient(116.57deg, #00B0D7 16.67%, #21CDD8 86.11%);
  transform: scale(1.6) translate(3px, 3px);
  ${(p) => p.primary && css`
    background: ${getColor('gradPrimary', p.theme)};
  `}
`
export const TooltipModal = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <ModalTemplate>
      <Container>
        <Wrapper flow={'column'} gap={'4px'}>
          <Wrapper gap={'-10px'} padding={'0 0 8px'}>
            <AvatarBox primary>
              <StyledImg primary src={'static/avatars/mk_woman.png'} width={'48px'} height={'48px'} />
            </AvatarBox>
            <AvatarBox>
              <StyledImg src={'static/avatars/mk_man.png'} width={'48px'} height={'48px'} />
            </AvatarBox>
          </Wrapper>
          <Text
            color={'black'}
            size={'16px'}
            lineHeight={'24px'}
            dangerouslySetInnerHTML={{__html: translator('search.result.tooltip.title', true)}}
          />
          <Wrapper gap={'12px'} justify={'flex-start'}>
            <Wrapper align={'center'} gap={'6px'} width={'auto'}>
              <Icon type={'shield'} color={'primary'} width={16} height={16}/>
              <Text color={'primary'} size={'16px'} lineHeight={'24px'} width={'auto'}>
                {translator('search.result.tooltip.private', true)}
              </Text>
            </Wrapper>
            <Wrapper align={'center'} gap={'6px'} width={'auto'}>
              <Icon type={'clock'} color={'primary'} width={16} height={16}/>
              <Text color={'primary'} size={'16px'} lineHeight={'24px'} width={'auto'}>
                {translator('search.result.tooltip.clock', true)}
              </Text>
            </Wrapper>
          </Wrapper>
          <Text color={'black50'} size={'16px'} lineHeight={'24px'}>
            {translator('search.result.tooltip.description', true)}
          </Text>
        </Wrapper>
      </Container>
    </ModalTemplate>
  )}

