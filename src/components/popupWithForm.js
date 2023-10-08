import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {formSubmitHandler}) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__item');
    this._submitBtn = this._form.querySelector('.form__send-btn');
    this._inputValues = {};
    this._submit = this._submit.bind(this);
  }

  _getInputValues() {
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value.trim();
    });
    return this._inputValues;
  }

  _submit(evt) {
    evt.preventDefault();
    this._formSubmitHandler(this._getInputValues());
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submit);
  }

  _removeEventListeners() {
    super._setEventListeners();
    this._form.removeEventListener('submit', this._submit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setStartInputValues(values) {
    Object.keys(values).forEach(key => {
      this._form.querySelector(`input[name=${key}]`).value = values[key];
    })
  }

  getPopupForm() {
    return this._form;
  }

  editTextSubmitButton(textButton) {
    this._submitBtn.textContent = textButton;
  }
}
