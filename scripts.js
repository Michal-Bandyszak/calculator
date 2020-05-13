// 1. Pobrać wszystkie przyciski
// 2. Wybrać sposób na zapisywanie danych z kalkulatora
// 3. Stworzyć klasę Calculator, gdzie zamieszczone będą wszystkie potrzebne funkcje:
//          -  funkcja pozwalająca wybrać liczby
//          -  funkcja pozwalająca wybrać operator
//          -  funkcja obliczająca
//          -  funkcja na wyświetlenie wybranych liczb i wyniku
//          -  funkcja kasujca
//

class Calculator {
	constructor(previousOperandElement, currentOperandElement) {
		this.previousOperandElement = previousOperandElement;
		this.currentOperandElement = currentOperandElement;
		this.clear();
	}

	clear() {   /// Funkcja kasująca
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = null;
	}

	appendNumber(number) {   // dodawanie liczb do wyświetlenia
		this.currentOperand = this.currentOperand.toString() + number.toString(); // wpisywanie liczb i zmiana ich na String (aby nie dodawały się do siebie)
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return; // jeśli obecna wartość jest pusta, funcja się nie wykona
		if (this.previousOperand !== "") {
			// program wykonuje funkcję obliczniową
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand; // obecna wartość, jest zapisana jako poprzenia
		this.currentOperand = ""; // obecna nowa wartośc jest znowu pusta
	}
 
	compute() {
		let computation;
		// przypisanie wprowadzonych wartości do zmiennych - zamiana ich na floaty
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(current)) return; // jeśli nie zostanie podana jedna z wartości, program nie zadziała

		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "/":
				computation = prev / current;
				break;
			case "*":
				computation = prev * current;
				break;

			default:
				return;
        }
        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = ""
	}

	displayUpdate() {
		this.currentOperandElement.innerText = this.currentOperand;
	}
}

// Pobranie elementów z pliku html
const numberButtons = document.querySelectorAll(".data-number");
const operationButtons = document.querySelectorAll(".data-operation");
const equalsButton = document.querySelector(".data-equals");
const clearButton = document.querySelector(".data-clear");
const currentOperandElement = document.querySelector(".current-operand");
const previousOperandElement = document.querySelector(".previous-operand");



const calculator = new Calculator(
	previousOperandElement,
	currentOperandElement
);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.displayUpdate();
	});
});
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.displayUpdate();

	});
});
clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.displayUpdate();
});

equalsButton.addEventListener("click", () => {
	calculator.compute();
	calculator.displayUpdate();
});
