const displayValue = document.querySelector('.display');
const displaySubValue = document.querySelector('.sub-display');

let concat = "";
let num1 = 0;
let num2 = 0;
let num1Stored = false;
//  might be able to compare num1 to 0 instead of using operatorSelected
let operationScheduled = "";


const clear = () => {
  concat = "";
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

const log = (e) => {
  const btnValue = e.target.childNodes[0].nodeValue.toString();
  //console.log(btnValue);
  if (isNaN(parseInt(btnValue)) && btnValue !== "=") { // if an operator is clicked besides equals
    const operator = btnValue;
    if (btnValue === "C") {
      clear();
    } else if (operator === "⌫") {
      backspace();
    } else if (operator === "÷" || operator === "×" || operator === "-" || operator === "+") {
      if (num1Stored === false) {
        num1 = parseInt(concat);
        concat = "";
        displayValue.innerHTML = concat;
        displaySubValue.innerHTML = num1 + " " + operator;
        num1Stored = true;
      } else if (num1Stored) {
        num2 = parseInt(concat);
        concat = "";
        const result = operate(num1, operator, num2);
        displayValue.innerHTML = result;
        num1 = result;
        displaySubValue.innerHTML = num1 + " " + operator;
      }
    } 
  } else if (btnValue === "=" && num1Stored) { // if equals is clicked
    num2 = parseInt(concat);
    concat = "";
    const result = operate(num1, operator, num2);
    displaySubValue.innerHTML = displaySubValue.concat(" " + operator)
    num1Stored = false;
  } else { //if a number is clicked
    concat = concat.concat(btnValue);
    console.log(concat);
    displayValue.innerHTML = concat;
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
