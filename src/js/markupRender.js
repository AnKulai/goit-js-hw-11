// Render markup

export const renderPictureCard = data => {
  const gallery = document.querySelector(`.gallery`);
  return (gallery.innerHTML += data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
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
    .join(''));
};
