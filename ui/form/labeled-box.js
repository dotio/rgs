import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Text} from '../../ui/text'
import {Wrapper} from '../../ui/wrapper'

export class LabeledBox extends Component {
  render() {
    const {text, children, margin, color} = this.props

    return (
      <Wrapper flow={'column'} justify={'flex-start'} align={'flex-start'} margin={margin}>
        <Text size={'16px'} lineHeight={'24px'} padding={'0 0 6px'} color={color}>{text}</Text>
        {children}
      </Wrapper>
    )
  }
}

LabeledBox.propTypes = {
  text: PropTypes.string,
  margin: PropTypes.string,
  children: PropTypes.object,
  color: PropTypes.string,
}

LabeledBox.defaultProps = {
  text: '',
  margin: '0',
  color: 'black'
}
