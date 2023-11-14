// Display the day of the week and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

if (minute < 10) {
  minute = `0${minute}`;
}

if (hour < 10) {
  hour = `0${hour}`;
}

const dateTime = document.querySelector("#current-day-time");
dateTime.innerHTML = `${day} ${hour}:${minute}`;

// Display the city entered in the form as the city at the top of the page
// city-search-form
// city-search-field
function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-field");
  let city = cityInput.value.trim();

  let cityHeader = document.querySelector("h1");
  cityHeader.innerHTML = city;
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", displayCity);
