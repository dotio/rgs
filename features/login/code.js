import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {CodeInput} from '../../ui/form/code-input'
import {Button} from '../../ui/button'
import {media} from '../../helpers/media'
import {Timer} from '../../ui/timer'
import {Loader} from '../../ui/loader'
import {Text} from '../../ui/text'
import {T} from '../../utils/translation'

const BottomContainer = styled.div`
  padding: ${p => p.isModal ? '88px 0 10px' : '64px 0 0'};
  width: auto;
  
  ${media.mobile`
    text-align: center;
    padding: 40px 0 0;
  `}
  
  ${p => p.isModal && media.mobile`
    text-align: left;
    padding: 40px 0 10px;
  `}
`
const WrongCodeText = styled(Text)`
  margin-top: 12px;
`

const TimerBox = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
`

const LoaderBox = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
`

export const LoginCode = (props) => {
  const {value, onChange, resendCode, nextStep, params, isError, errorMessage, isModal} = props
  const [isResending, setIsResending] = useState(false)

  const handleResending = () => {
    setIsResending(false)
    resendCode()
  }

  return (
    <Fragment>
      <CodeInput
        isModal={isModal}
        value={isError ? '' : value}
        isError={isError}
        code={params.code} // TODO для тестов
        borderRadius={'20px'}
        borderColor={'black20'}
        count={params.count}
        borderSize={'3px'}
        onChange={onChange}
        onSubmit={nextStep}
      />
      {isError &&
        <WrongCodeText
          align={'center'}
          lineHeight={'24px'}
          color={'dangerousRed'}
        >
          {errorMessage}
        </WrongCodeText>
      }
      <BottomContainer isModal={isModal}>
        {isResending
          ? <Button color={'green'} cursor={'pointer'} onClick={handleResending}><T ucFirst>login.recent-code.title</T></Button>
          : <TimerBox>
            <LoaderBox>
              <Loader color={'green'} size={'medium'} show />
            </LoaderBox>
            <Timer seconds={params.resending} endTimer={() => setIsResending(true)}/>
          </TimerBox>
        }
      </BottomContainer>
    </Fragment>
  )
}

LoginCode.propTypes = {
  value: PropTypes.string,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  nextStep: PropTypes.func,
  resendCode: PropTypes.func,
  params: PropTypes.object,
}