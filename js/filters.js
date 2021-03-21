import {debounce} from './util.js';
import {load} from './server.js';
const RERENDER_DELAY = 500;
const debounceLoad = debounce(() => load(), RERENDER_DELAY);

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

defaultFilterButton.addEventListener('click',  () => {
  defaultFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
  debounceLoad();
});

randomFilterButton.addEventListener('click',  () => {
  randomFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
  debounceLoad();
});

discussedFilterButton.addEventListener('click',  () => {
  discussedFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  debounceLoad();
});

export {randomFilterButton, defaultFilterButton, discussedFilterButton}
