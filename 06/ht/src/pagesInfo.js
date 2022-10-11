export function showAboutContent(element) {
  element.innerHTML = `
      <div class="content_about">
          <p>I am a beginner frontend developer. From 2019 to 2022 he worked as a system administrator. 
          In 2020, I graduated from Ya. Kupala State University of Grodno, where I partially studied 
          programming and it was interesting for me. At the beginning of 2022, I enrolled in a JavaScript course, 
          which I successfully completed. In the middle of 2022, I decided to leave my job in order 
          to devote more time to programming, namely the profession of a Front-end developer.
          My personal qualities: perseverance, attentiveness, desire for self-improvement, responsibility, perseverance.</p>
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
  return (element.innerHTML = data
    .map((el) => {
      return `<li class="city" data-city="${el}"><p class="name">${el}</p></li>`;
    })
    .join(""));
}

export function displayLastFavorites(element, data) {
  return (element.innerHTML = data
    .map((el) => {
      if (el.user) {
        return `<li class="favorite" data-coords="${el.user.id}">
                <div class="item-favorite">
                  <p class="name">${el.user.name}</p>
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
      <h2>Author - <a href='https://dimark1997.github.io/myCV/'>Dmitry Kedik</a></h2>
    </div>
    `;
}
