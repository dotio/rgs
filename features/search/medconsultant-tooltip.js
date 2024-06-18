import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {Icon} from '../../ui/icon'
import {Popover} from '../../ui/popover'
import {Text} from '../../ui/text'
import {Wrapper} from '../../ui/wrapper'
import {Img} from '../../ui/img'
import {getColor} from '../../ui/helpers/getColor'
import {getTranslator} from '../../utils/translation'
import {useDispatch, useSelector} from 'react-redux'
import {isMobile} from 'react-device-detect'
import {media} from '../../helpers/media'

const RelativeWrapper = styled.div`
  position: relative ;
  width: auto;
  display: inline;
  
  ${p => media.mobile(p.isSearch && css`
    position: static;
  `)}
`

const AvatarBox = styled.div`
  overflow: hidden;
  width: 48px;
  height: 48px;
  border-radius: 100px;
  ${(p) => p.primary && `
    z-index: 1;
  `}
`
const StyledImg = styled(Img)`
  background: linear-gradient(116.57deg, #00B0D7 16.67%, #21CDD8 86.11%);
  transform: scale(1.6) translate(3px, 3px);
  ${(p) => p.primary && css`
    background: ${getColor('gradPrimary', p.theme)};
  `}
`

export const MedconsultantTooltip = ({modal, isSearch}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)

  return (
    <RelativeWrapper isSearch={isSearch}
      onMouseEnter={() => !isMobile && !isOpen && setOpen(true)}
      onMouseLeave={() => !isMobile && isOpen && setOpen(false)}
      onClick={() => isMobile && dispatch.modal.addAndShowModal({type: 'tooltip-modal'})}
    >
      {isOpen && <Popover type={'top'} top={isSearch ? '0' : 'auto'} bottom={isSearch  ? 'auto' : (modal ? '-260px' : '28px')} left={'-140px'} isOpen={isOpen} width={'320px'}>
        <Wrapper flow={'column'} padding={'12px 12px 8px'} gap={'4px'}>
          <Wrapper gap={'-10px'} padding={'0 0 8px'}>
            <AvatarBox primary>
              <StyledImg primary src={'static/avatars/mk_woman.png'} width={'48px'} height={'48px'} />
            </AvatarBox>
            <AvatarBox>
              <StyledImg src={'static/avatars/mk_man.png'} width={'48px'} height={'48px'} />
            </AvatarBox>
          </Wrapper>
          <Text
            color={'white'}
            size={'16px'}
            lineHeight={'24px'}
            dangerouslySetInnerHTML={{__html: translator('search.result.tooltip.title', true)}}
          />
          <Wrapper gap={'12px'} justify={'flex-start'}>
            <Wrapper align={'center'} gap={'6px'} width={'auto'}>
              <Icon type={'shield'} color={'primary'} width={16} height={16}/>
              <Text color={'primary'} size={'16px'} lineHeight={'24px'} width={'auto'}>
                {translator('search.result.tooltip.private', true)}
              </Text>
            </Wrapper>
            <Wrapper align={'center'} gap={'6px'} width={'auto'}>
              <Icon type={'clock'} color={'primary'} width={16} height={16}/>
              <Text color={'primary'} size={'16px'} lineHeight={'24px'} width={'auto'}>
                {translator('search.result.tooltip.clock', true)}
              </Text>
            </Wrapper>
          </Wrapper>
          <Text color={'black50'} size={'16px'} lineHeight={'24px'}>
            {translator('search.result.tooltip.description', true)}
          </Text>
        </Wrapper>
      </Popover>}
      <Icon type={'mk_logo'} width={24} height={24}/>
    </RelativeWrapper>
  )
}

MedconsultantTooltip.propTypes = {
  modal: PropTypes.bool,
}
