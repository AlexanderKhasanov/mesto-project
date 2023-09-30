import Popup from "./popup.js";

export default class PopupError extends Popup {
  constructor(selector, timeoutClosePopup=3000) {
    super(selector);
    this._errorInfo = this._popup.querySelector('.popup__error-info');
    this._timeoutClosePopup = timeoutClosePopup;
    //this._handleClickClose = null;
  }

  _handleClickClose() {

  }

  open(errorInfo) {
    super.open();
    this._errorInfo.textContent = errorInfo;
    setTimeout(this.close.bind(this), this._timeoutClosePopup);
  }
}
