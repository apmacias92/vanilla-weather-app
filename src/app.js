function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityEl = document.querySelector("#maincity");
  let descEl = document.querySelector("#description");
  let humEl = document.querySelector("#humidity");
  let windEL = document.querySelector("#windspeed");
  let dateEl = document.querySelector("#date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityEl.innerHTML = response.data.name;
  descEl.innerHTML = response.data.weather[0].description;
  humEl.innerHTML = response.data.main.humidity;
  windEL.innerHTML = Math.round(response.data.wind.speed);
  dateEl.innerHTML = formatDate(response.data.dt * 1000);
}

let apikey = "72dc5df4c3f125c3cc1a3df3d0aec808";
let city = "New York";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

axios.get(apiURL).then(displayTemperature);
