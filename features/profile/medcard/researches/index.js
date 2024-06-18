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
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`
const ImgWrapper = styled(Wrapper)`
  overflow-x: auto;
`

const ResearchesListComponent = ({medcardId}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const researches = useSelector(state => state.profileMedcard.researches)
  const filters = useSelector(state => state.profileMedcard.researchesFilters)
  const [searchText, setSearchText] = useState(filters.search)

  const getFilters = () => {
    return [
      {
        type: 'search',
        key: 'search',
        value: searchText,
        placeholder: translator('profile.medcard.reccomnedations.placeholder', true),
      },
      {
        type: 'simple-date-time',
        key: 'date',
        value: filters.date,
      },
    ]
  }

  const handleChange = (field, value) => {
    if(field === 'search') {
      setSearchText(value)
      return
    }

    dispatch.profileMedcard.updateResearchesFilters({
      [field]: value
    })
  }

  const onEditClick = ({id, name, serviceType, comment, date, files}) => dispatch.modal.addAndShowModal({
    type: 'new-research-modal',
    medcardId,
    editForm: {
      id,
      name,
      orderTypeId: serviceType.id.toString(),
      date,
      comment,
      files
    }
  })

  useDebouncedEffect(() => dispatch.profileMedcard.updateResearchesFilters({search: searchText}), 500, [searchText])

  return (
    <>
      <Wrapper padding={'0 0 16px'} mobilePadding={'0 0 12px'}>
        <Container>
          <FiltersTemplate filters={getFilters()} onChange={handleChange}/>
        </Container>
      </Wrapper>
      {researches.items.map(({id, name, date, serviceType, files, comment, orderId}) => (
        <Wrapper key={id} padding={{ bottom: '6px'}}>
          <Well>
            <Container>
              <Wrapper flow={'column'} padding={{bottom: '12px'}}>
                <SectionTitle
                  title={moment(date).format('DD MMMM')}
                  padding={'0'}
                  link={`/profile/medcard/research/${id}`}
                />
                <TitleText>{name}</TitleText>
              </Wrapper>
              <Comment>{comment}</Comment>
              {files && files.length > 0 && (
                <ImgWrapper gap={'12px'} padding={{top: '4x', bottom: '20px'}}>
                  {files.map(({id, thumbnail, mimeType}) => mimeType.includes('image') ? <Img key={id} src={thumbnail} height={'128px'} />
                    : <FileCoverComponent
                      title={mimeTypeChecker(mimeType)}
                      size={'24px'}
                      lineHeight={'30px'}
                      width={'96px'}
                      height={'128px'}
                    />)}
                </ImgWrapper>
              )}
              <Wrapper gap={'8px'} >
                <Button onClick={() => onEditClick({id, name, serviceType, comment, date, files})} color={'black05'}>{translator('profile.medcard.reccomnedations.button-edit', true)}</Button>
                {orderId > 0 && <Link route={`/profile/medcard/order/${orderId}`} passHref>
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

export default ResearchesListComponent