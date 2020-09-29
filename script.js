//Константы
const api = new Api('https://nomoreparties.co/cohort12', 
  headers = {
    authorization: 'f0ef6521-7d4a-46a8-b967-9fadfac4c6f5',
    'Content-Type': 'application/json'
  } 
);

const placesList = document.querySelector('.places-list');
const cardList = new CardList(placesList, createCardFn)
const previewPop = new PreviewPopup(document.querySelector('.popup_preview-image'))

const formEditInfo = document.querySelector('.popup__form_edit-info')
const editPopup = new Popup(document.querySelector('.popup_edit'))
const buttonOpenInfo = document.querySelector('.user-info__edit')
const editInfoFormValidator = new FormValidator(document.querySelector('.popup__form_edit-info'))
const editInfo = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'))
const editInfoPopup = new EditInfoPopup(document.querySelector('.popup_edit'), document.querySelector('.popup__form_edit-info'), editInfo)

//Новое место
const buttonOpenAddPlace = document.querySelector('.user-info__button');
const addPlaceFormValidator = new FormValidator(document.querySelector('.popup__form_new-place'))
const addNewPlacePopup = new AddNewPlacePopup(document.querySelector('.popup_new-place'), document.querySelector('.popup__form_new-place'), cardList, api)
const formNewPlace = new Form(document.querySelector('.popup__form_new-place'), addPlaceFormValidator)
const submitNewPlace = document.querySelector('.popup__button_new-place');


//Аватарка
const avatarButton = document.querySelector('.user-info_avatar')
const avatarPopup = new AvatarPopup(document.querySelector('.popup_avatar'))
const avatarFormValidator = new FormValidator(document.querySelector('.popup__form_avatar'))
const formAvatar = new Form(document.querySelector('.popup__form_avatar'),avatarFormValidator)

avatarButton.addEventListener('click', () =>{
  formAvatar.res()
  avatarFormValidator.clearErrors()  
  avatarPopup.open()
})

//Обработчик на сабмит формы по смене инфо о себе: при сабмите делается запрос и устанавливаются значения из инпутов, после попап закрывается
formEditInfo.addEventListener('submit',() => {
  event.preventDefault()
  api.patchInfoProfile(formEditInfo.elements.name.value, formEditInfo.elements.job.value)
  .then(() => {
    editInfo.updateUserInfo(formEditInfo.elements.name.value, formEditInfo.elements.job.value.value)
    editPopup.close()
  })
  .catch((err) => {
    console.log(err)
  })
})

//Функция создания карточки
function createCardFn(name, link)  {
    return new Card(name, link, previewPop).create()
}

//Обработчик на открытие попапа редактирования информации о себе
buttonOpenInfo.addEventListener('click', () => {
    formEditInfo.name.value = editInfo.name
    formEditInfo.job.value = editInfo.job
    editInfoFormValidator.clearErrors()
    editPopup.open()
})
//Обработчик на открытие попапа на добавление карточки
buttonOpenAddPlace.addEventListener('click', () => {
    submitNewPlace.classList.add('popup__button_disable')
    addPlaceFormValidator.clearErrors()
    formNewPlace.res()
    addNewPlacePopup.open()
})


//Обработчики событий
addNewPlacePopup.setEventListener()
editInfoPopup.setEventListener()
addPlaceFormValidator.setEventListener();
editInfoFormValidator.setEventListener();
avatarFormValidator.setEventListener();


//Запрос на получение карточек с сервера их отрисовки
api.getCards()
.then((result) => {
  cardList.render(result);
})
.catch((err) => {
  console.log(err);  
});
//Запрос на получение данных профиля с сервера
api.getInfoProfile()
.then((result) => {
  editInfo.updateUserInfoFromServer(result)
})
.catch((err) => {
  console.log(err)
})






