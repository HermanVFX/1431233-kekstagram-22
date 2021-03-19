import {
  postList,
  generateGroupPosts,
  generatePostBlock
} from './templatePost.js';
import {
  showSuccessMessage,
  showErrorMessage,
  showLoadingMessage,
  hideLoadingMessage
} from './success.js';
import {
  closeModal
} from './uploadingPhotos.js';
import {randomFilterButton, defaultFilterButton, discussedFilterButton} from './filters.js';
import {sortCommentDescend} from './util.js';

const load = function(){
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        alert('Произошла ошибка соединения');
      }
      return response.json();
    })
    .then((json) => {
      const clearPictureList = (pictures) => {
        for (let i = 0; i < pictures.length; i++) {
          pictures[i].outerHTML = '';
        }
      };
      const pictures =  document.querySelectorAll('.picture');
      clearPictureList(pictures);
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      if (discussedFilterButton.classList.contains('img-filters__button--active')) {

        json.sort(sortCommentDescend);
        generatePostBlock.photoDescriptions = json;
        postList.appendChild(generateGroupPosts(json));
        return undefined;

      } if (randomFilterButton.classList.contains('img-filters__button--active')) {

        json.sort(function(){
          return 0.5 - Math.random()
        });
        json.length = 10;
        generatePostBlock.photoDescriptions = json;
        postList.appendChild(generateGroupPosts(json));
        return undefined;

      } if (defaultFilterButton.classList.contains('img-filters__button--active')) {

        generatePostBlock.photoDescriptions = json;
        postList.appendChild(generateGroupPosts(json));
        return undefined;

      }
    });
  return undefined;
};

const upload = function(evt) {
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
        hideLoadingMessage();
        showSuccessMessage();
      } else {
        hideLoadingMessage();
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
