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

  function setUserAvatar (photo) {
    Variables.profileAvatar.src = photo;
  }

  function getResposeData(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(res.status);
  }

  function getUserInfo() {
    /*
    renderLoading(true);
    for (let i=0; i<10000; ++i) {
      console.log(i);
    }
    */
    return fetch(`${Variables.baseUrl}/users/me`, {
      headers: {
        authorization: Variables.token
      }
    }).then(getResposeData);
      //.finally(() => renderLoading(false));
  }

  function getCards() {
    /*
    renderLoading(true);
    for (let i=0; i<10000; ++i) {
      console.log(i);
    }
    */
    return fetch(`${Variables.baseUrl}/cards`, {
      headers: {
        authorization: Variables.token
      }
    })
      .then(getResposeData);
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

  function getDataForPage() {
    //renderLoading(true);
    return Promise.all([getUserInfo(), getCards()]);
    //renderLoading(false);
  }

  return {
    getUserInfo,
    getCards,
    getDataForPage,
  }
}());
