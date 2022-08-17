let concat = "";
let num1 = "";
let operatorSelected = false;
let operationScheduled = "";
const log = (e) => {
  const btnValue = e.target.childNodes[0].nodeValue.toString();
  //console.log(btnValue);
  if (isNaN(parseInt(btnValue))) {
    const operator = btnValue;
    if (operator === "C") {
      concat = "";
    } else if (operator === "⌫") {
      concat = concat.substring(0, concat.length -1);
      console.log(concat);
    } else if (operatorSelected != true && (operator === "÷" || operator === "×" || operator === "-" || operator === "+")) {
      num1 = concat;
      concat = "";
      operatorSelected = true;
        if (operator === "÷") {
          operationScheduled = "divide";
        } else if (operator === "×") {
          operationScheduled = "multiply"
        } else if (operator === "-") {
          operationScheduled = "subtract";
        } else if (operator === "+") {
          operationScheduled = "add";
        }
    } else if (operatorSelected) {
      
    }
  } else {
    concat = concat.concat(btnValue);
    console.log(concat);
  }
}

const btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', log));




const add = (num1, num2) => {
  return num1 + num2;
}

const subtract = (num1, num2) => {
  return num1 - num2;
}

const multiply = (num1, num2) => {
  return num1 * num2;
}

const divide = (num1, num2) => {
  return num1 / num2;
}

const operate = (operator, num1, num2) => {
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === '*') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    return divide(num1, num2);
  }
}