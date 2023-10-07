import './index.css';

import Api from '../components/api.js';
import Card from '../components/card.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithConfirmation from '../components/popupWithConfirmation.js';
import PopupError from '../components/popupError.js';
import UserInfo from '../components/userInfo.js';
import FormValidator from '../components/formValidator.js';

import { utils } from '../components/utils.js';
import { variables } from '../components/variables.js';

const api = new Api(variables.baseUrl, variables.headers);

const popupError = new PopupError(variables.popupErrorSelector);

const cardsContainer = new Section({
  renderer: (item) => {
    const card = new Card(item, variables.cardTemplate, userInfo.getUserId(), {
      handleClick: popupWithImage.open,
      handleLiked: () => {
        return card.isLiked()
          ? api.deleteLikeCard(card.getCardId())
          : api.likeCard(card.getCardId());
      },
      handleDelete: () => popupWithConfirmation.open(card),
      handleError: (errorMessage) => popupError.open(errorMessage),
    });
    return card.createCard();
  }
}, variables.cardContainerSelector);

const userInfo = new UserInfo(
  variables.profileNameSelector,
  variables.profileAboutSelector,
  variables.profileAvatarSelector,
  {
    handleGetUserInfoFromApi: api.getUserInfo.bind(api),
    handleError: (errorMessage) => popupError.open(errorMessage),
  }
);
userInfo.getUserInfoFromApi();

api.getCards()
  .then(data => {
    cardsContainer.renderItems(data);
    utils.successfulLoadPage();
  })
  .catch(err => {
    utils.failedLoadPage();
    popupError.open(
      `Ошибка загрузки карточек (код ${err.status})`
    )
  })

const popupWithImage = new PopupWithImage(variables.popupWithImageSelector);

const popupWithConfirmation = new PopupWithConfirmation(
  variables.popupWithConfirmationSelector,
  {
    action: (card) => {
      api.deleteCard(card.getCardId())
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

const popupAddPost = new PopupWithForm(
  variables.popupAddPostSelector,
  {
    formSubmitHandler: (card) => {
      popupAddPost.editTextSubmitButton('Загрузка поста...');
      api.addNewCard(card)
      .then(data => {
        cardsContainer.addItem(data);
        popupAddPost.close();
      })
      .catch(err => {
        popupError.open(
          `Во время создания поста возникла ошибка (код ${err.status})`
        )
      })
      .finally(() => {
        setTimeout(
          popupAddPost.editTextSubmitButton.bind(popupAddPost),
          variables.timeoutEditButtonText,
          'Создать'
        )
      });
    }
  }
)

const popupEditProfile = new PopupWithForm(
  variables.popupEditProfileSelector,
  {
    formSubmitHandler: (updateUserInfo) => {
      popupEditProfile.editTextSubmitButton('Сохранение...')
      api.changeUserInfo(updateUserInfo)
        .then(data => {
          userInfo.setUserInfo(data);
          popupEditProfile.close();
        })
        .catch(err => {
          popupError.open(
            `Во время сохранения профиля возникла ошибка (код ${err.status})`
          )
        })
        .finally(() => {
          setTimeout(
            popupEditProfile.editTextSubmitButton.bind(popupEditProfile),
            variables.timeoutEditButtonText,
            'Сохранить'
          )
        });
    }
  }
)

const popupEditAvatar = new PopupWithForm(
  variables.popupEditAvatarSelector,
  {
    formSubmitHandler: (updateUserAvatar) => {
      popupEditAvatar.editTextSubmitButton('Сохранение...')
      api.changeUserAvatar(updateUserAvatar)
        .then(data => {
          userInfo.setUserAvatar(data.avatar);
          popupEditAvatar.close();
        })
        .catch(err => {
          popupError.open(
            `Во время сохранения профиля возникла ошибка (код ${err.status})`
          )
        })
        .finally(() => {
          setTimeout(
            popupEditAvatar.editTextSubmitButton.bind(popupEditAvatar),
            variables.timeoutEditButtonText,
            'Сохранить'
          )
        });
    }
  }
)

// Валидация форм
const formAddPostValidator = new FormValidator(variables.settingsForms, popupAddPost.getPopupForm());
formAddPostValidator.enableValidation();

const formEditProfileValidator = new FormValidator(variables.settingsForms, popupEditProfile.getPopupForm());
formEditProfileValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(variables.settingsForms, popupEditAvatar.getPopupForm());
formEditAvatarValidator.enableValidation();


// Открытие модальных окон
variables.btnAddPost.addEventListener('click', popupAddPost.open.bind(popupAddPost));
variables.btnProfileEdit.addEventListener('click', () => {
  popupEditProfile.setStartInputValues(userInfo.getUserInfoFromPage());
  formEditProfileValidator.toggleButtonState();
  popupEditProfile.open();
});
variables.btnEditAvatar.addEventListener('click', popupEditAvatar.open.bind(popupEditAvatar));
