const displayValue = document.querySelector('.display');
const displaySubValue = document.querySelector('.sub-display');

let lastInput = "";

let userInput = {
  numBuffer: "",
//  num1: 0,
  num1Stored: false,
//  operator: "",
//  prevOperator: "",
//  num2: 0,
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
  const result = operate(userInput.num1, userInput.operator, userInput.num2);
  console.log("= " + result);
  displaySubValue.innerHTML = userInput.num1 + " " + userInput.operator + " " + userInput.num2 + " = ";
  displayValue.innerHTML = result;
  // set num1 to result
  userInput.num1 = result; 
  //reset num2
  userInput.num2 = 0; 
  return result;
}

const initNum1 = () => {
  userInput.num1 = parseInt(userInput.numBuffer);
  userInput.numBuffer = "";
  displayValue.innerHTML = "";
  displaySubValue.innerHTML = userInput.num1 + " " + userInput.operator;
  userInput.num1Stored = true;
  userInput.prevOperator = userInput.operator;
  return userInput.num1;
}

const initNum2 = () => {
  if (userInput.numBuffer === "") {
    return console.log("numBuffer is empty");
  }
  userInput.num2 = parseInt(userInput.numBuffer);
  userInput.numBuffer = "";
  return userInput.num2;
}

const chain = () => {
  if (userInput.num1 === 0 || userInput.num2 === 0) {
    return console.log("missing parameters: " + " num1= " + userInput.num1 + " operator= " + userInput.prevOperator + " num2= " + userInput.num2);
  }
  const result = operate(userInput.num1, userInput.prevOperator, userInput.num2);
  console.log("= " + result);
  displayValue.innerHTML = userInput.numBuffer;
  displaySubValue.innerHTML = result + " " + userInput.operator;
  // set num1 to result
  userInput.num1 = result; 
  //reset num2
  userInput.num2 = 0; 
  userInput.prevOperator = userInput.operator;
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
      userInput.operator = btnValue;
      lastInput = "operator";
    } else {
      lastInput = "equals";
    }
    if (userInput.num1Stored) { //equals
      if (btnValue === "=") {
        initNum2();
        equals();
      } else if (userInput.numBuffer !== ""){ //chain
        initNum2();
        chain();
        console.log(userInput.operator);
      }
    } else if (userInput.num1Stored === false){ //first run
      console.log(userInput.operator);
      initNum1();
    }
  } else if (isNaN(parseInt(btnValue)) !== true){ //if a number is clicked
    userInput.numBuffer = userInput.numBuffer.concat(btnValue);
    console.log(userInput.numBuffer);
    displayValue.innerHTML = userInput.numBuffer;
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
