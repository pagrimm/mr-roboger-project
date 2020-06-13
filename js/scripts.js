//USER INTERFACE LOGIC
$(document).ready(function() {
  let numberRegex = /^[0-9]*$/
  $("#form1").submit(function(event){
    event.preventDefault();
    resetResults();
    let inputs = getInputs();
    if (validateInput(inputs[1], numberRegex, 0, 100)) {
      showOutput(createResponse(inputs[1], inputs[0]));
    } else {
      showOutput("BEEP. BOOP. ERROR. HUMAN, PLEASE ENTER AN INTEGER BETWEEN 1 AND 99 INCLUSIVE.");
    }
  });
  $("#clear-button").click(function(){
    clearInputs();
    resetResults();
  })
});

function getInputs () {
  inputsArray = [];
  $("input").each(function () {
    inputsArray.push($(this).val());
  });
  return inputsArray;
}

function showOutput (input) {
  $("#output").text(input);
  $("#output-section").show()
} 

function clearInputs () {
  $("input").each(function () {
    $(this).val("");
  });
}

function resetResults () {
  $("#output").text("")
  $("#output-section").hide()
}

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
function createResponse (inputNumber, inputName){
  let outputArray = [];
  for (i = 0; i <= inputNumber; i++) {
    outputArray.unshift(checkResponse(inputNumber - i, inputName));
  }
  return outputArray.join(", ");
}

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