import { Variables } from "./variables.js";
import { Modal } from "./modal.js";

export const Card = (function () {
  // Создание поста
  function createPost (name, link) {
    const newPost = Variables.postCardTemplate.cloneNode(true);
    const postImg = newPost.querySelector('.post__image');
    postImg.src = link;
    postImg.alt = `Фотография поста. ${name}`;
    newPost.querySelector('.post__title').textContent = name;
    return newPost;
  }

  // Добавления поста через форму
  function addNewPost(evt) {
    evt.preventDefault();
    const form = Variables.popupAddPost.querySelector('.form');
    Variables.postContainer.prepend(
      createPost(form.post_name.value, form.post_url.value)
    );
    Modal.closePopup(Variables.popupAddPost);
  }

  function renderCards(cards) {
    cards.forEach(card => {
      Variables.postContainer.prepend(
        createPost(card.name, card.link)
      );
    });
  }

  function likePost(evt) {
    evt.target.classList.toggle('post__like_active');
  }

  function deletePost(evt) {
    evt.target.closest('.posts__item').remove();
  }

  function setPostsListeners(evt) {
    if (evt.target.classList.contains('post__like'))
      likePost(evt);
    if (evt.target.classList.contains('post__delete'))
      deletePost(evt);
    if (evt.target.classList.contains('post__image'))
      Modal.openPopupFocusImage(evt);
  }

  return {
    createPost,
    addNewPost,
    setPostsListeners,
    renderCards,
  }
}());
