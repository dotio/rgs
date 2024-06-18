import styled from 'styled-components'
import {getElementColor} from '../../../ui/helpers/getColor'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Text} from '../../../ui/text'
import React from 'react'
import PropTypes from 'prop-types'

const FiltersGroupWrapper = styled.div`
  padding: ${p => p.padding};
  border-bottom: solid 1px ${p => getElementColor('stroke', p.theme)};
  &:last-child {
    border-bottom: 0;
  }
`

export const FiltersGroup = ({title, children, padding}) => {
  return (
    <FiltersGroupWrapper padding={padding}>
      <Container>
        <Row>
          <Col>
            <Text size={'20px'} lineHeight={'30px'} color={'black50'}>{title}</Text>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {children}
        </Row>
      </Container>
    </FiltersGroupWrapper>
  )
}

FiltersGroup.propTypes = {
  padding: PropTypes.string
}
FiltersGroup.defaultProps = {
  padding: '24px 0'
}