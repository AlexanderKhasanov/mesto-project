import { Variables } from "./variables.js";
import { Modal } from "./modal.js";
import { Card } from "./card.js";

export const API = (function() {
  function renderLoading(isLoading) {
    if (isLoading) {
      Variables.spinner.classList.add('spinner_visible');
      Variables.content.classList.add('content_hidden');
    }
    else {
      Variables.spinner.classList.remove('spinner_visible');
      Variables.content.classList.remove('content_hidden');
    }
  }

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

  function setUserAvatar (photo) {
    Variables.profileAvatar.src = photo;
  }

  function getUserInfo () {
    //renderLoading(true);
    for (let i=0; i<10000; ++i){
      console.log(i);
    }
    requestInfoFromServer('users/me')
      .then(data => {
        setUserInfo({
          name: data.name,
          about: data.about,
        });
        setUserAvatar(data.avatar);
      })
      .catch(err => {
        Modal.openPopupError(
          'Ошибка',
          `Во время запроса информации о пользователе возникла ошибка: ${err}`
        );
      })
      //.finally(() => renderLoading(false));
  }

  function loadCards () {
    //renderLoading(true);
    for (let i=0; i<10000; ++i){
      console.log(i);
    }
    requestInfoFromServer('cards')
      .then(cards => {
        console.log(cards);
        cards.forEach(post => {
          Variables.postContainer.prepend(
            Card.createPost(post.name, post.link)
          );
        });
      })
      .catch(err => {
        console.log(err)
        Modal.openPopupError(
          'Ошибка',
          `Во время загрузки постов возникла ошибка: ${err}`
        );
      })
      //.finally(() => renderLoading(false));
  }

  function loadPage() {
    renderLoading(true);
    getUserInfo();
    loadCards();
    renderLoading(false);
  }

  return {
    getUserInfo,
    loadCards,
    loadPage,
  }
}());
