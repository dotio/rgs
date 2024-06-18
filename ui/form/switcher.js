import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {FormButton} from './../buttons/form-button'
import {media} from '../../helpers/media'

const SwitcherBox = styled.div`
  display: flex;
  flex-wrap: ${p => p.optionsWrap ? 'wrap' : 'nowrap'};
  ${p => !p.optionsWrap && media.mobile`
    overflow-x: auto;
    width: 100%;
  `}
`

export const Switcher = ({isCallBackForm, list, selected, onChange, error, optionsMargin, optionsWrap}) => {
  return <SwitcherBox optionsWrap={optionsWrap}>
    {!!list.length && list.map((item, index) => {
      return <FormButton
        key={'switcherItem-' + index}
        selected={selected === item.value}
        onClick={() => onChange(item.value)}
        error={error}
        margin={optionsMargin}
        isCallBackForm={isCallBackForm}
      >
        {item.title}
      </FormButton>
    })}
  </SwitcherBox>
}

Switcher.propTypes = {
  list: PropTypes.array,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  optionsMargin : PropTypes.string,
  optionsWrap: PropTypes.bool,
}
Switcher.defaultProps = {
  list: [],
  onChange: null,
  optionsWrap: true,
}