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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch)
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    else
      inputElement.setCustomValidity('');

    if (!inputElement.validity.valid)
      this._showInputError(inputElement, inputElement.validationMessage);
    else
      this._hideInputError(inputElement);
  }

  _setFormEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
    this._form.addEventListener('reset', () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
        inputElement.value = '';
      });
      this.toggleButtonState();
    })
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._setFormEventListeners();
    this.toggleButtonState();
  }
}
