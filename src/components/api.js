import { variables } from "./variables.js";

export const api = (function() {
  function _getResposeData(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(res);
  }

  function _getUserInfo() {
    return fetch(`${variables.baseUrl}/users/me`, {
      headers: {
        authorization: variables.token
      }
    }).then(_getResposeData);
  }

  function _getPosts() {
    return fetch(`${variables.baseUrl}/cards`, {
      headers: {
        authorization: variables.token
      }
    })
      .then(_getResposeData);
  }

  function changeUserInfo(newUserInfo) {
    return fetch(`${variables.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: variables.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    })
      .then(_getResposeData);
  }

  function changeUserAvatar(newUserAvatar) {
    return fetch(`${variables.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: variables.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserAvatar)
    })
      .then(_getResposeData);
  }

  function addNewPost(newPost) {
    return fetch(`${variables.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: variables.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    }).then(_getResposeData);
  }

  function deletePost(id) {
    return fetch(`${variables.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: variables.token
      }
    }).then(_getResposeData);
  }

  function likePost(id) {
    return fetch(`${variables.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: variables.token,
      }
    }).then(_getResposeData);
  }

  function deleteLikePost(id) {
    return fetch(`${variables.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: variables.token,
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
