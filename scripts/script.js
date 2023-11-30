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
  var category = $("#categoryInput").val();
  var location = $("#locationInput").val();
  var date = $("#dateInput").val();
  var time = $("#timeInput").val();
  var queryURL =
    "https://api.content.tripadvisor.com/api/v1/location/search?key=" +
    TA_API_KEY +
    "&searchQuery=" +
    location +
    "&language=en";

  $.ajax({
    url: queryURL,
    async: "true",
    method: "GET",
    dataType: "jsonp",
    crossDomain: "true",
    headers: { referer: "kevinstaresdarbon.github.io" },
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log("An error occured: " + err);
    },
  });
}

$("#searchBtn").on("click", handleSearch);

// Create 8 cards dynamically
const dynamicCardsContainer = document.getElementById("dynamicCards");

for (let i = 0; i < 10; i++) {
  // Card
  const cardCol = document.createElement("div");
  cardCol.className = "col-md-3 mb-4";
  cardCol.style.display = "inline-block";

  const card = document.createElement("div");
  card.className = "card mb-4 shadow-sm";

  // Card Image
  const cardImage = document.createElement("img");
  cardImage.src = "https://placehold.co/300x200";
  cardImage.alt = "Restaurant Image";
  cardImage.className = "card-img-top";

  // Card Body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Card Title
  const cardTitle = document.createElement("h2");
  cardTitle.className = "card-title font-weight-bold";
  cardTitle.innerText = "Result Name";

  // Button Group
  const buttonGroup = document.createElement("div");
  buttonGroup.className =
    "d-flex justify-content-between align-items-center mt-2";

  // View Button
  const viewButton = document.createElement("button");
  viewButton.className = "btn btn-success";
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