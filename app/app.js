function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-search-field");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `&{temperature}°c;
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

let currentDateELement = document.querySelector("#current-day-time");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);



// const dateTime = document.querySelector("#current-day-time");
// dateTime.innerHTML = `${day} ${hour}:${minute}`;

// function displayCity(event) {
//   event.preventDefault();
//   let cityInput = document.querySelector(".search-field");
//   let city = cityInput.value.trim();

//   let cityHeader = document.querySelector("h1");
//   cityHeader.innerHTML = city;
// }

// let citySearchForm = document.querySelector("#city-search-form");
// citySearchForm.addEventListener("submit", displayCity);
