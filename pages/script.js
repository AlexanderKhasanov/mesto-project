const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const popup = page.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const formProfileInfo = popupContainer.querySelector('.form');
const popupCloseBtn = popupContainer.querySelector('.popup__close-btn');

function setUserInfo() {
  formProfileInfo.username.value = profile.querySelector('.profile__name').textContent.trim();
  formProfileInfo.user_info.value = profile.querySelector('.profile__about').textContent.trim();
}

function showPopup() {
  setUserInfo();
  popup.classList.add('popup_opened');
  popupContainer.classList.add('popup__container_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup__container_opened');
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  profile.querySelector('.profile__name').textContent = formProfileInfo.username.value;
  profile.querySelector('.profile__about').textContent = formProfileInfo.user_info.value;
  closePopup();
}

profileEditBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
formProfileInfo.addEventListener('submit', saveProfileInfo);

