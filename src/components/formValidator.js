export default class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    },
    form
  ) {
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(inputSelector)
    );
    this._buttonElement = this._form.querySelector(submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError() {

  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch)
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    else
      inputElement.setCustomValidity('');

    if (!inputElement.validity.valid)
      this._showInputError(inputElement, inputElement.validationMessage);
    else
      this._hideInputError();
  }

  _toggleButtonState() {

  }

  _setFormEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {

  }
}
