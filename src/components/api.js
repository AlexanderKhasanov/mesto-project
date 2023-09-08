import { Variables } from "./variables.js";
import { Modal } from "./modal.js";
import { Post } from "./post.js";

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

  function changeUserInfo(newUserInfo) {
    return fetch(`${Variables.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: Variables.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    })
      .then(getResposeData);
  }

  function getPosts() {
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
            Post.createPost(post.name, post.link)
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

  function addNewPost(newPost) {
    return fetch(`${Variables.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: Variables.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    }).then(getResposeData);
  }

  function deletePost(id) {
    return fetch(`${Variables.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: Variables.token
      }
    }).then(getResposeData);
  }

  function likePost(id) {
    return fetch(`${Variables.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: Variables.token,
      }
    }).then(getResposeData);
  }

  function deleteLikePost(id) {
    return fetch(`${Variables.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: Variables.token,
      }
    }).then(getResposeData);
  }

  function getDataForPage() {
    //renderLoading(true);
    return Promise.all([getUserInfo(), getPosts()]);
    //renderLoading(false);
  }

  return {
    getUserInfo,
    getPosts,
    getDataForPage,
    changeUserInfo,
    addNewPost,
    deletePost,
    likePost,
    deleteLikePost,
  }
}());
