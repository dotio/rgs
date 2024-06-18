import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Accordion } from '../../../ui/accordion'
import { AccordionItem } from './diagnostics-accordion-item'

const getIntersection = (arrA, arrB) => {
  const arrAids = arrA.map(({id}) => id)
  const arrBids = arrB.map(({id}) => id)
  return arrAids.filter(id => arrBids.includes(id))
}

const getIntersectionQty = (productIds, cart) => {
  const qty = cart.reduce((sum, {productId, qty}) => {
    if (productIds.includes(productId)) {
      return sum + qty
    } else {
      return sum + 0
    }
  }, 0)
  return new Array(qty)
}

export const DiagnosticsAccordeon = ({ title, diagnostics }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.clinics.cart)
  const selectedProductIds = cart ? getIntersection(diagnostics, cart.map(({productId}) => ({id: productId}))) : []
  const selectedProductQty = selectedProductIds.length > 0 ? getIntersectionQty(selectedProductIds, cart) : []

  const handleClickItem = itemId => {
    if (selectedProductIds.includes(itemId)) {
      const positionId = cart.find(({ productId }) => productId === itemId).id
      dispatch.clinics.deleteProductCart(positionId)
    } else {
      const {id : productId, type: productType} = diagnostics.find(({ id }) => id === itemId)
      dispatch.clinics.addProductCart({productId, productType, qty: 1})
    }
  }

  return (
    <Accordion title={title} selected={selectedProductQty} dividerMargin={'0 0 24px'} smDividerMargin={'0 0 16px'} >
      {diagnostics.map(({ id, name, price }) =>
        <AccordionItem
          key={id}
          itemId={id}
          title={name}
          price={price}
          onClick={handleClickItem}
          active={selectedProductIds.includes(id)}
        />
      )}
    </Accordion>
  )
}

DiagnosticsAccordeon.propTypes = {
  title: PropTypes.string,
  diagnostics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
    }))
  })),
}