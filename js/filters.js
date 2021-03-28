const RERENDER_DELAY = 500;
const FilterType = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const filtersForm = document.querySelector('.img-filters__form');

let activeFilterItem = filtersForm.querySelector('.img-filters__button--active');

import{postList, generatePostBlock, generateGroupPosts} from './template-post.js';
import {debounce, sortCommentDescend} from './util.js';
import {load} from './server.js';

const clearPictureList = (pictures) => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].outerHTML = '';
  }
};

const onDiscussedFilterLoad = function(data) {
  data.sort(sortCommentDescend);
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
};

const onRandomFilterLoad = function(data) {
  data.sort(function(){
    return 0.5 - Math.random()
  });
  data.length = 10;
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
};

const onDefaultFilterLoad = function(data) {
  generatePostBlock.photoDescriptions = data;
  postList.appendChild(generateGroupPosts(data));
};

const toggleFilters = function (activeButton) {
  if (activeFilterItem) {
    activeFilterItem.classList.remove('img-filters__button--active');
  }
  activeFilterItem = activeButton;
  activeFilterItem.classList.add('img-filters__button--active');
};

const onFilterChange = function (evt) {
  if (activeFilterItem !== evt.target) {
    toggleFilters(evt.target);
    const pictures =  document.querySelectorAll('.picture');
    clearPictureList(pictures);
    switch (evt.target.id) {
      case FilterType.RANDOM:
        load(onRandomFilterLoad);
        break;
      case FilterType.DISCUSSED:
        load(onDiscussedFilterLoad);
        break;
      default:
        load(onDefaultFilterLoad);
    }
  }
};

filtersForm.addEventListener('click', debounce(onFilterChange, RERENDER_DELAY));
