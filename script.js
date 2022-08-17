const displayValue = document.querySelector('.display');
const displaySubValue = document.querySelector('.sub-display');

let concat = "";
let num1 = 0;
let num2 = 0;
let num1Stored = false;
let operator = "";

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
    
  if (btnValue === "C") {
    clear();
  } else if (btnValue === "⌫") {
    backspace();
  } else if ((btnValue === "÷" || btnValue === "×" || btnValue === "-" || btnValue === "+") && concat != "") {
    operator = btnValue;
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
  } else if (btnValue === "=" && num1Stored && concat != "") { 
    num2 = parseInt(concat);
    concat = "";
    console.log(operator);
    const result = operate(num1, operator, num2);
    displaySubValue.innerHTML = displaySubValue.innerHTML.concat(" " + num2 + " " + btnValue);
    displayValue.innerHTML = result;
    num1Stored = false;
  } else if (isNaN(parseInt(btnValue)) !== true){ //if a number is clicked
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
