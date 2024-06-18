import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {ModalTemplate} from '../../../../templates/modal'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Text} from '../../../../ui/text'
import {media} from '../../../../helpers/media'
import {TitleText} from '../../../../ui/title-text'
import {Img} from '../../../../ui/img'
import {Wrapper} from '../../../../ui/wrapper'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import {Icon} from '../../../../ui/icon'
import {getColor} from '../../../../ui/helpers/getColor'
import {Button} from '../../../../ui/button'
import {OrderRepository} from '../../../order/repository'
import {getTranslator} from '../../../../utils/translation'
import {asyncModal} from '../../../../helpers/hocs/asyncModal'
import {RadioButton} from '../../../../ui/form/radio-button'
import {ProfileRating} from './rating'

// import {Checkbox} from '../../../../ui/form/checkbox'

const StyledWellOuter = styled(Well)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

const StyledWellInner = styled(Well)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
`

const StyledButton = styled(Button)`
  height: 48px;
`

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 80px;
  font-size: 16px;
  line-height: 24px;
  padding: 8px;
  border: 1px solid ${p => getColor('black20', p.theme)};
  border-radius: 16px;
  &:focus, &:active {
    outline: none;
    box-shadow: 0 0 0 2px ${p => getColor('black20', p.theme)};
  }
`

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

// const ConfirmLink = styled.a`
//   margin-left: 6px;
//   color: ${p => getColor('primary', p.theme)};
//   cursor: pointer;
// `

const IconContainer = styled.div`
  position: absolute;
  left: 6px;
  top: -8px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  display: flex;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  cursor: pointer;
  background-color: ${p => getColor('white', p.theme)};
  z-index: 2;
  
  ${media.mobile`
    right: 16px;
    left: auto;
  `}
`

const RelativeContainer = styled(Container)`
  position: relative;
`

// const CheckBoxWrapper = styled(Wrapper)`
//   background-color: ${p => getColor('black05', p.theme)};
//   border-radius: 8px;
// `

const StepContentWrapper = styled(Wrapper)`
   min-height: 370px;
`

const QuestionTitle = styled(Text)`
  ${media.mobile`
      padding: 0 0 20px;
  `}
`

const ProfileRatingModalComp = ({data, current}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))

  const {id, date, specialization, dateStart, doctor, clinic}  = current.order

  const rating = {...data}

  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState('') // обратная связь
  const [currentIndex, setIndex] = useState(0)
  const [radioIndex, setRadioIndex] = useState(-1) // радиоиндекс какого-то хуя записывается как переменная
  // const [checked, setChecked] = useState(false) // для чекбокса
  const currentQuestion = rating.questions && rating.questions[currentIndex] // текущий вопрос

  const answerId = currentQuestion && answers[currentQuestion.id] && answers[currentQuestion.id].answerId

  const onClickRating = async (index) => {
    const currentAnswer = currentQuestion.answers[index]

    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        'questionId': currentQuestion.id,
        'answerId': currentAnswer.id,
      }
    })

    if(currentIndex + 1 === rating.questions.length) {
      const rating = await onSend()
      await dispatch.modal.deleteModal()
      dispatch.modal.addAndShowModal({type: 'total-quality', data: {rating}})
      dispatch.profileMedcard.getOrder(id)
    } else {
      setIndex(currentIndex + 1)
      setRadioIndex(-1)
    }
  }

  useEffect(() => {
    const radioCurrent = currentQuestion ? currentQuestion.answers.findIndex(item => item.id === answerId) : null

    setRadioIndex(radioCurrent)
  }, [currentIndex])

  const onSend = async () => {
    const values = Object.keys(answers).map(key => answers[key])

    try {
      const {rating} = await OrderRepository.setQuality(id, {
        id: data.id,
        answers: values,
        description: feedback
      })
      return rating
    } catch (e) {
      dispatch.modal.deleteModal()
    }
  }

  const renderQuestions = () => {
    const isRadio = currentQuestion.type === 'radio'

    return (
      <StepContentWrapper flow={'column'} justify={'space-between'}>
        <Wrapper flow={'column'}>
          <QuestionTitle
            withMobilePadding={!!currentIndex}
            padding={'0 0 16px 48px'}
            size={'16px'}
            lineHeight={'24px'}
            color={'black50'}
          >
            {translator('profile.medcard.rating-modal.step', true)} {currentIndex + 1} {translator('profile.medcard.rating-modal.step-of', true)} {rating.questions.length}
          </QuestionTitle>
          <Text
            size={'20px'}
            lineHeight={'30px'}
            color={'black'}
            smSize={'16px'}
            smLineHeight={'24px'}
          >
            {currentQuestion.name}
          </Text>
          <Text
            size={'20px'}
            lineHeight={'30px'}
            color={'black50'}
            smSize={'16px'}
            smLineHeight={'24px'}
          >
            {currentQuestion.description}
          </Text>
        </Wrapper>
        {isRadio ? (
          <Wrapper mobilePadding={'20px 0 0 0'} padding={'24px 0 0 0'} flow={'column'}>
            <Wrapper mobileGap={'20px'} gap={'24px'} flow={'column'}>
              {currentQuestion.answers.map((answer, index) => (
                <RadioButton
                  onClick={() => setRadioIndex(index)}
                  checked={radioIndex === index}
                >
                  <Text width={'auto'} padding={'0 0 0 8px'}>{answer.name}</Text>
                </RadioButton>
              ))}
              <Wrapper gap={'16px'} mobileGap={'20px'} flow={'column'}>
                <Wrapper>
                  <StyledButton
                    disabled={radioIndex === -1}
                    onClick={() => onClickRating(radioIndex)}
                  >
                    {translator('profile.medcard.rating-modal.continue', true)}
                  </StyledButton>
                </Wrapper>
                <Text
                  size={'16px'}
                  lineHeight={'24px'} color={'black50'}
                >
                  {translator('profile.medcard.rating-modal.rating-title', true)}
                </Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        ) : (
          <Wrapper gap={'16px'} mobileGap={'20px'} mobilePadding={'20px 0 0 0'} padding={'24px 0 0 0'} flow={'column'}>
            <Wrapper>
              <ProfileRating
                currentIndex={currentQuestion.answers.findIndex(item => item.id === answerId)}
                onClick={onClickRating}
                count={currentQuestion.answers.length}
              />
            </Wrapper>
            <Text
              size={'16px'}
              lineHeight={'24px'} color={'black50'}
            >
              {translator('profile.medcard.rating-modal.rating-title', true)}
            </Text>
          </Wrapper>
        )}
      </StepContentWrapper>
    )
  }

  const renderFeedback = () => (
    <StepContentWrapper flow={'column'} justify={'space-between'}>
      <Wrapper flow={'column'} gap={'16px'}>
        <Wrapper flow={'column'}>
          <QuestionTitle
            padding={'0 0 16px 48px'}
            withMobilePadding={!!currentIndex}
            size={'16px'}
            lineHeight={'24px'}
            color={'black50'}
          >
            {translator('profile.medcard.rating-modal.last-title', true)}
          </QuestionTitle>
          <Text
            size={'20px'}
            lineHeight={'30px'}
            color={'black'}
            smSize={'16px'}
            smLineHeight={'24px'}
          >
            {translator('profile.medcard.rating-modal.say-title', true)}
          </Text>
          <Text
            size={'20px'}
            lineHeight={'30px'}
            color={'black50'}
            smSize={'16px'}
            smLineHeight={'24px'}
          >
            {translator('profile.medcard.rating-modal.review-visible', true)}
          </Text>
        </Wrapper>
        <Wrapper flow={'column'} gap={'6px'}>
          <Text>
            {translator('profile.medcard.rating-modal.review-title', true)}
          </Text>
          <Wrapper flow={'column'} gap={'12px'}>
            <TextArea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={translator('profile.medcard.rating-modal.review-placeholder', true)}
            />
            {/*<CheckBoxWrapper padding={'12px'} gap={'10px'}>*/}
            {/*  <Wrapper width={'auto'}>*/}
            {/*    <Checkbox checked={checked} onClick={() => setChecked(!checked)}/>*/}
            {/*  </Wrapper>*/}
            {/*  <Text>*/}
            {/*    Я согласен на размещение моего отзыва на сайте и принимаю*/}
            {/*    <ConfirmLink>*/}
            {/*      правила и условия размещения отзывов.*/}
            {/*    </ConfirmLink>*/}
            {/*  </Text>*/}
            {/*</CheckBoxWrapper>*/}
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper >
        <StyledButton onClick={onSend} color={'primary'}>
          {translator('profile.medcard.rating-modal.button', true)}
        </StyledButton>
      </Wrapper>
    </StepContentWrapper>
  )

  return (
    <ModalTemplate padding={'0'} mobilePadding={'0'} withoutScroll>
      <StyledWellOuter color={'black05'} padding={'24px 0 0'}>
        <Container>
          <Wrapper flow={'column'} gap={'12px'} padding={'0 0 24px'} mobilePadding={'0 0 20px'} mobileGap={'20px'}>
            <TitleText>{translator('profile.medcard.rating-modal.title', true)}</TitleText>
            {specialization && (
              <TitleText size={'28px'} lineHeight={'32px'} color={'black50'}>
                {specialization && (typeof specialization === 'string' ? specialization : specialization.title)} {moment(date).format('D MMMM')} {translator('profile.medcard.rating-modal.in', false)} {moment(dateStart).format('HH:mm')}
              </TitleText>
            )}
            {doctor && (
              <Wrapper align={'center'}>
                <Img borderRadius={'50%'} width={'24px'} height={'24px'} shrink={'0'} src={doctor.photo ? doctor.photo : '/static/avatars/doctor_empty_big.svg'}/>
                <StyledText size={'20px'} lineHeight={'30px'} color={'black'} padding={'0 0 0 8px'}>{doctor.surname} {doctor.name} {doctor.middlename}</StyledText>
              </Wrapper>
            )}
            {clinic && (
              <Wrapper align={'center'}>
                <Img borderRadius={'4px'} width={'24px'} height={'24px'} shrink={'0'} src={clinic.logo ? clinic.logo : '/static/mocks/clinic.png'}/>
                <StyledText size={'20px'} lineHeight={'30px'} color={'black'} padding={'0 0 0 8px'}>{clinic.name}</StyledText>
              </Wrapper>
            )}
          </Wrapper>
        </Container>
        <StyledWellInner>
          <RelativeContainer>
            {currentIndex > 0 && (
              <IconContainer onClick={() => setIndex(currentIndex - 1)}>
                <Icon type={'long_arrow_left'} width={24} height={24} color={'black40'}/>
              </IconContainer>
            )}
            {currentQuestion && renderQuestions()}
            {false && rating && rating.questions && ( currentIndex === rating.questions.length ) && (
              renderFeedback()
            )}
          </RelativeContainer>
        </StyledWellInner>
      </StyledWellOuter>
    </ModalTemplate>
  )
}

export const ProfileRatingModal = asyncModal(
  ProfileRatingModalComp,
  ({ current }) => {
    return OrderRepository.getQuality(current.order.id)
  }
)