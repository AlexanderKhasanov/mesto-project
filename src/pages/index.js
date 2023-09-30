import './index.css';

import { modal } from '../components/modal.js';

import { variables } from '../components/variables.js';

//import { post } from '../components/post.js';

import { validate } from '../components/validate.js';

import Api from '../components/api.js';

import { utils } from '../components/utils.js';

import Card from '../components/card.js';

import Section from '../section.js';
import Popup from '../components/popup.js'

import PopupWithImage from '../components/popupWithImage.js';

import PopupError from '../components/popupError.js';


// Открытие модальных окон
variables.btnProfileEdit.addEventListener('click', modal.openPopupEditProfile);
variables.btnAddPost.addEventListener('click', modal.openPopupAddPost);
variables.btnEditAvatar.addEventListener('click', modal.openPopupEditAvatar);

//variables.postContainer.addEventListener('click', post.setPostsListeners);

// Валидация форм
validate.enableValidation(variables.settingsForms);
/*
api.getDataForPage()
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
*/

const api = new Api(variables.baseUrl, variables.headers);

const cardTemplate = '#post-template';
const postContainer = '.posts__posts-list';

function handleLiked(card) {
  return card.isLiked()
    ? api.deleteLikePost(card.getCardId())
    : api.likePost(card.getCardId());
}

api.getDataForPage()
  .then(data => {
    const [userData, cardsData] = data;
    const cardsSection = new Section({
      items: cardsData,
      renderer: (item) => {
        const currentUserId = userData._id;
        const newCard = new Card(item, currentUserId, cardTemplate,
          {
            handleClick: modal.openPopupFocusImage,
            handleLiked: () => {
              return newCard.isLiked()
                ? api.deleteLikePost(newCard.getCardId())
                : api.likePost(newCard.getCardId());
            },
            handleDelete: () => api.deletePost(newCard.getCardId()),
          }
        );
        cardsSection.setItem(newCard.createCard());
      }
    }, postContainer);

    cardsSection.renderItems();
    utils.successfulLoadPage();
  })
