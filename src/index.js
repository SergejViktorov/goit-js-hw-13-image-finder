import articlesTpl from './templates/articles.hbs';
import './sass/main.scss';
import ImgsApiService from './js/apiService';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults, error } from '@pnotify/core';

const refs = {
  searchForm: document.querySelector('#search-form'),
  articlesContainer: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
};

const imgsApiService = new ImgsApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  imgsApiService.query = e.currentTarget.elements.query.value;

  if (imgsApiService.query === '') {
    const myError = error({
      text: 'Please enter a more specific query!',
      type: 'Error',
      delay: 4000,
    });
    return;
  }

  imgsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
}

function fetchArticles() {
  imgsApiService.fetchArticles().then(hits => {
    appenArticlesMarkup(hits);
    imgsApiService.incremenntPage();
  });
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

function appenArticlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imgsApiService.query !== '') {
      fetchArticles();
    }
  });
};

const options = {
  rootMargin: '620px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.sentinel);
