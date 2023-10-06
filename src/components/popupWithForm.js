import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {formSubmitHandler}) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler; //В этом колбэке содержится метод класса Api.
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__item');
    this._inputValues = {};
  }

  //Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
      return this._inputValues;
    });
  }

  _setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
