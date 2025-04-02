//Variables

let number1;
let number2;
let operator;

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(num1, opera, num2) {
    switch(opera) {
        case ('+'): return add(num1,num2);
        case ('-'): return subtract(num1,num2);
        case ('x'): return multiply(num1,num2);
        case ('/'): return divide(num1,num2);
    }
}