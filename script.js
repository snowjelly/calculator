const displayValue = document.querySelector('.display');
const displaySubValue = document.querySelector('.sub-display');

let concat = "";
let num1 = 0;
let num2 = 0;
let num1Stored = false;
let operator = "";
let prevOperator = "";
let lastInput = "";

const logging = () => {
  console.log(concat, num1, num2, num1Stored, operator, prevOperator, lastInput);
}

const clear = () => {
  concat = "";
  num1 = 0;
  num2 = 0;
  num1Stored = false;
  operator = "";
  displayValue.innerHTML = concat;
  displaySubValue.innerHTML = concat;
  return "Cleared";
}

const backspace = () => {
  concat = concat.substring(0, concat.length -1);
  displayValue.innerHTML = concat;
}

const operate = (num1, operator, num2) => {
  if (num1 === 0) {
    return console.log('num1 is missing');
  } else if (num2 === 0) {
    return console.log('num2 is missing');
  }

  if (operator === "÷") {
    return divide(num1, num2);
  } else if (operator === "×") {
    return multiply(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "+") {
    return add(num1, num2);
  }
}
// **new and improved bug
// since concat is updated to the result inside equals(). i need num1 to parse concat everytime an operator is pressed.
/*
const equals = (operator) => {
  num2 = parseInt(concat);
  const result = operate(num1, operator, num2);
  console.log("= " + result);
  displaySubValue.innerHTML = num1 + " " + operator + " " + num2 + " = ";
  displayValue.innerHTML = result;
  num1 = result; 
  //reset values
  num2 = 0; 
  concat = "";
  return result;
}
*/
const log = (e) => {
  const btnValue = e.target.childNodes[0].nodeValue.toString();
  //console.log(btnValue);
    
  if (btnValue === "C") {
    clear();
  } else if (btnValue === "⌫") {
    backspace();
  } else if ((btnValue === "÷" || btnValue === "×" || btnValue === "-" || btnValue === "+" || btnValue === "=")) {
    if (btnValue !== "=") { //equals is not an operator
      operator = btnValue;
      lastInput = "operator";
    }
    if (num1Stored) { //equals
      if (btnValue === "=" && lastInput === "number") {
        lastInput = "equals";
        num1 = equals(operator);
      } else if (concat !== ""){ //chain
        
        equals(prevOperator);
        console.log(operator);
        displayValue.innerHTML = concat;
        displaySubValue.innerHTML = num1 + " " + operator;
      } else {
        console.log(operator);
        num2 = parseInt(concat);
        equals(prevOperator);
      }
    } else if (num1Stored === false){ //first run
      console.log(operator);
      num1 = parseInt(concat);
      concat = "";
      displayValue.innerHTML = concat;
      displaySubValue.innerHTML = num1 + " " + operator;
      num1Stored = true;
      prevOperator = operator;
    }
  } else if (isNaN(parseInt(btnValue)) !== true){ //if a number is clicked
    concat = concat.concat(btnValue);
    console.log(concat);
    displayValue.innerHTML = concat;
    lastInput = "number";
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
