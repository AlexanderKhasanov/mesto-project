export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape')
      this.close();
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
      this.close();
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickClose);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown',this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened')
    this._removeEventListeners();
  }
}
