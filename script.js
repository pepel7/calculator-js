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
let displayValue = '';
let resultValue = null;

function operate(num1, operatorValue, num2) {
    switch (operatorValue) {
        case '+':
            resultValue = add(num1, num2)
            break;
        case '-':
            resultValue = substract(num1, num2)
            break;
        case '*':
            resultValue = multiply(num1, num2)
            break;
        case '÷':
            resultValue = divide(num1, num2)
            break;
    };
};

const outputField = document.querySelector('.display-text')

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
        if(!displayValue) displayValue = valueToPrint;
        else displayValue += valueToPrint;
    } 
    outputField.textContent = `${displayValue}`;
}

const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const equalButton = document.querySelector('.equal')

let clickEvent = new Event('click');

for(let digit of digits) {
    digit.addEventListener('click', () => {
        if(!operatorValue) {
            populateDisplay(digit.textContent);
            num1 = !num1 ? digit.textContent : num1 + digit.textContent;
        } else {
            populateDisplay(digit.textContent)
            num2 = !num2 ? digit.textContent : num2 + digit.textContent;
        };
    });
};

for(let operator of operators) {
    operator.addEventListener('click', () => {
        populateDisplay(operator.textContent);
        operatorValue = operator.textContent;
    });
};

equalButton.addEventListener('click', () => {
    operate(+num1, operatorValue, +num2);
    displayValue = '';
    populateDisplay(resultValue);
    num1 = resultValue;
    operatorValue = null;
    num2 = 0;
    resultValue = null;
})
        


// for(let operator of operators) {
//     operator.addEventListener('click', () => {
//        populateDisplay(operator.textContent);
//        for(let digit of digits) {
//         digit.addEventListener('click', () => populateDisplay(digit.textContent))
//         }
//     })
// }


// function populateDisplay(valueToPrint, valueToStore) {
//     if(!displayValue) displayValue = valueToPrint;
//     else displayValue += valueToPrint;
//     switch (valueToStore) {
//         case num1:
//             if(!num1) num1 = valueToPrint; 
//             else num1 += valueToPrint;
//             break;

//         case num2:
//             if(!num2) num2 = valueToPrint; 
//             else num2 += valueToPrint;
//             break;

//         case operatorValue:
//             if(!operatorValue) operatorValue = valueToPrint; 
//             else operatorValue += valueToPrint;
//             break;
//     }
//     outputField.textContent = `${displayValue}`;
// }