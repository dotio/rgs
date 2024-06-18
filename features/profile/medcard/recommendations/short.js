import React, {useState} from 'react'
import styled from 'styled-components'
import {uniq} from 'ramda'
import {Wrapper} from '../../../../ui/wrapper'
import {media} from '../../../../helpers/media'
import {useSelector, useDispatch} from 'react-redux'
import {ShortAttachmentBlock} from '../components/short-attachment-block'
import {FilterButton} from '../../../../ui/filter/filter-button'
import {SectionTitle} from '../../components/section-title'
import {AddContentBlock} from '../components/add-content-block'
import {Container} from '../../../../ui/grid/container'
import {getTranslator} from '../../../../utils/translation'
import {Icon} from '../../../../ui/icon'

const DEFAULT_VISIBLE_SPECIALIZATIONS = 5

const ScrollableWrapper = styled(Wrapper)`
  ${media.mobile`
    overflow-x: auto;
    flex-wrap: nowrap;
  `}
`

const StyledFilterButton = styled(FilterButton)`
  margin-right: 8px;
  margin-bottom: 8px;
`

const IconWrapper = styled.div`
  margin-right: 6px;
`

const RecommendationsShort = ({medcardId}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const recommendationsData = useSelector(state => state.profileMedcard.recommendations)
  const recommendations = recommendationsData.items.filter(({id}) => !!id)
  const specializations = uniq(recommendations.map((recommendation) => recommendation.specialization))
  const [activeFilter, setActiveFilter] = useState(null)
  const [isOpen, setOpen] = useState(false)

  const isShowAllButtonVisible = specializations.length > DEFAULT_VISIBLE_SPECIALIZATIONS && !isOpen
  const filteredSpecializations = isOpen ? specializations : specializations.slice(0, DEFAULT_VISIBLE_SPECIALIZATIONS - 1)

  const changeSpecialization = id => {
    const specializationId = activeFilter === id ? null : id
    setActiveFilter(specializationId)
  }

  const openNewRecommendationModal = () => dispatch.modal.addAndShowModal({type: 'new-recommendation', medcardId})

  return (
    <Container>
      <SectionTitle
        title={translator('profile.medcard.reccomnedations-short.title', true)}
        count={recommendationsData.total}
        padding={'0 0 8px'}
        pointer
        link={recommendations.length > 0 ? `/profile/${medcardId}/medcard/recommendations` : ''}
      />
      {recommendations.length ?
        <>
          <ScrollableWrapper padding={'0 0 8px 0'} flexWrap>
            {filteredSpecializations.map((specialization) => (
              <StyledFilterButton
                key={specialization.id}
                selected={activeFilter === specialization.id}
                onClick={() => changeSpecialization(specialization.id)}
              >
                {specialization.title}
              </StyledFilterButton>
            ))}
            {isShowAllButtonVisible && <StyledFilterButton onClick={() => setOpen(true)}>
              <Wrapper justify={'center'} align={'center'}>
                <IconWrapper>
                  <Icon type={'dots_16'} color={'black50'} width={16} height={16} />
                </IconWrapper>
                {translator('profile.medcard.reccomnedations-short.filter-all', true)}
              </Wrapper>
            </StyledFilterButton>}
          </ScrollableWrapper>
          <ScrollableWrapper gap={'12px'}>
            {recommendations.filter(item => !activeFilter || activeFilter === item.specialization.id).slice(0, 3).map(recommendation => (
              <ShortAttachmentBlock
                key={recommendation.id}
                title={recommendation.specialization.title}
                date={recommendation.date}
                link={`/profile/medcard/recommendation/${recommendation.id}`}
                files={recommendation.files}
                comment={recommendation.comment}
              />
            ))}
          </ScrollableWrapper>
        </> :
        <Wrapper padding={'8px 0 0'}>
          <AddContentBlock onAddContent={openNewRecommendationModal}/>
        </Wrapper>
      }
    </Container>
  )
}

RecommendationsShort.getInitialProps = async(ctx) => {
  const {reduxStore, query} = ctx
  const medcardId = query.medcardId
  reduxStore.dispatch.profileProducts.getRecommendations({mainMedcardId: medcardId})
}

export default RecommendationsShort