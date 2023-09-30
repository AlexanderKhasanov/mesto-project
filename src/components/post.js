import { variables } from "./variables.js";
import { modal } from "./modal.js";
import Api from "./api.js";
import { utils } from "./utils.js";

export const post = (function () {
  function _isLike(post) {
    return post.likes.some(people => {
      return people._id === utils.currentUserId;
    })
  }

  function _deletePost() {
    const post = this.target.closest('.posts__item');
    Api.deletePost(post._id)
      .then(() => {
        post.remove();
      })
      .catch(err => {
        openPopupError(
          'Ошибка удаления поста',
          `Во время удаления поста возникла ошибка ${err.status}: ${err.statusText}`
        );
      })
      .finally(() => modal.closePopup(variables.popupConfirmationDelete));
  }

  function _likePost(evt) {
    const post = evt.target.closest('.posts__item');
    if (!evt.target.classList.contains('post__like_active')) {
      Api.likePost(post._id)
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
      Api.deleteLikePost(post._id)
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
    const newPost = variables.postCardTemplate.cloneNode(true);
    const postImg = newPost.querySelector('.post__image');
    postImg.src = post.link;
    postImg.alt = `Фотография поста. ${post.name}`;
    newPost.querySelector('.post__title').textContent = post.name;
    if (post.owner._id !== utils.currentUserId)
      newPost.querySelector('.post__delete').classList.add('post__delete_disable');

    if (_isLike(post))
      newPost.querySelector('.post__like').classList.add('post__like_active');
    newPost.querySelector('.post__like-count').textContent = post.likes.length;
    newPost._id = post._id;
    return newPost;
  }

  function renderPosts(posts) {
    posts.forEach(post => {
      variables.postContainer.append(
        createPost(post)
      );
    });
  }

  function setPostsListeners(evt) {
    if (evt.target.classList.contains('post__like'))
      _likePost(evt);
    if (evt.target.classList.contains('post__delete'))
      //_deletePost(evt);
      modal.openPopupConfirmationDelete(evt);
    if (evt.target.classList.contains('post__image'))
      modal.openPopupFocusImage(evt);
  }

  return {
    createPost,
    setPostsListeners,
    renderPosts,
    _deletePost
  }
}());
