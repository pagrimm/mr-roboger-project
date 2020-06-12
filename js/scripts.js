function createResponse (inputNumber){
  let outputArray = [];
  for (i = 0; i <= inputNumber; i++) {
    outputArray.unshift(checkResponse(inputNumber - i));
  }
  return outputArray.join(", ");
}

function checkResponse (inputNumber){
  const roboResponse = ["Beep!", "Boop!", "Won't you be my neighbor?"]
  let inputNumberArray = inputNumber.toString().split("").map(n => parseInt(n));
  let highNumber = 0;
  for (v = 0; v < inputNumberArray.length; v++) {
    if (inputNumberArray[v] >= 1 && inputNumberArray[v] <= 3) {
      if (highNumber < inputNumberArray[v]) {
        highNumber = inputNumberArray[v];
      }
    }
  }
  if (highNumber > 0) {
    return roboResponse[highNumber - 1];
  } else {
    return inputNumber;
  }
}