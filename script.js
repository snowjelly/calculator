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
  num1 = parseInt(concat);
  concat = "";
  displayValue.innerHTML = concat;
  displaySubValue.innerHTML = num1 + " " + operator;
  num1Stored = true;
  prevOperator = operator;
  return num1Stored;
}

const initNum2 = () => {
  if (concat === "") {
    return console.log("concat is empty");
  }
  num2 = parseInt(concat);
  concat = "";
  return num2;
}

const chain = () => {
  if (num1 === 0 || num2 === 0) {
    return console.log("missing parameters: " + " num1= " + num1 + " operator= " + operator + " num2= " + num2);
  }
  const result = operate(num1, operator, num2);
  console.log("= " + result);
  displayValue.innerHTML = concat;
  displaySubValue.innerHTML = num1 + " " + operator;
  // set num1 to result
  num1 = result; 
  //reset num2
  num2 = 0; 
  return result;
}

const log = (e) => {
  const btnValue = e.target.childNodes[0].nodeValue.toString();
  //console.log(btnValue);
    
  if (btnValue === "C") {
    clear();
  } else if (btnValue === "⌫") {
    backspace();
  } else if ((btnValue === "÷" || btnValue === "×" || btnValue === "-" || btnValue === "+" || btnValue === "=") && lastInput !== "operator" && lastInput !== "equals" && lastInput !== "") {
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
      } else if (concat !== ""){ //chain
        initNum2();
        chain();
        console.log(operator);
      }
    } else if (num1Stored === false){ //first run
      console.log(operator);
      initNum1();
    }
  } else if (isNaN(parseInt(btnValue)) !== true){ //if a number is clicked
    concat = concat.concat(btnValue);
    console.log(concat);
    displayValue.innerHTML = concat;
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
