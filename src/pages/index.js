import './index.css';

import { Modal } from '../components/modal.js';

import { Variables } from '../components/variables.js';

import { Post } from '../components/post.js';

import { Validate } from '../components/validate.js';

import { API } from '../components/api.js';
import { Utils } from '../components/utils';

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
    Post.createPost(post.name, post.link)
  );
});
*/

// Открытие модальных окон
Variables.btnProfileEdit.addEventListener('click', Modal.openPopupEditProfile);
Variables.btnAddPost.addEventListener('click', Modal.openPopupAddPost);

// Отправка форм
Variables.btnSubmitEditProfileForm.addEventListener('click', Modal.submitEditProfileForm);
Variables.btnSubmitAddPostForm.addEventListener('click', Post.addNewPost);

Variables.postContainer.addEventListener('click', Post.setPostsListeners);

// Валидация форм
Validate.enableValidation(Variables.settingsForms);




// API


//API.getUserInfo();
//API.loadCards();
API.getDataForPage()
  .then(data => {
    const [userData, PostsData] = data;
    Utils.setUserInfo(userData);
    Utils.setUserAvatar(userData.avatar);
    Utils.currentUserId = userData._id;
    Post.renderPosts(PostsData);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  });

