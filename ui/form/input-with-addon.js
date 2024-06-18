import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {Input} from './input'
import {Container} from '../container'
import {Text} from '../text'

const ContainerWithAddon = styled(Container)`
  position: absolute;
  left: ${(p) => p.left};
  top:  ${(p) => p.left};
  z-index: 0;
`

export class InputWithAddon extends PureComponent {
  static defaultProps = {
    addon: '+7',
    height: '80px',
    addonColor: 'black',
    mask: '999 999 99 99',
    size: '32px',
    bgColor: 'white',
  }

  inputClick = () => {
    this.input.focus()
  }

  render() {
    const {
      addon,
      width,
      codeColor,
      mask,
      value,
      onChange,
      size,
      maxLength,
      height,
      autoFocus,
      bgColor,
      borderRadius,
      borderColor,
      borderSize,
    } = this.props

    const inputPadding = (68 + parseInt(size) * 1.5) + 'px'
    return (
      <Container align={'center'} onClick={this.inputClick} width={width} height={height} position={'relative'}>
        <ContainerWithAddon width={inputPadding} justify={'flex-end'} align={'center'} shrink={'0'} padding={`calc(${size}/6) calc(${size}/3) 0 0`}>
          <Text align={'center'} width={'auto'} shrink={'0'} lineHeight={'1.2'} size={size} color={codeColor}>{addon}</Text>
        </ContainerWithAddon>
        <Input
          width={'100%'}
          height={height}
          lineHeight={'1'}
          maskChar={null}
          maxLength={maxLength}
          borderRadius={borderRadius}
          hideBorder
          size={size}
          value={value}
          onChange={onChange}
          bgColor={bgColor}
          borderColor={borderColor}
          borderSize={borderSize}
          mask={mask}
          spacing={'1px'}
          autoFocus={autoFocus}
          padding={`0 68px 0 ${inputPadding}`}
          ref={el => this.input = el}
        />
      </Container>
    )
  }
}