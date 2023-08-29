import { Variables } from "./variables.js";
import { Utils } from "./utils.js";
import { Card } from "./card.js"

export const Modal = (function(){
  // Заполнение формы для изменения информации о пользователе
  // текущей информацией
  function setUserInfo(form) {
    form.username.value = Variables.profileName.textContent.trim();
    form.user_info.value = Variables.profileAbout.textContent.trim();
}

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

  // Открытие модального окна изменения профиля
  function openPopupEditProfile () {
    Utils.resetForm(Variables.formEditProfile, Variables.settingsForms);
    setUserInfo(Variables.formEditProfile);
    Utils.toggleButtonState(
      Variables.inputEditProfile,
      Variables.btnSubmitEditProfileForm,
      Variables.settingsForms
    );
    openPopup(Variables.popupEditProfile);
  }

  // Открытие модального окна добавления поста
  function openPopupAddPost () {
    Utils.resetForm(Variables.formAddPost, Variables.settingsForms);
    Utils.toggleButtonState(
      Variables.inputListAddPost,
      Variables.btnSubmitAddPostForm,
      Variables.settingsForms
    );
    openPopup(Variables.popupAddPost);
  }

  // Открытие модального окна с увеличенным изображением
  function openPopupFocusImage (evt) {
    Variables.focusImage.src = evt.target.src;
    Variables.focusImage.alt = evt.target.alt;
    Variables.popupFocusImage.querySelector('.focus-img__caption').textContent = evt.target.closest('.post').querySelector('.post__title').textContent;
    openPopup(Variables.popupFocusImage);
  }

  // Сохранение измененной информации о пользователе
  function submitEditProfileForm (evt) {
    evt.preventDefault();
    const form = Variables.popupEditProfile.querySelector('.form');
    Variables.profileName.textContent = form.username.value;
    Variables.profileAbout.textContent = form.user_info.value;
    closePopup(Variables.popupEditProfile);
  }

  return {
    closePopup,
    openPopupEditProfile,
    openPopupAddPost,
    openPopupFocusImage,
    submitEditProfileForm,
  }
}());
