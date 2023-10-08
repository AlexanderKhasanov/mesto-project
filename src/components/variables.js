export const variables = (function() {
  const settingsForms = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__send-btn',
    inactiveButtonClass: 'form__send-btn_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
  };

  const page = document.querySelector('.page');
  const content = document.querySelector('.content');
  const spinner = document.querySelector('.spinner');

  const btnProfileEdit = document.querySelector('.profile__edit-btn');
  const btnAddPost = document.querySelector('.profile__add-btn');
  const btnEditAvatar = document.querySelector('.profile__edit-avatar-btn');

  const baseUrl = 'https://nomoreparties.co/v1/plus-cohort-28';
  const token = '09266f70-d3b4-4484-a640-19b16aad419c';
  const headers = {
    authorization: token,
    'Content-Type': 'application/json'
  }

  const cardContainerSelector = '.posts__posts-list';
  const cardTemplate = '#post-template';

  const profileNameSelector = '.profile__name';
  const profileAboutSelector = '.profile__about';
  const profileAvatarSelector = '.profile__avatar';

  const popupErrorSelector = '#popup_error';
  const popupWithImageSelector = '#popup_focus-img';
  const popupWithConfirmationSelector = '#popup_confirmation-delete';
  const popupEditProfileSelector = '#popup_edit-profile';
  const popupAddPostSelector = '#popup_add-post';
  const popupEditAvatarSelector = '#popup_edit-avatar';

  const timeoutEditButtonText = 500;

  return {
    page,
    content,
    spinner,

    baseUrl,
    headers,

    cardContainerSelector,
    cardTemplate,

    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,

    popupErrorSelector,
    popupWithImageSelector,
    popupWithConfirmationSelector,
    popupEditProfileSelector,
    popupAddPostSelector,
    popupEditAvatarSelector,

    timeoutEditButtonText,

    settingsForms,

    btnProfileEdit,
    btnAddPost,
    btnEditAvatar,
  }
}());
