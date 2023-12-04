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

        // Convert temperature from Kelvin to Celsius
        const temperatureCelsius = Math.round(temperature - 273.15);

        // Update time card with temperature and weather icon
        const taskBox = document.getElementById(`hour-${hour}`);

        // Clear existing content
        taskBox.innerHTML = "";

        // Create time element
        const timeElement = document.createElement("p");
        timeElement.className = "time";
        timeElement.innerText = `${hour.toString().padStart(2, "0")}:00`;

        // Append time element
        taskBox.appendChild(timeElement);

        // Append weather info
        var weatherEl = document.createElement("div");
        var weatherImg = document.createElement("img");
        weatherImg.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" + `${weatherIcon}` + ".png"
        );
        weatherEl.append(`${temperatureCelsius}` + "°C", weatherImg);
        taskBox.append(weatherEl);
      });
    },
    function (error) {
      console.log("Error fetching weather data: ", error);
    }
  );
}

// Example usage: Update weather using the location from the input field
function updateWeatherForInputLocation() {
  const inputLocation = $("#locationInput").val();

  if (inputLocation) {
    console.log("Updating weather for location:", inputLocation);
    updateWeatherForCity(inputLocation);
  } else {
    console.warn("Input location is empty. Please provide a valid location.");
  }
}

// Example usage: Update weather using the location from the input field
$(document).ready(function () {
  $("#searchBtn").on("click", updateWeatherForInputLocation);
});
