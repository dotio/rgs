import React from 'react'
import PropTypes from 'prop-types'
import {Row} from './grid/row'
import {Col} from './grid/col'
import {MediumText} from './medium-text'

export const DataRow = ({label, children}) => {
  return (
    <Row>
      <Col lg={{cols: 4}} sm={{cols: 12}}>
        <MediumText color={'black50'}>{label}</MediumText>
      </Col>
      <Col lg={{cols: 8}} sm={{cols: 12}}>
        {children}
      </Col>
    </Row>
  )
}

DataRow.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
}
