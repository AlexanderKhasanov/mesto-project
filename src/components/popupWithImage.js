import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
    this._popupImg = this._popup.querySelector('.focus-img__image');
    this._popupTitle = this._popup.querySelector('.focus-img__caption');
    this.open = this.open.bind(this);
  }

  open(image, imgName) {
    this._popupImg.src = image.src;
    this._popupImg.alt = image.alt;
    this._popupTitle.textContent = imgName;
    super.open();
    console.log(this._popupImg)
  }
}
