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
    const taskId = `${hour}`;
    task.setAttribute("id", "task-" + taskId);
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
  var locationIDs = [];
  var category = $("#categoryInput").val();
  var location = $("#locationInput").val();
  var date = $("#dateInput").val();
  var time = $("#timeInput").val();

  if (category === "Restaurant"){
    const url = 'https://worldwide-restaurants.p.rapidapi.com/typeahead';
    const settings = {
      async: true,
      crossDomain: true,
      url: 'https://worldwide-restaurants.p.rapidapi.com/typeahead',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '3b3014b767msh0f5d9ed74986aa6p1b0d4djsn8246731a57ed',
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
      },
      data: {
        q: location,
        language: 'en_GB'
      }
    };
  
    $.ajax(settings).done(function (response) {
      const settings = {
        async: true,
        crossDomain: true,
        url: 'https://worldwide-restaurants.p.rapidapi.com/search',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '3b3014b767msh0f5d9ed74986aa6p1b0d4djsn8246731a57ed',
          'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
        },
        data: {
          language: 'en_GB',
          location_id: response.results.data[0].result_object.location_id,
          currency: 'GBP',
          offset: '0'
        }
      };
  
      $.ajax(settings).done(function (response) {
        //clear old searches
        $("#dynamicCards").empty();
  
        for (let i = 0; i < 10; i++) {
          var name = response.results.data[i].name;
          var imgSRC = response.results.data[i].photo.images.medium.url;
          var viewSRC = response.results.data[i].web_url;
          cardMaker(name, imgSRC, viewSRC);
        }
  
      });
    });
  } else {
    const settings = {
      async: true,
      crossDomain: true,
      url: 'https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name='+location,
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3b3014b767msh0f5d9ed74986aa6p1b0d4djsn8246731a57ed',
        'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
      }
    };
    
    $.ajax(settings).done(function (response) {
      var lat = response.lat;
      var lon = response.lon;
      const settings = {
        async: true,
        crossDomain: true,
        url: 'https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=' + lat + '%2C' + lon + '&radius=10000&language=en&type='+ category,
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '3b3014b767msh0f5d9ed74986aa6p1b0d4djsn8246731a57ed',
          'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
        }
      };
      
      $.ajax(settings).done(function (response) {
        $("#dynamicCards").empty();

        for (let i=0; i<10; i++){
          var name = response.results[i].name;
          var imgSRC = "https://placehold.co/300x200"
          var viewSRC = response.results[i].website;

          cardMaker(name, imgSRC, viewSRC);
        }
      });
    });
  }
  // Call the function to update weather for the entered location
  updateWeatherForCity(location);
}

function handleView(event){
  window.open(event.target.dataset.viewsrc, "_blank");
}

$("#searchBtn").on("click", handleSearch);
$(document).on("click", ".view-btn", handleView)

function cardMaker(name, imgSRC, viewSRC){
  const dynamicCardsContainer = document.getElementById("dynamicCards");


  const cardCol = document.createElement("div");
  cardCol.className = "col-md-3 mb-4";
  cardCol.style.display = "inline-block";

  const card = document.createElement("div");
  card.minHeight = "600px";
  card.className = "card mb-4 shadow-sm h-100";
  // Card Image
  const cardImage = document.createElement("img");
  cardImage.src = imgSRC;
  cardImage.alt = "Restaurant Image";
  cardImage.className = "card-img-top";

  // Card Body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column justify-content-between";

  // Card Title
  const cardTitle = document.createElement("h2");

  cardTitle.className = "card-title result-title font-weight-bold";
  cardTitle.innerText = name;
  cardTitle.setAttribute("card-title", name);

  // Button Group
  const buttonGroup = document.createElement("div");
  buttonGroup.className =
    "d-flex justify-content-between align-items-center mt-2";

  // View Button
  const viewButton = document.createElement("button");

  viewButton.className = "btn btn-success view-btn";
  viewButton.setAttribute("data-viewsrc", viewSRC);

  viewButton.innerText = "View";

  // Add Button
  const addButton = document.createElement("button");
  addButton.className = "btn btn-success add-btn";
  addButton.setAttribute("data-bs-toggle", "modal");
  addButton.setAttribute("data-bs-target", "#addModal");
  addButton.innerText = "Add";

  // Append
  buttonGroup.appendChild(viewButton);
  buttonGroup.appendChild(addButton);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(buttonGroup);

  card.appendChild(cardImage);
  card.appendChild(cardBody);

  cardCol.appendChild(card);
  dynamicCardsContainer.appendChild(cardCol);
}


