import styled, {css} from 'styled-components'
import {media} from '../../helpers/media'
import {getColor} from '../helpers/getColor'
import PropTypes from 'prop-types'

export const CalendarContainer = styled.div`
  display:inline-block;
  position: relative;
  
  ${p => p.calendarContainerWidth && css`
     width: ${p => p.calendarContainerWidth};   
  `}
  
  ${media.mobile`
    width: auto
  `}
  
  .react-calendar {
    position: absolute;
    z-index: 10000;
    border-radius: 20px;
    margin-top: 12px;
    left: 50%;
    margin-left: -175px;
    width: 350px;
    background: white;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    line-height: 1.125em;
    ${media.mobile`
       position: fixed;
       z-index: 20000;
       left:0;
       bottom: 0;
       width: 100%;
       margin-left: 0;
       box-shadow: 0px -12px 12px rgba(0, 0, 0, 0.15);
    `}
    
    ${p => media.mobile(p.isChatSearch && css`
      z-index: 100001;
      bottom: 52px;
  `)}
      
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
    font-family: ${(p) => p.theme.font.baseFamily};
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: ${p => getColor('primary', p.theme)};
    border-radius: 8px;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${p => getColor('primary', p.theme)};
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`

CalendarContainer.propTypes = {
  calendarContainerWidth: PropTypes.string,
}

CalendarContainer.defaultProps = {
  calendarContainerWidth: 'auto',
}