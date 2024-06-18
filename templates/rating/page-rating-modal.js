import React from 'react'
import {ModalTemplate} from '../modal'
import {Container} from '../../ui/grid/container'
import {Text} from '../../ui/text'
import {TitleText} from '../../ui/title-text'
import styled from 'styled-components'
import {media} from '../../helpers/media'


const Header = styled(TitleText)`
  ${media.mobile`
    width: 303px;
  `}
`

export const ModalRatingPage = ({current}) => {

  const {value, title, description} = current.data

  return (
    <ModalTemplate>
      <Container>
        <Header padding={'0 30px 0 0'}>{title}</Header>
        <TitleText color={'primary'} decoration={'underline'}>
          {value}
        </TitleText>
        <Text padding={'24px 0 0'}>{description}</Text>
      </Container>
    </ModalTemplate>
  )
}