class Popup {
    constructor(popupContainer) {
        this.popupContainer = popupContainer;
        const buttonClose = this.popupContainer.querySelector('.popup__close')
        buttonClose.addEventListener('click', () => {
            this.close()
        })
    }

    open() {
        this.popupContainer.classList.add('popup_is-opened');
    }

    close() {
        this.popupContainer.classList.remove('popup_is-opened');
    }
}
