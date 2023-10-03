import Api from "./api";
export default class UserInfo {
  constructor (userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;
  }

  //исп при загрузке стр и при открытии профиля
  setUserInfo({name, about}) {
    this._userNameSelector.textContent = name;
    this._userAboutSelector.textContent = about;

  }

  setUserAvatar (avatar) {this._userAvatarSelector.src = avatar;}

  //возвращает объект с данными пользователя.
  //Данные для этого метода нужно получать от методов класса Api —
  //подумайте над тем, как внедрить метод класса Api в getUserInfo.
  //Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.

  getUserInfo () {
    Api.getUserInfo()
    .then(data => {
      this.name = data.name
      this.description = data.about
      this.avatar = data.avatar
      return data
    })
  }
}
