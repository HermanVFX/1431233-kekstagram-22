'use strict';
// Начальное количество выводимых коментариев
const START_COMMENTS_AMOUNT = 5;
// Шаблон изображения случайного пользователя
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postList = document.querySelector('.pictures');
const social = bigPicture.querySelector('.social');
const socialComments = social.querySelector('.social__comments');
const socialComment = socialComments.querySelector('li');
const commentsLoader = social.querySelector('.comments-loader');
const commentСurrent = bigPicture.querySelector('.comments-current');

import {load} from './server.js';

// Функция открытия поста
const showPost = function (post) {
  let currentIndex = 0;
  let currentLimit = 5;
  // Удаляем коментарии
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
  // Открываем окно
  document.querySelector('body').classList.add('modal-open');
  commentsLoader.classList.remove('hidden');
  if (post.comments.length > currentLimit) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
  // Отображение изображения с описанием
  bigPicture.querySelector('.big-picture__img > img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.social__caption').textContent = post.description;
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  bigPicture.classList.remove('hidden');
  // Отображение комментариев
  bigPicture.querySelector('.comments-count').textContent =
    post.comments.length;
  bigPicture.querySelector('.comments-current').textContent =
    post.comments.length <= START_COMMENTS_AMOUNT
      ? post.comments.length
      : START_COMMENTS_AMOUNT;

  const generateComments = function (i) {
    let cloneCommentContainer = socialComment.cloneNode(true);
    socialComments.appendChild(cloneCommentContainer);
    let avatar = cloneCommentContainer.querySelector('.social__picture');
    let text = cloneCommentContainer.querySelector('.social__text');
    avatar.src = post.comments[i].avatar;
    avatar.alt = post.comments[i].name;
    text.textContent = post.comments[i].message;
  };
  if (post.comments.length <= 5) {
    currentIndex = post.comments.length;
  } else {
    currentIndex = 5;
  }
  for (let i = 0; i < currentIndex; i++) {
    generateComments(i);
  }

  const showComments = function () {
    currentLimit += 5;
    for (
      currentIndex;
      currentIndex < currentLimit && currentIndex < post.comments.length;
      currentIndex++
    ) {
      generateComments(currentIndex);
      if (post.comments.length === currentIndex) {
        commentsLoader.classList.add('hidden');
        break;
      }
    }
    commentСurrent.textContent = currentIndex;
    if (post.comments.length > currentLimit) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }
  };
  commentsLoader.addEventListener('click', showComments);
};

// Закрытие поста
const onBigPictureCloseClick = function () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown', escPress);
};

const escPress = function (evt) {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    evt.preventDefault();
    onBigPictureCloseClick();
  }
};

const generatePostBlock = function (post) {
  let postElement = postTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = post.url;
  postElement.querySelector('.picture__likes').textContent = post.likes;
  postElement.querySelector('.picture__comments').textContent = post.comments.length;
  // Открытие поста
  postElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showPost(post);
  });
  return postElement;
};

const generateGroupPosts = function (collection) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < collection.length; i++) {
    fragment.appendChild(generatePostBlock(collection[i]));
  }
  return fragment;
};

const onDataSuccess = function (data) {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
};

load(onDataSuccess);

export {postList, generatePostBlock, generateGroupPosts};
