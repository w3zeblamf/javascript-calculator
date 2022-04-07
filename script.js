/* Remember to use 'strict' mode in all scripts now! 
You can use strict mode in all your programs. It helps you to write cleaner code, 
like preventing you from using undeclared variables. (https://www.w3schools.com/js/js_strict.asp) */
'use strict';

//** Global variables
const calculatorDisplay = document.querySelector('h1');
//This will return an array with all of the button
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');

//To do the calculation of the first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
}

//Variables for operator buttons (these variable will change)
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


//** Show number on the display
function sendNumberValue(number) {
  // Replace the current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number
    awaitingNextValue = false;
  } else {
    //If the current value is 0, replace it, if not add number(this will replace the current value on the display)
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    /* if the displayValue === '0', them , replace it with just a number (number)  (:) if the displayValue !=== '0', them , replace it with the 'displayValue + number'*/
  }
}

//** Function for decimal point functionality
function addDecimal() {
  // if operator is pressed, do not add decimal
  if (awaitingNextValue) return;
  //If no decimal point, add one.
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  }
}

//** Function for operator buttons functionality
function useOperator(operator) {
  //Local variable
  const currentValue = Number(calculatorDisplay.textContent);
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

  //Preventing multiple operators
  if (operatorValue && awaitingNextValue) {
    //Reset the operator value
    operatorValue = operator;
    return;
  }

  //Assign firstValue if no value present
  if (!firstValue) {
    firstValue = currentValue;

  } else {
    //Store the result of the calculation object
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  // Ready to get net value, store operator 
  awaitingNextValue = true;
  //Global variable
  operatorValue = operator;
}

//** Reset or clear  all value on the display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

//** Create Event Listeners 

//Event Listeners for all buttons (numbers / operators / decimal)
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
    //contains: To verify if any of the buttons has an specific class, this will pull any button with the 'operator / decimal' class
  }
});

//Event Listener for clear functionality
clearBtn.addEventListener('click', resetAll);