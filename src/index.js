import { PixabayAPI } from './js/pixabayAPI';
import Notiflix from 'notiflix';
import { renderPictureCard } from './js/markupRender';
import {
  galleryEl,
  searchBtnEl,
  loadMoreBtnEl,
  searchFormEl,
} from './js/elementsManager';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { smoothScroll } from './js/smoothScroll';
import throttle from 'lodash/throttle';

// Infinite scroll delay

const DEBOUNCE_DELAY = 1500;

// Create object for work with pixabayAPI

const pixabayAPI = new PixabayAPI();

// Determining the request type

const getPictures = event => {
  const targetName = event.target.innerHTML;
  event.preventDefault();
  if (targetName === 'Search') {
    getInputValue();
    galleryEl.clear();
    searchFormEl.clear();
    pictureRequest();
  } else {
    morePictureRequest();
  }
  searchBtnEl.active();
  loadMoreBtnEl.show();
};

// Get pictures from pixabay DataBase (first or new request)

const pictureRequest = () =>
  pixabayAPI.pictureFetch().then(({ data: { hits, totalHits } }) => {
    hits.length != 0
      ? renderPictureCard(hits)
      : Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
    if (pixabayAPI.page >= totalHits / 42) {
      loadMoreBtnEl.hide();
    }
    lightbox.refresh();
  });

// Get pictures from pixabay DataBase (next request)

const morePictureRequest = () =>
  pixabayAPI.onLoadMore().then(({ data: { hits, totalHits } }) => {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    if (hits.length > 0) {
      renderPictureCard(hits);
    }
    if (pixabayAPI.page >= totalHits / 42) {
      Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
      loadMoreBtnEl.hide();
    }
    smoothScroll();
    lightbox.refresh();
  });

// Get value from input fileds and paste 'panda' if field is empty

const getInputValue = () => {
  const value =
    document.querySelector(`.search-form`).elements.searchQuery.value;
  if (value.length === 0) {
    Notiflix.Notify.warning(
      `Sorry, I don't know what "emptiness" looks like, better take a look at pandas.`
    );
    pixabayAPI.query = `panda`;
  } else {
    pixabayAPI.query = value;
  }
};

// Realized infinite scroll (additional task)

export const infiniteScroll = callback => {
  if (
    window.scrollY + 1 >=
    document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  ) {
    morePictureRequest();
  }
};

// SimpleLightbox (additional task)

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

// Listeners

searchBtnEl.element.addEventListener(`click`, getPictures);
loadMoreBtnEl.element.addEventListener(`click`, getPictures);

// infiniteScroll listener (Delete or comment out as needed)

window.addEventListener(`scroll`, throttle(infiniteScroll, DEBOUNCE_DELAY));
