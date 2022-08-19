const displayValue = document.querySelector('.display');
const displaySubValue = document.querySelector('.sub-display');

let numBuffer = "";
let num1 = 0;
let num2 = 0;
let num1Stored = false;
let operator = "";
let prevOperator = "";
let lastInput = "";

let userInput = {
  numBuffer: "",
  num1: 0,
  operator,
  num2: 0,
}

const logging = () => {
  console.log(numBuffer, num1, num2, num1Stored, operator, prevOperator, lastInput);
}

const clear = () => {
  numBuffer = "";
  num1 = 0;
  num2 = 0;
  num1Stored = false;
  operator = "";
  prevOperator = "";
  lastInput = "";
  displayValue.innerHTML = numBuffer;
  displaySubValue.innerHTML = numBuffer;
  return "Cleared";
}

const backspace = () => {
  numBuffer = numBuffer.substring(0, numBuffer.length -1);
  displayValue.innerHTML = numBuffer;
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
// since numBuffer is updated to the result inside equals(). i need num1 to parse numBuffer everytime an operator is pressed.

const equals = () => {
  if (num1 === 0 || num2 === 0) {
    return console.log("missing parameters: " + " num1= " + num1 + " operator= " + operator + " num2= " + num2);
  }
  const result = operate(num1, operator, num2);
  console.log("= " + result);
  displaySubValue.innerHTML = num1 + " " + operator + " " + num2 + " = ";
  displayValue.innerHTML = result;
  // set num1 to result
  num1 = result; 
  //reset num2
  num2 = 0; 
  return result;
}

const initNum1 = () => {
  num1 = parseInt(numBuffer);
  numBuffer = "";
  displayValue.innerHTML = numBuffer;
  displaySubValue.innerHTML = num1 + " " + operator;
  num1Stored = true;
  prevOperator = operator;
  return num1Stored;
}

const initNum2 = () => {
  if (numBuffer === "") {
    return console.log("numBuffer is empty");
  }
  num2 = parseInt(numBuffer);
  numBuffer = "";
  return num2;
}

const chain = () => {
  if (num1 === 0 || num2 === 0) {
    return console.log("missing parameters: " + " num1= " + num1 + " operator= " + prevOperator + " num2= " + num2);
  }
  const result = operate(num1, prevOperator, num2);
  console.log("= " + result);
  displayValue.innerHTML = numBuffer;
  displaySubValue.innerHTML = result + " " + operator;
  // set num1 to result
  num1 = result; 
  //reset num2
  num2 = 0; 
  prevOperator = operator;
  return result;
}

const log = (e) => {
  const btnValue = e.target.childNodes[0].nodeValue.toString();
  //console.log(btnValue);
    
  if (btnValue === "C") {
    clear();
  } else if (btnValue === "⌫") {
    backspace();
  } else if ((btnValue === "÷" || btnValue === "×" || btnValue === "-" || btnValue === "+" || btnValue === "=") && lastInput !== "") {
    if (btnValue !== "=") { //equals is not an operator
      operator = btnValue;
      lastInput = "operator";
    } else {
      lastInput = "equals";
    }
    if (num1Stored) { //equals
      if (btnValue === "=") {
        initNum2();
        equals();
      } else if (numBuffer !== ""){ //chain
        initNum2();
        chain();
        console.log(operator);
      }
    } else if (num1Stored === false){ //first run
      console.log(operator);
      initNum1();
    }
  } else if (isNaN(parseInt(btnValue)) !== true){ //if a number is clicked
    numBuffer = numBuffer.concat(btnValue);
    console.log(numBuffer);
    displayValue.innerHTML = numBuffer;
    lastInput = "number";
  } 
  logging();
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
