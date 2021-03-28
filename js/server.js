const uploadErrorMessage = 'Не удалось отправить форму. Попробуйте еще раз';
const loadErrorMessage = 'Отсутствует связь с сервером. Попробуйте позже';

import {showAlert} from './success.js'

const load = function(onSuccess) {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert(loadErrorMessage);
    });
};

const upload = function(onSuccess, onError, evt) {
  const formData = new FormData(evt.target);
  evt.preventDefault();
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok){
        onSuccess();
      } else {
        onError(uploadErrorMessage);
      }
    })
    .catch(()=> {
      onError(uploadErrorMessage);
    });
};

export {load, upload};
