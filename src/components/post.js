import { Variables } from "./variables.js";
import { Modal } from "./modal.js";
import { API } from "./api.js";
import { Utils } from "./utils.js";

export const Post = (function () {
  function isLike(post) {
    return post.likes.some(people => {
      return people._id === Utils.currentUserId;
    })
  }

  // Создание поста
  function createPost (post) {
    const newPost = Variables.postCardTemplate.cloneNode(true);
    const postImg = newPost.querySelector('.post__image');
    postImg.src = post.link;
    postImg.alt = `Фотография поста. ${post.name}`;
    newPost.querySelector('.post__title').textContent = post.name;
    if (post.owner._id !== Utils.currentUserId)
      newPost.querySelector('.post__delete').classList.add('post__delete_disable');
    if (isLike(post))
      newPost.querySelector('.post__like').classList.add('post__like_active');
    newPost._id = post._id;
    return newPost;
  }

  // Добавления поста через форму
  function addNewPost(evt) {
    evt.preventDefault();
    const form = Variables.popupAddPost.querySelector('.form');

    API.addNewPost({
      name: form.post_name.value,
      link: form.post_url.value,
    })
      .then(data => {
        Variables.postContainer.prepend(
          createPost(data)
        );
      })
      .catch(err => console.log(`ERROR: ${err}`));


    Modal.closePopup(Variables.popupAddPost);
  }

  function renderPosts(posts) {
    posts.forEach(post => {
      Variables.postContainer.append(
        createPost(post)
      );
    });
  }

  function deletePost(evt) {
    const post = evt.target.closest('.posts__item');
    API.deletePost(post._id)
      .then(data => {
        post.remove();
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  function likePost(evt) {
    //evt.target.classList.toggle('post__like_active');
    const post = evt.target.closest('.posts__item');
    if (!evt.target.classList.contains('post__like_active')) {
      API.likePost(post._id)
      .then(data => {
        evt.target.classList.add('post__like_active');
      })
      .catch(err => console.log(`Ошибка лайке карточки: ${err}`));
    }
    else {
      API.deleteLikePost(post._id)
      .then(data => {
        evt.target.classList.remove('post__like_active');
      })
      .catch(err => console.log(`Ошибка удалении лайка карточки: ${err}`));
    }
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
    renderPosts,
  }
}());
