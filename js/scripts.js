//USER LOGIC
$(document).ready(function() {
  $("#form1").submit(function(event){
    event.preventDefault();
    let inputs = getInputs();
    console.log(inputs);
    $("#output").text(createResponse(parseInt(inputs[1]), inputs[0]))
    $("#output-section").show()
  });
});

function getInputs () {
  inputsArray = [];
  $("input").each(function () {
    inputsArray.push($(this).val());
  });
  return inputsArray;
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
  const roboResponse = ["Beep!", "Boop!", "Won't you be my neighbor, " + inputName + "?"]
  let inputNumberArray = inputNumber.toString().split("").map(n => parseInt(n));
  let highNumber = 0;
  inputNumberArray.forEach(function (number) {
    if (number >= 1 && number <= 3 && highNumber < number) {
      highNumber = number;
    }
  });
  if (highNumber > 0) {
    return roboResponse[highNumber - 1];
  } else {
    return inputNumber;
  }
}