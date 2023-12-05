const apiKey = "823b7a879fa89784bda76351e07d40f7";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Function to get weather forecast
function getWeatherForecast(city, hours, successCallback, errorCallback) {
  const apiUrl = `${weatherApiUrl}?q=${city}&appid=${apiKey}`;

  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: successCallback,
    error: errorCallback,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  hours.forEach((hour) => {
    const taskBox = document.getElementById(`hour-${hour}`);
    let weatherEl = taskBox.querySelector(".weather-info");

    if (!weatherEl) {
      weatherEl = document.createElement("div");
      weatherEl.className = "weather-info";
      taskBox.appendChild(weatherEl);
    }

    // Initial placeholder content
    weatherEl.innerHTML = `<div>-°C</div><img src="https://placehold.co/50x50" alt="Weather Icon">`;
  });
});

// Function to update weather for a specific city
function updateWeatherForCity(city) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  hours.forEach((hour, index) => {
    const taskBox = document.getElementById(`hour-${hour}`);
    let weatherEl = taskBox.querySelector(".weather-info");

    getWeatherForecast(
      city,
      [hour],
      function (response) {
        const temperature = response.list[0].main.temp;
        const weatherIcon = response.list[0].weather[0].icon;

        // Convert temperature from Kelvin to Celsius
        const temperatureCelsius = Math.round(temperature - 273.15);

        // Update weather info
        weatherEl.innerHTML = `<div>${temperatureCelsius}°C</div><img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;
      },
      function (error) {
        console.log("Error fetching weather data: ", error);
      }
    );
  });
}

function updateWeatherForInputLocation() {
  const inputLocation = $("#locationInput").val();

  if (inputLocation) {
    console.log("Updating weather for location:", inputLocation);
    updateWeatherForCity(inputLocation);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateWeatherForInputLocation();
});

$(document).ready(function () {
  $("#searchBtn").on("click", updateWeatherForInputLocation);
});
