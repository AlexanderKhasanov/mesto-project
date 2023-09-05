import { Variables } from "./variables.js";
import { Modal } from "./modal.js";

export const API = (function() {
  function setUserInfo (userInfo) {
    Variables.profileName.textContent = userInfo.name;
    Variables.profileAbout.textContent = userInfo.about;
  }

  function setUserAvatar(photo) {
    Variables.profileAvatar.src = photo;
  }

  function getUserInfo (cohortId, token){
    fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
      headers: {
        authorization: token
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        return Promise.reject(res.status);
      })
      .then(data => {
        setUserInfo({
          name: data.name,
          about: data.about,
        });
        setUserAvatar(data.avatar);
      })
      .catch(err => {
        console.log(err)
        Modal.openPopupError(
          'Ошибка',
          `Во время запроса информации о пользователе возникла ошибка: ${err}`
        );
      });
  }
  return {
    getUserInfo,
  }
}());
