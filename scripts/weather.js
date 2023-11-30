const apiKey = "823b7a879fa89784bda76351e07d40f7";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Function to get user's current location
function getCurrentLocation(successCallback, errorCallback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      successCallback({ latitude, longitude });
    }, errorCallback);
  } else {
    errorCallback("Geolocation is not supported by this browser.");
  }
}

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
        const taskBox = document.getElementById(`task-${hour}`);
        console.log(
          `Updating task-${hour} with temperature: ${temperature}°C, icon: ${weatherIcon}`
        );
        taskBox.innerHTML = `<p>${hour.toString().padStart(2, "0")}:00</p>
                             <p>${temperature}°C</p>
                             <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
                             `;
      });
    },
    function (error) {
      console.log("Error fetching weather data: ", error);
    }
  );
}

// Function to update weather for user's current location
function updateWeatherForCurrentLocation() {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Get user's current location
  getCurrentLocation(
    function (coords) {
      const { latitude, longitude } = coords;

      // Example usage: Fetch weather forecast for current location
      updateWeatherForCity(`${latitude},${longitude}`);
    },
    function (error) {
      console.log("Error getting user location: ", error);
    }
  );
}

// Example usage: Update weather for the user's current location
updateWeatherForCurrentLocation();
