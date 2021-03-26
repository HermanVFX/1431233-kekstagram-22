
'use strict';
const RERENDER_DELAY = 500;

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

import{postList, generatePostBlock, generateGroupPosts} from './template-post.js';
import {debounce, sortCommentDescend} from './util.js';
import {load} from './server.js';

const clearPictureList = (pictures) => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].outerHTML = '';
  }
};

const onDiscussedFilterRadio = function(data) {
  data.sort(sortCommentDescend);
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
};

const onRandomFilterRadio = function(data) {
  data.sort(function(){
    return 0.5 - Math.random()
  });
  data.length = 10;
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
};

const onDefaultFilterRadio = function(data) {
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
};

defaultFilterButton.addEventListener('click',  debounce(() => {
  defaultFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
  const pictures =  document.querySelectorAll('.picture');
  clearPictureList(pictures);
  load(onDefaultFilterRadio);
}, RERENDER_DELAY));

randomFilterButton.addEventListener('click',  debounce(() => {
  randomFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
  const pictures =  document.querySelectorAll('.picture');
  clearPictureList(pictures);
  load(onRandomFilterRadio);
}, RERENDER_DELAY));

discussedFilterButton.addEventListener('click',  debounce(() => {
  discussedFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  const pictures =  document.querySelectorAll('.picture');
  clearPictureList(pictures);
  load(onDiscussedFilterRadio);
}, RERENDER_DELAY));
