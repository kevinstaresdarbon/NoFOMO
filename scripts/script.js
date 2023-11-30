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
  var category = $("#categoryInput").val();
  var location = $("#locationInput").val();
  var date = $("#dateInput").val();
  var time = $("#timeInput").val();

  if (!location) {
    console.error("Input location is empty. Please provide a valid location.");
    return;
  }

  console.log("Updating weather for location:", location);

  // Clear existing time fields
  const hours = Array.from({ length: 24 }, (_, i) => i);
  hours.forEach((hour) => {
    const taskBox = document.getElementById(`task-${hour}`);
    taskBox.innerHTML = ""; // Clear the content
  });

  // Call the function to update weather for the entered location
  updateWeatherForCity(location);
}

$("#searchBtn").on("click", handleSearch);

// Create 10 cards dynamically (adjusted from 8 to 10)
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
  cardTitle.className = "card-title result-title font-weight-bold";
  cardTitle.innerText = "Result Name";

  // Button Group
  const buttonGroup = document.createElement("div");
  buttonGroup.className =
    "d-flex justify-content-between align-items-center mt-2";

  // View Button
  const viewButton = document.createElement("button");
  viewButton.className = "btn view-btn btn-success";
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

function populateModal() {
  // Function to populate the modal with content
}

function addEvent() {
  // Function to add event to the schedule
}

// Event listeners for modal and schedule
resultsSection.on("click", "button.add-btn", function () {
  // On click, populate modal
  populateModal();
});

$("#schedule-btn").on("click", function () {
  // Create schedule event
  addEvent();
});
