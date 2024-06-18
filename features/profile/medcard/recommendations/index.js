import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import {Wrapper} from '../../../../ui/wrapper'
import {TitleText} from '../../../../ui/title-text'
import {Text} from '../../../../ui/text'
import {media} from '../../../../helpers/media'
import {Container} from '../../../../ui/grid/container'
import {Well} from '../../../../ui/well'
import {Img} from '../../../../ui/img'
import {Button} from '../../../../ui/button'
import {useDebouncedEffect} from '../../../../helpers/debounce'
import {FiltersTemplate} from '../../../../templates/filters'
import {getTranslator} from '../../../../utils/translation'
import {Link} from '../../../../routes'
import {SectionTitle} from '../../components/section-title'
import {FileCoverComponent, mimeTypeChecker} from '../../../../ui/helpers/mimeType-checker'

const Comment = styled(Text)`
  padding-bottom: 12px;
  font-size: 20px;
  line-height: 30px;
  overflow-wrap: break-word;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`
const ImgWrapper = styled(Wrapper)`
  overflow-x: auto;
`

export const RecommendationsListComponent = ({medcardId}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const recommendations = useSelector(state => state.profileMedcard.recommendations.items.filter(({id}) => !!id))
  const filters = useSelector(state => state.profileMedcard.recommendationsFilters)
  const [searchText, setSearchText] = useState(useSelector(state => state.profileMedcard.recommendationsFilters.search))

  const getFilters = () => {
    return [
      {
        type: 'search',
        key: 'search',
        value: searchText,
        placeholder: translator('profile.medcard.reccomnedations.placeholder', true),
      },
      {
        type: 'specializations',
        key: 'specializationId',
        value:  filters.specializationId,
      },
      {
        type: 'simple-date-time',
        key: 'date',
        value:  filters.date,
      },
    ]
  }

  const onEditClick = ({id, specialization, serviceType, comment, date, files}) => () => dispatch.modal.addAndShowModal({
    type: 'new-recommendation',
    medcardId,
    editForm: {
      id,
      specializationId: specialization.id.toString(),
      orderTypeId: serviceType.id.toString(),
      date,
      comment,
      files
    }
  })

  const handleChange = (field, value) => {
    if(field === 'search') {
      setSearchText(value)
      return
    }

    dispatch.profileMedcard.updateRecommendationsFilters({
      [field]: value
    })
  }

  useDebouncedEffect(() => dispatch.profileMedcard.updateRecommendationsFilters({search: searchText}), 500, [searchText])

  return (
    <>
      <Wrapper padding={'0 0 16px'} mobilePadding={'0 0 12px'}>
        <Container>
          <FiltersTemplate filters={getFilters()} onChange={handleChange}/>
        </Container>
      </Wrapper>
      {recommendations.map((recommendation) => (
        <Wrapper key={recommendation.id} padding={{ bottom: '6px'}}>
          <Well>
            <Container>
              <Wrapper flow={'column'} padding={{bottom: '12px'}}>
                <SectionTitle
                  title={moment(recommendation.date).format('DD MMMM')}
                  padding={'0'}
                  link={`/profile/medcard/recommendation/${recommendation.id}`}
                />
                <TitleText color={'black50'}>{recommendation.specialization.title}</TitleText>
              </Wrapper>
              <Comment>{recommendation.comment}</Comment>
              {recommendation.files && recommendation.files.length > 0 && (
                <ImgWrapper gap={'12px'} padding={{top: '4x', bottom: '20px'}}>
                  {recommendation.files.map(({id, thumbnail, mimeType}) => mimeType.includes('image') ? <Img key={id} src={thumbnail} height={'128px'} />
                    : <FileCoverComponent
                      title={mimeTypeChecker(mimeType)}
                      size={'24px'}
                      lineHeight={'30px'}
                      width={'96px'}
                      height={'128px'}
                    />
                  )}
                </ImgWrapper>
              )}
              <Wrapper gap={'8px'} >
                <Button onClick={onEditClick(recommendation)} color={'black05'}>{translator('profile.medcard.reccomnedations.button-edit', true)}</Button>
                {recommendation.orderId && <Link route={`/profile/medcard/order/${recommendation.orderId}`} passHref>
                  <Button color={'black05'}>{translator('profile.medcard.reccomnedations.button-show', true)}</Button>
                </Link>}
              </Wrapper>
            </Container>
          </Well>
        </Wrapper>
      ))}
    </>
  )
}