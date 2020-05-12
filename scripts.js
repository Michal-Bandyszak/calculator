const calculator = {
    displayValue: "0",
    firstNumber: null,
    secondNumber: null,
    waitingForSecondNumber: false,
    operator: null,
};

//W tej funkcji przyjmuję kolejną wartość z kalkulatora.
//Jeśli nie ma kliknięto jakiegoś operatora to na wyświetlaczu pojawi się cyfra kliknięta
//Jeśli kliknięto to sprawdzamy czy wartość na displayu jest - jak nie to wyświetlamy to co klikneliśmy, ew kolejną cyfrę
const inputDigit = (digit) => {
  const { displayValue, waitingForSecondNumber } = calculator;
  if (waitingForSecondNumber === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondNumber = false;
  } else {
      calculator.displayValue = displayValue === "0" ?  +digit : displayValue + digit;
      //calculator.secondNumber = calculator.displayValue;
  }
    
};

const updateDisplay = () => {
  const display = document.querySelector(".calculator__screen");
  display.value = calculator.displayValue;
};


calculateResult = (firstNum, secondNum) => {
  let result = '';
   if(calculator.operator === '+') {
       result = +firstNum + +secondNum;
       calculator.displayValue = result;
   } else if(calculator.operator === '-') {
       result = +firstNum - +secondNum;
       calculator.displayValue = result;
   }
}

updateDisplay();

let handleOperator = (nextOperator) => {
    const { firstNumber, secondNumber, displayValue, operator } = calculator
    const inputValue = displayValue;
    console.log(calculator)
    if (firstNumber === null) {
        calculator.firstNumber = inputValue;
    }

    calculator.waitingForSecondNumber = true;

    calculateResult(firstNumber, secondNumber, operator)
    calculator.operator = nextOperator;
    
    if(nextOperator === '=') {
        console.log(secondNumber)
        calculateResult(firstNumber, secondNumber)
      
    }
}

const keys = document.querySelector(".calculator__keys");

//Przy kliknięciu przycisku weryfikuje czy jest to liczba czy znak specjalny.
//Jeśli to znak specjalny to odpalam funkcję handleOperator, do której daje jako argument wartość przycisku.
//Robię update displaya
//Lecję do funkcji inputDigit i na koneic robię ponowny update
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value)
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
 
});
