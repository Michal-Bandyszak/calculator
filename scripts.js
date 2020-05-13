const calculator = {
  displayValue: "0",
  firstNumber: null,
  waitingForSecondNumber: false,
  operator: null,
};

const preformCalculation = {
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "=": (secondNumber) => secondNumber,
};

const inputDigit = (digit) => {
 const { displayValue, waitingForSecondNumber } = calculator
  if (waitingForSecondNumber === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondNumber = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
};

const updateDisplay = () => {
  const display = document.querySelector(".calculator__screen");
  display.value = calculator.displayValue;
};

let handleOperator = (nextOperator) => {
  const { firstNumber, displayValue, operator } = calculator;
  const inputValue = parseInt(displayValue);

  if (firstNumber === null) {
    calculator.firstNumber = inputValue;
  } else if (operator) {
    const result = preformCalculation[operator](firstNumber, inputValue);

    calculator.displayValue = String(result);
    calculator.firstNumber = result;
  }

  calculator.waitingForSecondNumber = true;
  calculator.operator = nextOperator;
  console.log(calculator);
};

const keys = document.querySelector(".calculator__keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  console.log(calculator)
  updateDisplay();
});


//Bugs list:
/*
1. Zaczynamy od znaku operatora / --> dzieją się dziwne rzeczy. first number ma przypisane 0,
nastepnie display value ma nowy numer po kliknięciu. Klikamy znak i nam się wszystko zeruje.
po kliknięicu = dalej jest 0/

2. zaczynamy od - ==> ok, pokazuje liczby ujemne co jest spoko. Ale przy podwójnym kliknięciu
minusa wynik sie zeruje WTF?

3. Przy pierwszym mnożeniu się wysypuje.

4.brak zabezpieczenia przy dzieleniu przez 0

5. C przypisuje wartość 0, ale do display value a nie bezpośrednio do firstNumber
co psuje kolejne działania.

6. Po wykonaniu kolejnych ciągów operacji kalkulator się gubi.

7. Przy pomyłce z wyborem znaku, kalkulator bierze pod uwage tylko pierwsze kliknięcie
oczekując drugiej liczby.
*/
