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
  return {
    page,
    profile,

    profileName,
    profileAbout,

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
  }
}());

/*
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

const popupEditProfile = page.querySelector('#popup_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.form');
const btnSubmitEditProfileForm = popupEditProfile.querySelector('.form__send-btn');

const popupAddPost = page.querySelector('#popup_add-post');
const formAddPost = popupAddPost.querySelector('.form');
const btnSubmitAddPostForm = popupAddPost.querySelector('.form__send-btn');

const popupFocusImage = page.querySelector('#popup_focus-img');
const focusImage = popupFocusImage.querySelector('.focus-img__image');

const postContainer = page.querySelector('.posts__posts-list');
const postTemplate = page.querySelector('#post-template').content;
const postCardTemplate = postTemplate.querySelector('.posts__item');

const btnProfileEdit = profile.querySelector('.profile__edit-btn');
const btnAddPost = profile.querySelector('.profile__add-btn');
*/
