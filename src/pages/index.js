import './index.css';

import { modal } from '../components/modal.js';

import { variables } from '../components/variables.js';

import { post } from '../components/post.js';

import { validate } from '../components/validate.js';

import Api from '../components/api.js';

import { utils } from '../components/utils.js';


// Открытие модальных окон
variables.btnProfileEdit.addEventListener('click', modal.openPopupEditProfile);
variables.btnAddPost.addEventListener('click', modal.openPopupAddPost);
variables.btnEditAvatar.addEventListener('click', modal.openPopupEditAvatar);

variables.postContainer.addEventListener('click', post.setPostsListeners);

// Валидация форм
validate.enableValidation(variables.settingsForms);

Api.getDataForPage()
  .then(data => {
    const [userData, PostsData] = data;
    utils.setUserInfo(userData);
    utils.setUserAvatar(userData.avatar);
    utils.currentUserId = userData._id;
    post.renderPosts(PostsData);
    utils.successfulLoadPage();
  })
  .catch(err => {
    utils.failedLoadPage();
    modal.openPopupError(
      `Во время загурзки страницы возникла ошибка (код ${err.status})`
    );
    setTimeout(modal.closePopup, 3000, variables.popupError);
  });

