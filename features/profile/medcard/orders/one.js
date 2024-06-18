import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {OrderHeaderComponent} from './one-header'
import {RecommendationComponent, ResearchComponent} from './reception-results'
import {ConsultationResultComponent} from './consultation-results'
import {Wrapper} from '../../../../ui/wrapper'
// import {OrderPaymentAlert} from './order-payment-alert'
import {FutureOrderComment} from './future-order-comment'
import moment from 'moment'
import {UploadToOrder} from '../components/upload-to-order'
import {media} from '../../../../helpers/media'
import {isMobile} from 'react-device-detect'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
// import {Img} from '../../../../ui/img'
import {getTranslator} from '../../../../utils/translation'
import {Text} from '../../../../ui/text'
import {uploadedFileExtensionChecker} from '../../../../ui/helpers/uploadedFileExtension-checker'
import {FilesRepository} from '../../../medcards/repository/file'
import {Icon} from '../../../../ui/icon'

const PageBox = styled(Wrapper)`
  position: relative;
  height: calc(100vh - 12px);
  
  ${media.mobile`
    height: calc(100vh - 58px);
  `}
`
const UploadWrapper = styled.div`
  flex-grow: 1;
  ${media.mobile`
    margin-bottom: 58px;
  `}
`

const StyledWell = styled(Well)`
  text-align: center;
  margin-bottom: 58px;
`

const FileInput = styled.input.attrs({type: 'file', accept: ['image/*', '.pdf', '.xls', '.xlsx', '.xlsm', '.doc', '.docx', '.txt']})`
  display: none;
  pointer-events: none;
`

export const OrderOneComponent = ({medcardId}) => {
  const {date, type, comment, result, conclusion, recommendation, research, id} = useSelector(state => state.profileMedcard.currentOrder)
  // const isPaid = payment && payment.status === 'paid'
  const isFuture = moment(date).diff(moment()) > 0
  const translator = useSelector(state => getTranslator(state.localization))
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const mainMedcardId = useSelector(state => state.user.mainMedcardId)
  const backUrl = medcardId === mainMedcardId ? '/profile/medcard' : `/profile/family/${medcardId}/medcard`

  const handleAddFile = () => {
    fileInputRef.current.click()
  }

  const onFileChange = (e) => {
    e.preventDefault()
    if (!e.target.files[0]) {
      return
    }

    const file = e.target.files[0]
    const title = file.name.split('.').shift()
    const preview = URL.createObjectURL(file)
    const fileExtensionAllowed = uploadedFileExtensionChecker(file.name)

    fileExtensionAllowed && setFiles([...files, {
      file,
      title,
      preview,
    }])
    e.target.value = ''

    fileExtensionAllowed && FilesRepository.create({file, title, medcardId})
      .then((file) => {
        dispatch.modal.addAndShowModal({
          type: 'new-file',
          data: {file, backUrl, medcardId}
        })
      })
      .catch(() => {})
  }

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.file))
  }, [files])

  return (
    <PageBox flow={'column'} gap={'6px'}>
      <OrderHeaderComponent medcardId={medcardId}/>
      {type === 'system' && <>
        {isFuture ?
          <>
            {/*{!isPaid && <OrderPaymentAlert date={date}/>}*/}
            <FutureOrderComment comment={comment}/>
          </> :
          <>
            {conclusion && conclusion.length > 0 && <ConsultationResultComponent result={conclusion} conclusion={result} />}
          </>
        }
      </>}
      {type === 'created' && recommendation && <RecommendationComponent recommendation={recommendation} medcardId={medcardId} orderId={id}/>}
      {type === 'created' && research && <ResearchComponent research={research} medcardId={medcardId} orderId={id}/>}
      {isMobile ?
        <StyledWell mobilePadding={'34px 0 32px 0'} onClick={handleAddFile}>
          <Container>
            <Icon type={'circle_plus'} width={24} height={24} color={'primary'}/>
            <Text color={'primary'} size={'20px'} lineHeight={'30px'} align={'center'} padding={'10px 0 0 0'}>{translator('profile.medcard.upload-to-order.title-mobile', true)}</Text>
          </Container>
          <FileInput ref={fileInputRef} onChange={onFileChange} />
        </StyledWell> :
        <UploadWrapper>
          <UploadToOrder medcardId={medcardId} />
        </UploadWrapper>}
    </PageBox>
  )
}

