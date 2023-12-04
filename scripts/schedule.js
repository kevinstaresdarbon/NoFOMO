var resultsSection = $("#results");
var modalEventName = $("#event-name");
var modalTime = $("#modal-time");

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

  // Create a new task box for the event
  var taskBox = $("<div>").addClass("task-box");
  var taskName = $("<a>")
    .attr({ href: eventSrc, target: "_blank" })
    .text(eventName);
  taskBox.append(taskName, eventDuration);

  // Append the task box to the correct time slot
  $(timeID).find(".task").append(taskBox);

  // Adds background color to schedule block once item is added
  $(timeID).css("background-color", "red");
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
