import React, {Fragment, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {OtherFiltersModal} from '../filters/components/other-filters-modal'
import {ImageModal} from '../../features/chat/components/image-modal'
import {AccessCameraModal} from '../../features/consultation/access-camera-modal'
import {CheckConnectionModal} from '../../features/consultation/check-connection-modal'
import {ClinicModal} from '../../features/clinics/components/clinic-modal'
import {SelectAddMedcardModal} from '../../features/profile/family/select-add-medcard-modal'
import {AddMedcardModal} from '../../features/profile/family/add-medcard-modal'
import {AddFamilyToProductModal} from '../../features/profile/family/add-to-product-family-modal'
import {EditEmailModal} from '../../features/profile/components/edit-email-modal'
import {ClinicInfoModal} from '../../features/clinics/clinic-info-modal'
import {ClinicInfoMapModal} from '../../features/clinics/components/clinic-map-info-modal'
import {ClinicCartModal} from '../../features/clinics/components/diagnostics-cart-modal'
import {GalleryModal} from '../../features/clinics/gallery-modal'
import {AddToMedcardModal} from '../../features/profile/medcard/add-to-medcard-modal'
import {ProfileRatingModal} from '../../features/profile/medcard/components/rating-modal'
import {DoctorInfoModal} from '../../features/doctors/doctor-info-modal'
import {AddChangeAddressModal} from '../../features/profile/settings/add-change-address-modal'
import {EditPersonalDataModal} from '../../features/profile/medcard/components/edit-personal-data-modal'
import {AnamnesisListFieldEditModal} from '../../features/profile/medcard/components/anamnesis-list-field-edit-modal'
import {AddBankCardModal} from '../../features/profile/components/add-bank-card-modal'
import {NewRecommendationModal} from '../../features/profile/medcard/components/new-recommendation-modal'
import {ControlSettingsModal} from '../../features/consultation/components/control-settings-modal'
import {ProductsSelectionModal} from '../../features/profile/products/products-selection-modal'
import {NewResearchModal} from '../../features/profile/medcard/components/new-research-modal'
import {ProductPayModal} from '../../features/profile/products/product-pay-modal'
import {ProfileProductModal} from '../../features/profile/medcard/components/product-modal'
import {LogoutModal} from '../../features/profile/components/logout-modal'
import {TotalQualityModal} from '../../features/profile/medcard/components/total-quality-modal'
import {NewOrderModal} from '../../features/profile/medcard/components/new-order-modal'
import {NewFileModal} from '../../features/profile/medcard/components/new-file-modal'
import {NewCardModal} from '../../features/profile/components/new-card-modal'
import {EditPassportModal} from '../../features/profile/medcard/components/edit-passport-modal'
import {ShareDoctorModal} from '../../features/doctors/doctor-one/components/share-modal'
import {TextAreaModal} from '../../features/profile/medcard/components/text-area-modal'
import {BloodTypeModal} from '../../features/profile/medcard/components/blood-types-modal'
import {CityAreaModal} from '../../features/left-menu/components/city-area-modal'
import {AddChildrenPhoneModal} from '../../features/profile/family/add-children-phone-modal'
import {ConfirmAddPhoneModal} from '../../features/profile/family/confirm-add-phone-modal'
import {ProductMedicalAdviserModal} from '../../features/profile/products/product-medical-adviser-modal'
import {ProductTelemedicineModal} from '../../features/profile/products/product-telemedicine-modal'
import {ProductSecondMedicalOpinionModal} from '../../features/profile/products/product-second-medical-opinion-modal'
import {DoctorInfoShortModal} from '../../features/doctors/doctor-info-short-modal'
import {AnamnesisListFieldEditScrollModal} from '../../features/profile/medcard/components/anamnesis-list-field-edit-scroll-modal'
import {FeedbackModal} from '../../features/about/components/feedback-modal'
import {DoctorClusterInfoModal} from '../../features/doctors/doctor-cluster-info-modal'
import {ClinicClusterInfoModal} from '../../features/clinics/clinic-cluster-info-modal'
import {ShareClinicModal} from '../../features/clinics/components/share-clinic-modal'
import {CallModal} from '../../features/about/components/call-modal'
import {CallbackModal} from '../../features/about/components/callback-modal'
import {BillInfoModal} from '../../features/profile/settings/bills/bill-info-modal'
import {BillPayModal} from '../../features/profile/settings/bills/bill-pay-modal'
import {MobileModalDropDown} from '../../ui/form/mobile-modal-select-dropdown'
import {SwitcherDropdownModal} from '../filters/ui/switcher-dropdown-modal'
import {SingleListModal} from '../filters/ui/single-list-modal'
import {MultiListModal} from '../filters/ui/multi-list-modal'
import {ServicePayModal} from '../../features/profile/products/service-pay-modal'
import {SearchOnlineModal} from '../../features/search/components/search-modal'
import {ProductPaymentModal} from '../../features/profile/products/components/product-payment-modal'
import {ProductCardModal} from '../../features/profile/products/components/card-modal'
import {TooltipModal} from '../../features/search/components/tooltip-modal'
import styled from 'styled-components'
import {MedcardLoginModal} from '../../features/profile/family/medcard-login-modal'
import {ExistMedcardModal} from '../../features/profile/family/exist-medcard-modal'
import {ModalRatingPage} from '../rating/page-rating-modal'

const modals = {
  'clinic-modal': ClinicModal,
  'other-filters': OtherFiltersModal,
  'image': ImageModal,
  'access-camera': AccessCameraModal,
  'check-connection': CheckConnectionModal,
  'select-add-medcard' : SelectAddMedcardModal,
  'add-medcard' : AddMedcardModal,
  'login-medcard' : MedcardLoginModal,
  'exist-medcard' : ExistMedcardModal,
  'edit-email' : EditEmailModal,
  'clinic-info-modal': ClinicInfoModal,
  'clinic-info-map-modal': ClinicInfoMapModal,
  'clinic-cart': ClinicCartModal,
  'gallery-modal': GalleryModal,
  'add-to-medcard': AddToMedcardModal,
  'doctor-rating-modal': ProfileRatingModal,
  'total-quality': TotalQualityModal,
  'doctor-info' : DoctorInfoModal,
  'edit-personal-data': EditPersonalDataModal,
  'add-change-address' : AddChangeAddressModal,
  'anamnesis-list-edit': AnamnesisListFieldEditModal,
  'anamnesis-list-edit-scroll': AnamnesisListFieldEditScrollModal,
  'add-bank-card': AddBankCardModal,
  'new-recommendation': NewRecommendationModal,
  'control-settings' : ControlSettingsModal,
  'product-buy': ProfileProductModal,
  'products-selection-modal': ProductsSelectionModal,
  'new-research-modal': NewResearchModal,
  'product-pay-modal': ProductPayModal,
  'logout': LogoutModal,
  'new-order-modal': NewOrderModal,
  'new-file': NewFileModal,
  'new-card': NewCardModal,
  'edit-passport': EditPassportModal,
  'share-doctor-modal': ShareDoctorModal,
  'text-area-modal': TextAreaModal,
  'blood-types': BloodTypeModal,
  'city-area' : CityAreaModal,
  'add-child-phone': AddChildrenPhoneModal,
  'confirm-add-phone': ConfirmAddPhoneModal,
  'product-medical-adviser-modal': ProductMedicalAdviserModal,
  'product-telemedicine-modal': ProductTelemedicineModal,
  'product-second-medical-opinion-modal': ProductSecondMedicalOpinionModal,
  'add-to-product-family-modal': AddFamilyToProductModal,
  'doctor-info-short' : DoctorInfoShortModal,
  'feedback-modal': FeedbackModal,
  'doctor-cluster-info': DoctorClusterInfoModal,
  'clinic-cluster-info': ClinicClusterInfoModal,
  'share-clinic-modal': ShareClinicModal,
  'call-about-modal': CallModal,
  'callback-modal': CallbackModal,
  'bill-info-modal': BillInfoModal,
  'bill-pay-modal': BillPayModal,
  'mobile-modal-drop-down': MobileModalDropDown,
  'switcher-dropdown-mobile': SwitcherDropdownModal,
  'single-list-mobile': SingleListModal,
  'multi-list-mobile': MultiListModal,
  'service-pay-modal': ServicePayModal,
  'search-online-modal': SearchOnlineModal,
  'product-payment-modal': ProductPaymentModal,
  'product-card-modal': ProductCardModal,
  'tooltip-modal': TooltipModal,
  'modal-rating-page': ModalRatingPage,
}

const ModalCompWrapper = styled.div`
  z-index: ${p => p.zIndex};
  position: relative;
  height: 100vh;
  width: 100%;
`

export const ModalRoot = () => {
  const modal = useSelector(state => state.modal)

  const freezeVp = (e) => {
    e.preventDefault()
  }

  const stopBodyScrolling = (value) => {
    if (value) {
      document.body.addEventListener('touchmove', freezeVp, false)
    } else {
      document.body.removeEventListener('touchmove', freezeVp, false)
    }
  }

  useEffect(() => {
    if(modal.queue.length > 0) {
      document.body.setAttribute('data-modal-active', true)
      document.documentElement.setAttribute('data-modal-active', true)
      stopBodyScrolling(true)
    } else {
      document.body.setAttribute('data-modal-active', false)
      document.documentElement.removeAttribute('data-modal-active', false)
      stopBodyScrolling(false)
    }
  }, [modal.queue])

  if (!modal.current || !modal.current.type) {
    return null
  }

  return (
    <Fragment>
      {modal.queue.map((element, index) => {
        const ModalComponent = modals[element.type]
        return (
          <ModalCompWrapper key={element.type} zIndex={modal.queue.length > 0 ? modal.queue.length - index + 11000 : 11000}>
            <ModalComponent current={element} />
          </ModalCompWrapper>
        )
      })}
    </Fragment>
  )
}