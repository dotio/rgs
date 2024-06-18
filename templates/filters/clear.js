import React from 'react'
import {Text} from '../../ui/text'
import PropTypes from 'prop-types'
import {Wrapper} from '../../ui/wrapper'
import {Button} from '../../ui/button'

export const ClearFilters = ({text, onClick}) => {
  return (
    <Wrapper padding={'24px 0 24px 96px'} mobilePadding={'20px 0 20px 60px'} flow={'column'} justify={'flex-start'} align={'flex-start'} gap={'8px'}>
      <Text color={'black50'}>{text}</Text>
      <Button onClick={onClick} color={'transparent'}>Очистить</Button>
    </Wrapper>
  )
}

ClearFilters.propTypes = {
  onClick: PropTypes.func,
}