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

const onDiscussedFilterLoad = debounce(function(data) {
  const pictures =  document.querySelectorAll('.picture');
  clearPictureList(pictures);
  discussedFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  data.sort(sortCommentDescend);
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
}, RERENDER_DELAY);

const onRandomFilterLoad = debounce(function(data) {
  const pictures =  document.querySelectorAll('.picture');
  clearPictureList(pictures);
  randomFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
  data.sort(function(){
    return 0.5 - Math.random()
  });
  data.length = 10;
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
}, RERENDER_DELAY);

const onDefaultFilterLoad = debounce(function(data) {
  const pictures =  document.querySelectorAll('.picture');
  clearPictureList(pictures);
  defaultFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
}, RERENDER_DELAY);

defaultFilterButton.addEventListener('click',  function () {
  load(onDefaultFilterLoad);
});

randomFilterButton.addEventListener('click',  function () {
  load(onRandomFilterLoad);
});

discussedFilterButton.addEventListener('click',  function () {
  load(onDiscussedFilterLoad);
});
