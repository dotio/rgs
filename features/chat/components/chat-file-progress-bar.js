import React, {useContext} from 'react'
import {CircularProgressbar} from './circular-progress-bar'
import styled, {ThemeContext} from 'styled-components'
import PropTypes             from 'prop-types'
import {getColor} from '../../../ui/helpers/getColor'

const Container = styled.div`
  min-width: ${p => p.size};
  width: ${p => p.size};
  height: ${p => p.size};
  padding: ${p => p.padding};
  cursor: pointer;
  & path {
    transition: 0.3s;
  }
`
export const ChatFileProgressBar = (props) => {
  const theme = useContext(ThemeContext)
  return (
    <Container size={props.size} padding={props.padding}>
      <CircularProgressbar
        percentage={props.percentage}
        background
        backgroundPadding={6}
        handleClick={props.handleClick}
        styles={{
          background: {
            fill: getColor(props.background, theme),
          },
          text: {
            fill: '#fff',
          },
          path: {
            stroke: '#fff',
          },
          trail: { stroke: 'transparent' },
        }}
      />
    </Container>
  )
}

ChatFileProgressBar.propTypes = {
  size: PropTypes.string,
  background: PropTypes.string,
  percentage: PropTypes.number,
  handleClick: PropTypes.func,
}

ChatFileProgressBar.defaultProps = {
  size: '40px',
  background: 'polarr5',
  padding: 0,
}