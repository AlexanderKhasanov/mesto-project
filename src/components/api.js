// import { variables } from "./variables.js";

export class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResposeData(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(res);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getResposeData);
  }

  getPosts() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._getResposeData);
  }
  changeUserInfo(newUserInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newUserInfo)
    })
      .then(this._getResposeData);
  }

  changeUserAvatar(newUserAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newUserAvatar)
    })
      .then(this._getResposeData);
  }

  addNewPost(newPost) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newPost)
    })
      .then(this._getResposeData);
  }
  deletePost(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResposeData);
  }
  likePost(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._getResposeData);
  }
  deleteLikePost(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      hheaders: this._headers
    })
    .then(this._getResposeData);
  }
  getDataForPage() {
  return Promise.all([_getUserInfo(), _getPosts()]);
}
}
