import React from 'react'
import PropTypes from 'prop-types'
import {Text} from '../../../ui/text'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {Icon} from '../../../ui/icon'
import {T} from '../../../utils/translation'
import {Wrapper} from '../../../ui/wrapper'
import styled from 'styled-components'

const StyledText = styled(Text)`
    width: 187px;
    @media (max-width: 1089px) {
      width: auto;
    }
`

export const StatusFieldList = ({fields}) => {
  return (
    <>
      <Wrapper padding={'16px 0 8px'} mobilePadding={'24px 0 8px'}>
        <Text size={'20px'} lineHeight={'30px'} color={'black50'}><T ucFirst>profile.medcard.status.left-fill</T></Text>
      </Wrapper>
      <Row>
        {fields.map(({title, filled}, i) => (
          <Col key={`${title}__${i}`} lg={{cols: 4, paddingBottom: '16px'}} sm={{cols: 12, paddingBottom: '4px'}}>
            <StyledText color={filled ? 'primary' : 'black'}>
              {title} {filled && <Icon type={'mark'} color={'primary'} width={16} height={16} shrink={'0'}/>}
            </StyledText>
          </Col>
        ))}
      </Row>
      </>
  )
}

StatusFieldList.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    filled: PropTypes.bool,
  })),
}

StatusFieldList.defaultProps = {
  fields: [],
}