import { Variables } from "./variables.js";
import { Modal } from "./modal.js";
import { Card } from "./card.js";

export const API = (function() {
  function requestInfoFromServer (enpoint) {
    return fetch(`https://nomoreparties.co/v1/${Variables.cohortId}/${enpoint}`, {
      headers: {
        authorization: Variables.token
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        return Promise.reject(res.status);
      })
  }

  function setUserInfo (userInfo) {
    Variables.profileName.textContent = userInfo.name;
    Variables.profileAbout.textContent = userInfo.about;
  }

  function setUserAvatar(photo) {
    Variables.profileAvatar.src = photo;
  }

  function getUserInfo () {
    requestInfoFromServer('users/me')
      .then(data => {
        setUserInfo({
          name: data.name,
          about: data.about,
        });
        setUserAvatar(data.avatar);
      })
      .catch(err => {
        console.log(err)
        Modal.openPopupError(
          'Ошибка',
          `Во время запроса информации о пользователе возникла ошибка: ${err}`
        );
      });
  }

  function loadCards () {
    requestInfoFromServer('cards')
      .then(cards => {
        cards.forEach(post => {
          Card.createPost(post.name, post.link);
        });
      })
      .catch(err => {
        console.log(err)
        Modal.openPopupError(
          'Ошибка',
          `Во время загрузки постов возникла ошибка: ${err}`
        );
      });
  }

  return {
    getUserInfo,
    loadCards,
  }
}());
