// Класс для создания формы
class Form {
  constructor (name) {
    this.name = name;
    this.templateForm = document.createElement('form');
    this.templateForm.classList.add('form');
    this.templateForm.name = name;
  }

  createTitle(title) {
    const titleElement = document.createElement('h2');
    titleElement.classList.add('form__title');
    titleElement.textContent = title;
    this.templateForm.append(titleElement);
  }

  createInput(names, placeholders){
    if (!Array.isArray(names) && !Array.isArray(placeholders)){
      console.log('Метод принимает на вход массивы names, placeholders');
      return
    }
    if (names.length != placeholders.length){
      console.log('Массивы names, placeholders должны быть одинаковой длины');
      return;
    }

    const fieldSetElement = document.createElement('fieldset')
    fieldSetElement.classList.add('form__input-container');

    names.forEach((name, index) => {
      const inputElement = document.createElement('input');
      inputElement.classList.add('form__item')
      inputElement.type = 'text';
      inputElement.name = name;
      inputElement.placeholder = placeholders[index];
      fieldSetElement.append(inputElement);
    });

    this.templateForm.append(fieldSetElement);
  }

  createButton(name, text, handle){
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('form__send-btn');
    buttonElement.type = 'submit';
    buttonElement.name = name;
    buttonElement.value = `${this.name}_${name}`;
    buttonElement.textContent = text;

    this.templateForm.append(buttonElement);
    this.templateForm.addEventListener('submit', handle);
  }
}

const page = document.querySelector('.page');
const profile = page.querySelector('.profile');

const popup = page.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');

const postContainer = page.querySelector('.posts__posts-list');
const postTemplate = page.querySelector('#post-template').content;

const profileEditBtn = profile.querySelector('.profile__edit-btn');
const popupCloseBtn = popupContainer.querySelector('.popup__close-btn');
const addPostBtn = profile.querySelector('.profile__add-btn');

const profileForm = getProfileForm();
const addPostForm = getPostForm();

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
  createPost(post.name, post.link)
});

// Сохранение измененной информации о пользователе
function saveProfileInfo(evt) {
  evt.preventDefault();
  profile.querySelector('.profile__name').textContent = profileForm.username.value;
  profile.querySelector('.profile__about').textContent = profileForm.user_info.value;
  closePopup();
}

// Добавления поста через форму
function addPost(evt) {
  evt.preventDefault();
  createPost(addPostForm.post_name.value, addPostForm.post_url.value);
  closePopup();
}


// Создание формы для изменения информации о пользователе
function getProfileForm() {
  const profileForm = new Form('profile');

  profileForm.createTitle('Редактировать профиль');
  profileForm.createInput(
    ['username', 'user_info'],
    ['Ваше имя', 'Пару слов о себе']
  );
  profileForm.createButton('save', 'Сохранить', saveProfileInfo);
  return profileForm.templateForm;
}

// Создание формы для добавления поста
function getPostForm() {
  const addPostForm = new Form('add_post');

  addPostForm.createTitle('Новое место');
  addPostForm.createInput(
    ['post_name', 'post_url'],
    ['Укажите название места', 'Укажите ссылку на фотографию этого места']
  );
  addPostForm.createButton('save', 'Добавить', addPost);
  return addPostForm.templateForm;
}

// Заполнение формы для изменения информации о пользователе
// текущей информацией
function setUserInfo(form) {
  form.username.setAttribute('value', profile.querySelector('.profile__name').textContent.trim());
  form.user_info.value = profile.querySelector('.profile__about').textContent.trim();
}

// Открытие модального окна с формами
function showInfoPopup(evt) {
  popup.classList.remove('popup_type_focus');
  popupContainer.classList.remove('popup__container_type_focus');
  const popupContent = popup.querySelector('.popup__container .popup__content');
  switch (evt.target.name){
    case 'edit_profile':
      if (!popupContent.contains(profileForm)){
        popupContent.childNodes.forEach(item => item.remove());
        popupContent.append(profileForm);
      }
      setUserInfo(profileForm);
      break;
    case 'add_content':
      if (!popupContent.contains(addPostForm)){
        popupContent.childNodes.forEach(item => item.remove());
        popupContent.append(addPostForm);
      }
      break;
  }

  popup.classList.add('popup_opened');
  popupContainer.classList.add(
    'popup__container_opened', 'popup__container_type_info'
  );
}

// Закрытие модального окна
function closePopup() {
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup__container_opened');
}

// Добавление увеличенного изображения в модальное окно
function createFocusImage (img, caption) {
  const imageContainer = document.createElement('figure');
  imageContainer.classList.add('focus-img');

  const image = document.createElement('img');
  image.classList.add('focus-img__image');
  image.src = img;

  const imageCaption = document.createElement('figcaption');
  imageCaption.classList.add('focus-img__caption');
  imageCaption.textContent = caption.textContent;

  imageContainer.append(image);
  imageContainer.append(imageCaption);

  return imageContainer;
}

// Открытие модального окна с увеличенным изображением
function focusImagePopup(evt) {
  popupContainer.classList.remove('popup__container_type_info');

  const popupContent = popup.querySelector('.popup__container .popup__content');
  popupContent.childNodes.forEach(item => item.remove());

  const focusImage = createFocusImage(
    evt.target.src,
    evt.target.closest('.post').querySelector('.post__title')
  );

  popupContent.append(focusImage);

  popup.classList.add(
    'popup_opened', 'popup_type_focus'
  );
  popupContainer.classList.add(
    'popup__container_opened', 'popup__container_type_focus'
  );
}

// Создание поста
function createPost(name, link) {
  const postElement = postTemplate.querySelector('.posts__item').cloneNode(true);
  const postImg = postElement.querySelector('.post__image');
  postImg.src = link;
  postImg.alt = `Фотография поста. ${link}`;
  postImg.addEventListener('click', focusImagePopup);
  postElement.querySelector('.post__title').textContent = name;
  postElement.querySelector('.post__like').addEventListener(
    'click', (evt) => {evt.target.classList.toggle('post__like_active')}
  );
  postElement.querySelector('.post__delete').addEventListener(
    'click', evt => evt.target.closest('.posts__item').remove()
    );
  postContainer.prepend(postElement);
}

// Открытие модальных окон
profileEditBtn.addEventListener('click', showInfoPopup);
addPostBtn.addEventListener('click', showInfoPopup);

// Закрытие модальных окон
// По нажатию на кнопку закрытия
popupCloseBtn.addEventListener('click', closePopup);
// По нажатию клавиши  Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape')
    closePopup();
});
// По нажатию на область вне модального окна
popup.addEventListener('click', (evt) => {
  if (evt.target === popup)
    closePopup();
});
