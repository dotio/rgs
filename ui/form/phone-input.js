import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {Input} from './input'
import {Text} from '../text'
import {getColor} from '../helpers/getColor'
import {isPhoneNumber} from '../../helpers/validator'

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: ${p => p.isValue ? '0' : '48px'};
  width: ${p => p.width};
  height: ${p => p.height};
  border: 3px solid ${(p) => getColor('black20', p.theme)};
  border-radius: 20px;
  background-color: #ffffff;
`

export class PhoneInput extends PureComponent {
  input = React.createRef()
  code = React.createRef()

  static defaultProps = {
    code: '+7',
    codeColor: 'black',
    height: '100px',
    mask: '999 999 99 99',
    size: '48px',
    bgColor: 'white',
  }

  inputClick = () => {
    this.input.focus()
  }

  handleSubmit = (e) => {
    this.props.onChange(e.currentTarget.value)
  }

  handleKeyPress = (target) => {
    if(target.charCode === 13 && isPhoneNumber(this.props.value)) {
      this.handleSubmit(target)
    }
  }

  calculateInputWidth = () => {
    this.input.style.width = 0
    this.input.style.width = `${Math.max(this.input.scrollWidth + 1, this.code.clientWidth)}px`
  }

  componentDidMount() {
    this.calculateInputWidth()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.calculateInputWidth()
    }
  }

  render() {
    const {
      width,
      mask,
      code,
      codeColor,
      value,
      size,
      maxLength,
      height,
      autoFocus,
    } = this.props

    const textPadding = parseInt(size) * (10 / 32)
    return (
      <InputContainer onClick={this.inputClick} width={width} height={height} isValue={value.length > 0}>
        <Text ref={el => this.code = el} padding={`0 ${textPadding}px 0 0`} width={'auto'} size={size} color={codeColor}>{code}</Text>
        <Input
          width={'51px'}
          height={height}
          lineHeight={'1.5'}
          maskChar={null}
          maxLength={maxLength}
          hideBorder
          size={size}
          value={value}
          onChange={this.handleSubmit}
          onKeyPress={this.handleKeyPress}
          bgColor={'transparent'}
          mask={mask}
          spacing={'2px'}
          autoFocus={autoFocus}
          padding={'0'}
          ref={el => this.input = el}
        />
      </InputContainer>
    )
  }
}