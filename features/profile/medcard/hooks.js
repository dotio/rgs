import {useState, useRef} from 'react'
import {FilesRepository} from '../../medcards/repository/file'

export const useFileUpload = (medcardId, initialFiles = []) => {
  const [files, setFiles] = useState(initialFiles)
  const fileInputRef = useRef(null)

  const onFileAdd = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const fileInputHandler = (e) => {
    e.preventDefault()
    if (!e.target.files[0]) {
      return
    }

    const file = e.target.files[0]
    const title = file.name.split('.').shift()
    FilesRepository.create({file, title, medcardId}).then((uploadedFile) => {
      setFiles([...files, uploadedFile])
    }).catch(() => {})
    e.target.value = ''
  }

  const onFileRename = (file, newTitle) => {
    setFiles(files.map((current) => ({...current, title: current.id === file.id ? newTitle : current.title})))
    FilesRepository.update(file.id, {...file, title: newTitle})
      .then((uploadedFile) => {
        setFiles((files) => files.map((file) => file.id === uploadedFile.id ? uploadedFile : file))
      })
      .catch(() => {})
  }
  const onFileDelete = (file) => {
    FilesRepository.remove(file.id)
      .then(() => setFiles((files) => files.filter((current) => current.id !== file.id)))
      .catch(() => {})
  }

  return {
    fileInputRef,
    onFileAdd,
    fileInputHandler,
    onFileRename,
    onFileDelete,
    files,
  }
}