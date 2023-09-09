import { Variables } from "./variables.js";

export const API = (function() {
  function _getResposeData(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(res);
  }

  function _getUserInfo() {
    return fetch(`${Variables.baseUrl}/users/me`, {
      headers: {
        authorization: Variables.token
      }
    }).then(_getResposeData);
  }

  function _getPosts() {
    return fetch(`${Variables.baseUrl}/cards`, {
      headers: {
        authorization: Variables.token
      }
    })
      .then(_getResposeData);
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
      .then(_getResposeData);
  }

  function changeUserAvatar(newUserAvatar) {
    return fetch(`${Variables.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: Variables.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserAvatar)
    })
      .then(_getResposeData);
  }

  function addNewPost(newPost) {
    return fetch(`${Variables.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: Variables.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    }).then(_getResposeData);
  }

  function deletePost(id) {
    return fetch(`${Variables.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: Variables.token
      }
    }).then(_getResposeData);
  }

  function likePost(id) {
    return fetch(`${Variables.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: Variables.token,
      }
    }).then(_getResposeData);
  }

  function deleteLikePost(id) {
    return fetch(`${Variables.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: Variables.token,
      }
    }).then(_getResposeData);
  }

  function getDataForPage() {
    return Promise.all([_getUserInfo(), _getPosts()]);
  }

  return {
    getDataForPage,
    changeUserInfo,
    changeUserAvatar,
    addNewPost,
    deletePost,
    likePost,
    deleteLikePost,
  }
}());
