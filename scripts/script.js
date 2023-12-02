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

    // Time
    const time = document.createElement("p");
    time.className = "time";
    time.innerText = `${hour.toString().padStart(2, "0")}:00`;

    // Task
    const task = document.createElement("p");
    task.className = "task";
    const taskId = `${hour}`;
    task.setAttribute("id", "task-" + taskId);

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

    console.log(response.results);

    $.ajax(settings).done(function (response) {
      //clear old searches
      $("#dynamicCards").empty();

      for (let i = 0; i < 10; i++) {
        // locationIDs[i] = response.results.data[i].location_id; //add more code into this loop
        // var currentCard = $("#card" + i);
        // console.log(currentCard);
        // currentCard.children().eq(1).children("h2").innerText = response.results.data[i].name;
        // console.log(response.results.data[i]);
        var name = response.results.data[i].name;
        var imgSRC = response.results.data[i].photo.images.medium.url;
        var viewSRC = response.results.data[i].web_url;
        cardMaker(name, imgSRC, viewSRC);
      }

    });

  });

  // Call the function to update weather for the entered location
  updateWeatherForCity(location);
}

function handleView(event){
  console.log(event.target);
  window.open(event.target.dataset.viewsrc, "_blank");
}

$("#searchBtn").on("click", handleSearch);
$(document).on("click", ".view-btn", handleView)

function cardMaker(name, imgSRC, viewSRC){
  const dynamicCardsContainer = document.getElementById("dynamicCards");


  const cardCol = document.createElement("div");
  cardCol.className = "col-sm-12 col-md-6 col-lg-3 mb-4";
  cardCol.style.display = "inline-block";

  const card = document.createElement("div");
  card.minHeight = "600px";
  card.className = "card mb-4";
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


