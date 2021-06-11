let firstNum = null;
let secondNum = null;
let operator = null;
let result = null;

const decimal = document.querySelector('#decimal');
const oper = document.querySelector('.ops');

const total = document.querySelector('.total');
total.innerText = 0;

const clear = document.querySelector('.clear');
clear.addEventListener('click', resetValues);

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click', assignValue));

const del = document.querySelector('#del');
del.addEventListener('click', deleteChar);

function add (num1, num2) {
	return num1 + num2;
}
function subtract (num1, num2) {
	return num1 - num2;
}
function divide (num1, num2) {
    if (num2 == 0) {
        return total.innerText = 'Error!';
    }
    return num1 / num2;
}
function multiply (num1, num2) {
    return num1 * num2;
}

function assignValue(e) {
    if (e.target.className == 'clear' || e.target.className == 'delete') return;

    if (firstNum && secondNum && operator && e.target.className == 'operator') {
        calculate();
    }

    if(!firstNum && e.target.className == 'num') {
        firstNum = e.target.innerText;
    } else if (firstNum != null && operator == null && e.target.className == 'num') {
        firstNum += e.target.innerText;
    } else if (e.target.className == 'operator'){
        operator = e.target.innerText;
    } else if (firstNum != null && secondNum == null && e.target.className == 'num'){
        secondNum = e.target.innerText;
    } else if (secondNum != null && e.target.className == 'num') {
        secondNum += e.target.innerText;
    }

    updateDisplay();
};

function updateDisplay() {
    if (operator == '=' || operator == null) {
        oper.innerText = '';
    } else if (operator != '=') {
        oper.innerText = operator;
    }

    if(!secondNum) {
        total.innerText = firstNum;
    } else {
        total.innerText = secondNum;
    }

    // check if display already contains '.', if so disable decimal button
    isDecimalClicked()
};

function calculate() {
    let num1 = +firstNum;
    let num2 = +secondNum;

    if(operator == '+'){
        result = add(num1,num2);
    } else if(operator == '-'){
        result = subtract(num1, num2);
    } else if(operator == '*'){
        result = multiply(num1, num2);
    } else if (operator == '/'){
        result = divide(num1, num2);
    }

    // check if result is a decimal number, if so count how many decimal places
    checkNumber(result);
    // if result is true, assign it to firstNum and clear value from secondNum
    updateValues();
}

function checkNumber(num) {
    if (!Number.isInteger(num)) {
        countDecimals(num);
    }
    return;
}

function countDecimals(value) {
    // count how many decimal places, round value if more than 3 
    if(value.toString().split(".")[1].length > 3) {
        result = value.toFixed(3);
    };
    return result;
}

function updateValues() {
    firstNum = result;
    secondNum = null;
    total.innerText = '';
}

function resetValues() {
    firstNum = null;
    secondNum = null;
    result = null;
    operator = null;

    total.innerText = 0;
    oper.innerText = ''
}

function deleteChar() {

    if(result) {
        resetValues();
    }
    
    if(!secondNum && operator) {
        operator = null;
    } else if(!secondNum && total.innerHTML.length > 1) {
        firstNum = total.innerHTML.slice(0, -1);
    }else if (!secondNum && total.innerHTML.length == 1) {
        firstNum = 0;
    }else {
        secondNum = total.innerHTML.slice(0, -1);
    }
    updateDisplay();
}

function isDecimalClicked() {
    if(total.innerText.includes('.')) {
        decimal.removeEventListener('click',assignValue);
    } else {
        decimal.addEventListener('click', assignValue);
    }
}