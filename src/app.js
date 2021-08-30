function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityEl = document.querySelector("#maincity");
  let descEl = document.querySelector("#description");
  let humEl = document.querySelector("#humidity");
  let windEL = document.querySelector("#windspeed");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityEl.innerHTML = response.data.name;
  descEl.innerHTML = response.data.weather[0].description;
  humEl.innerHTML = response.data.main.humidity;
  windEL.innerHTML = Math.round(response.data.wind.speed);
}

let apikey = "72dc5df4c3f125c3cc1a3df3d0aec808";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apikey}`;

axios.get(apiURL).then(displayTemperature);
