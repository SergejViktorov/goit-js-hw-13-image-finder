import articlesTpl from './templates/articles.hbs';
import './sass/main.scss';
import NewsApiService from './js/apiService';

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
    return alert('введи что-то нормальное');
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

function appenArticlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
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
