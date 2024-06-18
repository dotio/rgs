export const uploadedFileExtensionChecker = (filename) => {
  const arrTitle = filename.split('.')
  const extension = arrTitle[arrTitle.length - 1].toLowerCase()
  const allowedTypes = ['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'xlsm', 'pdf']

  return allowedTypes.includes(extension)
}