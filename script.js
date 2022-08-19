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
  operator: "",
  prevOperator: "",
  num2: 0,
}

const logging = () => {
  console.table(userInput)
}

const clear = () => {
  userInput.numBuffer = "";
  userInput.num1 = 0;
  userInput.num2 = 0;
  userInput.operator = "";
  userInput.prevOperator = "";
  displayValue.innerHTML = "";
  displaySubValue.innerHTML = "";
  return "Cleared";
}

const backspace = () => {
  userInput.numBuffer = userInput.numBuffer.substring(0, userInput.numBuffer.length -1);
  displayValue.innerHTML = userInput.numBuffer;
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

const equals = () => {
  if (userInput.num1 === 0 || userInput.num2 === 0) {
    return console.log("missing parameters: " + " num1= " + userInput.num1 + " operator= " + userInput.operator + " num2= " + userInput.num2);
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
    userInput.numBuffer = numBuffer.concat(btnValue);
    console.log(numBuffer);
    displayValue.innerHTML = userInput.numBuffer;
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
