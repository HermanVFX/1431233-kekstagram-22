'use strict';
import {closeModal} from './uploading-photos.js';

const main = document.querySelector('main');
const form = document.querySelector('.img-upload__form');
const findSuccessButton = function() {
  const successButton = main.querySelector('.success__button');
  return successButton;
};
const findErrorButton = function() {
  const errorButton = main.querySelector('.error__button');
  return errorButton;
};

const hideSuccessMessage = function() {
  document.querySelector('body').classList.remove('modal-open');
  findSuccessButton().removeEventListener('click', hideSuccessMessage);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('mouseup', onSuccessMessageMouseUp);
  main.querySelector('.success').remove();
};

const hideErrorMessage = function() {
  document.querySelector('body').classList.remove('modal-open');
  findErrorButton().removeEventListener('click', hideErrorMessage);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('mouseup', onErrorMessageMouseUp);
  main.querySelector('.error').remove();
};

const onSuccessMessageEscKeydown = function(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
    form.reset();
    hideSuccessMessage();
  }
};

const onErrorMessageEscKeydown = function(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
    form.reset();
    hideErrorMessage();
  }
};

const onSuccessMessageMouseUp = function(evt) {
  if (evt.target !== main.querySelector('.success__inner')) {
    hideSuccessMessage();
    closeModal();
    form.reset();
  }
};

const onErrorMessageMouseUp = function(evt) {
  if (evt.target !== main.querySelector('.error__inner')) {
    hideErrorMessage();
    closeModal();
    form.reset();
  }
};

const showSuccessMessage = function() {
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

const showErrorMessage = function() {
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

const showLoadingMessage = function() {
  document.querySelector('body').classList.add('modal-open');
  const alertBox = document.createDocumentFragment();
  const loadingMessageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message--loading');
  const message = loadingMessageTemplate.cloneNode(true);
  alertBox.appendChild(message);
  main.appendChild(alertBox);
};

const hideLoadingMessage = function() {
  document.querySelector('body').classList.remove('modal-open');
  main.querySelector('.img-upload__message--loading').remove();
};
export {showErrorMessage, showSuccessMessage, showLoadingMessage, hideLoadingMessage};
