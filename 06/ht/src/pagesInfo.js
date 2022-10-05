export function showAboutContent(element) {
  element.innerHTML = `
      <div class="content_about">
          <h2>Информация о себе</h2>
      </div>
      `;
}

export function displayMainContent(element) {
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
}

export function displayDataWeather(element, data) {
  if (data.weather) {
    element.innerHTML = `
      <div class="name-owf">
        <h3>${data.name}</h3><i class="owf owf-${data.weather[0].id} owf-2x"></i>
      </div>
      <div class="temperature">Temperature: ${data.main.temp}℃</div>
      <div class="description">${data.weather[0].description}</div>            
      `;
  }
}

export function displayLastCities(element, data) {
  return (element.innerHTML = data.city
    .map((el) => {
      return `<li class="city" data-city="${el}">${el}</li>`;
    })
    .join(""));
}

export function displayLastFavorites(element, data) {
  return (element.innerHTML = data
    .map((el) => {
      if (el.user) {
        return `<li class="favorite" data-coords="${el.user.data}">
                <div class="item-favorite">
                  <h4 class="name">${el.user.name}</h4>
                  <button>✖</button>
                </div>    
              </li>`;
      }
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
