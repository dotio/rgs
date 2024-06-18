export const fileTypeUri = (name) => {
  const arrTitle = name.split('.')
  const extension = arrTitle[arrTitle.length - 1]
  switch (extension) {
    case 'xlsx':
    case 'xls':
      return '/static/icons/file-xls.png'
    case 'docx':
    case 'doc':
      return '/static/icons/file-doc.png'
    case 'pdf':
      return '/static/icons/file-pdf.png'
    default:
      return '/static/icons/file-unknown.png'
  }
}