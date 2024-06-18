import React, { useState} from 'react'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {Switch} from '../../../ui/switch'
import {useDispatch, useSelector} from 'react-redux'
import {getColor} from '../../../ui/helpers/getColor'
import styled from 'styled-components'
import {T} from '../../../utils/translation'
import {Wrapper} from '../../../ui/wrapper'
import {TitleText} from '../../../ui/title-text'
import {MediumText} from '../../../ui/medium-text'
import {media} from '../../../helpers/media'

const StyledWrapper = styled(Wrapper)`
  padding: 16px 0;
  border-bottom: 1px solid ${p => getColor('black10', p.theme)};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    ${media.mobile`
      padding-bottom: 0;
  `}
  }
  ${media.mobile`
    padding: 18px 0;
  `}
`

const SUBSCRIPTION_MAPPING = [
  {
    title: <T ucFirst>profile.settings.email.title</T>,
    name: 'emailFlag',
    id: 1
  },
  {
    title: <T ucFirst>profile.settings.sms.title</T>,
    name: 'smsFlag',
    id: 2
  },
  {
    title: <T ucFirst>profile.settings.push.title</T>,
    name: 'pushFlag',
    id: 3
  }
]

export const Subscriptions = () => {
  const dispatch = useDispatch()
  const [loading, showLoader] = useState({})
  const settings = useSelector(state => state.profileSettings.settings)

  const handleChange = async (field, subscribe) => {
    if(Object.keys(loading).length > 0) {
      return
    }

    const changeSubscribe = {
      ...subscribe,
      [field]: !subscribe[field]
    }
    showLoader({
      id: subscribe.id,
      name: field,
    })

    await dispatch.profileSettings.updateSubscription(changeSubscribe)

    setTimeout(() => {
      showLoader({})
    }, 200)
  }


  return <Wrapper gap={'6px'} flow={'column'}>
    {settings.subscriptions && settings.subscriptions.map(subscribe => {
      return <Well key={subscribe.id}>
        <Container>
          <TitleText>{subscribe.title}</TitleText>
          <MediumText color={'black50'} padding={'16px 0 0'}>{subscribe.description}</MediumText>
          {SUBSCRIPTION_MAPPING.map(item => {
            if(typeof subscribe[item.name] !== 'boolean'){
              return null
            }
            return <StyledWrapper justify={'space-between'} key={item.name}>
              <MediumText color={'black'}>{item.title}</MediumText>
              <Switch
                active={subscribe[item.name]}
                onClick={Object.keys(loading).length > 0 ? false : () => handleChange(item.name, subscribe)}
                showLoader={(Object.keys(loading).length > 0 && item.name === loading.name && subscribe.id === loading.id)}
              />
            </StyledWrapper>
          })}
        </Container>
      </Well>
    })}
  </Wrapper>
}