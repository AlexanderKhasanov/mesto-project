import { Variables } from "./variables.js";
import { Utils } from "./utils.js";
import { API } from "./api.js";
import { Post } from "./post.js";


export const Modal = (function(){
  function _editTextSubmitButton(button, textButton) {
    button.textContent = textButton;
  }

  // Заполнение формы для изменения информации о пользователе
  // текущей информацией
  function _setUserInfoInForm(form) {
    form.username.value = Variables.profileName.textContent.trim();
    form.user_info.value = Variables.profileAbout.textContent.trim();
  }

  // Открытие модального окна
  function _openPopup(popup) {
    popup.classList.add('popup_opened');
    _setPopupEventListeners(popup);
  }

  // Закрытие модального окна по нажатию на оверлей или кнопку закрытия
  function _closePopupClick(evt) {
    const popup = Variables.page.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__close-btn'))
      closePopup(popup);
  }

  // Закрытие модального окна по нажатию ESC
  function _closePopupEsc(evt) {
    if (evt.key === 'Escape'){
      const popup = Variables.page.querySelector('.popup_opened');
      closePopup(popup);
    }
  }

  // Установка слушателей для модальных окон
  function _setPopupEventListeners(popup) {
    document.addEventListener('keydown', _closePopupEsc);
    popup.addEventListener('click', _closePopupClick)
  }

  // Удаление слушателей для модальных окон
  function _deleteEventListener(popup) {
    document.removeEventListener('keydown', _closePopupEsc);
    popup.removeEventListener('click', _closePopupClick)
  }

  // Закрытие модального окна
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    _deleteEventListener(popup);
  }

  // Открытие модального окна изменения профиля
  function openPopupEditProfile() {
    Utils.resetForm(Variables.formEditProfile, Variables.settingsForms);
    _setUserInfoInForm(Variables.formEditProfile);
    Utils.toggleButtonState(
      Variables.inputEditProfile,
      Variables.btnSubmitEditProfileForm,
      Variables.settingsForms
    );
    _editTextSubmitButton(Variables.btnSubmitEditProfileForm, 'Сохранить');
    _openPopup(Variables.popupEditProfile);
  }

  // Открытие модального окна добавления поста
  function openPopupAddPost() {
    Utils.resetForm(Variables.formAddPost, Variables.settingsForms);
    Utils.toggleButtonState(
      Variables.inputListAddPost,
      Variables.btnSubmitAddPostForm,
      Variables.settingsForms
    );
    _editTextSubmitButton(Variables.btnSubmitAddPostForm, 'Добавить');
    _openPopup(Variables.popupAddPost);
  }

  function openPopupEditAvatar() {
    Utils.resetForm(Variables.formEditAvatar, Variables.settingsForms);
    Utils.toggleButtonState(
      Variables.inputEditAvatar,
      Variables.btnSubmitEditAvatarForm,
      Variables.settingsForms
    );
    _editTextSubmitButton(Variables.btnSubmitEditAvatarForm, 'Сохранить');
    _openPopup(Variables.popupEditAvatar);
  }

  // Открытие модального окна с увеличенным изображением
  function openPopupFocusImage(evt) {
    Variables.focusImage.src = evt.target.src;
    Variables.focusImage.alt = evt.target.alt;
    Variables.popupFocusImage.querySelector('.focus-img__caption').textContent = evt.target.closest('.post').querySelector('.post__title').textContent;
    _openPopup(Variables.popupFocusImage);
  }

  function openPopupConfirmationDelete(evt) {
    Variables.btnConfirmationDelete.addEventListener('click', Post._deletePost.bind(evt), {once: true});
    _openPopup(Variables.popupConfirmationDelete);
  }

  function openPopupError(title, info) {
    Variables.popupErrorTitle.textContent = title;
    Variables.popupErrorInfo.textContent = info;
    _openPopup(Variables.popupError);
  }

  // Сохранение измененной информации о пользователе
  function submitEditProfileForm(evt) {
    evt.preventDefault();
    _editTextSubmitButton(Variables.btnSubmitEditProfileForm, 'Сохранение...');
    API.changeUserInfo({
      name: Variables.formEditProfile.username.value,
      about: Variables.formEditProfile.user_info.value,
    })
      .then(data => {
        Utils.setUserInfo(data);
        _editTextSubmitButton(Variables.btnSubmitEditProfileForm, 'Успешно');
      })
      .catch(err => {
        openPopupError(
          'Ошибка сохранения профиля',
          `Во время сохранения профиля возникла ошибка ${err.status}: ${err.statusText}`
        );
      })
      .finally(() => closePopup(Variables.popupEditProfile));
  }

  // Добавления поста через форму
  function submitAddNewPost(evt) {
    evt.preventDefault();
    _editTextSubmitButton(Variables.btnSubmitAddPostForm, 'Загрузка поста...');
    API.addNewPost({
      name: Variables.formAddPost.post_name.value,
      link: Variables.formAddPost.post_url.value,
    })
      .then(data => {
        Variables.postContainer.prepend(
          Post.createPost(data)
        );
        _editTextSubmitButton(Variables.btnSubmitAddPostForm, 'Успешно');
      })
      .catch(err => {
        openPopupError(
          'Ошибка создания поста',
          `Во время создания поста возникла ошибка ${err.status}: ${err.statusText}`
        );
      })
      .finally(() => closePopup(Variables.popupAddPost));
  }

  function submitEditAvatarForm(evt) {
    evt.preventDefault();
    _editTextSubmitButton(Variables.btnSubmitEditAvatarForm, 'Сохранение...');
    API.changeUserAvatar({
      avatar: Variables.formEditAvatar.avatar_url.value
    })
      .then(data => {
        Utils.setUserAvatar(data.avatar);
        _editTextSubmitButton(Variables.btnSubmitEditAvatarForm, 'Успешно')
      })
      .catch(err => {
        openPopupError(
          'Ошибка изменения фотографии профиля',
          `Во время фотографии профиля возникла ошибка ${err.status}: ${err.statusText}`
        );
      })
      .finally(() => closePopup(Variables.popupEditAvatar));
  }

  return {
    closePopup,
    openPopupEditProfile,
    openPopupAddPost,
    openPopupFocusImage,
    openPopupEditAvatar,
    openPopupConfirmationDelete,
    openPopupError,
    submitEditProfileForm,
    submitAddNewPost,
    submitEditAvatarForm,
  }
}());
