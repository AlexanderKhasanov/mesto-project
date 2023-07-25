const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popup = page.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const formProfileInfo = popupContainer.querySelector('.form');
const postContainer = page.querySelector('.posts__posts-list');

const profileEditBtn = profile.querySelector('.profile__edit-btn');
const popupCloseBtn = popupContainer.querySelector('.popup__close-btn');
const addPostBtn = profile.querySelector('.profile__add-btn');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

function showPosts() {
  const postTemplate = page.querySelector('#post-template').content;

  initialCards.forEach( post => {
    const postElement = postTemplate.querySelector('.posts__item').cloneNode(true);
    const postImg = postElement.querySelector('.posts__image');
    postImg.src = post.link;
    postImg.alt = `Фотография поста. ${post.name}`;
    postElement.querySelector('.posts__title').textContent = post.name;
    postContainer.prepend(postElement);
  });
}

showPosts();

profileEditBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
formProfileInfo.addEventListener('submit', saveProfileInfo);
addPostBtn.addEventListener('click', showPopup);

