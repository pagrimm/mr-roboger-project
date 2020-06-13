//USER INTERFACE LOGIC
$(document).ready(function() {
  let numberRegex = /^[0-9]*$/
  let toggle = "forwards";
  $("#form1").submit(function(event){
    event.preventDefault();
    resetResults();
    let inputs = getInputs();
    if (validateInput(inputs[1], numberRegex, 0, 100) && inputs[0].length > 0) {
      showOutput(createResponse(inputs[1], inputs[0], toggle));
    } else {
      showOutput("BEEP. BOOP. ERROR. HUMAN, PLEASE ENTER A NAME AND INTEGER BETWEEN 1 AND 99 INCLUSIVE.");
    }
  });
  $("#toggle-button").click(function(){
    if (toggle === "forwards") {
      toggle = "backwards";
      $("#toggle-button").removeClass("inactive-button");
    } else {
      toggle = "forwards"
      $("#toggle-button").addClass("inactive-button");
    }
  })
  $("#clear-button").click(function(){
    clearInputs();
    resetResults();
  })
});

//function to get input values from every input field
function getInputs () {
  inputsArray = [];
  $("input").each(function () {
    inputsArray.push($(this).val());
  });
  return inputsArray;
}

//function to take any input text, put it in the output html element, and then show that section
function showOutput (input) {
  $("#output").text(input);
  $("#output-section").show();
} 

//function to clear the inputs of anything the user has entered
function clearInputs () {
  $("input").each(function () {
    $(this).val("");
  });
}

//function to clear the output text and hide the output section
function resetResults () {
  $("#output").text("")
  $("#output-section").hide()
}

//function to validate any number or string input, if you pass in the regex and min and max length of the string/number
function validateInput (input, regex, min, max) {
  if (regex.test(input) && parseInt(input) > min && parseInt(input) < max) {
    return true;
  } else if (isNaN(parseInt(input)) && regex.test(input) && input.length > min && input.length < max) {
    return true;
  } else {
    return false;
  }
}


//BUSINESS LOGIC
//function to create Mr. Roboger's output, takes an input number and input name, feeds them into the checkResponse function, and then either shift or unshifts the results depending on the user's forward or backwards toggle
function createResponse (inputNumber, inputName, toggle){
  let outputArray = [];
  for (let i = 0; i <= inputNumber; i++) {
    if (toggle === "forwards") {
      outputArray.unshift(checkResponse(inputNumber - i, inputName));
    } else {
      outputArray.push(checkResponse(inputNumber - i, inputName));
    }
  }
  return outputArray.join(", ");
}


//function to check each individual digit in an input number, determines what the highest digit is that matches our behaviors, and outputs the correct response
function checkResponse (inputNumber, inputName){
  const roboResponse = ["BEEP!", "BOOP!", "WON'T YOU BE MY NEIGHBOR, " + inputName.toUpperCase() + "?", "BZZT!"]
  let inputNumberArray = inputNumber.toString().split("").map(n => parseInt(n));
  let highNumber = 0;
  inputNumberArray.forEach(function (number) {
    if (number >= 1 && number <= roboResponse.length && highNumber < number) {
      highNumber = number;
    }
  });
  if (highNumber > 0) {
    return roboResponse[highNumber - 1];
  } else {
    return inputNumber;
  }
}