//Current date
let currentDate = new Date();

function dateTime() {
  // days of the week and current time
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

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 0) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

//update the time in the html file
let todaysDate = document.querySelector(".current-date");
todaysDate.innerHTML = dateTime();

//update the name of the city with the searched city value.
function findCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector(".serach-value");
  let city = document.querySelector(".current-city");
  let currentCity = cityValue.value;
  city.innerHTML = currentCity;

  //API key and Url with city information
  let apiKey = "ad47941082ao90b750fat7b2f455c3f0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCity}&key=${apiKey}&units=metric`;

  //read the api details for the specific city that was searched.
  axios.get(apiUrl).then(weatherDetails);
}

let searchCity = document.querySelector(".search-button");
searchCity.addEventListener("click", findCity);

//get the current city weather information from the api.
function weatherDetails(response) {
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

  console.log(windSpeed);

  let icon;
}
