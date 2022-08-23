const displayValue = document.querySelector('.display');
const displaySubValue = document.querySelector('.sub-display');

const logs = false;
let inputStore = [];
let userInput = {
//  numBuffer: "",
//  num1: 0,
  num1Stored: false,
//  operator: "",
//  prevOperator: "",
//  num2: 0,
}

const logging = () => {
  if (logs) {
    console.log(inputStore);
    console.table(userInput);
  }
}

const roundToTwo = (num) => {
  return +(Math.round(num + "e+2")  + "e-2");
}

const clear = (zero = false) => {
  if (zero) {
    displayValue.innerHTML = "Cannot divide by 0";
  }
  else {
    displayValue.innerHTML = "";
  }
  displaySubValue.innerHTML = "";
  inputStore = [];
  userInput.num1Stored = false;
  delete userInput.numBuffer;
  delete userInput.num1;
  delete userInput.num2;
  delete userInput.operator;
  delete userInput.prevOperator;
  return "Cleared";
}

const backspace = () => {
  userInput.numBuffer = userInput.numBuffer.substring(0, userInput.numBuffer.length -1);
  displayValue.innerHTML = userInput.numBuffer;
}

const operate = (num1, operator, num2) => {

  if (operator === "÷") {
    if (num1 === 0 || num2 === 0) {
      return null;
    }
    else {
      return divide(num1, num2);
    }
  }
  else if (operator === "×") {
    return multiply(num1, num2);
  }
  else if (operator === "-") {
    return subtract(num1, num2);
  }
  else if (operator === "+") {
    return add(num1, num2);
  }
}

const equals = (chain = false) => {
  let result = 0;
  if (chain) {
    //console.log('chain');
    result = roundToTwo(operate(userInput.num1, userInput.prevOperator, userInput.num2));
    if (result === null) {
      const zero = true;
      return clear(zero);
    }
    displaySubValue.innerHTML = userInput.num1 + " " + userInput.prevOperator + " " + userInput.num2 + " " + "=";
  }
  else {
    //console.log('not a chain');
    result = roundToTwo(operate(userInput.num1, userInput.operator, userInput.num2));
    if (result === null) {
      const zero = true;
      return clear(zero);
    }
    displaySubValue.innerHTML = userInput.num1 + " " + userInput.operator + " " + userInput.num2 + " " + "=";
  }
  displayValue.innerHTML = result;
  userInput.num1 = result;
  return result;
}

const initNum1 = () => {
  if (userInput.numBuffer === "") {
    return console.log('num1 init fail')
  } else {
    userInput.num1 = parseFloat(userInput.numBuffer);
    userInput.numBuffer = "";
    displayValue.innerHTML = "";
    displaySubValue.innerHTML = userInput.num1 + " " + userInput.operator;
    userInput.num1Stored = true;
    return userInput.num1;
  }
}

const initNum2 = () => {
  if (userInput.numBuffer === "") {
    return console.log('num2 init fail');
  } else {
    userInput.num2 = parseFloat(userInput.numBuffer);
    userInput.numBuffer = "";
    return userInput.num2;
  }
}

const calculator = (e) => {
  const btnValue = e.target.childNodes[0].nodeValue.toString();
    
  if (btnValue === "C" && typeof userInput.numBuffer !== 'undefined') {
    clear();
  }
  else if (btnValue === "⌫" && typeof userInput.numBuffer !== 'undefined') {
    backspace();
  }
  else if ((btnValue === "÷" || btnValue === "×" || btnValue === "-" || btnValue === "+") && typeof userInput.numBuffer !== 'undefined') {

    if (typeof inputStore[inputStore.length - 1] === 'string' && userInput.numBuffer === "") {
      logging();
      return console.log('cant do that fr');
    }

      

    
    userInput.operator = btnValue;


    //init num1 on first run
    if (userInput.num1Stored === false && userInput.numBuffer !== "") { 
      inputStore.push(userInput.num1 = initNum1());
      inputStore.push(btnValue);
      userInput.prevOperator = btnValue;
      return ('num1 initialized');
    }
    
    //if the current array value is a number push the operator after
    if (typeof inputStore[inputStore.length - 1] === 'number') {
      if (typeof userInput.prevOperator === 'undefined') {
        inputStore.push(userInput.operator);
      }
      else {
        inputStore.push(userInput.prevOperator);
      }
    }

    //if it isnt the first run and the current array value is a string then calculate
    if (userInput.num1Stored && typeof inputStore[inputStore.length - 1] === 'string' && userInput.numBuffer !== "") {
      const chain = true;
      inputStore.push(userInput.num2 = initNum2());
      inputStore.push("=");
      inputStore.push(equals(chain));
      logging();
    }
    







    userInput.prevOperator = userInput.operator;
  } else if (btnValue === "=" && typeof userInput.numBuffer !== 'undefined') {

    if ((inputStore[inputStore.length - 1] === userInput.operator || inputStore[inputStore.length - 2] === "=") && userInput.numBuffer !== "") {

      if (inputStore[inputStore.length - 2] === "=") {
        inputStore.push(userInput.operator);
      }
      inputStore.push(userInput.num2 = initNum2());
      inputStore.push(btnValue);
      inputStore.push(equals());
    }
    else {
      return ('cant do that');
    }
    logging();
  } else if (isNaN(parseInt(btnValue)) !== true || btnValue === ".") { //if a number is clicked
    if (typeof userInput.numBuffer === 'undefined') {
      userInput.numBuffer = "";
    }
    if (userInput.numBuffer.indexOf(".") !== -1 && btnValue === ".") {
      return;
    }
    userInput.numBuffer = userInput.numBuffer.concat(btnValue);
    (userInput.numBuffer);
    displayValue.innerHTML = userInput.numBuffer;
  }
}

const btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', calculator));




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
