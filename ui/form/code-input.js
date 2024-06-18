import React, {PureComponent} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Input} from './input'
import {Wrapper} from './../wrapper'
import {media} from '../../helpers/media'

const ContentContainer = styled(Wrapper)`
  position: relative;
  
  * + * {
    margin-left: 10px;
  }
  
  ${media.mobile`
    justify-content: center;
  `}
`

const StyledInput = styled(Input)`
  width: 80px;
  height: 100px;
  font-size: 48px;
  border-radius: 100px;
  
  ${media.mobile`
    width: 47px;
    height: 60px;
    font-size: 24px;
  `}
`

export class CodeInput extends PureComponent {
  input = []

  componentDidMount() {
    this.focusInput(0)
    this.props.code && this.props.onChange(this.props.code) // TODO Для тестов
  }

  componentDidUpdate(prevProps) {
    const {value, count, onSubmit} = this.props

    if(prevProps.value < value) {
      value.length < count && this.focusInput(value.length)

      if(value.length === 4) {
        onSubmit()
      }
    }

    if(prevProps.value > value) {
      value.length >= 0 && this.focusInput(value.length)
    }
  }

  focusInput = (index) => {
    this.input[index].focus()
  }

  handleChange = (inputValue) => {
    const {value, onChange, count} = this.props
    const currentValue = value + inputValue

    currentValue.length <= count && onChange(currentValue)
  }

  handleKeyPress = (target) => {
    const {value, onChange} = this.props
    if(target.keyCode === 8) {
      const currentValue = value.substring(0, value.length - 1)
      onChange(currentValue ? currentValue : '')
    }
  }

  render() {
    const {
      value,
      autoFocus,
      count,
      isError,
      borderColor,
      activeBorderColor,
      borderWidth,
      activeBorderWidth,
    } = this.props

    return (
      <ContentContainer width={'auto'}>
        {[...Array(count).keys()].map((item, index) => {
          const isActive = index === value.length
          return <StyledInput
            ref={node => this.input[index] = node}
            value={value[index] || ''}
            borderColor={isError ? 'dangerousRed' : (isActive ? borderColor : activeBorderColor)}
            borderWidth={isActive ? borderWidth : activeBorderWidth}
            key={'code-input-' + index}
            onKeyDown={this.handleKeyPress}
            color={'black'}
            inputMode={'numeric'}
            align={'center'}
            maxlength={1}
            padding={'0'}
            onChange={(e) => this.handleChange(e.currentTarget.value)}
            autoFocus={autoFocus}
          />
        })}
      </ContentContainer>
    )
  }
}

CodeInput.propTypes = {
  borderColor: PropTypes.string,
  activeBorderColor: PropTypes.string,
  borderWidth: PropTypes.string,
  activeBorderWidth: PropTypes.string,
  value: PropTypes.string,
  count: PropTypes.number,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

CodeInput.defaultProps = {
  borderColor: 'black20',
  activeBorderColor: 'black20',
  borderWidth: '0',
  activeBorderWidth: '3px',
}