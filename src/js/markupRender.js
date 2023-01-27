import { update } from 'lodash';

let galleryCards = null;

// Update markup sample

const udpdateGalleryCards = data => (galleryCards = createGallaryCards(data));
// Render markup

export const renderPictureCard = data => {
  const gallery = document.querySelector(`.gallery`);
  udpdateGalleryCards(data);
  gallery.insertAdjacentHTML(`beforeend`, galleryCards);
};

// Create markup sample

const createGallaryCards = data => {
  return data
    .map(
      ({ webformatURL, largeImageURL, likes, views, comments, downloads }) => {
        return `
        <a href="${largeImageURL}">
          <div class="photo-card">
            <img src="${webformatURL}" alt="" loading="lazy" width='503' height='307'/>
            <div class="info">
              <p class="info-item">
                <b>Likes:</b> <br> ${likes}
              </p>
              <p class="info-item">
                <b>Views:</b> <br> ${views}
              </p>
              <p class="info-item">
                <b>Comments:</b> <br> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads:</b> <br> ${downloads}
              </p>
            </div>
          </div>
        </a>
      `;
      }
    )
    .join('');
};
