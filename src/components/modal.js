import { Variables } from "./variables.js";

export const Modal = (function(){
  // Открытие модального окна
  function openPopup(popup) {
    popup.classList.add('popup_opened');
    setPopupEventListeners(popup);
  }

  // Закрытие модального окна
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    deleteEventListener(popup);
  }

  // Закрытие модального окна по нажатию на оверлей или кнопку закрытия
  function closePopupClick(evt) {
    const popup = Variables.page.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__close-btn'))
      closePopup(popup);
  }

  // Закрытие модального окна по нажатию ESC
  function closePopupEsc(evt) {
    const popup = Variables.page.querySelector('.popup_opened');
    if (evt.key === 'Escape' && popup){
      closePopup(popup);
    }
  }

  // Установка слушателей для модальных окон
  function setPopupEventListeners(popup) {
    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('click', closePopupClick)
  }

  // Удаление слушателей для модальных окон
  function deleteEventListener(popup) {
    document.removeEventListener('keydown', closePopupEsc);
    popup.removeEventListener('click', closePopupClick)
  }

  return {
    // Открытие модального окна изменения профиля
    openPopupEditProfile: function () {
      /*resetForm(Variables.formEditProfile, Variables.settingsForms);
      toggleButtonState(
        Variables.inputEditProfile,
        Variables.btnSubmitEditProfileForm,
        Variables.settingsForms
      );*/
      setUserInfo(Variables.formEditProfile);
      openPopup(Variables.popupEditProfile);
    },
    // Открытие модального окна добавления поста
    openPopupAddPost: function () {
      /*resetForm(Variables.formAddPost, Variables.settingsForms);
      toggleButtonState(
        Variables.inputListAddPost,
        Variables.btnSubmitAddPostForm,
        Variables.settingsForms
      );*/
      openPopup(Variables.popupAddPost);
    },
    // Открытие модального окна с увеличенным изображением
    openPopupFocusImage: function (evt) {
      Variables.focusImage.src = evt.target.src;
      Variables.focusImage.alt = evt.target.alt;
      Variables.popupFocusImage.querySelector('.focus-img__caption').textContent = evt.target.closest('.post').querySelector('.post__title').textContent;
      openPopup(Variables.popupFocusImage);
    },
  }
}());
