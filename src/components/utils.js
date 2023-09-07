import { Variables } from "./variables.js";

export const Utils = (function() {
  function showInputError(form, inputElement, errorMessage, settingsForm) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settingsForm.inputErrorClass);
    errorElement.classList.add(settingsForm.errorClass);
    errorElement.textContent = errorMessage;
  }

  function hideInputError(form, inputElement, settingsForm) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settingsForm.inputErrorClass);
    errorElement.classList.remove(settingsForm.errorClass);
    errorElement.textContent = '';
  }

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  function toggleButtonState(inputList, buttonElement, settingsForm) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settingsForm.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settingsForm.inactiveButtonClass);
      buttonElement.disabled = false;
    }

  }

  function resetForm (form, settingsForm) {
    form.reset();
    const inputList = Array.from(form.querySelectorAll(settingsForm.inputSelector));
    inputList.forEach((inputElement) => hideInputError(form, inputElement, settingsForm));
  }

  function setUserInfo(userInfo) {
    Variables.profileName.textContent = userInfo.name;
    Variables.profileAbout.textContent = userInfo.about;
  }

  function setUserAvatar (photo) {
    Variables.profileAvatar.src = photo;
  }

  return {
    showInputError,
    hideInputError,
    hasInvalidInput,
    toggleButtonState,
    resetForm,
    setUserInfo,
    setUserAvatar,
  }
}());
