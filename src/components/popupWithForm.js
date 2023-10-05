import Popup from "./popup.js";
import { variables } from "./variables.js";
import { utils } from "./utils.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.

    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler; //В этом колбэке содержится метод класса Api.
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__item');
  }

  //Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    const _inputValues = [];
    this._inputs.forEach(input => {
      _inputValues.push(input.value)
      return _inputValues;
    });
  }

  //Перезаписывает родительский метод setEventListeners.
  //Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
  //но и добавлять обработчик сабмита формы
  _setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    })
  }

  open() {
    super.open();
    this._setEventListeners();
  }

  //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    // this._form.reset();
    utils.resetForm (this._form, variables.settingsForms);
  }

}

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
