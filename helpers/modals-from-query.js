import {createQueryParser} from './query'

const parseQuery = createQueryParser({
  modals: 'array',
})
export const openModalsFromQuery = (query, dispatch) => {
  const {modals} = parseQuery(query)
  if (modals && modals.length > 0) {
    dispatch.modal.addAndShowModals(modals.map((modal) => ({type: modal})))
  }
}