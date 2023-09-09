import { Variables } from "./variables.js";
import { Modal } from "./modal.js";
import { API } from "./api.js";
import { Utils } from "./utils.js";

export const Post = (function () {
  function _isLike(post) {
    return post.likes.some(people => {
      return people._id === Utils.currentUserId;
    })
  }

  function _deletePost() {
    const post = this.target.closest('.posts__item');
    API.deletePost(post._id)
      .then(() => {
        post.remove();
      })
      .catch(err => {
        openPopupError(
          'Ошибка удаления поста',
          `Во время удаления поста возникла ошибка ${err.status}: ${err.statusText}`
        );
      })
      .finally(() => Modal.closePopup(Variables.popupConfirmationDelete));
  }

  function _likePost(evt) {
    const post = evt.target.closest('.posts__item');
    if (!evt.target.classList.contains('post__like_active')) {
      API.likePost(post._id)
      .then(data => {
        evt.target.classList.add('post__like_active');
        post.querySelector('.post__like-count').textContent = data.likes.length;
      })
      .catch(err => {
        openPopupError(
          'Ошибка простановки лайка',
          `Во время простановки лайка посту возникла ошибка ${err.status}: ${err.statusText}`
        );
      });
    }
    else {
      API.deleteLikePost(post._id)
      .then(data => {
        evt.target.classList.remove('post__like_active');
        post.querySelector('.post__like-count').textContent = data.likes.length;
      })
      .catch(err => {
        openPopupError(
          'Ошибка снятия лайка',
          `Во время снятия лайка с поста возникла ошибка ${err.status}: ${err.statusText}`
        );
      });
    }
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

    if (_isLike(post))
      newPost.querySelector('.post__like').classList.add('post__like_active');
    newPost.querySelector('.post__like-count').textContent = post.likes.length;
    newPost._id = post._id;
    return newPost;
  }

  function renderPosts(posts) {
    posts.forEach(post => {
      Variables.postContainer.append(
        createPost(post)
      );
    });
  }

  function setPostsListeners(evt) {
    if (evt.target.classList.contains('post__like'))
      _likePost(evt);
    if (evt.target.classList.contains('post__delete'))
      //_deletePost(evt);
      Modal.openPopupConfirmationDelete(evt);
    if (evt.target.classList.contains('post__image'))
      Modal.openPopupFocusImage(evt);
  }

  return {
    createPost,
    setPostsListeners,
    renderPosts,
    _deletePost
  }
}());
