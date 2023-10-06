import { modal } from "./modal";
import { variables } from "./variables";

export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector, {handleGetUserInfoFromApi}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._handleGetUserInfoFromApi = handleGetUserInfoFromApi;
  }

  getUserInfoFromApi() {
    this._handleGetUserInfoFromApi()
    .then(data => {
      this._name.textContent = data.name,
      this._about.textContent = data.about,
      this._avatar.src = data.avatar,
      this._id = data.id
    })
    .catch(err => {
      modal.openPopupError(
        `Ошибка загрузки информации пользователя (код ${err.status})`
      );
    })
    .finally(() =>
    modal.closePopup(variables.popupConfirmationDelete)
    );
  }

  //для вставки в инпуты
  getUserInfo() {
    return {
      name: this._name,
      about: this._about
    }
  }

  //добавляем данные в элементы по селекторам
  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
