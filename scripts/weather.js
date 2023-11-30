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

// Function to update weather for each hour
function updateWeatherForHours(city) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Example usage: Fetch weather forecast for each hour
  getWeatherForecast(
    city,
    hours,
    function (response) {
      // Handle the weather data response
      console.log(response);

      // You can now update your UI with the weather information for each hour
      // Example: Update the task boxes with temperature or other weather data
      hours.forEach((hour, index) => {
        const temperature = response.list[index].main.temp;
        const weatherDescription = response.list[index].weather[0].description;

        const taskBox = document.getElementById(`task-${hour}`);
        taskBox.innerHTML = `<p>${hour.toString().padStart(2, "0")}:00</p>
                             <p>${temperature}°C</p>
                             <p>${weatherDescription}</p>`;
      });
    },
    function (error) {
      console.log("Error fetching weather data: ", error);
    }
  );
}

// Example usage: Update weather for a specific city (you can get this dynamically based on user input)
const city = "YourCityName";
updateWeatherForHours(city);
