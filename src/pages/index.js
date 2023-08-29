import './index.css';

import { Modal } from '../components/modal.js';

import { Variables } from '../components/variables.js';

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
  Variables.postContainer.prepend(
    createPost(post.name, post.link)
  );
});

// Заполнение формы для изменения информации о пользователе
// текущей информацией
function setUserInfo(form) {
  form.username.value = profileName.textContent.trim();
  form.user_info.value = profileAbout.textContent.trim();
}

// Сохранение измененной информации о пользователе
function submitEditProfileForm(evt) {
  evt.preventDefault();
  const form = popupEditProfile.querySelector('.form');
  Variables.profileName.textContent = form.username.value;
  Variables.profileAbout.textContent = form.user_info.value;
  closePopup(popupEditProfile);
}

// Создание поста
function createPost(name, link) {
  const newPost = Variables.postCardTemplate.cloneNode(true);
  const postImg = newPost.querySelector('.post__image');
  postImg.src = link;
  postImg.alt = `Фотография поста. ${name}`;
  postImg.addEventListener('click', Modal.openPopupFocusImage);
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
  Variables.postContainer.prepend(
    createPost(form.post_name.value, form.post_url.value)
  );
  closePopup(popupAddPost);
}

// Открытие модальных окон
Variables.btnProfileEdit.addEventListener('click', Modal.openPopupEditProfile);
Variables.btnAddPost.addEventListener('click', Modal.openPopupAddPost);

// Отправка форм
Variables.btnSubmitEditProfileForm.addEventListener('click', submitEditProfileForm);
Variables.btnSubmitAddPostForm.addEventListener('click', addNewPost);






// Валидация форм
function showInputError(form, inputElement, errorMessage, settingsForm) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  console.log(`input element - ${inputElement}`)
  console.log(`error element - ${errorElement}`)
  inputElement.classList.add(settingsForm.inputErrorClass);
  errorElement.classList.add(settingsForm.errorClass);
  errorElement.textContent = errorMessage;
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

enableValidation(Variables.settingsForms);
