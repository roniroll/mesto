import Popup from './Popup.js'
export default class AddNewPlacePopup extends Popup {
    constructor(popupContainer, form, cardList, api) {
        super(popupContainer)
        this.form = form
        this.cardList = cardList
        this.api = api

    }

    setEventListener() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault()
            this.cardList.addCard(this.form.name.value, this.form.link.value)
            this.close()
            this.form.reset()
        })
    }
}