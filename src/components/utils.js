import { variables } from "./variables.js";

export const utils = (function() {
  function successfulLoadPage() {
    variables.spinner.classList.remove('spinner_visible');
    variables.content.classList.remove('content_hidden');
    variables.page.querySelector('.supportive-content').classList.remove('supportive-content_hidden');
  }

  function failedLoadPage() {
    variables.page.querySelector('.supportive-content').classList.remove('supportive-content_hidden');
  }

  return {
    successfulLoadPage,
    failedLoadPage
  }
}());
