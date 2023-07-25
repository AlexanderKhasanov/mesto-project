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

class Form {
  constructor (name) {
    this.name = name;
    this.templateForm = document.createElement('form');
    this.templateForm.classList.add('form');
    this.templateForm.name = name;
    console.log(this.templateForm);
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
      inputElement.placeholders = placeholders[index];
      fieldSetElement.append(inputElement);
    });

    this.templateForm.append(fieldSetElement);
  }

  createButton(name, text){
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('form__send-btn');
    buttonElement.type = 'submit';
    buttonElement.name = name;
    buttonElement.value = `${this.name}_${name}`;
    buttonElement.textContent = text;

    this.templateForm.append(buttonElement);
  }
}

//const formTemplate = page.querySelector('#form-template').content;

function setUserInfo(form) {
  console.log('setUserInfo');
  form.username.value = profile.querySelector('.profile__name').textContent.trim();
  form.user_info.value = profile.querySelector('.profile__about').textContent.trim();
}

function getFromInput(){}

function getProfileForm() {
  const profileForm = new Form('profile');

  profileForm.createTitle('Редактировать профиль');
  profileForm.createInput(
    ['username', 'user_info'],
    ['Ваше имя', 'Пару слов о себе']
  );
  profileForm.createButton('save', 'Сохранить');
  return profileForm.templateForm;
}

function getPostForm() {
}

const profileForm = getProfileForm();

//popup.querySelector('.popup__container').innerHTML = profileForm.outerHTML;

function showPopup(evt) {
  console.log(evt.target);

  const popupContent = popup.querySelector('.popup__container .popup__content');
  console.log(popupContent);
  switch (evt.target.name){
    case 'edit_profile':
      console.log('edit_profile');
      /*
      const form = container.querySelector('.form');
      if (form !== profileForm){
        console.log('new form');
        container.append(profileForm);
        setUserInfo(form);
      }*/
      setUserInfo(profileForm);
      popupContent.innerHTML = profileForm.outerHTML;
      break;
  }

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
/*
const t = page.querySelector('#form-template').content;
const t_clone = t.querySelector('.form').cloneNode(true);
console.log(t_clone);*/

profileEditBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
//formProfileInfo.addEventListener('submit', saveProfileInfo);
addPostBtn.addEventListener('click', showPopup);

