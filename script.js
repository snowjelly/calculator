const displayValue = document.querySelector('.display');
const displaySubValue = document.querySelector('.sub-display');

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
  console.log(inputStore);
  console.table(userInput);
}

const clear = () => {
  inputStore = [];
  userInput.num1Stored = false;
  delete userInput.numBuffer;
  delete userInput.num1;
  delete userInput.num2;
  delete userInput.operator;
  delete userInput.prevOperator;
  displayValue.innerHTML = "";
  displaySubValue.innerHTML = "";
  return "Cleared";
}

const backspace = () => {
  userInput.numBuffer = userInput.numBuffer.substring(0, userInput.numBuffer.length -1);
  displayValue.innerHTML = userInput.numBuffer;
}

const operate = (num1, operator, num2) => {

  if (operator === "÷") {
    if (num1 === 0 || num2 === 0) {
      return displayValue.innerHTML = "Cannot divide by 0";
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
    console.log('chain');
    result = operate(userInput.num1, userInput.prevOperator, userInput.num2);
    displaySubValue.innerHTML = userInput.num1 + " " + userInput.prevOperator + " " + userInput.num2 + " " + "=";
  }
  else {
    console.log('not a chain');
    result = operate(userInput.num1, userInput.operator, userInput.num2);
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
    userInput.num1 = parseInt(userInput.numBuffer);
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
    userInput.num2 = parseInt(userInput.numBuffer);
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
      return console.log('num1 initialized');
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
      return console.log('cant do that');
    }
    // inputStore.push(equals()); //equals()
     logging();
  } else if (isNaN(parseInt(btnValue)) !== true) { //if a number is clicked
    if (typeof userInput.numBuffer === 'undefined') {
      userInput.numBuffer = "";
    }
      userInput.numBuffer = userInput.numBuffer.concat(btnValue);
      console.log(userInput.numBuffer);
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
