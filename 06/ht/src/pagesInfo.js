import { setSearchCoords } from "./geolocationService";

export function showAboutContent(element) {
  element.innerHTML = `
      <div class="content_about">
          <h2>Информация о себе</h2>
      </div>
      `;
}

export function displayDataWeather(element, data) {
  element.innerHTML = `
              <div id="map" class="content__map"></div>
              <div class="content__info">
                  <div class="info_history">
                      <div class="history-title">
                          <h4>History:</h4>
                          <ol class="history-items">
                          </ol>
                      </div>    
                  </div>
                  <div class="info_weather">
                      <div class="name-owf">
                          <h3>${data.name}</h3><i class="owf owf-${data.weather[0].id} owf-2x"></i>
                      </div>
                      <div class="temperature">Temperature: ${data.main.temp}℃</div>
                      <div class="description">${data.weather[0].description}</div>
                  </div>
                  <div class="info_favorites">
                      <div class="favorites-title">
                          <h4>Favorites:</h4>
                          <ol class="favorites-items">
                          </ol>
                      </div>
                  </div>
              </div>
      `;
  document.querySelector(".favorites-items").addEventListener("click", displayFavorites);
}

export function displayLastCities(element, data) {
  return (element.innerHTML = data.city
    .map((el) => {
      return `<li>${el}</li>`;
    })
    .join(""));
}

export function displayLastFavorites(element, data) {
  return (element.innerHTML = data
    .map((el) => {
      return `<li class="favorite" data-coords="${el.data}">
                <div class="item-favorite">
                  <h4 class="name">${el.name}</h4>
                  <button>✖</button>
                </div>    
              </li>`;
    })
    .join(""));
}

export function showAuthorContent(element) {
  element.innerHTML = `
    <div class="content_author">
        <h2>Dima Kedik</h2>
    </div>
    `;
}

function displayFavorites(e) {
  const favoritesUser = JSON.parse(localStorage.getItem("FavoritesUser")) || [];
  const elToCoords = e.target.parentNode.parentNode.getAttribute("data-coords");
  const clickOnFavorite = e.target.matches(".name");
  favoritesUser.map((el, i) => {
    if (el.data == elToCoords && e.target.tagName === "BUTTON") {
      favoritesUser.splice(i, 1);
    }

    if (el.data == elToCoords && clickOnFavorite) {
      setSearchCoords(el.coords.lng, el.coords.lat);
    }
  });
  localStorage.setItem("FavoritesUser", JSON.stringify(favoritesUser));
  displayLastFavorites(document.querySelector(".favorites-items"), favoritesUser);
}
