function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-search-field");
  searchCity(searchInputElement.value);
}

function searchCity(city){
  console.log(city);
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}

function currentWeather(response) {
  let temperatureElement = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let weatherImageElement = document.querySelector("#weather-image-element");
  let weatherImageUrl = response.data.condition.icon_url;
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}°c`;
  weatherImageElement.innerHTML = `<img src=${weatherImageUrl} />`;
  weatherDescriptionElement.innerHTML = response.data.condition.description;
  feelsLikeElement.innerHTML = `${feelsLike}°`;
  windSpeedElement.innerHTML = `${windSpeed}`;
  humidityElement.innerHTML = response.data.temperature.humidity;

  weatherForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchSubmit);

let currentDateElement = document.querySelector("#current-day-time");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

function weatherForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
            / ${Math.round(day.temperature.minimum)}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Dublin");