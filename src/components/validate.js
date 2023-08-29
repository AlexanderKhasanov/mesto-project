import { Utils } from "./utils.js";

export const Validate = (function () {
  function checkInputValidity(form, inputElement, settingsForm) {
    if (inputElement.validity.patternMismatch)
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    else
      inputElement.setCustomValidity('');

    if (!inputElement.validity.valid)
      Utils.showInputError(form, inputElement, inputElement.validationMessage, settingsForm);
    else
      Utils.hideInputError(form, inputElement, settingsForm);
  }

  function setFormEventListeners(form, settingsForm) {
    const inputList = Array.from(form.querySelectorAll(settingsForm.inputSelector));
    const buttonElement = form.querySelector(settingsForm.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(form, inputElement, settingsForm);
        Utils.toggleButtonState(inputList, buttonElement, settingsForm);
      });
    });
  }

  function enableValidation(settingsForms) {
    const formList = Array.from(document.querySelectorAll(settingsForms.formSelector));
    formList.forEach((form) => setFormEventListeners(form, settingsForms));
  }

  return {
    enableValidation
  }
}());
