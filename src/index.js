function weatherDetails(response) {
  let city = document.querySelector(".current-city");
  city.innerHTML = response.data.city;

  //get current temparature value
  let temparature = document.querySelector(".current-value");
  let currentTemparature = Math.round(response.data.temperature.current);
  temparature.innerHTML = currentTemparature;

  //get dercription of the current temparature
  let description = document.querySelector(".description");
  let currentDescription = response.data.condition.description;
  description.innerHTML =
    currentDescription.charAt(0).toUpperCase() + currentDescription.slice(1);

  //get humidity
  let humidity = document.querySelector("#humidity");
  let currentHumidy = response.data.temperature.humidity;
  humidity.innerHTML = `Humidity: <u>${currentHumidy}%</u>`;

  //get wind speed
  let wind = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  wind.innerHTML = `Wind: <u>${windSpeed}km/h</u>`;

  //get Temparature icon
  let icon = document.querySelector(".current-icon");
  let temparatureIcon = response.data.condition.icon_url;
  let iconDescription = response.data.condition.icon;
  icon.innerHTML = `<img src="${temparatureIcon}" alt="${iconDescription}">`;

  getForecast(response.data.city);
}

function dateTime() {
  // days of the week and current time
  let currentDate = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

//update the time in the html file
let todaysDate = document.querySelector(".current-date");
todaysDate.innerHTML = dateTime();

function searchcity(city) {
  //API key and Url with city information
  let apiKey = "ad47941082ao90b750fat7b2f455c3f0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  //read the api details for the specific city that was searched.
  axios.get(apiUrl).then(weatherDetails);
}

function findCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector(".serach-value");
  searchcity(cityValue.value);
}

let searchCity = document.querySelector(".search-button");
searchCity.addEventListener("click", findCity);

//get the current city weather information from the api.

function getForecast(city) {
  let apiKey = "ad47941082ao90b750fat7b2f455c3f0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(weeklyForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

//display weekkly weather forecast.
function weeklyForecast(response) {
  console.log(response.data);

  let daysOfWeek = " ";

  //loop through the days of the week
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      daysOfWeek =
        daysOfWeek +
        `
  <div class="weather-forecast-day">
            <div class="weather-forecast-date ">${formatDay(day.time)}</div>
            <div class="weather-forecast-icon">
            <img src="${day.condition.icon_url}">
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-max"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="weather-forecast-min"><strong>${Math.round(
                day.temperature.minimum
              )}°</strong></div>
            </div>
            </div>
  `;
    }
  });

  let forecastWeather = document.querySelector("#forecast");
  forecastWeather.innerHTML = daysOfWeek;
}
