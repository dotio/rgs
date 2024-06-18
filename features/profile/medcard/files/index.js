import React from 'react'
// import {Container} from '../../../../ui/grid/container'
// import {FiltersTemplate} from '../../../../templates/filters'
import {Wrapper} from '../../../../ui/wrapper'
import {useSelector} from 'react-redux'
// import {useDebouncedEffect} from '../../../../helpers/debounce'
import {FileItem} from './components/file-item'
import {mimeTypeChecker} from '../../../../ui/helpers/mimeType-checker'
// import {getTranslator} from '../../../../utils/translation'

export const FilesListComponent = () => {
  // const dispatch = useDispatch()
  const files = useSelector(state => state.profileMedcard.files.items)
  // const filters = useSelector(state => state.profileMedcard.files.filters)
  // const [searchText, setSearchText] = useState(useSelector(state => state.profileMedcard.files.filters.search))
  // const translator = useSelector(state => getTranslator(state.localization))

  // useDebouncedEffect(() => dispatch.profileMedcard.updateFilesFilters({search: searchText}), 500, [searchText])
  //
  // const getFilters = () => {
  //   return [
  //     {
  //       type: 'search',
  //       key: 'search',
  //       value: searchText,
  //       placeholder: translator('files.list.search.placeholder', true),
  //     },
  //     {
  //       type: 'simple-date-time',
  //       key: 'date',
  //       value: filters.date,
  //     },
  //   ]
  // }
  //
  // const handleChange = (field, value) => {
  //   if (field === 'search') {
  //     setSearchText(value)
  //     return
  //   }
  //
  //   dispatch.profileMedcard.updateFilesFilters({
  //     [field]: value,
  //   })
  // }

  return (
    <>
      <Wrapper padding={'0 0 16px'} mobilePadding={'0 0 12px'}>
        {/*<Container>*/}
        {/*  <FiltersTemplate filters={getFilters()} onChange={handleChange} />*/}
        {/*</Container>*/}
      </Wrapper>
      {files.map(file => <FileItem
        key={file.id}
        id={file.id}
        dateInsert={file.insertDate}
        mimeType={file.mimeType}
        items={files}
        item={file}
        url={file.url}
        img={mimeTypeChecker(file.mimeType) || file.thumbnail}
      />)}
    </>
  )
}
