import './index.css';

import { modal } from '../components/modal.js';

import { variables } from '../components/variables.js';

import { validate } from '../components/validate.js';

import Api from '../components/api.js';

import { utils } from '../components/utils.js';

import Card from '../components/card.js';

import Section from '../components/section.js';
import Popup from '../components/popup.js'

import PopupWithConfirmation from '../components/popupWithConfirmation.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupError from '../components/popupError.js';

import FormValidator from '../components/formValidator.js';


// Открытие модальных окон
variables.btnProfileEdit.addEventListener('click', modal.openPopupEditProfile);
variables.btnAddPost.addEventListener('click', modal.openPopupAddPost);
variables.btnEditAvatar.addEventListener('click', modal.openPopupEditAvatar);

//variables.postContainer.addEventListener('click', post.setPostsListeners);

// Валидация форм
//validate.enableValidation(variables.settingsForms);

const formAddPostValidator = new FormValidator(variables.settingsForms, variables.formAddPost);
formAddPostValidator.enableValidation();

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

const cardTemplate = '#post-template';
const postContainer = '.posts__posts-list';

const popupWithConfirmationSelector = '#popup_confirmation-delete';
const popupWithImageSelector = '#popup_focus-img';
const popupErrorSelector = '#popup_error';

const api = new Api(variables.baseUrl, variables.headers);

const popupWithImage = new PopupWithImage(popupWithImageSelector);
const popupError = new PopupError(popupErrorSelector);
const popupWithConfirmation = new PopupWithConfirmation(
  popupWithConfirmationSelector,
  {
    action: (card) => {
      api.deletePost(card.getCardId())
        .then(() => {
          card.deleteCard();
        })
        .catch(err => {
          popupError.open(
            `Во время удаления поста возникла ошибка (код ${err.status})`
          );
        })
        .finally(() => popupWithConfirmation.close());
    }
  }
);

api.getDataForPage()
  .then(data => {
    const [userData, cardsData] = data;
    const cardsSection = new Section({
      items: cardsData,
      renderer: (item) => {
        const currentUserId = userData._id;
        const newCard = new Card(item, currentUserId, cardTemplate,
          {
            handleClick: popupWithImage.open,
            handleLiked: () => {
              return newCard.isLiked()
                ? api.deleteLikePost(newCard.getCardId())
                : api.likePost(newCard.getCardId());
            },
            handleDelete: () => popupWithConfirmation.open(newCard),
          }
        );
        cardsSection.setItem(newCard.createCard());
      }
    }, postContainer);
    const userProfileInfo = new UserInfo(profileName, profileAbout);
      const userDataFromApi = userProfileInfo.getUserInfo(userData);
      userProfileInfo.setUserInfo(userDataFromApi);

    cardsSection.renderItems();
    utils.successfulLoadPage();
  })
  .catch(err => {
    modal.openPopupError(
      `Ошибка загрузки (код ${err.status})`
    );
  })
  .finally(() =>
  modal.closePopup(variables.popupConfirmationDelete)
  );
