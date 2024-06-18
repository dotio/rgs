import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Wrapper} from '../../../../ui/wrapper'
import {TitleText} from '../../../../ui/title-text'
import {Icon} from '../../../../ui/icon'
import {T} from '../../../../utils/translation'

const ClickableWrapper = styled(Wrapper)`
  cursor: pointer;
`

export const AddContentBlock = ({onAddContent}) => (
  <ClickableWrapper justify={'flex-start'} align={'center'} gap={'6px'} width={'auto'} onClick={onAddContent}>
    <TitleText width={'auto'} color={'black50'}><T ucFirst>profile.medcard.add-content.title</T></TitleText>
    <Icon type={'circle_plus'} color={'black50'} width={24} height={24} />
  </ClickableWrapper>
)

AddContentBlock.propTypes = {
  onAddContent: PropTypes.func
}