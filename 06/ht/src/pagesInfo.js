export function showAboutContent(element) {
  element.innerHTML = `
      <div class="content_about">
          <h2>Информация о себе</h2>
      </div>
      `;
}

export async function displayDataWeather(element, city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const response = await fetch(URL);
  const data = await response.json();

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
}

export async function displayLastCities(element, data) {
  return (element.innerHTML = data.city
    .map((el) => {
      return `<li>${el}</li>`;
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
