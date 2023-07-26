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


function saveProfileInfo(evt) {
  evt.preventDefault();
  profile.querySelector('.profile__name').textContent = profileForm.username.value;
  profile.querySelector('.profile__about').textContent = profileForm.user_info.value;
  closePopup();
}

function addPost(evt) {
  evt.preventDefault();
  createPost(addPostForm.post_name.value, addPostForm.post_url.value);
  closePopup();
}

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

function setUserInfo(form) {
  form.username.setAttribute('value', profile.querySelector('.profile__name').textContent.trim());
  form.user_info.value = profile.querySelector('.profile__about').textContent.trim();
}

function showPopup(evt) {
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
  popupContainer.classList.add('popup__container_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup__container_opened');
}

function createPost(name, link) {
  const postElement = postTemplate.querySelector('.posts__item').cloneNode(true);
  const postImg = postElement.querySelector('.post__image');
  postImg.src = link;
  postImg.alt = `Фотография поста. ${link}`;
  postElement.querySelector('.post__title').textContent = name;
  postElement.querySelector('.post__like').addEventListener(
    'click', (evt) => {evt.target.classList.toggle('post__like_active')}
  );
  postElement.querySelector('.post__delete').addEventListener(
    'click', (evt) => evt.target.parentElement.remove()
  );
  postContainer.prepend(postElement);
}

initialCards

//showPosts();

profileEditBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
//formProfileInfo.addEventListener('submit', saveProfileInfo);
addPostBtn.addEventListener('click', showPopup);

