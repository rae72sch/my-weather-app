function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-search-field");
  let city = searchInputElement.value;

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

  console.log(response.data);
  console.log(weatherImageElement);
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
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-day-time");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);