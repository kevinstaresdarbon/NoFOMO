var resultsSection = $("#results");
var modalEventName = $("#event-name");
var modalTime = $("#modal-time");

// test event name
var eventName = "Test event #1"

// Function to populate modal
function populateModal() {
    modalEventName.text(eventName);

    // Loop to create time options in modal
    for (var i = 0; i < 24 ; i++) {
        var timeSlot = $("<option>");
        var time = i.toString().padStart(2, "0") + ":00";
        timeSlot.text(time);
        modalTime.append(timeSlot);
    }
}

// Function to add event
function addEvent() {
    console.log("adding event...")
}

// Event listener for card add button
resultsSection.on("click", "button.add-btn", function() {
    // On click, populate modal
    populateModal();
    
});


// Each card has ID with the name of event

