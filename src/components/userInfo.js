import { modal } from "./modal";
import { variables } from "./variables";

export default class UserInfo {
  constructor(nameSelectorELement, aboutSelectorELement) {
    this._name = nameSelectorELement;
    this._about = aboutSelectorELement;
    this._avatar = document.querySelector('.profile__avatar');
    this._id = id;
    // this._handleUserInfo = handleUserInfo;
    // this._api = api;
  }

  //считаю, что метод getUserInfoFromApi и не нужен, потому что при загрузке страницы мы берем данные из промиса
  // достаточно getUserInfo, который возвращает берет данные со входа/промиса
  //а catch и finally лучше поставить там, где происходит непосредственно вызов api
  //(могу ошибаться)
  getUserInfoFromApi() {
    this._api()
    .then(data => {
      this._name.textContent = data.name,
      this._about.textContent = data.about,
      this._avatar.src = data.avatar,
      this._id = data.id
      // return data
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

  //получаем данные
  getUserInfo(data) {
    return {
      name: data.name,
      about: data.about,
      avatar: data.avatar
    }
  }

  //для вставки в инпуты
  getUserInfoFromPage({name, about}) {
    this._name.textContent = name.value;
    this._about.textContent = about.value;
  }

  //добавляем данные в элементы по селекторам
  setUserInfo({name, about, avatar = undefined}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
