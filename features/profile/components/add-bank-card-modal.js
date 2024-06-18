import React from 'react'
import { ModalTemplate } from '../../../templates/modal'
import { TitleText } from '../../../ui/title-text'
import { Button } from '../../../ui/button'
import { Container } from '../../../ui/grid/container'
import {BankCardBlock} from './bank-card-block'
import {Divider} from '../../../ui/divider'
import {useDispatch, useSelector} from 'react-redux'
import {T} from '../../../utils/translation'

export const AddBankCardModal = () => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.profileSettings.bankCards)

  return (
    <ModalTemplate>
      <Container>
        <TitleText padding={'0 0 24px'}><T ucFirst>profile.add-card.title</T></TitleText>
      </Container>
      {cards.map((card, index) =>
        <React.Fragment key={index}>
          <Container>
            <BankCardBlock
              cardNumber={card.number}
              isMainCard={card.active}
              medcards={card.medcards}
              cardIcon={card.img || '/static/mocks/card_empty.png'}
              onSetActive={() => dispatch.profileSettings.updateCurrentCard(card.id)}
              onDelete={() => dispatch.profileSettings.removeCard(card.id)}
            />
          </Container>
          <Divider color={'black10'} margin={'24px 0'} smMargin={'24px 0 20px'}/>
        </React.Fragment>
      )}
      <Container>
        <Button padding={'8px 15px'} fontSize={'20px'} lineHeight={'30px'} color={'primary'} onClick={() => dispatch.modal.addAndShowModal({type: 'new-card'})}><T ucFirst>profile.add-card.add</T></Button>
      </Container>
    </ModalTemplate>
  )
}
