export const Variables = (function() {
  const settingsForms = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__send-btn',
    inactiveButtonClass: 'form__send-btn_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
  };

  const page = document.querySelector('.page');
  const profile = page.querySelector('.profile');
  const profileName = profile.querySelector('.profile__name');
  const profileAbout = profile.querySelector('.profile__about');
  const profileAvatar = profile.querySelector('.profile__avatar');

  const popupEditProfile = page.querySelector('#popup_edit-profile');
  const formEditProfile = popupEditProfile.querySelector('.form');
  const btnSubmitEditProfileForm = popupEditProfile.querySelector('.form__send-btn');
  const inputEditProfile = Array.from(formEditProfile.querySelectorAll(settingsForms.inputSelector));

  const popupAddPost = page.querySelector('#popup_add-post');
  const formAddPost = popupAddPost.querySelector('.form');
  const btnSubmitAddPostForm = popupAddPost.querySelector('.form__send-btn');
  const inputListAddPost = Array.from(formAddPost.querySelectorAll(settingsForms.inputSelector));

  const popupFocusImage = page.querySelector('#popup_focus-img');
  const focusImage = popupFocusImage.querySelector('.focus-img__image');

  const postContainer = page.querySelector('.posts__posts-list');
  const postTemplate = page.querySelector('#post-template').content;
  const postCardTemplate = postTemplate.querySelector('.posts__item');

  const btnProfileEdit = profile.querySelector('.profile__edit-btn');
  const btnAddPost = profile.querySelector('.profile__add-btn');

  const popupError = page.querySelector('#popup_error');
  const popupErrorTitle = popupError.querySelector('.popup__error-title');
  const popupErrorInfo = popupError.querySelector('.popup__error-info');

  const cohortId = 'plus-cohort-28';
  const token = '09266f70-d3b4-4484-a640-19b16aad419c';

  return {
    page,
    profile,

    profileName,
    profileAbout,
    profileAvatar,

    popupEditProfile,
    formEditProfile,
    btnSubmitEditProfileForm,
    inputEditProfile,

    popupAddPost,
    formAddPost,
    btnSubmitAddPostForm,
    inputListAddPost,

    popupFocusImage,
    focusImage,

    postContainer,
    postTemplate,
    postCardTemplate,

    btnProfileEdit,
    btnAddPost,
    settingsForms,

    popupError,
    popupErrorTitle,
    popupErrorInfo,

    cohortId,
    token,
  }
}());
