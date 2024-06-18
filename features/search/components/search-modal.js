import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ModalTemplate} from '../../../templates/modal'
import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {Button} from '../../../ui/button'
import {Img} from '../../../ui/img'
import {Divider} from '../../../ui/divider'
import {MediumText} from '../../../ui/medium-text'
import {Icon} from '../../../ui/icon'
import {media} from '../../../helpers/media'
import {MedcardDropdown} from '../../activation/components/medcard-dropdown'
import {getTranslator} from '../../../utils/translation'
import moment from 'moment'

const TextWrapper = styled(Wrapper)`
  background: ${p => getColor('primary', p.theme)};
  border-radius: 4px;
`

const StyledText = styled(Text)`
  text-transform: uppercase;
`

const Card = styled(Wrapper)`
  border: 1px solid ${p => getColor('black15', p.theme)};
  background-color: ${p => getColor(p.bgColor, p.theme)};
  border-radius: 16px;
  height: 160px;
  cursor: pointer;
  
  ${media.mobile`
    width: 169px;
    min-height: 214px;
    flex-direction: column;
    align-items: flex-start;
  `}
`

const ButtonWrapper = styled(Wrapper)`
  border-radius: 100px;
  background-color: ${p => getColor(p.bgColor, p.theme)};
  transition: background-color 0.3s linear;
  cursor: pointer;
`

const ContentWrapper = styled(Wrapper)`
  height: 100%;
  ${media.mobile`
    order: 1;
  `}
`

const BottomWrapper = styled(Wrapper)`
  ${media.mobile`
     flex-direction: column;
  `}
`

const StyledImg = styled(Img)`
  ${media.mobile`
     width: 88px;
     height: 100px;
  `}
`


export const SearchOnlineModal = () => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const medcards = useSelector(state => state.medcards.list)
  const dutyAvailable = useSelector(state => state.user.dutyAvailable)
  const timezone = useSelector(state => state.user.timezone)
  const [selected, setSelected] = useState('')

  const availableMedcards = (type) => {
    return type === 'pediatr' ? medcards.filter(item => moment().diff(moment(item.birthDate), 'years') < 18) : medcards.filter(item => item.main)
  }
  const [form, setForm] = useState({
    medcardId: medcards.find(item => item.main) ?  medcards.find(item => item.main).id : availableMedcards(selected)[0].id,
    connectionType: 'chat',
    timezone: timezone
  })

  const changeType = async (type) => {
    setSelected(type)
    setForm({...form, medcardId: availableMedcards(type).find(item => item.main) ?  availableMedcards(type).find(item => item.main).id : availableMedcards(type)[0].id})
  }

  const onSubmit = () => {
    dispatch.consultation.createDutyConsultation(form)
  }

  return (
    <ModalTemplate>
      <Container>
        <Wrapper gap={'8px'}>
          <TitleText width={'auto'}>{translator('search.main.example.duty', true)}</TitleText>
          <TextWrapper width={'auto'} align={'center'} justify={'center'} padding={'0px 4px'}>
            <StyledText color={'white'} size={'16px'} bold lineHeight={'20px'} >онлайн</StyledText>
          </TextWrapper>
        </Wrapper>
        <TitleText color={'black50'}>Связь с терапевтом или педиатором за 5 мин. Общение аудио, видео или в чате.</TitleText>
        <Text padding={'24px 0 8px'} color={'black50'}>Выберите специалиста</Text>
        <Wrapper gap={'12px'} mobileGap={'6px'}>
          {dutyAvailable.map(item => {
            if(!item.available) {
              return
            }

            const isSelected = selected === item.code

            return <Card onClick={() => changeType(item.code)} width={'50%'} padding={'16px'} flow={'row'} align={'center'} justify={'space-between'} bgColor={isSelected ? 'primary' : 'transparent'} mobilePadding={'0'}>
              <ContentWrapper flow={'column'} justify={'space-between'} width={'auto'} mobilePadding={'0 16px 16px 16px'}>
                <Wrapper flow={'column'}>
                  <Text size={'20px'} lineHeight={'30px'} smSize={'20px'} smAlign={'24px'} color={isSelected ? 'white' : 'black'}>{item.title}</Text>
                </Wrapper>
                <ButtonWrapper
                  width={'auto'}
                  padding={'5px 11px'}
                  bgColor={isSelected ? 'white' : 'black05'}
                  align={'center'}
                  gap={'6px'}
                >
                  {isSelected && (
                    <Icon shrink={'0'} type={'check'} color={'primary'} height={16} width={16}/>
                  )}
                  <Text width={'auto'} color={isSelected ? 'primary' : 'black'}>
                    {isSelected ? 'Выбрано' : 'Выбрать'}
                  </Text>
                </ButtonWrapper>
              </ContentWrapper>
              <StyledImg src={`/static/${item.code === 'terapevt' ? 'therapist' : 'pediatrician'}_image.png`} width={'140px'} height={'160px'} shrink={'0'}/>
            </Card>
          })}
        </Wrapper>
      </Container>
      <Divider margin={'24px 0'}/>
      <Container>
        <BottomWrapper padding={'0 0 24px'} flow={'column'}>
          <MediumText>Выберите медицинскую карту</MediumText>
          <MediumText color={'black50'}>При обращении к педиатру можно выбрать можно выбирать медицинскую карту как взрослого, так и ребенка</MediumText>
          <Wrapper padding={'24px 0 0'}>
            <MedcardDropdown
              isDutyDoctor
              disabled={selected.length === 0}
              margin={'0'}
              items={availableMedcards(selected)}
              medcardId={form.medcardId}
              onChange={(value) => setForm({...form, medcardId: value})}
              mobileModal={'mobile-modal-drop-down'}
            />
          </Wrapper>
          {/*<MediumText width={'232px'} color={'black50'}>Оплата</MediumText>*/}
          {/*{!adultActive || !childActive ? <Wrapper flow={'column'}>*/}
          {/*  <MediumText>Доктор Онлайн</MediumText>*/}
          {/*  <MediumText color={'black50'}>Спишется 1 консультация</MediumText>*/}
          {/*</Wrapper>*/}
          {/*  : <MediumText>560 ₽</MediumText>}*/}
        </BottomWrapper>
        {/*<Button lineHeight={'30px'} fontSize={'20px'} padding={'8px 15px'} color={'primary'} disabled={!adultActive || !childActive}>{!adultActive || !childActive ? 'Оплатить' : 'Начать онлайн-консультацию'}</Button>*/}
        <Button lineHeight={'30px'} onClick={onSubmit} fontSize={'20px'} padding={'8px 15px'} color={'primary'} disabled={selected.length === 0}>{'Начать онлайн-консультацию'}</Button>
      </Container>
    </ModalTemplate>
  )
}