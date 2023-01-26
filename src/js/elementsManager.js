export const searchFormEl = {
  element: document.querySelector(`.search-form`),
  clear() {
    this.element.reset();
  },
};

export const galleryEl = {
  element: document.querySelector(`.gallery`),
  clear() {
    document.querySelector(`.gallery`).innerHTML = ``;
  },
};

export const loadMoreBtnEl = {
  element: document.querySelector(`.load-more`),
  show() {
    this.element.classList.remove('isHidden');
  },
  hide() {
    this.element.classList.add('isHidden');
  },
};

export const searchBtnEl = {
  element: document.querySelector(`.search-form > button`),
  active() {
    this.element.disabled = false;
  },
  disactive() {
    this.element.disabled = true;
  },
};

export const scrollInputEl = {
  element: document.querySelector(`#infinite-scroll`)
}
