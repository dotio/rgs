import React, { useState } from 'react'
import styled from 'styled-components'
import { media } from '../../../helpers/media'
import { DateButton } from '../../../ui/filter/date-button'
import moment from 'moment'
import { Wrapper } from '../../../ui/wrapper'

const DateSlotsContainer = styled.div`
  ${media.mobile`
    overflow: auto;
    width: 100%;
    display: flex;
  `}
`

const AnotherTimeDateButton = styled(DateButton)`
  margin: 0 0 12px 0;
`

export const DateSlotsFilter = ({slots, slotId, setSlot, withoutCrossIcon}) => {
  const [isOpened, setIsOpened] = useState(false)

  const currentSlots = isOpened ? slots : slots.slice(0, 7)

  const optionProps = withoutCrossIcon ? {} : {onCrossClick : () => setSlot(null)}

  return (
    <DateSlotsContainer>
      <Wrapper flexWrap justify={'flex-start'}>
        {currentSlots.map(slot =>
          <DateButton
            key={slot.id}
            selected={slotId === slot.id}
            onClick={() => setSlot(slot.id)}
            disabled={slot.reversed}
            {...optionProps}
          >
            {moment(slot.dateStart).format('HH:mm')}
          </DateButton>
        )}
        {slots.length > 7 && !isOpened && (
          <AnotherTimeDateButton onClick={() => setIsOpened(!isOpened)}>
            Другое время
          </AnotherTimeDateButton>
        )}
      </Wrapper>
    </DateSlotsContainer>
  )
}