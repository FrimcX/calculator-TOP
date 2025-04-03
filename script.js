//Variables

let number1 = null;
let number2 = null;
let operator = null;
let result = null;
const buttonsContainer = document.querySelector('.buttonsContainer');
const writtenNumbers = document.querySelector('.writtenNumbers');

function add(a,b) {
    a = Number(a);
    b = Number(b); 
    return Number(a) + Number(b);
}

function subtract(a,b) {
    a = Number(a);
    b = Number(b);
    return Number(a) - Number(b);
}

function multiply(a,b) {
    a = Number(a);
    b = Number(b); 
    return Number(a) * Number(b);
}

function divide(a,b) {
    a = Number(a);
    b = Number(b);
    if ((b===0) || (a===0)) {
        return 'a';
    }
    return Number(a) / Number(b);
}

function operate(num1, opera, num2) {
    switch(opera) {
        case ('+'): return add(num1,num2);
        case ('-'): return subtract(num1,num2);
        case ('x'): return multiply(num1,num2);
        case ('/'): return divide(num1,num2);
    }
}

buttonsContainer.addEventListener('click', (element) => {

    if(element.target.classList.contains('number')) {
        if (number1 === null) {
            number1 = element.target.id;
            writtenNumbers.innerText = number1;
        } else if (operator === null) {
            if ((result !== null) && (number2 === null)) {
                result = null;
                number1 = element.target.id;
                writtenNumbers.innerText = element.target.id;
            } 
            else if (number2 === null){
                number1 = number1 + element.target.id;
                writtenNumbers.innerText = number1;
            }
        } else if (operator !== null) {
            number2 = (number2 === null)? element.target.id : number2 + element.target.id;
            writtenNumbers.innerText = `${number1} ${operator} ${number2}`;
        } 
    } 
    else if (element.target.classList.contains('operator')) {
        if (operator === null) {
            operator = element.target.id;
            if (number1 === null) {
                number1 = 0;
                writtenNumbers.innerText = `${number1} ${operator}`;
            }else if ((number1 !== null) && (number2 === null)) {
                writtenNumbers.innerText = `${writtenNumbers.innerText} ${operator}`;
            }
        } else if (operator !== null) { 
            if ((number1 !== null) && (number2 !== null)) {
                result = operate(number1,operator,number2); 
                if (result === 'a') {
                    writtenNumbers.innerText = `You can't divide by 0! Try again with another number...`;
                    result = null; number1 = null; number2 = null;
                } else {
                    writtenNumbers.innerText = `${result} ${element.target.id}`;
                    operator = element.target.id;
                    number1 = result;
                    number2 = null;
                }
            } else if ((number1 !== null) && (number2 === null)) {
                operator = element.target.id;
                writtenNumbers.innerText = `${number1} ${operator}`;
            }
        }
    } 
    else if (element.target.classList.contains('equals')) {
        if ((number1 !== null) && (operator !== null) && (number2 !== null)) {
            result = operate(number1,operator,number2);
            if (result === 'a') {
                writtenNumbers.innerText = `You can't divide by 0! Try again with another number...`;
                result = null;
            } else {
                writtenNumbers.innerText = result;
            }
            number1 = result; number2 = null; operator = null; 
        }
    } 
    else if (element.target.classList.contains('clear')) {
        number1 = null;
        number2 = null;
        operator = null;
        writtenNumbers.innerText = '';
    }
});