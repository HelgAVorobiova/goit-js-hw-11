const base_url = 'https://pixabay.com/api/';
const key = '47358602-d5490533da2bc88f2f38f5bcb';

export function fetchImages(query, page = 1) {
  const url = `${base_url}?key=${key}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      return response.json();
    })
    .then(data => {
      return data.hits;
    })
    .catch(error => {
      console.error(error);
    });
}
