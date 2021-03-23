let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;
let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${hours}:${minutes}`;

function tempFahrenheit(event) {
  event.preventDefault();
  let h2 = document.querySelector(".temp-now");
  h2.innerHTML = 10 * (9 / 5) + 32 + `°F`;
}

let fahTemp = document.querySelector(".temp-fah");
fahTemp.addEventListener("click", tempFahrenheit);

function tempCelsius(event) {
  event.preventDefault();
  let h2 = document.querySelector(".temp-now");
  h2.innerHTML = (50 - 32) * (5 / 9) + `°C`;
}

let celTemp = document.querySelector(".temp-cel");
celTemp.addEventListener("click", tempCelsius);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  let city =
    searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
  city = city.trim();

  function showTemperature(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("h1");
    temperatureElement.innerHTML = `<i class="fas fa-map-marker-alt"></i>${city} ${temperature}℃`;
    let hiddenString = document.querySelector("h2");
    hiddenString.innerHTML = "";

    document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity is ${response.data.main.humidity}%`;

    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=62a1c5e5332a7799a14e6340354293bb`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", search);

function showPosition(position) {
  console.log(position.coords.latitude);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Your Latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
