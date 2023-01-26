import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = `https://pixabay.com/api/`;

  constructor() {
    this.page = 1;
    this.query = null;
  }

  async pictureFetch() {
    this.page = 1;
    const searchParams = {
      params: {
        key: `32974638-4592caedf5e0332eeb1bc81de`,
        q: this.query,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: true,
        per_page: 42,
      },
    };
    return await axios.get(`${PixabayAPI.BASE_URL}`, searchParams);
  }

  async onLoadMore() {
    this.page++;
    const pixabayApi = {
      params: {
        key: `32974638-4592caedf5e0332eeb1bc81de`,
        q: this.query,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: true,
        per_page: 42,
        page: this.page,
      },
    };
    return await axios.get(`${PixabayAPI.BASE_URL}`, pixabayApi);
  }
}
