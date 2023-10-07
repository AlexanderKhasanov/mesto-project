import { variables } from "./variables.js";

export const utils = (function() {
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
    variables.profileName.textContent = userInfo.name;
    variables.profileAbout.textContent = userInfo.about;
  }

  function setUserAvatar (photo) {
    variables.profileAvatar.src = photo;
  }

  function successfulLoadPage() {
    variables.spinner.classList.remove('spinner_visible');
    variables.content.classList.remove('content_hidden');
    variables.page.querySelector('.supportive-content').classList.remove('supportive-content_hidden');
  }

  function failedLoadPage() {
    //variables.spinner.classList.remove('spinner_visible');
    variables.page.querySelector('.supportive-content').classList.remove('supportive-content_hidden');
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
