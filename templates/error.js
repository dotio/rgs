import React from 'react'
import styled from 'styled-components'
import {TitleText} from '../ui/title-text'

const ErrorWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const ErrorTemplate = () => {
  return (
    <ErrorWrapper>
      <TitleText align={'center'}>
        Данный браузер не поддерживается
      </TitleText>
    </ErrorWrapper>
  )
}