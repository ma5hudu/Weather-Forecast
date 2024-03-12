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