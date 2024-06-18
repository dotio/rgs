import React, {Component}                     from 'react'
import styled                                 from 'styled-components'
import {Text}                                 from './text'

const StyledText = styled(Text)`
  font-feature-settings: 'tnum' on, 'lnum' on;
`

export class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { seconds: props.seconds, text: '', endTimer: null}
    this.reload = props.reload || false
  }

  componentDidMount() {
    this.startTimer()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seconds !== this.props.seconds) {
      this.setState({seconds: this.props.seconds})
    }
  }

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000)
  }

  countDown = () => {
    let seconds = this.state.seconds - 1
    this.setState({seconds: seconds})

    if (seconds === 0) {
      clearInterval(this.timer)
      this.props.endTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {color, componentBefore, componentAfter} = this.props

    return(
      <StyledText color={color || 'black'} size={'16px'} padding={'0 0 0 12px'} width={'auto'}>
        {componentBefore} {this.state.seconds} сек{componentAfter}
      </StyledText>
    )
  }
}