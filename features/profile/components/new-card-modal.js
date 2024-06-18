import styled from 'styled-components'
import {ModalTemplate} from '../../../templates/modal'
import {TitleText} from '../../../ui/title-text'
import {asyncModal} from '../../../helpers/hocs/asyncModal'
import {CardRepository} from '../repository/card'
import {Container} from '../../../ui/grid/container'
import {T} from '../../../utils/translation'
import React from 'react'

const Iframe = styled.iframe`
  width: 100%;
  height: calc(100vh - 32px - 48px);
  border: none;
`

const NewCardModalComp = ({data}) => {
  return (
    <ModalTemplate addCard>
      <Container>
        <TitleText><T ucFirst>profile.new-card.title</T></TitleText>
        <Iframe src={data.url} />
      </Container>
    </ModalTemplate>
  )
}

export const NewCardModal = asyncModal(NewCardModalComp, () => CardRepository.create())