import articlesTpl from './templates/articles.hbs';
import './sass/main.scss';
import NewsApiService from './js/apiService';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults, error } from '@pnotify/core';

const refs = {
  searchForm: document.querySelector('#search-form'),
  articlesContainer: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    const myError = error({
      text: 'Please enter a more specific query!',
      type: 'Error',
      delay: 4000,
    });
    return;
  }

  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
}

function fetchArticles() {
  newsApiService.fetchArticles().then(hits => {
    appenArticlesMarkup(hits);
    newsApiService.incremenntPage();
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
    if (entry.isIntersecting && newsApiService.query !== '') {
      console.log('пора грузить еще картинки');
      fetchArticles();
    }
  });
};

const options = {
  rootMargin: '620px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.sentinel);
