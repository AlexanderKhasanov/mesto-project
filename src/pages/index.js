import './index.css';

import { Modal } from '../components/modal.js';

import { Variables } from '../components/variables.js';

import { Card } from '../components/card.js';

import { Validate } from '../components/validate.js';

import { API } from '../components/api.js';

// Стартовые посты
/*
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
    Card.createPost(post.name, post.link)
  );
});
*/

// Открытие модальных окон
Variables.btnProfileEdit.addEventListener('click', Modal.openPopupEditProfile);
Variables.btnAddPost.addEventListener('click', Modal.openPopupAddPost);

// Отправка форм
Variables.btnSubmitEditProfileForm.addEventListener('click', Modal.submitEditProfileForm);
Variables.btnSubmitAddPostForm.addEventListener('click', Card.addNewPost);

Variables.postContainer.addEventListener('click', Card.setPostsListeners);

// Валидация форм
Validate.enableValidation(Variables.settingsForms);




// API


//API.getUserInfo();
//API.loadCards();
API.loadPage();
