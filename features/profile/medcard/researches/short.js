import styled from 'styled-components'
import {Wrapper} from '../../../../ui/wrapper'
import {media} from '../../../../helpers/media'
import {useDispatch, useSelector} from 'react-redux'
import {ShortAttachmentBlock} from '../components/short-attachment-block'
import {SectionTitle} from '../../components/section-title'
import {AddContentBlock} from '../components/add-content-block'
import {Container} from '../../../../ui/grid/container'
import React from 'react'
import {getTranslator} from '../../../../utils/translation'

const ScrollableWrapper = styled(Wrapper)`
  flex-wrap: wrap;

  ${media.mobile`
    overflow-x: auto;
    flex-wrap: nowrap;
  `}
`

export const ResearchesShort = ({medcardId}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const researchesData = useSelector(state => state.profileMedcard.researches)
  const researches = researchesData.items.filter(({id}) => !!id)
  //const researches = useSelector(state => state.profileMedcard.researches)
  const dispatch = useDispatch()

  const openNewResearchModal = () => {dispatch.modal.addAndShowModal({type: 'new-research-modal', medcardId})}

  return (
    <Container>
      <SectionTitle
        title={translator('profile.medcard.researches-short.title', true)}
        count={researchesData.total}
        withContent={!!researchesData.total}
        padding={'0 0 16px'}
        pointer
        longTitle
        link={researches.length > 0 ? `/profile/${medcardId}/medcard/researches` : ''}
      />
      {researches.length ?
        <ScrollableWrapper gap={'12px'}>
          {researches.slice(0, 3).map(research => (
            <ShortAttachmentBlock
              key={research.id}
              title={research.name}
              date={research.date}
              link={`/profile/medcard/research/${research.id}`}
              files={research.files}
              comment={research.comment}
            />
          ))}
        </ScrollableWrapper> :
        <AddContentBlock onAddContent={openNewResearchModal}/>
      }
    </Container>
  )
}
