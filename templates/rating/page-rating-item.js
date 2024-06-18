import React, {useState} from 'react'
import {Wrapper} from '../../ui/wrapper'
import {MediumText} from '../../ui/medium-text'
import {Icon} from '../../ui/icon'
import {Popover} from '../../ui/popover'
import styled from 'styled-components'
import {getColor} from '../../ui/helpers/getColor'
import {useDispatch} from 'react-redux'
import {isMobile} from 'react-device-detect'
import {media} from '../../helpers/media'


const AdditionalWrapper = styled(Wrapper)`
  position: relative;
  padding: 16px 16px 24px 16px;
  margin: -16px 0 0 16px;
  border-radius: 16px;
  cursor: pointer;
  
  &:hover svg {
    transform: rotate(180deg);
    fill: ${p => getColor('white', p.theme)};
  }
  
  ${media.mobile`
    padding: 0 0 16px
    margin: 0
  `}
`

const IconWrapper = styled.div`
  display: inline-flex;
  vertical-align: middle;
  padding: 0 0 0 4px;
`

const StyledMediumText = styled(MediumText)`
  word-break: normal;
  
  ${media.mobile`
    width: 50%;
    text-align: right;
  `}
`

export const PageRatingItem = ({title, description, value}) => {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()

  return (
    <AdditionalWrapper
      onMouseEnter={() => !isOpen && setOpen(true)}
      onMouseLeave={() => isOpen && setOpen(false)}
      flow={'column'}
      mobilePadding={{bottom: '16px'}}
    >
      <Wrapper justify={'space-between'}>
        <Wrapper align={'center'} onClick={() => isMobile && dispatch.modal.addAndShowModal({type: 'modal-rating-page', data: {title, description, value}})}>
          <MediumText width={'auto'}>
            {title}
            {description && (
              <IconWrapper width={'auto'}>
                <Icon
                  width={16}
                  height={16}
                  type={'arrow_down'}
                  color={'black40'}
                  cursor={'pointer'}
                />
              </IconWrapper>
            )}
          </MediumText>
        </Wrapper>
        <StyledMediumText width={'auto'} color={'primary'} decoration={'underline'} padding={'0 0 0 70px'}
          smPadding={'0'}
        >
          {value}
        </StyledMediumText>
      </Wrapper>
      {isOpen && !isMobile && <Popover type={'top'} isOpen={isOpen} width={'100%'} left={'0'} top={'0px'} padding={'16px'}>
        <Wrapper flow={'column'}>
          <Wrapper justify={'space-between'}>
            <Wrapper align={'center'} >
              <MediumText width={'auto'} color={'white'}>
                {title}
                {description && (
                  <IconWrapper width={'auto'}>
                    <Icon width={16} height={16} type={'arrow_down'} color={'white'} cursor={'pointer'} />
                  </IconWrapper>
                )}
              </MediumText>
            </Wrapper>
            <StyledMediumText width={'auto'} color={'primary'} decoration={'underline'} padding={'0 0 0 70px'}>
              {value}
            </StyledMediumText>
          </Wrapper>
          <MediumText color={'white50'}>{description}</MediumText>
        </Wrapper>
      </Popover>}
    </AdditionalWrapper>
  )
}