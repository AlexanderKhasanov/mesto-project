export default class Card  {
  constructor(
    {_id, name, link, owner, likes},
    templateSelector,
    currentUserId,
    {handleClick, handleLiked, handleDelete, handleError}
  ) {
    this._id = _id;
    this._name = name;
    this._link  = link;
    this._owner = owner;
    this._likes = likes;
    this._currentUserId = currentUserId;
    this._selector = templateSelector;
    this._isLiked = this._likes.some(people => {
      return people._id === this._currentUserId;
    })
    this._handleClick = handleClick;
    this._handleApiLiked = handleLiked;
    this._handleApiDelete = handleDelete;
    this._handleError = handleError
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.posts__item')
      .cloneNode(true);
  }

  _likeCard() {
    this._handleApiLiked()
      .then(data => {
          this._cardLikeBtn.classList.toggle('post__like_active');
          this._cardLikeNumber.textContent = data.likes.length;
          this._isLiked = !this._isLiked;
        })
        .catch(err => {
          const action = this._isLiked ? 'удаления' : 'постановки';
          this._handleError(
            `Во время ${action} лайка возникла ошибка (код ${err.status})`
          );
        });
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => this._handleClick(this._cardImg, this._name));
    this._cardLikeBtn.addEventListener('click', this._likeCard.bind(this));
    this._cardDeleteBtn.addEventListener('click', this._handleApiDelete)
  }

  isLiked() {
    return this._isLiked;
  }

  getCardId() {
    return this._id;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  createCard() {
    this._card = this._getElement();
    this._cardImg = this._card.querySelector('.post__image');
    this._cardImg.src = this._link;
    this._cardImg.alt = `Фотография поста. ${this._name}`;
    this._card.querySelector('.post__title').textContent = this._name;
    this._cardLikeBtn = this._card.querySelector('.post__like');
    this._cardLikeNumber = this._card.querySelector('.post__like-count');
    this._cardDeleteBtn = this._card.querySelector('.post__delete');
    if (this._owner._id !== this._currentUserId)
      this._cardDeleteBtn.classList.add('post__delete_disable');
    if (this._isLiked)
      this._cardLikeBtn.classList.add('post__like_active');
    this._cardLikeNumber.textContent = this._likes.length;
    this._setEventListeners();
    return this._card;
  }
}
