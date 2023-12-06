var resultsSection = $("#results");
var modalEventName = $("#event-name");
var modalTime = $("#modal-time");

// Function to show modal
function showModal(content) {
  var modal = $("#myModal");
  var modalContent = modal.find(".modal-content");

  // Set modal content
  modalContent.html(content);

  // Show the modal
  modal.css("display", "block");

  // Close the modal when the user clicks anywhere outside of it
  $(window).on("click", function (event) {
    if (event.target === modal[0]) {
      closeModal();
    }
  });

  // Close the modal when the user clicks the close button
  $(".close").on("click", closeModal);
}

// Function to close the modal
function closeModal() {
  $("#myModal").css("display", "none");
  $("#myModal .modal-content").empty();
}

function renderTasks(savedEvents) {
  // Loop through saved events and add them to the schedule
  Object.keys(savedEvents).forEach((hour) => {
    const eventDetails = savedEvents[hour];
    const timeID = hour;
    const backgroundColor = eventDetails.colour;

    // Check if the task element exists
    if ($(timeID).length) {
      $(timeID).empty();
      // Add event details to the existing task element
      const taskName = $("<a>")
        .attr({ href: eventDetails.url, target: "_blank" })
        .text(eventDetails.name);
      var taskDetails = $("<div>");
      taskDetails
        .append(taskName, eventDetails.duration)
        .addClass("task-details");
      var deleteTask = $('<i class="fa fa-trash" aria-hidden="true"></i>');
      deleteTask.addClass("delete-btn");
      $(timeID).append(taskDetails, deleteTask);
      // Determine background color based on the selected category
      var category = $("#categoryInput").val();

      // Adds background colour to schedule block once item is added
      $(timeID).css("background-color", backgroundColor);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve events from local storage
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};

  renderTasks(savedEvents);
});

// Function to populate modal
function populateModal(eventName, eventSrc) {
  modalEventName.text(eventName);
  modalEventName.attr("name", eventName);
  modalEventName.attr("url-src", eventSrc);

  // Loop to create time options in modal
  for (var i = 0; i < 24; i++) {
    var timeSlot = $("<option>");
    timeSlot.attr("value", i);
    var time = i.toString().padStart(2, "0") + ":00";
    timeSlot.text(time);
    modalTime.append(timeSlot);
  }
}

// Function to add event
function addEvent(eventName, eventSrc) {
  // set variables for time, and duration
  var eventTime = modalTime.val();
  var eventDuration = "Duration: " + $("#modal-duration").val();

  // Check if an event already exists for the selected hour
  var existingEvent = $("#task-" + eventTime)
    .find(".task-details")
    .text()
    .trim();

  if (existingEvent !== "") {
    // Show a modal message indicating that the user is already busy at that time
    var modalContent = $("<p>").text("You are already busy at that time");
    showModal(modalContent);
    return; // Stop the function execution
  }

  // Add to schedule
  var timeID = "#task-" + eventTime;
  var taskName = $("<a>")
    .attr({ href: eventSrc, target: "_blank" })
    .text(eventName);

  var taskDetails = $("<div>");
  taskDetails.append(taskName, eventDuration).addClass("task-details");
  var deleteTask = $('<i class="fa fa-trash" aria-hidden="true"></i>');
  deleteTask.addClass("delete-btn");
  $(timeID).append(taskDetails, deleteTask);

  // Determine background color based on the selected category
  var category = $("#categoryInput").val();
  var backgroundColor;

  switch (category) {
    case "Restaurant":
      backgroundColor = "#08A045";
      break;
    case "bar":
      backgroundColor = "#08A045";
      break;
    case "cafe":
      backgroundColor = "#08A045";
      break;
    case "night_club":
      backgroundColor = "#DC4182";
      break;
    case "museum":
      backgroundColor = "#FF7733";
      break;
    case "tourist_attraction":
      backgroundColor = "#FFBA08";
      break;
    case "store":
      backgroundColor = "#2762BA";
      break;
    default:
      backgroundColor = "red"; // Default color if category is not matched
  }

  // Adds background colour to schedule block once item is added
  $(timeID).css("background-color", backgroundColor);

  // Save the event to local storage
  saveEventToLocalStorage(timeID, eventName, eventSrc, eventDuration, backgroundColor);
}

// Event listener for card add button
resultsSection.on("click", "button.add-btn", function () {
  var eventName = $(this).parent().siblings("h2").attr("card-title");
  var eventSrc = $(this).siblings().attr("data-viewsrc");
  // On click, populate modal
  populateModal(eventName, eventSrc);
});

// Event listener for modal submission
$("#schedule-btn").on("click", function () {
  var eventName = modalEventName.attr("name");
  var eventSrc = modalEventName.attr("url-src");
  // Create schedule event
  addEvent(eventName, eventSrc);
});

// Function to save an event to local storage
function saveEventToLocalStorage(hour, eventName, eventSrc, eventDuration, colour) {
  // Retrieve existing saved events or create a new object
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};

  // Save the event details
  savedEvents[hour] = {
    name: eventName,
    url: eventSrc,
    duration: eventDuration,
    colour: colour
  };

  // Update local storage
  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}

// Function to delete event from schedule
function deleteEvent(toDelete) {
  $("#" + toDelete)
    .css("background-color", "transparent")
    .empty();
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};
  delete savedEvents["#" + toDelete];
  renderTasks(savedEvents);
  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}

$("#daily-schedule").on("click", "i.delete-btn", function () {
  var deletedTask = $(this).parentsUntil($("task")).attr("id");
  // function to remove event
  deleteEvent(deletedTask);
});
