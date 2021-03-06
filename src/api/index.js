const BASE_URL = `https://api.unsplash.com/search/photos?client_id=${process.env.VUE_APP_CLIENTID}&`;

export async function fetchImages(phrase, page) {
  try {
    const request = await fetch(
      `${BASE_URL}page=${page}&query=${phrase}&per_page=9`
    );
    const data = await request.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

export function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  return JSON.parse(favorites);
}

export function isFavorite(image) {
  let favorites = getFavorites();
  return favorites.find((fav) => fav.id === image.id);
}

export function setFavorite(image) {
  let favorites = getFavorites();

  if (favorites) {
    let duplicate = false;
    favorites.forEach((favorite) => {
      if (favorite.id == image.id) {
        duplicate = true;
      }
    });
    if (!duplicate) {
      favorites.push(image);
    }
  } else {
    favorites = [];
    favorites.push(image);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function removeFavorite(image) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => fav.id !== image.id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export async function saveImage(img, searchphrase) {
  const request = await fetch(img.urls.full);
  const blob = await request.blob();

  const fileLink = document.createElement("a");
  fileLink.href = URL.createObjectURL(blob);
  fileLink.setAttribute("download", `${searchphrase}.jpg`);

  document.body.appendChild(fileLink);
  fileLink.click();

  fetch(
    `${img.links.download_location}?client_id=${process.env.VUE_APP_CLIENTID}`
  );
  URL.revokeObjectURL(fileLink.href);
}
