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

// Function to update weather for a specific city
function updateWeatherForCity(city) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  getWeatherForecast(
    city,
    hours,
    function (response) {
      // Handle the weather data response
      console.log("API Response:", response);

      // Update UI with the weather information
      hours.forEach((hour, index) => {
        const temperature = response.list[index].main.temp;
        const weatherIcon = response.list[index].weather[0].icon;

        // Update time card with temperature and weather icon
        const taskBox = document.getElementById(`hour-${hour}`);

        // Find or create the weather element in the task box
        let weatherEl = taskBox.querySelector(".weather-info");
        if (!weatherEl) {
          weatherEl = document.createElement("div");
          weatherEl.className = "weather-info";
          taskBox.appendChild(weatherEl);
        }

        // Convert temperature from Kelvin to Celsius
        const temperatureCelsius = Math.round(temperature - 273.15);

        // Update weather info
        weatherEl.innerHTML = `<div>${temperatureCelsius}°C</div><img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;
      });
    },
    function (error) {
      console.log("Error fetching weather data: ", error);
    }
  );
}

function updateWeatherForInputLocation() {
  const inputLocation = $("#locationInput").val();

  if (inputLocation) {
    console.log("Updating weather for location:", inputLocation);
    updateWeatherForCity(inputLocation);
  } else {
    console.warn("Input location is empty. Please provide a valid location.");
  }
}

$(document).ready(function () {
  $("#searchBtn").on("click", updateWeatherForInputLocation);
});
