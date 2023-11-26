create num1 variable and give it value 0
create operator variable and give it value null
create num2 variable and give it value 0
create displayValue variable

function 'add' with num1, num2:
    take 2 numbers
    sum it
func end

function 'subtract' with num1, num2:
    take 2 num
    substract it
func end

function 'multiply' with num1, num2:
    take 2 num
    multiply is
func end

function 'divide' with num1, num2:
    take 2 num
    divide it
func end

function 'operate' with num1, num2:  <!-- like choosing an operator function -->
    switch(operator):
        case "+": execute add(num1, num2)
        case "-": execute substract(num1, num2)
        case "*": execute multiply(num1, num2)
        case "/": execute divide(num1, num2)
func end

function 'populateDisplay(whatToPrint, whereToPrint)':
    store whatToPrint in displayValue
    print displayValue on div 'output' (i.e. whereToPrint)
func end

Коли event 'натиснули на цифру':
    <!-- додати цю цифру до (спочатку порожнього) output num1 div -->
    populateDisplay()
    num1 = displayValue num1 div <!-- АБО num1 = контент output -->
кінець event'у

Коли event 'натиснули на будь-яку кнопку оператора':
    operator variable = ця натиснута кнопка
    <!-- додати цю цифру до (спочатку порожнього) output operator div -->
    populateDisplay()
    Коли event 'натиснули на цифру':
        <!-- додати цю цифру до (спочатку порожнього) output num2 div -->
        populateDisplay()
    num2 = контент output num2 div
    кінець event'у
кінець event'у

Коли event 'натиснули на кнопку "=" (тобто отримати результат)':
    Якщо num1 = 0 OR num2 = 0 OR operator = null
    result = 0
    operate(num1, num2)
    <!-- додати результат у displayValue -->
    populateDisplay()
    num1 = результат обчислення попереднього calculation
кінець event'у

function 'clearAll':
    num1 = 0
    num2 = 0
    operator = null
func end