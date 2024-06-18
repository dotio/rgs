import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'
import {BankCards} from './bank-card'
import {Bills} from './bill'
import {Well} from '../../../ui/well'
import {Divider} from '../../../ui/divider'

export const Finance = () => {
  return (
    <Well>
      <Container>
        <TitleText padding={'0 0 16px'}>Финансы</TitleText>
        <BankCards />
      </Container>
      <Divider margin={'24px 0'}/>
      <Container>
        <Bills />
      </Container>
    </Well>
  )
}

Finance.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    iconUrl: PropTypes.string,
    name: PropTypes.string
  }))
}
