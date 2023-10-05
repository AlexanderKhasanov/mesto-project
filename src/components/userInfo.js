import { construct } from "core-js/fn/reflect";
import Api from "./api";
import PopupError from "./popupError";

export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector, { handleUserInfo }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(userAvatarSelector);
    this._handleUserInfo = handleUserInfo;
    // this._api = api;
  }
  getUserInfoFromApi() {
    this._handleUserInfo();

    // this._api()
    // .then(data => {
    //   this.name = data.name,
    //   this.about = data.about,
    //   this.avatar = data.avatar,
    //   this.id = data.id
    // })
  }

  // getUserInfoFromPage() { }

  // //исп при загрузке стр и при открытии профиля
  // setUserInfo({ name, about }) {
  //   this._userNameSelector.textContent = name;
  //   this._userAboutSelector.textContent = about;
  // }

  // setUserAvatar(avatar) {
  //   this._userAvatarSelector.src = avatar;
  // }

  // //возвращает объект с данными пользователя.
  // //Данные для этого метода нужно получать от методов класса Api —
  // //подумайте над тем, как внедрить метод класса Api в getUserInfo.
  // //Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.



  // getUserInf o api() {
  //   this._handleUserInfo



  //   Api.getUserInfo()
  //     .then(data => {
  //       this._name = data.name
  //       this._about = data.about
  //       this._avatar = data.avatar
  //       return data //не надо
  //     })
  //     .catch //см card handle open из кл PopupError;
  // }

  // getUserInfoFromApi() { } //при загрузке страницы, нужно поле id, всегда вызывать после созд класса
  // // но без сильной привязки
  // //name, about
  // getUserInfoFromPage() { } //для открытия модального окна
  // return
  // constructor
  // getUserId() { } //для отд получения айди
  // return this.id
}
