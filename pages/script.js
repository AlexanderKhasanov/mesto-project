const page = document.querySelector('.page');
const profile = page.querySelector('.profile');

const popupEditProfile = page.querySelector('#popup_type_edit-profile');
const btnClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-btn');
const btnSubmitEditProfileForm = popupEditProfile.querySelector('.form__send-btn');

const popupAddPost = page.querySelector('#popup_type_add-post');
const btnClosePopupAddPost = popupAddPost.querySelector('.popup__close-btn');
const btnSubmitAddPostForm = popupAddPost.querySelector('.form__send-btn');

const popupFocusImage = page.querySelector('#popup_type_focus-img');
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
  //form.username.setAttribute('value', profile.querySelector('.profile__name').textContent.trim());
  form.username.value = profile.querySelector('.profile__name').textContent.trim();
  form.user_info.value = profile.querySelector('.profile__about').textContent.trim();
}

// Очистка формы добавления поста
function cleanAddPostForm(form) {
  form.post_name.value = '';
  form.post_url.value = '';
}

// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__container').classList.add('popup__container_opened');
}

// Открытие модального окна изменения профиля
function openPopupEditProfile() {
  setUserInfo(popupEditProfile.querySelector('.form'));
  openPopup(popupEditProfile);
}

// Открытие модального окна добавления поста
function openPopupAddPost() {
  cleanAddPostForm(popupAddPost.querySelector('.form'));
  openPopup(popupAddPost);
}

// Открытие модального окна с увеличенным изображением
function openPopupFocusImage(evt) {
  popupFocusImage.querySelector('.focus-img__image').src = evt.target.src;
  popupFocusImage.querySelector('.focus-img__caption').textContent = evt.target.closest('.post').querySelector('.post__title').textContent;
  openPopup(popupFocusImage);
}

// Закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.querySelector('.popup__container').classList.remove('popup__container_opened');
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
  profile.querySelector('.profile__name').textContent = form.username.value;
  profile.querySelector('.profile__about').textContent = form.user_info.value;
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
// По нажатию клавиши  Esc
document.addEventListener('keydown', (evt) => {
  const popup = page.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popup)
    closePopup(popup);
});
// По нажатию на область вне модального окна
document.addEventListener('click', (evt) => {
  const popup = page.querySelector('.popup_opened');
  if (evt.target === popup)
    closePopup(popup);
});
