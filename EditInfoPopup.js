class EditInfoPopup extends Popup {
    constructor(popupContainer, form, userInfo) {
        super(popupContainer)
        this.form = form
        this.userInfo = userInfo
    }

    setEventListener() {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.userInfo.setUserInfo(this.form.name.value, this.form.job.value)
            this.userInfo.updateUserInfo()
            this.close()
        })
    }
}