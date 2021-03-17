import {
  postList,
  generateGroupPosts,
  generatePostBlock
} from './templatePost.js';
import {
  showSuccessMessage,
  showErrorMessage,
  showLoadingMessage,
  hiddeLoadingMessage
} from './success.js';
import {
  closeModal
} from './uploadingPhotos.js';
const load = function(){
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        alert('Произошла ошибка соединения');
      }
      return response.json();
    })
    .then((json) => {
      generatePostBlock.photoDescriptions = json;
      postList.appendChild(generateGroupPosts(json));
      return undefined;
    });
  return undefined;
};

const upload = (evt) => {
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
      if (response.ok) {
        hiddeLoadingMessage();
        showSuccessMessage();
      } else {
        hiddeLoadingMessage();
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
    });
  closeModal();
  showLoadingMessage();
};


export {load, upload};
