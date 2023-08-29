import './index.css';

const settingsForms = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__send-btn',
  inactiveButtonClass: 'form__send-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

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

// Стартовые посты
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
].forEach( post => {
  postContainer.prepend(
    createPost(post.name, post.link)
  );
});

// Заполнение формы для изменения информации о пользователе
// текущей информацией
function setUserInfo(form) {
  form.username.value = profileName.textContent.trim();
  form.user_info.value = profileAbout.textContent.trim();
}

// Закрытие модального окна по нажатию ESC
function closePopupEsc(evt) {
  const popup = page.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popup){
    closePopup(popup);
  }
}

// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  setPopupEventListeners(popup);
}

// Открытие модального окна изменения профиля
function openPopupEditProfile() {
  resetForm(formEditProfile, settingsForms);
  toggleButtonState(inputEditProfile, btnSubmitEditProfileForm, settingsForms);
  setUserInfo(formEditProfile);
  openPopup(popupEditProfile);
}

// Открытие модального окна добавления поста
function openPopupAddPost() {
  resetForm(formAddPost, settingsForms);
  toggleButtonState(inputListAddPost, btnSubmitAddPostForm, settingsForms);
  openPopup(popupAddPost);
}

// Открытие модального окна с увеличенным изображением
function openPopupFocusImage(evt) {
  focusImage.src = evt.target.src;
  focusImage.alt = evt.target.alt;
  popupFocusImage.querySelector('.focus-img__caption').textContent = evt.target.closest('.post').querySelector('.post__title').textContent;
  openPopup(popupFocusImage);
}

// Закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  deleteEventListener(popup);
}

// Закрытие модального окна по нажатию на оверлей или кнопку закрытия
function closePopupClick(evt) {
  const popup = page.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-btn'))
    closePopup(popup);
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

// Сохранение измененной информации о пользователе
function submitEditProfileForm(evt) {
  evt.preventDefault();
  const form = popupEditProfile.querySelector('.form');
  profileName.textContent = form.username.value;
  profileAbout.textContent = form.user_info.value;
  closePopup(popupEditProfile);
}

// Создание поста
function createPost(name, link) {
  const newPost = postCardTemplate.cloneNode(true);
  const postImg = newPost.querySelector('.post__image');
  postImg.src = link;
  postImg.alt = `Фотография поста. ${name}`;
  postImg.addEventListener('click', openPopupFocusImage);
  newPost.querySelector('.post__title').textContent = name;
  newPost.querySelector('.post__like').addEventListener(
    'click', evt => {evt.target.classList.toggle('post__like_active')}
  );
  newPost.querySelector('.post__delete').addEventListener(
    'click', evt => evt.target.closest('.posts__item').remove()
  );
  return newPost;
}

// Добавления поста через форму
function addNewPost(evt) {
  evt.preventDefault();
  const form = popupAddPost.querySelector('.form');
  postContainer.prepend(
    createPost(form.post_name.value, form.post_url.value)
  );
  closePopup(popupAddPost);
}

// Открытие модальных окон
btnProfileEdit.addEventListener('click', openPopupEditProfile);
btnAddPost.addEventListener('click', openPopupAddPost);

// Отправка форм
btnSubmitEditProfileForm.addEventListener('click', submitEditProfileForm);
btnSubmitAddPostForm.addEventListener('click', addNewPost);






// Валидация форм
function showInputError(form, inputElement, errorMessage, settingsForm) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  console.log(`input element - ${inputElement}`)
  console.log(`error element - ${errorElement}`)
  inputElement.classList.add(settingsForm.inputErrorClass);
  errorElement.classList.add(settingsForm.errorClass);
  errorElement.textContent = errorMessage;
}

function resetForm(form, settings) {
  form.reset();
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  inputList.forEach((inputElement) => hideInputError(form, inputElement, settings));
}

function hideInputError(form, inputElement, settingsForm) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsForm.inputErrorClass);
  errorElement.classList.remove(settingsForm.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(form, inputElement, settingsForm) {
  if (inputElement.validity.patternMismatch)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  else
    inputElement.setCustomValidity('');

  if (!inputElement.validity.valid)
    showInputError(form, inputElement, inputElement.validationMessage, settingsForm);
  else
    hideInputError(form, inputElement, settingsForm);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, settingsForm) {
  if (hasInvalidInput(inputList))
    buttonElement.classList.add(settingsForm.inactiveButtonClass);
  else
    buttonElement.classList.remove(settingsForm.inactiveButtonClass);
}

function setFormEventListeners(form, settingsForm) {
  const inputList = Array.from(form.querySelectorAll(settingsForm.inputSelector));
  const buttonElement = form.querySelector(settingsForm.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settingsForm);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, settingsForm);
      toggleButtonState(inputList, buttonElement, settingsForm);
    });
  });
}

function enableValidation(settingsForms) {
  const formList = Array.from(document.querySelectorAll(settingsForms.formSelector));
  formList.forEach((form) => setFormEventListeners(form, settingsForms));
}

enableValidation(settingsForms);
