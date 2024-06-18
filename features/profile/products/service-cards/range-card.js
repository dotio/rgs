import React from 'react'
import {Text} from '../../../../ui/text'
import {ServiceCardWell} from './service-card-well'
import {InfoWrapper} from './info-wrapper'
import {ContentWrapper} from './content-wrapper'
import styled from 'styled-components'
import {Wrapper} from '../../../../ui/wrapper'
import {isMobile} from 'react-device-detect'
import {Icon} from '../../../../ui/icon'
import {CardTooltip} from '../components/card-tooltip'
import {useDispatch} from 'react-redux'
import {media} from '../../../../helpers/media'

const IconWrapper = styled(Wrapper)`
  position: relative;
`

const StyledInfoWrapper = styled(InfoWrapper)`
  height: 100%;
  position: relative;
  
  ${media.mobile`
    min-height: 103px;
  `}
`

export const RangeCard = ({title, from, to, description}) => {
  const dispatch = useDispatch()

  return(
    <ServiceCardWell color={'black05'} padding={'16px'}  mobilePadding={'12px'}>
      <StyledInfoWrapper>
        <ContentWrapper>
          <Wrapper justify={'space-between'}>
            <Text width={'auto'} align={'left'} color={'black'}>{title}</Text>
            {isMobile && description ? <IconWrapper
              width={'auto'}
              onClick={() => dispatch.modal.addAndShowModal({type: 'product-card-modal', data: {title, description}})}
            >
              <Icon type={'info'} width={20} height={20} color={'black50'} cursor={'pointer'}/>
            </IconWrapper> : description && <CardTooltip description={description}/>}
          </Wrapper>
        </ContentWrapper>
        <ContentWrapper>
          <Text width={'auto'} align={'left'} size={'28px'} lineHeight={'32px'}>{ `${from} из ${to}`}</Text>
        </ContentWrapper>
      </StyledInfoWrapper>
    </ServiceCardWell>
  )}