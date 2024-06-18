import React from 'react'
import PropTypes from 'prop-types'
import {EditableField} from './editable-field'
import {DataRow} from './data-row'

export const EditableDataRow = ({label, value, editableWhenFilled, onEdit}) => {
  return (
    <DataRow label={label}>
      <EditableField
        value={value}
        emptyText={'Заполнить'}
        editableWhenFilled={editableWhenFilled}
        onClick={onEdit}
      />
    </DataRow>
  )
}

EditableDataRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onEdit: PropTypes.func,
  editableWhenFilled: PropTypes.bool,
}

EditableDataRow.defaultProps = {
  label: null,
  value: null,
  onEdit: null,
}
