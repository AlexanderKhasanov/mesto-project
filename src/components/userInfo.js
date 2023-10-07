import { variables } from "./variables";

export default class UserInfo {
  constructor(
    nameSelector,
    aboutSelector,
    avatarSelector,
    {
      handleGetUserInfoFromApi,
      handleError,
    }
  ) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._handleGetUserInfoFromApi = handleGetUserInfoFromApi;
    this._handleError = handleError;
  }

  getUserInfoFromApi() {
    this._handleGetUserInfoFromApi()
    .then(data => {
      this._name.textContent = data.name,
      this._about.textContent = data.about,
      this._avatar.src = data.avatar,
      this._id = data._id
    })
    .catch(err => {
      this._handleError(
        `Ошибка загрузки информации пользователя (код ${err.status})`
      );
    });
  }

  getUserInfoFromPage() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  getUserId() {
    return this._id;
  }
}
