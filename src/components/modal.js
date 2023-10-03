import { variables } from "./variables.js";
import { utils } from "./utils.js";
import Api from "./api.js";
import post from "./card.js";
import UserInfo from "./userInfo.js";
import { data } from "autoprefixer";

export const modal = (function(){
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
    form.username.value = variables.profileName.textContent.trim();
    form.user_info.value = variables.profileAbout.textContent.trim();
  }

  // Открытие модального окна
  function _openPopup(popup, submitBtn=null, handlerButton=null) {
    popup.classList.add('popup_opened');
    _setPopupEventListeners(popup, submitBtn, handlerButton);
  }

  // Закрытие модального окна по нажатию на оверлей или кнопку закрытия
  function _closePopupClick(evt) {
    const popup = variables.page.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
      closePopup(popup);
  }

  // Закрытие модального окна по нажатию ESC
  function _closePopupEsc(evt) {
    if (evt.key === 'Escape'){
      const popup = variables.page.querySelector('.popup_opened');
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
    utils.resetForm(variables.formEditProfile, variables.settingsForms);
    _setUserInfoInForm(variables.formEditProfile);
    // UserInfo.getUserInfo()
    // .then(data =>
    //   form.username.value = data.name,
    //   form.user_info.value = data.about);

    utils.toggleButtonState(
      variables.inputEditProfile,
      variables.btnSubmitEditProfileForm,
      variables.settingsForms
    );
    _currentButton = variables.btnSubmitEditProfileForm;
    _submitButtonHandler = submitEditProfileForm;
    _openPopup(variables.popupEditProfile, _currentButton, _submitButtonHandler);
  }

  // Открытие модального окна добавления поста
  function openPopupAddPost() {
    utils.resetForm(variables.formAddPost, variables.settingsForms);
    utils.toggleButtonState(
      variables.inputListAddPost,
      variables.btnSubmitAddPostForm,
      variables.settingsForms
    );
    _currentButton = variables.btnSubmitAddPostForm;
    _submitButtonHandler = submitAddNewPost;
    _openPopup(variables.popupAddPost, _currentButton, _submitButtonHandler);
  }

  function openPopupEditAvatar() {
    utils.resetForm(variables.formEditAvatar, variables.settingsForms);
    utils.toggleButtonState(
      variables.inputEditAvatar,
      variables.btnSubmitEditAvatarForm,
      variables.settingsForms
    );
    _currentButton = variables.btnSubmitEditAvatarForm;
    _submitButtonHandler = submitEditAvatarForm;
    _openPopup(variables.popupEditAvatar, _currentButton, _submitButtonHandler);
  }

  // Открытие модального окна с увеличенным изображением
  function openPopupFocusImage(cardImg, cardTitle) {
    console.log('OPEN')
    variables.focusImage.src = cardImg.src;
    variables.focusImage.alt = cardImg.alt;
    variables.popupFocusImage.querySelector('.focus-img__caption').textContent = cardTitle;
    _openPopup(variables.popupFocusImage);
  }

  function openPopupConfirmationDelete(evt) {
    _submitButtonHandler = post._deletePost.bind(evt);
    _currentButton = variables.btnConfirmationDelete;
    variables.btnConfirmationDelete.addEventListener('click', _submitButtonHandler, {once: true});
    _openPopup(variables.popupConfirmationDelete);
  }

  function openPopupError(info) {
    variables.popupErrorInfo.textContent = info;
    _openPopup(variables.popupError);
  }

  // Сохранение измененной информации о пользователе
  function submitEditProfileForm(evt) {
    evt.preventDefault();
    _editTextSubmitButton(variables.btnSubmitEditProfileForm, 'Сохранение...');
    Api.changeUserInfo({
      name: variables.formEditProfile.username.value,
      about: variables.formEditProfile.user_info.value,
    })
      .then(data => {
        utils.setUserInfo(data);
        closePopup(variables.popupEditProfile);
      })
      .catch(err => {
        openPopupError(
          `Во время сохранения профиля возникла ошибка (код ${err.status})`
        );
        setTimeout(closePopup, _timeoutCloseErrorPopup, variables.popupError);
      })
      .finally(() => setTimeout(_editTextSubmitButton, _timeoutEditButtonText, variables.btnSubmitEditProfileForm, 'Сохранить'));
  }

  // Добавления поста через форму
  function submitAddNewPost(evt) {
    evt.preventDefault();
    _editTextSubmitButton(variables.btnSubmitAddPostForm, 'Загрузка поста...');
    Api.addNewPost({
      name: variables.formAddPost.post_name.value,
      link: variables.formAddPost.post_url.value,
    })
      .then(data => {
        variables.postContainer.prepend(
          post.createPost(data)
        );
        closePopup(variables.popupAddPost);
      })
      .catch(err => {
        openPopupError(
          `Во время создания поста возникла ошибка (код ${err.status})`
        );
        setTimeout(closePopup, _timeoutCloseErrorPopup, variables.popupError);
      })
      .finally(() => setTimeout(_editTextSubmitButton, _timeoutEditButtonText, variables.btnSubmitAddPostForm, 'Создать'));
  }

  //сохранение формы измененеия аватара
  function submitEditAvatarForm(evt) {
    evt.preventDefault();
    _editTextSubmitButton(variables.btnSubmitEditAvatarForm, 'Сохранение...');
    Api.changeUserAvatar({
      avatar: variables.formEditAvatar.avatar_url.value
    })
      .then(data => {
        utils.setUserAvatar(data.avatar);
        closePopup(variables.popupEditAvatar);
      })
      .catch(err => {
        openPopupError(
          `Во время фотографии профиля возникла ошибка (код ${err.status})`
        );
        setTimeout(closePopup, _timeoutCloseErrorPopup, variables.popupError);
      })
      .finally(() => setTimeout(_editTextSubmitButton, _timeoutEditButtonText, variables.btnSubmitEditAvatarForm, 'Сохранить'));
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
