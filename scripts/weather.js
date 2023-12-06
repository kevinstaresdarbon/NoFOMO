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
      // Log the entire API response for debugging
      console.log("API Response:", response);

      // Update UI with the weather information
      hours.forEach((hour) => {
        const timestamp = new Date(response.list[hour].dt * 1000);
        const temperature = response.list.find((item) => {
          const itemTimestamp = new Date(item.dt * 1000);
          return itemTimestamp.getHours() === timestamp.getHours();
        });

        const taskBox = document.getElementById(`hour-${hour}`);

        // Find or create the weather element in the task box
        let weatherEl = taskBox.querySelector(".weather-info");
        if (!weatherEl) {
          weatherEl = document.createElement("div");
          weatherEl.className = "weather-info";
          taskBox.appendChild(weatherEl);
        }

        // Check if the response data is available for the current hour
        if (temperature) {
          const temperatureCelsius = Math.round(temperature.main.temp - 273.15);
          const weatherIcon = temperature.weather[0].icon;

          // Log temperature for debugging
          console.log(`Hour ${hour} Temperature: ${temperatureCelsius}°C`);

          // Update weather info for the current hour
          weatherEl.innerHTML = `<div>${temperatureCelsius}°C</div><img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;
        } else {
          // If no data is available, display a placeholder
          weatherEl.innerHTML = `<div></div><img src="" alt="">`;
        }
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
  // Initialize weather placeholders on page load
  const hours = Array.from({ length: 24 }, (_, i) => i);
  hours.forEach((hour) => {
    const taskBox = document.getElementById(`hour-${hour}`);
    let weatherEl = taskBox.querySelector(".weather-info");
    if (!weatherEl) {
      weatherEl = document.createElement("div");
      weatherEl.className = "weather-info";
      weatherEl.innerHTML = `<div></div><img src="" alt="">`;
      taskBox.appendChild(weatherEl);
    }
  });

  // Attach the click event for updating weather on input
  $("#searchBtn").on("click", updateWeatherForInputLocation);
});
