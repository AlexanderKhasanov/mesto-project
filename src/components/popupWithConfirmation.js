import Popup from './popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(selector, {action}) {
    super(selector);
    this._btnConfirmation = this._popup.querySelector('.form__send-btn');
    this._action = action;
    this._submitConfirmation = this._submitConfirmation.bind(this);
  }

  _setEventListeners() {
    this._btnConfirmation.addEventListener('click', this._submitConfirmation);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._btnConfirmation.removeEventListener('click', this._submitConfirmation);
    super._removeEventListeners();
  }

  _submitConfirmation() {
    this._action(this._card);
  }

  open(card) {
    this._card = card;
    super.open();
  }
}
