import {FileUploader} from '../../../../ui/file-uploader'
import {useDispatch, useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'
import {FilesRepository} from '../../../medcards/repository/file'
import {uploadedFileExtensionChecker} from '../../../../ui/helpers/uploadedFileExtension-checker'

export const Upload = ({medcardId}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const mainMedcardId = useSelector(state => state.user.mainMedcardId)
  const dispatch = useDispatch()
  const backUrl = medcardId === mainMedcardId ? '/profile/medcard' : `/profile/family/${medcardId}/medcard`

  const fileUploadHandler = (files) => {
    const fileExtensionAllowed = uploadedFileExtensionChecker(files[0].name)

    fileExtensionAllowed && FilesRepository.create({file: files[0], title: files[0].name.split('.').shift(), medcardId})
      .then((file) => {
        dispatch.modal.addAndShowModal({
          type: 'new-file',
          data: {file, backUrl, medcardId}
        })
      })
      .catch(() => {})
  }

  return (
    <FileUploader
      text={translator('profile.medcard.upload.title', true)}
      dragActiveText={translator('profile.medcard.upload.subtitle', true)}
      onChange={fileUploadHandler}
    />
  )
}