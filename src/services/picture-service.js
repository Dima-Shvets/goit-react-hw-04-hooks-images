const BASE_URL = 'https://pixabay.com/api';
const ACCESS_KEY = '23893693-5116f7539f40f5f078cda9a9c';

export async function pictureService(searchQuery, page) {
  const url = `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${ACCESS_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const pictures = await fetch(url).then(res => res.json());

  return pictures.hits;
}
