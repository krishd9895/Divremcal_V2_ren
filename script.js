let rejectedSurveyNumber;
let chosenSurveyNumber;

// Function to calculate the selected survey number based on the random number and highest survey number
function calculateSelectedSurveyNumber() {
  var randomNumber = parseInt(document.getElementById("randomNumber").value);
  var highestSurveyNumber = parseInt(document.getElementById("highestSurveyNumber").value);

  if (isNaN(randomNumber) || isNaN(highestSurveyNumber) || randomNumber === 0 || highestSurveyNumber === 0) {
    alert("Please enter valid numbers greater than 0.");
    return;
  }

  var selectedSurveyNumber = randomNumber % highestSurveyNumber;

  if (selectedSurveyNumber === 0) {
    selectedSurveyNumber = highestSurveyNumber; // If remainder is 0, use the highest survey number
  }

  // Initially set chosenSurveyNumber to the selectedSurveyNumber
  chosenSurveyNumber = selectedSurveyNumber;

  document.getElementById("result").innerText = "Selected survey number: " + selectedSurveyNumber;

  // Display options for rejecting or accepting the selected survey number
  var promptMessage = 'Do you want to reject this selected survey number? ';
  promptMessage += '<button type="button" onclick="allowManualSurveySelection(' + selectedSurveyNumber + ')">Yes</button>';
  promptMessage += '<button type="button" onclick="proceedWithSelectedSurveyNumber()">No</button>';

  document.getElementById("prompt").innerHTML = promptMessage;
}

// Function to allow user to manually input a survey number if they reject the selected one
function allowManualSurveySelection(selectedSurveyNumber) {
  rejectedSurveyNumber = selectedSurveyNumber;

  // Check if input box already exists, to avoid duplicates
  if (!document.getElementById("manualSurveySelectionContainer")) {
    var inputBox = '<div id="manualSurveySelectionContainer">';
    inputBox += '<br><label for="manualSurveyNumber"><b>Enter your survey number choice:</b></label>';
    inputBox += '<input type="number" id="manualSurveyNumber" name="manualSurveyNumber" min="1" max="' + selectedSurveyNumber + '">';
    inputBox += '<button type="button" onclick="calculateWithUserSurveySelection()">Submit</button>';
    inputBox += '</div>';

    document.getElementById("prompt").innerHTML += inputBox;
  }
}

// Remove manual input section if the user decides not to reject
function proceedWithSelectedSurveyNumber() {
  var subdivisionInput = '<label for="subdivisions">Number of Subdivisions:</label>';
  subdivisionInput += '<input type="number" id="subdivisions" name="subdivisions" min="1">';
  subdivisionInput += '<button type="button" onclick="calculateSelectedSubdivision()">Calculate Subdivision</button>';

  document.getElementById("subdivisionInput").innerHTML = subdivisionInput;
}

// Function to calculate subdivision based on the chosen survey number
function calculateSelectedSubdivision() {
  var subdivisions = parseInt(document.getElementById("subdivisions").value);

  if (isNaN(subdivisions) || subdivisions <= 0) {
    alert("Please enter a valid number of subdivisions greater than 0.");
    return;
  }

  var selectedSubdivisionNumber = chosenSurveyNumber % subdivisions;

  if (selectedSubdivisionNumber === 0) {
    selectedSubdivisionNumber = subdivisions; // If remainder is 0, use subdivisions itself
  }

  document.getElementById("finalResult").innerHTML = '<h3>Final Result</h3>';

  if (rejectedSurveyNumber && rejectedSurveyNumber !== chosenSurveyNumber) {
    document.getElementById("finalResult").innerHTML += '<b>Rejected selected survey number:</b> ' + rejectedSurveyNumber + '<br>';
  }

  document.getElementById("finalResult").innerHTML += '<b>Survey number chosen:</b> ' + chosenSurveyNumber + '<br>';
  document.getElementById("finalResult").innerHTML += '<b>Selected subdivision number:</b> ' + selectedSubdivisionNumber;
}

// Function to handle the user's manual survey number input
function calculateWithUserSurveySelection() {
  var highestSurveyNumber = parseInt(document.getElementById("highestSurveyNumber").value);
  var manualSurveyNumber = parseInt(document.getElementById("manualSurveyNumber").value);

  if (isNaN(manualSurveyNumber) || manualSurveyNumber <= 0 || manualSurveyNumber > highestSurveyNumber) {
    alert("Please enter a valid survey number greater than 0 and not exceeding the highest survey number.");
    return;
  }

  // Update chosenSurveyNumber to the user’s manually entered survey number
  chosenSurveyNumber = manualSurveyNumber;

  // Proceed with the user’s chosen survey number
  proceedWithSelectedSurveyNumber();
}

// Function to clear the form and reload the page
function clearForm() {
  location.reload();
}
