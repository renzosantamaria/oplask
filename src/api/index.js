const BASE_URL = `https://api.unsplash.com/search/photos?client_id=${process.env.VUE_APP_CLIENTID}&`;

export async function fetchImages(phrase, page) {
  const request = await fetch(
    `${BASE_URL}page=${page}&query=${phrase}&per_page=9`
  );
  const data = await request.json();
  console.log(data);
  return data;
}

// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
