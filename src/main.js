import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  initializeLightbox,
  clearGallery,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let currentQuery = '';
let currentPage = 1;

initializeLightbox();

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery(gallery);
  fetchImagesWithLoader(currentQuery);
});

function fetchImagesWithLoader(query) {
  showLoader();
  fetchImages(query, currentPage)
    .then(data => {
      if (data.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        clearInput();
        return;
      }

      const markup = renderGallery(data);
      gallery.insertAdjacentHTML('beforeend', markup);
      initializeLightbox();
      clearInput();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images. Please try again!',
      });
      console.error('Error:', error);
      clearInput();
    })
    .finally(() => hideLoader());
}

function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function clearInput() {
  form.elements.searchQuery.value = '';
}
