import React, {useContext, useState} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {useSelector} from 'react-redux'
import {Well} from '../../../ui/well'
import {Wrapper} from '../../../ui/wrapper'
import {RatingLine} from '../../../ui/rating-line'
import {Container} from '../../../ui/grid/container'
import {FormButton} from '../../../ui/buttons/form-button'
import {Icon} from '../../../ui/icon'
import {getColor} from '../../../ui/helpers/getColor'
import {StatusFieldList} from './status-field-list'
import {T} from '../../../utils/translation'
import {TitleText} from '../../../ui/title-text'

const IconWrapper = styled.div`
  padding-left: 6px;
`

export const StatusBlock = () => {
  const theme = useContext(ThemeContext)
  const status = useSelector((state) => state.profileMedcard.status)
  const [statusVisible, setStatusVisible] = useState(false)

  return (
    <Well>
      <Container>
        <RatingLine
          ratingValue={status.filledPercent / 10}
          colorFrom={getColor('secondary', theme)}
          colorTo={getColor('green', theme)}
          maxValue={10}
        />
        <TitleText color={'green'} padding={'16px 0 0'}>
          <T ucFirst>profile.medcard.status.title</T> {status.filledPercent}%
        </TitleText>
        <TitleText color={'black50'}>
          <T ucFirst>profile.medcard.status.subtitle</T>
        </TitleText>
        {status.filledPercent < 100 && !statusVisible && <Wrapper padding={'16px 0 0'}>
          <FormButton margin={'0'} onClick={() => setStatusVisible(true)}>
            <T ucFirst>profile.medcard.status.left</T>
            <IconWrapper><Icon type={'dots'} width={16} height={16} shrink={'0'} color={'black50'}/></IconWrapper>
          </FormButton>
        </Wrapper>}
        {status.filledPercent < 100 && statusVisible && <Wrapper flow={'column'}>
          <StatusFieldList fields={status.fields}/>
          <Wrapper mobilePadding={'12px 0 0'}>
            <FormButton margin={'0'} onClick={() => setStatusVisible(false)}>
              <T ucFirst>profile.medcard.status.close</T>
            </FormButton>
          </Wrapper>
        </Wrapper>}
      </Container>
    </Well>
  )
}
