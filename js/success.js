'use strict';
const ALERT_SHOW_TIME = 5000;
const main = document.querySelector('main');
const form = document.querySelector('.img-upload__form');

import {closeModal} from './uploading-photos.js';

const findSuccessButton = function () {
  const successButton = main.querySelector('.success__button');
  return successButton;
};
const findErrorButton = function () {
  const errorButton = main.querySelector('.error__button');
  return errorButton;
};

const hideSuccessMessage = function () {
  document.querySelector('body').classList.remove('modal-open');
  findSuccessButton().removeEventListener('click', hideSuccessMessage);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('mouseup', onSuccessMessageMouseUp);
  main.querySelector('.success').remove();
};

const hideErrorMessage = function () {
  document.querySelector('body').classList.remove('modal-open');
  findErrorButton().removeEventListener('click', hideErrorMessage);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('mouseup', onErrorMessageMouseUp);
  main.querySelector('.error').remove();
};

const onSuccessMessageEscKeydown = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
    form.reset();
    hideSuccessMessage();
  }
};

const onErrorMessageEscKeydown = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
    form.reset();
    hideErrorMessage();
  }
};

const onSuccessMessageMouseUp = function (evt) {
  if (evt.target !== main.querySelector('.success__inner')) {
    hideSuccessMessage();
    closeModal();
    form.reset();
  }
};

const onErrorMessageMouseUp = function (evt) {
  if (evt.target !== main.querySelector('.error__inner')) {
    hideErrorMessage();
    closeModal();
    form.reset();
  }
};

const showSuccessMessage = function () {
  const alertBox = document.createDocumentFragment();
  const alertSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  const successSection = alertSuccessTemplate.cloneNode(true);
  alertBox.appendChild(successSection);
  main.appendChild(alertBox);
  document.querySelector('body').classList.add('modal-open');
  findSuccessButton().addEventListener('click', hideSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('mouseup', onSuccessMessageMouseUp);
};

const showErrorMessage = function () {
  const alertBox = document.createDocumentFragment();
  const alertErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorSection = alertErrorTemplate.cloneNode(true);
  alertBox.appendChild(errorSection);
  main.appendChild(alertBox);
  document.querySelector('body').classList.add('modal-open');
  findErrorButton().addEventListener('click', hideErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('mouseup', onErrorMessageMouseUp);
};

const showAlert = function (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {showErrorMessage, showSuccessMessage, showAlert};
