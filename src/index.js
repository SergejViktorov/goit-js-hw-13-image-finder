import './sass/main.scss';
const KEY = '21922631-b9054864096d193e79c9fc0a3';

fetch(
  `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=${KEY}`,
);
