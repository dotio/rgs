import React, {useState} from 'react'
import {ModalTemplate} from '../../../templates/modal'
import {Container} from '../../../ui/grid/container'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {TitleText} from '../../../ui/title-text'
import {getTranslator} from '../../../utils/translation'
import {useSelector} from 'react-redux'

const ContentWrapper = styled(Wrapper)`
  min-height: 300px;
`
export const CallModal = () => {
  const [uncapped, setUncapped] = useState(false)
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <ModalTemplate>
      <Container>
        <ContentWrapper flow={'column'} justify={'space-between'}>
          <Wrapper flow={'column'}>
            <TitleText>{translator('about.call.title', true)}</TitleText>
            <TitleText color={'black50'}>{translator('about.call.work-time', true)}</TitleText>
          </Wrapper>
          <Text pointer={true} size={'48px'} lineHeight={'64px'} smSize={'36px'} smLineHeight={'48px'} onClick={() => uncapped ? window.open(`tel:${translator('about.call.phone', true)}`) : setUncapped(true)}>{translator('about.call.phone', true)}</Text>
        </ContentWrapper>
      </Container>
    </ModalTemplate>
  )
}