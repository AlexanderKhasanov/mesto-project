import './index.css';

import { Modal } from '../components/modal.js';

import { Variables } from '../components/variables.js';

import { Post } from '../components/post.js';

import { Validate } from '../components/validate.js';

import { API } from '../components/api.js';
import { Utils } from '../components/utils';


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

