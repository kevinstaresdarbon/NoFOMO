var resultsSection = $("#results");
var modalEventName = $("#event-name");
var modalTime = $("#modal-time");


document.addEventListener("DOMContentLoaded", function () {
  // Retrieve events from local storage
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};

  // Loop through saved events and add them to the schedule
  Object.keys(savedEvents).forEach((hour) => {
    const eventDetails = savedEvents[hour];
    const timeID = hour;

    // Check if the task element exists
    if ($(timeID).length) {
      // Add event details to the existing task element
      const taskName = $("<a>")
        .attr({ href: eventDetails.url, target: "_blank" })
        .text(eventDetails.name);
        var taskDetails = $("<div>");
        taskDetails.append(taskName, eventDetails.duration).addClass("task-details");
      var deleteTask = $("<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>");
      deleteTask.addClass("delete-btn");
      $(timeID).append(taskDetails, deleteTask);
      $(timeID).css("background-color", "red");
    }
  });
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

  // Add to schedule
  var timeID = "#task-" + eventTime;
  var taskName = $("<a>")
    .attr({ href: eventSrc, target: "_blank" })
    .text(eventName);

  var taskDetails = $("<div>");
  taskDetails.append(taskName, eventDuration).addClass("task-details");
  var deleteTask = $("<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>");
  deleteTask.addClass("delete-btn");
  $(timeID).append(taskDetails, deleteTask);
  // Adds background colour to schedule block once item is added
  $(timeID).css("background-color", "red");


  // Save the event to local storage
  saveEventToLocalStorage(timeID, eventName, eventSrc, eventDuration);

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
function saveEventToLocalStorage(hour, eventName, eventSrc, eventDuration) {
  // Retrieve existing saved events or create a new object
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};

  // Save the event details
  savedEvents[hour] = {
    name: eventName,
    url: eventSrc,
    duration: eventDuration,
  };

  // Update local storage
  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}

// Function to delete event from schedule
function deleteEvent(toDelete) {
  $("#" + toDelete).html("").css("background-color", "transparent");
  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};
  delete savedEvents["#" + toDelete];
  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}

$("#daily-schedule").on("click", "i.delete-btn", function() {
  var deletedTask = $(this).parentsUntil($("task")).attr("id");
  // function to remove event
  deleteEvent(deletedTask);
});