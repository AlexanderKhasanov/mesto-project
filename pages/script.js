const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const popupEditProfile = page.querySelector('#popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.form');
const btnClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-btn');
const btnSubmitEditProfileForm = popupEditProfile.querySelector('.form__send-btn');

const popupAddPost = page.querySelector('#popup_type_add-post');
const formAddPost = popupAddPost.querySelector('.form');
const btnClosePopupAddPost = popupAddPost.querySelector('.popup__close-btn');
const btnSubmitAddPostForm = popupAddPost.querySelector('.form__send-btn');

const popupFocusImage = page.querySelector('#popup_type_focus-img');
const focusImage = popupFocusImage.querySelector('.focus-img__image');
const btnClosePopupFocusImage = popupFocusImage.querySelector('.popup__close-btn');

const postContainer = page.querySelector('.posts__posts-list');
const postTemplate = page.querySelector('#post-template').content;
const postCardTemplate = postTemplate.querySelector('.posts__item');

const btnProfileEdit = profile.querySelector('.profile__edit-btn');
const btnAddPost = profile.querySelector('.profile__add-btn');

// Стартовые посты
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
].forEach( post => {
  postContainer.prepend(
    createPost(post.name, post.link)
  );
});

// Заполнение формы для изменения информации о пользователе
// текущей информацией
function setUserInfo(form) {
  form.username.value = profileName.textContent.trim();
  form.user_info.value = profileAbout.textContent.trim();
}

// Очистка формы добавления поста
function cleanAddPostForm(form) {
  form.post_name.value = '';
  form.post_url.value = '';
}

// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Открытие модального окна изменения профиля
function openPopupEditProfile() {
  setUserInfo(formEditProfile);
  openPopup(popupEditProfile);
}

// Открытие модального окна добавления поста
function openPopupAddPost() {
  cleanAddPostForm(formAddPost);
  openPopup(popupAddPost);
}

// Открытие модального окна с увеличенным изображением
function openPopupFocusImage(evt) {
  focusImage.src = evt.target.src;
  focusImage.alt = evt.target.alt;
  popupFocusImage.querySelector('.focus-img__caption').textContent = evt.target.closest('.post').querySelector('.post__title').textContent;
  openPopup(popupFocusImage);
}

// Закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Закрытие модального окна изменения профиля
function closePopupEditProfile() {
  closePopup(popupEditProfile);
}

// Закрытие модального окна добавления поста
function closePopupAddPost() {
  closePopup(popupAddPost);
}

function closeFocusImagePopup() {
  closePopup(popupFocusImage);
}

// Сохранение измененной информации о пользователе
function submitEditProfileForm(evt) {
  evt.preventDefault();
  const form = popupEditProfile.querySelector('.form');
  profileName.textContent = form.username.value;
  profileAbout.textContent = form.user_info.value;
  closePopupEditProfile();
}

// Создание поста
function createPost(name, link) {
  const newPost = postCardTemplate.cloneNode(true);
  const postImg = newPost.querySelector('.post__image');
  postImg.src = link;
  postImg.alt = `Фотография поста. ${name}`;
  postImg.addEventListener('click', openPopupFocusImage);
  newPost.querySelector('.post__title').textContent = name;
  newPost.querySelector('.post__like').addEventListener(
    'click', evt => {evt.target.classList.toggle('post__like_active')}
  );
  newPost.querySelector('.post__delete').addEventListener(
    'click', evt => evt.target.closest('.posts__item').remove()
    );
  return newPost;
}

// Добавления поста через форму
function addNewPost(evt) {
  evt.preventDefault();
  const form = popupAddPost.querySelector('.form');
  postContainer.prepend(
    createPost(form.post_name.value, form.post_url.value)
  );
  closePopupAddPost();
}

// Открытие модальных окон
btnProfileEdit.addEventListener('click', openPopupEditProfile);
btnAddPost.addEventListener('click', openPopupAddPost);

// Отправка форм
btnSubmitEditProfileForm.addEventListener('click', submitEditProfileForm);
btnSubmitAddPostForm.addEventListener('click', addNewPost);

// Закрытие модальных окон
// По нажатию на кнопку закрытия
btnClosePopupEditProfile.addEventListener('click', closePopupEditProfile);
btnClosePopupAddPost.addEventListener('click', closePopupAddPost);
btnClosePopupFocusImage.addEventListener('click', closeFocusImagePopup);
