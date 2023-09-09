import { Variables } from "./variables.js";

export const Utils = (function() {
  const currentUserId = '';

  function _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

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

  function toggleButtonState(inputList, buttonElement, settingsForm) {
    if (_hasInvalidInput(inputList)) {
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

  function successfulLoadPage() {
    Variables.spinner.classList.remove('spinner_visible');
    Variables.content.classList.remove('content_hidden');
    Variables.page.querySelector('.supportive-content').classList.remove('supportive-content_hidden');
  }

  function failedLoadPage() {
    Variables.spinner.classList.remove('spinner_visible');
    Variables.page.querySelector('.supportive-content').classList.remove('supportive-content_hidden');
  }

  return {
    currentUserId,
    showInputError,
    hideInputError,
    toggleButtonState,
    resetForm,
    setUserInfo,
    setUserAvatar,
    successfulLoadPage,
    failedLoadPage
  }
}());
