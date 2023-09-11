(()=>{"use strict";var t,e,o,r,n,i,a,s,u,c,l,p,d,f,m,_,v,y,b,S,h,P,E,g,A,q,L,C,k,F,I,U,T=(t={formSelector:".form",inputSelector:".form__item",submitButtonSelector:".form__send-btn",inactiveButtonClass:"form__send-btn_disabled",inputErrorClass:"form__item_type_error",errorClass:"form__item-error_active"},o=(e=document.querySelector(".page")).querySelector(".content"),r=e.querySelector(".spinner"),i=(n=e.querySelector(".profile")).querySelector(".profile__name"),a=n.querySelector(".profile__about"),s=n.querySelector(".profile__avatar"),c=(u=e.querySelector("#popup_edit-profile")).querySelector(".form"),l=u.querySelector(".form__send-btn"),p=Array.from(c.querySelectorAll(t.inputSelector)),f=(d=e.querySelector("#popup_add-post")).querySelector(".form"),m=d.querySelector(".form__send-btn"),_=Array.from(f.querySelectorAll(t.inputSelector)),y=(v=e.querySelector("#popup_edit-avatar")).querySelector(".form"),b=v.querySelector(".form__send-btn"),S=Array.from(y.querySelectorAll(t.inputSelector)),P=(h=e.querySelector("#popup_focus-img")).querySelector(".focus-img__image"),E=e.querySelector(".posts__posts-list"),A=(g=e.querySelector("#post-template").content).querySelector(".posts__item"),q=n.querySelector(".profile__edit-btn"),L=n.querySelector(".profile__add-btn"),C=n.querySelector(".profile__edit-avatar-btn"),F=(k=e.querySelector("#popup_confirmation-delete")).querySelector(".form__send-btn"),U=(I=e.querySelector("#popup_error")).querySelector(".popup__error-info"),{page:e,content:o,spinner:r,profile:n,profileName:i,profileAbout:a,profileAvatar:s,popupEditProfile:u,formEditProfile:c,btnSubmitEditProfileForm:l,inputEditProfile:p,popupAddPost:d,formAddPost:f,btnSubmitAddPostForm:m,inputListAddPost:_,popupEditAvatar:v,formEditAvatar:y,btnSubmitEditAvatarForm:b,inputEditAvatar:S,popupFocusImage:h,focusImage:P,postContainer:E,postTemplate:g,postCardTemplate:A,btnProfileEdit:q,btnAddPost:L,btnEditAvatar:C,settingsForms:t,popupConfirmationDelete:k,btnConfirmationDelete:F,popupError:I,popupErrorInfo:U,baseUrl:"https://nomoreparties.co/v1/plus-cohort-28",token:"09266f70-d3b4-4484-a640-19b16aad419c"}),x=function(){function t(t,e,o){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(o.inputErrorClass),r.classList.remove(o.errorClass),r.textContent=""}return{currentUserId:"",showInputError:function(t,e,o,r){var n=t.querySelector(".".concat(e.id,"-error"));e.classList.add(r.inputErrorClass),n.classList.add(r.errorClass),n.textContent=o},hideInputError:t,toggleButtonState:function(t,e,o){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.classList.remove(o.inactiveButtonClass),e.disabled=!1):(e.classList.add(o.inactiveButtonClass),e.disabled=!0)},resetForm:function(e,o){e.reset(),Array.from(e.querySelectorAll(o.inputSelector)).forEach((function(r){return t(e,r,o)}))},setUserInfo:function(t){T.profileName.textContent=t.name,T.profileAbout.textContent=t.about},setUserAvatar:function(t){T.profileAvatar.src=t},successfulLoadPage:function(){T.spinner.classList.remove("spinner_visible"),T.content.classList.remove("content_hidden"),T.page.querySelector(".supportive-content").classList.remove("supportive-content_hidden")},failedLoadPage:function(){T.spinner.classList.remove("spinner_visible"),T.page.querySelector(".supportive-content").classList.remove("supportive-content_hidden")}}}(),D=function(){function t(t){return t.ok?t.json():Promise.reject(t)}return{getDataForPage:function(){return Promise.all([fetch("".concat(T.baseUrl,"/users/me"),{headers:{authorization:T.token}}).then(t),fetch("".concat(T.baseUrl,"/cards"),{headers:{authorization:T.token}}).then(t)])},changeUserInfo:function(e){return fetch("".concat(T.baseUrl,"/users/me"),{method:"PATCH",headers:{authorization:T.token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t)},changeUserAvatar:function(e){return fetch("".concat(T.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:T.token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t)},addNewPost:function(e){return fetch("".concat(T.baseUrl,"/cards"),{method:"POST",headers:{authorization:T.token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t)},deletePost:function(e){return fetch("".concat(T.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:{authorization:T.token}}).then(t)},likePost:function(e){return fetch("".concat(T.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:T.token}}).then(t)},deleteLikePost:function(e){return fetch("".concat(T.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:T.token}}).then(t)}}}(),w=function(){function t(t){var e=T.postCardTemplate.cloneNode(!0),o=e.querySelector(".post__image");return o.src=t.link,o.alt="Фотография поста. ".concat(t.name),e.querySelector(".post__title").textContent=t.name,t.owner._id!==x.currentUserId&&e.querySelector(".post__delete").classList.add("post__delete_disable"),function(t){return t.likes.some((function(t){return t._id===x.currentUserId}))}(t)&&e.querySelector(".post__like").classList.add("post__like_active"),e.querySelector(".post__like-count").textContent=t.likes.length,e._id=t._id,e}return{createPost:t,setPostsListeners:function(t){t.target.classList.contains("post__like")&&function(t){var e=t.target.closest(".posts__item");t.target.classList.contains("post__like_active")?D.deleteLikePost(e._id).then((function(o){t.target.classList.remove("post__like_active"),e.querySelector(".post__like-count").textContent=o.likes.length})).catch((function(t){openPopupError("Ошибка снятия лайка","Во время снятия лайка с поста возникла ошибка ".concat(t.status,": ").concat(t.statusText))})):D.likePost(e._id).then((function(o){t.target.classList.add("post__like_active"),e.querySelector(".post__like-count").textContent=o.likes.length})).catch((function(t){openPopupError("Ошибка простановки лайка","Во время простановки лайка посту возникла ошибка ".concat(t.status,": ").concat(t.statusText))}))}(t),t.target.classList.contains("post__delete")&&j.openPopupConfirmationDelete(t),t.target.classList.contains("post__image")&&j.openPopupFocusImage(t)},renderPosts:function(e){e.forEach((function(e){T.postContainer.append(t(e))}))},_deletePost:function(){var t=this.target.closest(".posts__item");D.deletePost(t._id).then((function(){t.remove()})).catch((function(t){openPopupError("Ошибка удаления поста","Во время удаления поста возникла ошибка ".concat(t.status,": ").concat(t.statusText))})).finally((function(){return j.closePopup(T.popupConfirmationDelete)}))}}}(),j=function(){var t=null,e=null,o=3e3;function r(t,e){t.textContent=e}function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;t.classList.add("popup_opened"),function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;"popup_error"!==t.id&&(document.addEventListener("keydown",a),t.addEventListener("click",i),null!==e&&null!==o&&e.addEventListener("click",o))}(t,e,o)}function i(t){var e=T.page.querySelector(".popup_opened");(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-btn"))&&s(e)}function a(t){"Escape"===t.key&&s(T.page.querySelector(".popup_opened"))}function s(o){o.classList.remove("popup_opened"),"popup_error"!==o.id&&function(o){document.removeEventListener("keydown",a),o.removeEventListener("click",i),null!==t&&null!==e&&(e.removeEventListener("click",t),e=null,t=null)}(o)}function u(t){T.popupErrorInfo.textContent=t,n(T.popupError)}function c(t){t.preventDefault(),r(T.btnSubmitEditProfileForm,"Сохранение..."),D.changeUserInfo({name:T.formEditProfile.username.value,about:T.formEditProfile.user_info.value}).then((function(t){x.setUserInfo(t),s(T.popupEditProfile)})).catch((function(t){u("Во время сохранения профиля возникла ошибка (код ".concat(t.status,")")),setTimeout(s,o,T.popupError)})).finally((function(){return setTimeout(r,500,T.btnSubmitEditProfileForm,"Сохранить")}))}function l(t){t.preventDefault(),r(T.btnSubmitAddPostForm,"Загрузка поста..."),D.addNewPost({name:T.formAddPost.post_name.value,link:T.formAddPost.post_url.value}).then((function(t){T.postContainer.prepend(w.createPost(t)),s(T.popupAddPost)})).catch((function(t){u("Во время создания поста возникла ошибка (код ".concat(t.status,")")),setTimeout(s,o,T.popupError)})).finally((function(){return setTimeout(r,500,T.btnSubmitAddPostForm,"Создать")}))}function p(t){t.preventDefault(),r(T.btnSubmitEditAvatarForm,"Сохранение..."),D.changeUserAvatar({avatar:T.formEditAvatar.avatar_url.value}).then((function(t){x.setUserAvatar(t.avatar),s(T.popupEditAvatar)})).catch((function(t){u("Во время фотографии профиля возникла ошибка (код ".concat(t.status,")")),setTimeout(s,o,T.popupError)})).finally((function(){return setTimeout(r,500,T.btnSubmitEditAvatarForm,"Сохранить")}))}return{closePopup:s,openPopupEditProfile:function(){var o;x.resetForm(T.formEditProfile,T.settingsForms),(o=T.formEditProfile).username.value=T.profileName.textContent.trim(),o.user_info.value=T.profileAbout.textContent.trim(),x.toggleButtonState(T.inputEditProfile,T.btnSubmitEditProfileForm,T.settingsForms),e=T.btnSubmitEditProfileForm,t=c,n(T.popupEditProfile,e,t)},openPopupAddPost:function(){x.resetForm(T.formAddPost,T.settingsForms),x.toggleButtonState(T.inputListAddPost,T.btnSubmitAddPostForm,T.settingsForms),e=T.btnSubmitAddPostForm,t=l,n(T.popupAddPost,e,t)},openPopupFocusImage:function(t){T.focusImage.src=t.target.src,T.focusImage.alt=t.target.alt,T.popupFocusImage.querySelector(".focus-img__caption").textContent=t.target.closest(".post").querySelector(".post__title").textContent,n(T.popupFocusImage)},openPopupEditAvatar:function(){x.resetForm(T.formEditAvatar,T.settingsForms),x.toggleButtonState(T.inputEditAvatar,T.btnSubmitEditAvatarForm,T.settingsForms),e=T.btnSubmitEditAvatarForm,t=p,n(T.popupEditAvatar,e,t)},openPopupConfirmationDelete:function(o){t=w._deletePost.bind(o),e=T.btnConfirmationDelete,T.btnConfirmationDelete.addEventListener("click",t,{once:!0}),n(T.popupConfirmationDelete)},openPopupError:u,submitEditProfileForm:c,submitAddNewPost:l,submitEditAvatarForm:p}}(),B={enableValidation:function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){return function(t,e){var o=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);o.forEach((function(n){n.addEventListener("input",(function(){!function(t,e,o){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?x.hideInputError(t,e,o):x.showInputError(t,e,e.validationMessage,o)}(t,n,e),x.toggleButtonState(o,r,e)}))}))}(e,t)}))}};function N(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,r=new Array(e);o<e;o++)r[o]=t[o];return r}T.btnProfileEdit.addEventListener("click",j.openPopupEditProfile),T.btnAddPost.addEventListener("click",j.openPopupAddPost),T.btnEditAvatar.addEventListener("click",j.openPopupEditAvatar),T.postContainer.addEventListener("click",w.setPostsListeners),B.enableValidation(T.settingsForms),D.getDataForPage().then((function(t){var e,o,r=(o=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var o=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=o){var r,n,i,a,s=[],u=!0,c=!1;try{if(i=(o=o.call(t)).next,0===e){if(Object(o)!==o)return;u=!1}else for(;!(u=(r=i.call(o)).done)&&(s.push(r.value),s.length!==e);u=!0);}catch(t){c=!0,n=t}finally{try{if(!u&&null!=o.return&&(a=o.return(),Object(a)!==a))return}finally{if(c)throw n}}return s}}(e,o)||function(t,e){if(t){if("string"==typeof t)return N(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?N(t,e):void 0}}(e,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),n=r[0],i=r[1];x.setUserInfo(n),x.setUserAvatar(n.avatar),x.currentUserId=n._id,w.renderPosts(i),x.successfulLoadPage()})).catch((function(t){x.failedLoadPage(),j.openPopupError("Во время загурзки страницы возникла ошибка (код ".concat(t.status,")")),setTimeout(j.closePopup,3e3,T.popupError)}))})();