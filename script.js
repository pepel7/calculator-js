function add(num1, num2) {
    return num1 + num2;
};

function substract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

let num1 = 0;
let num2 = 0;
let operatorValue = null;
let displayValue = '0';
let resultValue = null;

let decimalSavingValue;

function findApproximatelyOrNot(resultValue) {
    return resultValue.toString().split('.').pop().length > 2;
};

function operate(num1, operatorValue, num2) {
    if(operatorValue == '÷' && num2 == 0) return resultValue = "You can't divide by zero~";
    if(num1 == 0 && operatorValue == null && num2 == 0) return resultValue = 0;
    if(operatorValue == null && num2 == 0 ) return resultValue = num1;
    switch (operatorValue) {
        case '+':
            resultValue = add(num1, num2);
            if(resultValue.toString().split('').includes('.')) {
                if(findApproximatelyOrNot(resultValue)) {
                    decimalSavingValue = Math.round(resultValue * 100) / 100;
                    resultValue = `≈${decimalSavingValue}`;
                };
            }
            break;
        case '-':
            resultValue = substract(num1, num2);
            if(resultValue.toString().split('').includes('.')) {
                if(findApproximatelyOrNot(resultValue)) {
                    decimalSavingValue = Math.round(resultValue * 100) / 100;
                    resultValue = `≈${decimalSavingValue}`;
                };
            }
            break;
        case '*':
            resultValue = multiply(num1, num2);
            if(resultValue.toString().split('').includes('.')) {
                if(findApproximatelyOrNot(resultValue)) {
                    decimalSavingValue = Math.round(resultValue * 100) / 100;
                    resultValue = `≈${decimalSavingValue}`;
                };
            }
            break;
        case '÷':
            resultValue = divide(num1, num2);
            if(resultValue.toString().split('').includes('.')) {
                if(findApproximatelyOrNot(resultValue)) {
                    decimalSavingValue = Math.round(resultValue * 100) / 100;
                    resultValue = `≈${decimalSavingValue}`;
                };
            }
            break;
    };
};

const outputField = document.querySelector('.display-text');
outputField.textContent = '0';

function populateDisplay(valueToPrint) {
    if(valueToPrint == '÷' || valueToPrint == '*' || valueToPrint == '-' || valueToPrint == '+') {
        if(!operatorValue) displayValue += valueToPrint;
        else {
            if(num2) {
                equalButton.dispatchEvent(clickEvent);
                displayValue += valueToPrint;
            }
            displayValue = displayValue.substring(0, displayValue.length - 1);
            displayValue += valueToPrint;
        }
    } else {
        if(displayValue == '0') displayValue = valueToPrint;
        else displayValue += valueToPrint;
    } 
    outputField.textContent = `${displayValue}`;
};

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');

let clickEvent = new Event('click');

for(let digit of digits) {
    digit.addEventListener('click', () => {
        if(!operatorValue) {
            num1 = !num1 ? digit.textContent : num1 + digit.textContent;
            populateDisplay(digit.textContent);
            
        } else {
            populateDisplay(digit.textContent)
            num2 = !num2 ? digit.textContent : num2 + digit.textContent;
        };

        if( operatorValue && !(num2.toString().split('').includes('.')) ) {
            dotBtn.disabled = false;
        };
    });
};

for(let operator of operators) {
    operator.addEventListener('click', () => {
        populateDisplay(operator.textContent);
        operatorValue = operator.textContent;
    });
};

function pressEqualButton() {
    operate(+num1, operatorValue, +num2);
    displayValue = '0';
    populateDisplay(resultValue);
    num1 = decimalSavingValue ? decimalSavingValue : 
           resultValue == "You can't divide by zero~" ? 0 : resultValue;
    operatorValue = null;
    num2 = 0;
    if(!num1.toString().split('').includes('.')) dotBtn.disabled = false;
    else dotBtn.disabled = true;
    resultValue = null;
}

equalButton.addEventListener('click', pressEqualButton);

const backspaceBtn = document.querySelector('.backspace');

function pressBackspaceButton() {
    if(!operatorValue) {
        num1 = num1.toString().substring(0, num1.length - 1);
    } else if (operatorValue && !num2) {
        operatorValue = operatorValue.substring(0, operatorValue.length - 1);
    } else {
        num2 = num2.toString().substring(0, num2.length - 1);
    };
    displayValue = displayValue.toString().substring(0, displayValue.length - 1);
    populateDisplay('');
}

backspaceBtn.addEventListener('click', pressBackspaceButton);

const clearElementBtn = document.querySelector('.clear-element');

clearElementBtn.addEventListener('click', () => {
    if(!operatorValue) {
        num1 = 0;
        displayValue = '';
    } else if (operatorValue && !num2) return;
    else {
        num2 = 0;
        displayValue = displayValue.split(operatorValue)[0] + operatorValue;
    }
    populateDisplay('');
});

const clearAllBtn = document.querySelector('.clear-all');

clearAllBtn.addEventListener('click', () => {
    displayValue = '';
    populateDisplay('');
    num1 = 0;
    operatorValue = null;
    num2 = 0;
    dotBtn.disabled = false;
    resultValue = null;
});

const dotBtn = document.querySelector('.dot');

dotBtn.addEventListener('click', () => {
    if (operatorValue) num2 += '.';
    else if (!operatorValue) {
        num1 += '.';
    } else return;
    populateDisplay('.');
    dotBtn.disabled = true;
});

//---------------------
//      Keyboard
//---------------------

document.body.addEventListener('keydown', (event) => {
    if(event.key == '0' && num1 == 0) return;
    if(event.key.match(/[^0-9]/g)) return;
    if(!operatorValue) {
        populateDisplay(event.key);
        num1 = !num1 ? event.key : num1 + event.key;
    } else {
        populateDisplay(event.key)
        num2 = !num2 ? event.key : num2 + event.key;
    };

    if( operatorValue && !(num2.toString().split('').includes('.')) ) {
        dotBtn.disabled = false;
    };
});

document.body.addEventListener('keydown', (event) => {
    if(event.key.match(/[+*/-]/g)) {
        if(event.key == '/') {
            populateDisplay('÷');
            operatorValue = '÷';
            return
        }
        populateDisplay(event.key);
        operatorValue = event.key;
    }
});

document.body.addEventListener('keydown', (event) => {
    if(event.key != 'Backspace') return;
    pressEqualButton();
});

document.body.addEventListener('keydown', (event) => {
    if(event.key != 'Backspace' || event.key != 'Delete') return;
    pressBackspaceButton();
});