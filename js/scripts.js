function createResponse (inputNumber, inputName){
  const roboResponse = ["Beep!", "Boop!"]
  let outputArray = [];
  roboResponse.push("Won't you be my neighbor, " + inputName + "?")
  for (i = 0; i <= inputNumber; i++) {
    outputArray.unshift(checkResponse(inputNumber - i));
  }
  return outputArray.join(", ");
}

function checkResponse (inputNumber){
  let inputNumberArray = inputNumber.toString().split("").map(n => parseInt(n));
  let highNumber = 0;
  inputNumberArray.forEach(function (number) {
    if (number >= 1 && number <= 3) {
      if (highNumber < number) {
        highNumber = number;
      }
    }
  });
  if (highNumber > 0) {
    return roboResponse[highNumber - 1];
  } else {
    return inputNumber;
  }
}