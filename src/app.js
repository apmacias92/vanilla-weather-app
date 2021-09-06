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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                  ${index}
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42"
                  />
                  <div class="weather-forecast-temp">
                    <span class="weather-forecast-tempmax">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="weather-forecast-tempmin">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "72dc5df4c3f125c3cc1a3df3d0aec808";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityEl = document.querySelector("#maincity");
  let descEl = document.querySelector("#description");
  let humEl = document.querySelector("#humidity");
  let windEL = document.querySelector("#windspeed");
  let dateEl = document.querySelector("#date");
  let iconEl = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityEl.innerHTML = response.data.name;
  descEl.innerHTML = response.data.weather[0].description;
  humEl.innerHTML = response.data.main.humidity;
  windEL.innerHTML = Math.round(response.data.wind.speed);
  dateEl.innerHTML = formatDate(response.data.dt * 1000);
  iconEl.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconEl.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apikey = "72dc5df4c3f125c3cc1a3df3d0aec808";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
  console.log(cityInput.value);
}

function displayFahTemp(event) {
  event.preventDefault();
  let tempEl = document.querySelector("#temperature");
  celsiuslink.classList.remove("active");
  farenheitlink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempEl.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelTemp(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  farenheitlink.classList.remove("active");
  let tempEl = document.querySelector("#temperature");
  tempEl.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitlink = document.querySelector("#f-link");
farenheitlink.addEventListener("click", displayFahTemp);

let celsiuslink = document.querySelector("#c-link");
celsiuslink.addEventListener("click", displayCelTemp);
