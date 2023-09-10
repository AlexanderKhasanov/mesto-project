import { Variables } from "./variables.js";
import { Utils } from "./utils.js";
import { API } from "./api.js";
import { Post } from "./post.js";

export const Modal = (function(){
  let _submitButtonHandler = null;
  let _currentButton = null;
  const _timeoutEditButtonText = 500;
  const _timeoutCloseErrorPopup = 3000;

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
  function _openPopup(popup, submitBtn=null, handlerButton=null) {
    popup.classList.add('popup_opened');
    _setPopupEventListeners(popup, submitBtn, handlerButton);
  }

  // Закрытие модального окна по нажатию на оверлей или кнопку закрытия
  function _closePopupClick(evt) {
    const popup = Variables.page.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
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
  function _setPopupEventListeners(popup, submitBtn=null, handlerButton=null) {
    if (popup.id !== 'popup_error') {
      document.addEventListener('keydown', _closePopupEsc);
      popup.addEventListener('click', _closePopupClick)
      if (submitBtn !== null && handlerButton !== null)
        submitBtn.addEventListener('click', handlerButton);
    }
  }

  // Удаление слушателей для модальных окон
  function _deleteEventListener(popup) {
    document.removeEventListener('keydown', _closePopupEsc);
    popup.removeEventListener('click', _closePopupClick)
    if (_submitButtonHandler !== null && _currentButton !== null) {
      _currentButton.removeEventListener('click', _submitButtonHandler);
      _currentButton = null;
      _submitButtonHandler = null;
    }
  }

  // Закрытие модального окна
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    if (popup.id !== 'popup_error')
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
    _currentButton = Variables.btnSubmitEditProfileForm;
    _submitButtonHandler = submitEditProfileForm;
    _openPopup(Variables.popupEditProfile, _currentButton, _submitButtonHandler);
  }

  // Открытие модального окна добавления поста
  function openPopupAddPost() {
    Utils.resetForm(Variables.formAddPost, Variables.settingsForms);
    Utils.toggleButtonState(
      Variables.inputListAddPost,
      Variables.btnSubmitAddPostForm,
      Variables.settingsForms
    );
    _currentButton = Variables.btnSubmitAddPostForm;
    _submitButtonHandler = submitAddNewPost;
    _openPopup(Variables.popupAddPost, _currentButton, _submitButtonHandler);
  }

  function openPopupEditAvatar() {
    Utils.resetForm(Variables.formEditAvatar, Variables.settingsForms);
    Utils.toggleButtonState(
      Variables.inputEditAvatar,
      Variables.btnSubmitEditAvatarForm,
      Variables.settingsForms
    );
    _currentButton = Variables.btnSubmitEditAvatarForm;
    _submitButtonHandler = submitEditAvatarForm;
    _openPopup(Variables.popupEditAvatar, _currentButton, _submitButtonHandler);
  }

  // Открытие модального окна с увеличенным изображением
  function openPopupFocusImage(evt) {
    Variables.focusImage.src = evt.target.src;
    Variables.focusImage.alt = evt.target.alt;
    Variables.popupFocusImage.querySelector('.focus-img__caption').textContent = evt.target.closest('.post').querySelector('.post__title').textContent;
    _openPopup(Variables.popupFocusImage);
  }

  function openPopupConfirmationDelete(evt) {
    _submitButtonHandler = Post._deletePost.bind(evt);
    _currentButton = Variables.btnConfirmationDelete;
    Variables.btnConfirmationDelete.addEventListener('click', _submitButtonHandler, {once: true});
    _openPopup(Variables.popupConfirmationDelete);
  }

  function openPopupError(info) {
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
        closePopup(Variables.popupEditProfile);
      })
      .catch(err => {
        openPopupError(
          `Во время сохранения профиля возникла ошибка (код ${err.status})`
        );
        setTimeout(closePopup, _timeoutCloseErrorPopup, Variables.popupError);
      })
      .finally(() => setTimeout(_editTextSubmitButton, _timeoutEditButtonText, Variables.btnSubmitEditProfileForm, 'Сохранить'));
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
        closePopup(Variables.popupAddPost);
      })
      .catch(err => {
        openPopupError(
          `Во время создания поста возникла ошибка (код ${err.status})`
        );
        setTimeout(closePopup, _timeoutCloseErrorPopup, Variables.popupError);
      })
      .finally(() => setTimeout(_editTextSubmitButton, _timeoutEditButtonText, Variables.btnSubmitAddPostForm, 'Создать'));
  }

  function submitEditAvatarForm(evt) {
    evt.preventDefault();
    _editTextSubmitButton(Variables.btnSubmitEditAvatarForm, 'Сохранение...');
    API.changeUserAvatar({
      avatar: Variables.formEditAvatar.avatar_url.value
    })
      .then(data => {
        Utils.setUserAvatar(data.avatar);
        closePopup(Variables.popupEditAvatar);
      })
      .catch(err => {
        openPopupError(
          `Во время фотографии профиля возникла ошибка (код ${err.status})`
        );
        setTimeout(closePopup, _timeoutCloseErrorPopup, Variables.popupError);
      })
      .finally(() => setTimeout(_editTextSubmitButton, _timeoutEditButtonText, Variables.btnSubmitEditAvatarForm, 'Сохранить'));
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
