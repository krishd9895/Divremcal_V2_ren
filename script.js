let rejectedSurveyNumber;
let chosenSurveyNumber;

// Function to calculate the selected survey number based on the random number and highest survey number
function calculateSelectedSurveyNumber() {
  // Parse input values from HTML input fields
  var randomNumber = parseInt(document.getElementById("randomNumber").value);
  var highestSurveyNumber = parseInt(document.getElementById("highestSurveyNumber").value);

  // Check if inputs are valid (non-zero, greater than 0)
  if (isNaN(randomNumber) || isNaN(highestSurveyNumber) || randomNumber === 0 || highestSurveyNumber === 0) {
    alert("Please enter valid numbers greater than 0.");
    return;
  }

  // Calculate the selected survey number as the remainder of randomNumber divided by highestSurveyNumber
  var selectedSurveyNumber = randomNumber % highestSurveyNumber;

  // If the remainder is 0, use the highest survey number itself
  if (selectedSurveyNumber === 0) {
    selectedSurveyNumber = highestSurveyNumber;
  }

  // Set chosenSurveyNumber to selectedSurveyNumber initially
  chosenSurveyNumber = selectedSurveyNumber;

  // Display the selected survey number in the HTML element
  document.getElementById("result").innerText = "Selected survey number: " + selectedSurveyNumber;

  // Display prompt asking if user wants to reject the selected survey number
  var promptMessage = 'Do you want to reject this selected survey number? ';
  promptMessage += '<button type="button" onclick="allowManualSurveySelection(' + selectedSurveyNumber + ')">Yes</button>';
  promptMessage += '<button type="button" onclick="proceedWithSelectedSurveyNumber(); removeManualSurveySelectionInput()">No</button>';

  document.getElementById("prompt").innerHTML = promptMessage;
}

// Function to allow manual survey number input from the user
function allowManualSurveySelection(selectedSurveyNumber) {
  rejectedSurveyNumber = selectedSurveyNumber; // Store the rejected survey number

  // Check if input box already exists, to avoid duplicates
  if (!document.getElementById("manualSurveySelectionContainer")) {
    var inputBox = '<div id="manualSurveySelectionContainer">';
    inputBox += '<br><label for="manualSurveyNumber"><b>Enter your survey number choice:</b></label>';
    inputBox += '<input type="number" id="manualSurveyNumber" name="manualSurveyNumber" min="1" max="' + selectedSurveyNumber + '">';
    inputBox += '<button type="button" onclick="calculateWithUserSurveySelection(' + selectedSurveyNumber + ')">Submit</button>';
    inputBox += '</div>';

    document.getElementById("prompt").innerHTML += inputBox;
  }
}

// Function to remove the manual survey selection input box if the user doesn't want to reject
function removeManualSurveySelectionInput() {
  var inputBox = document.getElementById("manualSurveySelectionContainer");
  if (inputBox) {
    inputBox.remove();
  }
}

// Function to proceed with the selected survey number if not rejected, and show input for subdivisions
function proceedWithSelectedSurveyNumber() {
  var subdivisionInput = '<label for="subdivisions">Number of Subdivisions:</label>';
  subdivisionInput += '<input type="number" id="subdivisions" name="subdivisions" min="1">';
  subdivisionInput += '<button type="button" onclick="calculateSelectedSubdivision()">Calculate Subdivision</button>';

  document.getElementById("subdivisionInput").innerHTML = subdivisionInput;
}

// Function to handle user input for a manual survey number choice and proceed
function calculateWithUserSurveySelection() {
  var highestSurveyNumber = parseInt(document.getElementById("highestSurveyNumber").value);
  var manualSurveyNumber = parseInt(document.getElementById("manualSurveyNumber").value);

  // Validate user input for manual survey selection
  if (isNaN(manualSurveyNumber) || manualSurveyNumber <= 0 || manualSurveyNumber > highestSurveyNumber) {
    alert("Please enter a valid survey number greater than 0 and not exceeding the highest survey number.");
    return;
  }

  // Set the chosen survey number to the manual input
  chosenSurveyNumber = manualSurveyNumber;

  // Proceed with the chosen survey number
  proceedWithSelectedSurveyNumber();
}

// Function to calculate the final subdivision based on the chosen survey number and number of subdivisions
function calculateSelectedSubdivision() {
  var subdivisions = parseInt(document.getElementById("subdivisions").value);

  // Validate subdivision input
  if (isNaN(subdivisions) || subdivisions <= 0) {
    alert("Please enter a valid number of subdivisions greater than 0.");
    return;
  }

  // Calculate the selected subdivision number
  var selectedSubdivisionNumber = chosenSurveyNumber % subdivisions;

  // If remainder is 0, use subdivisions itself
  if (selectedSubdivisionNumber === 0) {
    selectedSubdivisionNumber = subdivisions;
  }

  // Display results in the HTML element
  document.getElementById("finalResult").innerHTML = '<h3>Final Result</h3>';
  
  if (rejectedSurveyNumber && rejectedSurveyNumber !== chosenSurveyNumber) {
    document.getElementById("finalResult").innerHTML += '<b>Rejected selected survey number:</b> ' + rejectedSurveyNumber + '<br>';
  }
  
  document.getElementById("finalResult").innerHTML += '<b>Survey number chosen:</b> ' + chosenSurveyNumber + '<br>';
  document.getElementById("finalResult").innerHTML += '<b>Selected subdivision number:</b> ' + selectedSubdivisionNumber;
}

// Function to clear and reload the page
function clearForm() {
  location.reload();
}
