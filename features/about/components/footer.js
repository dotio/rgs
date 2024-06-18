import React from 'react'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {CardWithIcon} from '../../../features/profile/medcard/components/card-with-icon'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {getTranslator} from '../../../utils/translation'
import {useDispatch, useSelector} from 'react-redux'
import {TitleText} from '../../../ui/title-text'
import {Wrapper} from '../../../ui/wrapper'
import {media} from '../../../helpers/media'

const FeedbackContentWrapper = styled(Wrapper)`
  overflow: auto;
  flex-wrap: nowrap;
`

const CardWrapper = styled(Wrapper)`
  height: 120px;
  width: 171px;
  ${media.mobile`
    min-width: 146px;
    width: 146px;
    height: 120px;
  `}
`

export const FooterBody = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  const dispatch = useDispatch()

  const startConsultation = async () => {
    dispatch.loaders.showLoader()
    await dispatch.consultation.createOrGoToActive({type: 'chat', redirect: true})
    dispatch.loaders.hideLoader()
  }

  return (
    <Well color={'transparent'}>
      <Container>
        <TitleText color={'black'} padding={'0 0 12px'}>
          {translator('about.footer.title', true)}
        </TitleText>
        <FeedbackContentWrapper gap={'12px'}>
          <CardWrapper>
            <CardWithIcon
              onClick={() => startConsultation()}
              icon={'chat_icon'}
              bgColor={'white'}
              labelComponent={
                <Text size={'20px'} width={'85px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
                  {translator('about.footer.chat', true)}
                </Text>
              }
            />
          </CardWrapper>
          {/*<CardWrapper>*/}
          {/*  <CardWithIcon*/}
          {/*    onClick={() => dispatch.modal.addAndShowModal({type: 'callback-modal'})}*/}
          {/*    icon={'phone_icon'}*/}
          {/*    iconColor={'black40'}*/}
          {/*    bgColor={'white'}*/}
          {/*    labelComponent={*/}
          {/*      <Text size={'20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>*/}
          {/*        {translator('about.footer.callback', true)}*/}
          {/*      </Text>*/}
          {/*    }*/}
          {/*  />*/}
          {/*</CardWrapper>*/}
          {/*<CardWrapper>*/}
          {/*<CardWithIcon*/}
          {/*onClick={() => dispatch.modal.addAndShowModal({type: 'feedback-modal', medcardId})}*/}
          {/*icon={'msg_icon'}*/}
          {/*iconColor={'black40'}*/}
          {/*bgColor={'white'}*/}
          {/*labelComponent={*/}
          {/*<Text size={'20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>*/}
          {/*{translator('about.footer.mail', true)}*/}
          {/*</Text>*/}
          {/*}*/}
          {/*/>*/}
          {/*</CardWrapper>*/}
          <CardWrapper>
            <CardWithIcon
              onClick={() => dispatch.modal.addAndShowModal({type: 'call-about-modal'})}
              icon={''}
              iconColor={'black40'}
              bgColor={'white'}
              labelComponent={
                <Text size={'20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
                  {translator('about.footer.call', true)}
                </Text>
              }
            />
          </CardWrapper>
        </FeedbackContentWrapper>
      </Container>
    </Well>
  )
}