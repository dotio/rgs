import {requestApi} from '../../../lib/api'
import {ProfileRepository} from '../repository'
import {AddressesRepository} from '../repository/addresses'
import {CardRepository} from '../repository/card'
import {BillsRepository} from '../repository/bills'

export const initialState = {
  settings: {},
  addresses: [],
  bills: [],
  bankCards: [],
  cardLoaded: false,
  isAddressChange: null,
}

export const profileSettings = {
  state: initialState,
  reducers: {
    setSettings(state, settings) {
      return {
        ...state,
        settings
      }
    },
    setAddresses(state, addresses) {
      return {
        ...state,
        addresses: [...addresses]
      }
    },
    removeAddress(state, addressId) {
      return {
        ...state,
        addresses: [...state.addresses].filter(({id}) => id !== addressId)
      }
    },
    setBills(state, bills) {
      return {
        ...state,
        bills: [...bills]
      }
    },
    setCards(state, cards) {
      return {
        ...state,
        bankCards: cards
      }
    },
    setCardsLoaded(state, value) {
      return {
        ...state,
        cardLoaded: value
      }
    },
    setAddressChange(state, value) {
      return {
        ...state,
        isAddressChange: value
      }
    },
    setActiveCard(state, id) {
      return {
        ...state,
        bankCards: state.bankCards.map((card) => ({...card, active: card.id === id}))
      }
    },
    deleteCard(state, id) {
      return {
        ...state,
        bankCards: state.bankCards.filter((card) => card.id !== id)
      }
    },
  },
  effects: (dispatch) => ({
    async getAddresses() {
      try {
        const addresses = await AddressesRepository.getList()
        this.setAddresses(addresses)
      } catch (e) {
      }
    },
    async getSettings() {
      try {
        const settings = await ProfileRepository.getList()
        this.setSettings(settings)
      } catch (e) {
      }
    },
    async updateSubscription(data) {
      try {
        await requestApi('post', '/profile/subscription', data)
        await this.getSettings()
        return true
      } catch (e) {
      }
    },
    async getBills(params) {
      try {
        const bills = await requestApi('get', '/bills', params)
        this.setBills(bills)
      } catch (e) {
      }
    },
    async buyBill({billId, data}) {
      try {
        await BillsRepository.buyPay(billId, data)
        await this.getBills()
        return true
      } catch (e) {
        return false
      }
    },
    async getCards(force = false, state) {
      if (!force && state.profileSettings.cardLoaded) {
        return
      }

      try {
        const cards = await requestApi('get', '/card')
        this.setCards(cards)
        this.setCardsLoaded(true)
        return true
      } catch (e) {
      }
    },
    async updateCurrentCard(id) {
      try {
        await CardRepository.setActive(id)
        this.setActiveCard(id)
      } catch (e) {
      }
    },
    async removeCard(id) {
      try {
        await CardRepository.remove(id)
        this.deleteCard(id)
      } catch (e) {
      }
    },
    async createAddress(addressInfo) {
      try {
        dispatch.loaders.showLoader()

        const result = await AddressesRepository.create(addressInfo)
        await this.getAddresses()

        return result
      } catch (e) {
        return false

      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async updateAddress({id, address}) {
      try {
        dispatch.loaders.showLoader()

        await AddressesRepository.update(id, address)
        await this.getAddresses()

        return true
      } catch (e) {
        return false

      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async deleteAddress(id) {
      try {
        await AddressesRepository.remove(id)
        this.removeAddress(id)
        return true
      } catch (e) {
        return false
      }
    },
  })
}