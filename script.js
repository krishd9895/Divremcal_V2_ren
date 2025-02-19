let rejectedSurveyNumber;
let ifValueChange;

function calculateReminder() {
  var randomNumber = parseInt(document.getElementById("randomNumber").value);
  var surveyNumber = parseInt(document.getElementById("surveyNumber").value);

  if (isNaN(randomNumber) || isNaN(surveyNumber) || randomNumber === 0 || surveyNumber === 0) {
    alert("Please enter valid numbers greater than 0.");
    return;
  }

  var selectedSurveyNumber = randomNumber % surveyNumber;

  if (selectedSurveyNumber === 0) {
    selectedSurveyNumber = surveyNumber; // Update to divisor itself
  }

  rejectedSurveyNumber = selectedSurveyNumber;

  document.getElementById("result").innerText = "Selected survey number: " + selectedSurveyNumber;

  var reminderPrompt = 'Do you want to reject selected survey number? ';
  reminderPrompt += '<button type="button" onclick="enterReminder(' + selectedSurveyNumber + ')">Yes</button>';
  reminderPrompt += '<button type="button" onclick="continueWithReminder(' + selectedSurveyNumber + '); removeUserReminder()">No</button>'; 

  document.getElementById("reminderPrompt").innerHTML = reminderPrompt; 
}

function enterReminder(actualReminder) {
  // Check if the input box already exists
  if (!document.getElementById("userReminderContainer")) {
    var userReminderBox = '<div id="userReminderContainer">';
    userReminderBox += '<br><label for="userReminder"><b>Enter your survey number choice:</b></label>';
    userReminderBox += '<input type="number" id="userReminder" name="userReminder" min="1" max="' + actualReminder + '">';
    userReminderBox += '<button type="button" onclick="calculateReminderWithUserChoice(' + actualReminder + ')">Submit</button>';
    userReminderBox += '</div>';

    document.getElementById("reminderPrompt").innerHTML += userReminderBox;
    ifValueChange = actualReminder;
  }
}

function removeUserReminder() {
  var userReminderContainer = document.getElementById("userReminderContainer");
  if (userReminderContainer) {
    userReminderContainer.remove();
  }
}

function continueWithReminder(reminder) {
  var subdivisionsInput = '<label for="subdivisions">Number of Subdivisions:</label>';
  subdivisionsInput += '<input type="number" id="subdivisions" name="subdivisions" min="1">';
  subdivisionsInput += '<button type="button" onclick="calculateFinalReminder(' + reminder + '); finalRefresh()">Calculate selected subdivision</button>';

  document.getElementById("subdivisionsInput").innerHTML = subdivisionsInput;
}

function calculateReminderWithUserChoice(maxReminder) {
  var surveyNumber = parseInt(document.getElementById("surveyNumber").value); // Parse survey number value

  var userReminder = parseInt(document.getElementById("userReminder").value);

  if (isNaN(userReminder) || userReminder <= 0 || userReminder > surveyNumber) {
    alert("Please enter a valid survey number greater than 0 and not exceeding the Highest Survey Number.");
    return;
  }

  continueWithReminder(userReminder);
}

function calculateFinalReminder(reminder) {
  var subdivisions = parseInt(document.getElementById("subdivisions").value);

  if (isNaN(subdivisions) || subdivisions <= 0) {
    alert("Please enter a valid number of subdivisions greater than 0.");
    return;
  }

  var selectedSubdivisionNumber = reminder % subdivisions;

  if (selectedSubdivisionNumber === 0) {
    selectedSubdivisionNumber = subdivisions;
  }

  document.getElementById("finalReminder").innerHTML = '<h3>Results:</h3>';
  if (ifValueChange) {
    var actualReminder = parseInt(document.getElementById("userReminder").value);
    // Strike through only the rejected number
    document.getElementById("finalReminder").innerHTML += '<b>Rejected survey number:</b> <s>' + rejectedSurveyNumber + '</s><br>';
    document.getElementById("finalReminder").innerHTML += '<b>Survey number chosen:</b> ' + actualReminder + '<br>';
  } else {
    // No strikethrough when there's no rejection
    document.getElementById("finalReminder").innerHTML += '<b>Selected survey number:</b> ' + rejectedSurveyNumber + '<br>';
  }
  document.getElementById("finalReminder").innerHTML += '<b>Selected subdivision number:</b> ' + selectedSubdivisionNumber;
}


function finalRefresh() {
  var clearButton = '<button type="button" onclick="clearForm()">Refresh Page</button>';
  document.getElementById("finalRefresh").innerHTML = clearButton;
}

function clearForm() {
  location.reload();
}
