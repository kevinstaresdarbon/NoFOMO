var resultsSection = $("#results");
// test event name
var eventName = "Test event #1"

// Function to populate modal
function populateModal() {
    console.log("hi")
    
}

// Function to add event
function addEvent() {
    console.log("adding event...")
}

// Event listener for card add button
resultsSection.on("click", "button.add-btn", function() {
    populateModal();
    
});


// Each card has ID with the name of event
// On click, populate modal
// For loop for times in modal