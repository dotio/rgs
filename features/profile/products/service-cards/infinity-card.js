import React from 'react'
import {Text} from '../../../../ui/text'
import {ServiceCardWell} from './service-card-well'
import styled from 'styled-components'
import {Wrapper} from '../../../../ui/wrapper'
import {media} from '../../../../helpers/media'
import {isMobile} from 'react-device-detect'
import {Icon} from '../../../../ui/icon'
import {CardTooltip} from '../components/card-tooltip'
import {useDispatch} from 'react-redux'
import {TitleText} from '../../../../ui/title-text'

const ContentWrapper = styled(Wrapper)`
  height: 100%;
  position: relative;
  
  ${media.mobile`
    min-height: 103px;
  `}
`

const IconWrapper = styled(Wrapper)`
  position: relative;
`

export const InfinityCard = ({title, description, count}) => {
  const dispatch = useDispatch()

  return(
    <ServiceCardWell color={'black05'} padding={'16px'} mobilePadding={'12px'}>
      <ContentWrapper justify={'space-between'} flow={'column'} gap={'12px'}>
        <Wrapper justify={'space-between'}>
          <Text width={'auto'} align={'left'} color={'black'}>{title}</Text>
          {isMobile && description ? <IconWrapper
            width={'auto'}
            onClick={() => dispatch.modal.addAndShowModal({type: 'product-card-modal', data: {title, description}})}
          >
            <Icon type={'info'} width={20} height={20} color={'black50'} cursor={'pointer'}/>
          </IconWrapper> : description && <CardTooltip description={description}/>}
        </Wrapper>
        {<TitleText width={'auto'} align={'left'}>{count}</TitleText>}
      </ContentWrapper>
    </ServiceCardWell>
  )}