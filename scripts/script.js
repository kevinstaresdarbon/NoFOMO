$(document).ready(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Date
    const date = document.createElement("h2");
    date.classList.add("date");
    date.innerText = new Date().toLocaleDateString();

    const schedule = document.getElementById("schedule");
    schedule.parentNode.insertBefore(date, schedule);

    // Schedule Container
    const container = document.createElement("div");
    container.className = "schedule-container";

    // Schedule Row
    const row = document.createElement("div");
    row.className = "schedule-row";

    // Hours
    const hours = Array.from({ length: 24 }, (_, i) => i);

    hours.forEach((hour) => {
      // Column
      const col = document.createElement("div");
      col.className = "schedule-col";

      // Task Box
      const box = document.createElement("div");
      box.className = "task-box";
      box.style.backgroundColor = "#A8DBFA";
      box.style.borderRadius = "10px";

      // Time
      const time = document.createElement("p");
      time.innerText = `${hour.toString().padStart(2, "0")}:00`;

      // Task
      const task = document.createElement("p");
      task.className = "task";
      task.innerText = "Task";

      // Append
      box.appendChild(time);
      box.appendChild(task);

      col.appendChild(box);
      row.appendChild(col);
    });

    container.appendChild(row);
    schedule.appendChild(container);


  });




  function handleSearch() {
    var category = $('#categoryInput').val();
    var location = $('#locationInput').val();
    var date = $('#dateInput').val();
    var time = $('#timeInput').val();
    var queryURL = 'https://api.content.tripadvisor.com/api/v1/location/search?key=' + TA_API_KEY + '&searchQuery=' + location + '&language=en'

    $.ajax({
      url: queryURL,
      async: 'true',
      method: 'GET',
      dataType: 'jsonp',
      crossDomain: 'true',
      headers: {referer: 'kevinstaresdarbon.github.io'},
      success: function (response) {
        console.log(response);
      },
      error: function (err) {
        console.log('An error occured: ' + err);
      }
    });

  }


  $('#searchBtn').on("click", handleSearch);

});