//----------------------------------------- VARIABLE DEFINITION -----------------------------------------

let number1 = null;
let number2 = null;
let operator = null;
let result = null;
let num1Point = false;
let num2Point = false;
const buttonsContainer = document.querySelector('.buttonsContainer');
const writtenNumbers = document.querySelector('.writtenNumbers');
const history = document.querySelector('.historySide');

//--------------------------------------- BASIC MATH FUNCTIONS --------------------------------------------
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
    if ((b===0) || (a===0)) { //error handling
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

function createHistoryP(operation, resultText) {
    const p = document.createElement('p');
    p.setAttribute('class', 'resultHistory');
    p.innerText = `${operation} = ${resultText}`;
    history.appendChild(p);
}

const eventHandler = function (e) {
    let eventObj = {};
    const numbersReg = /[0-9]/g;
    const operatorsReg = /X|x|\*|\+|\/|-/g;
    
    if (e.key) { //------------------------------if event is a keyboard event-----------------------
        eventObj.type = 'keyboard';
        if (numbersReg.test(e.key)) {
            eventObj.class = 'number';
            eventObj.value = e.key;
        } 
        else if (operatorsReg.test(e.key)) {
            eventObj.class = 'operator';
            if ((e.key === 'X') || (e.key === '*')) {
                eventObj.value = 'x';
            } else {
                eventObj.value = e.key;
            }
        }
        else if ((e.key === ',') || (e.key === '.')){
            eventObj.class = 'point';
            eventObj.value = '.';
        }
        else if ((e.key === '=') || (e.key === 'Enter')) {
            eventObj.class = 'equals';
            eventObj.value = '='; 
        }
        else if (e.key === 'Backspace') {
            eventObj.class = 'backspace';
            eventObj.value = 'backspace'; 
        }
        else if ((e.key === 'c') || (e.key === 'C')) {
            eventObj.class = 'clear';
            eventObj.value = 'c';
        }
    } else { //------------------------------------if event is a click event----------------------------
        eventObj.type = 'click';
        eventObj.class = e.target.classList[0];
        eventObj.value = e.target.id;
    }


    if(eventObj.class ==='number') { //-----------------NUMBERS------------------------------------------
        if (number1 === null) {
            number1 = eventObj.value;
            writtenNumbers.innerText = number1;
        } else if (operator === null) {
            if ((result !== null) && (number2 === null)) { //number pressed after obtaining a result
                result = null;
                number1 = eventObj.value;
                writtenNumbers.innerText = eventObj.value;
            } 
            else if (number2 === null){
                number1 = number1 + eventObj.value;
                writtenNumbers.innerText = number1;
            }
        } else if (operator !== null) {
            number2 = (number2 === null)? eventObj.value : number2 + eventObj.value;
            writtenNumbers.innerText = `${number1} ${operator} ${number2}`;
        } 
    } 
    else if (eventObj.class ==='operator') { //---------------OPERATORS----------------------------------
        if (operator === null) {
            operator = eventObj.value;
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
                    result = null; number1 = null; operator = null; number2 = null;
                } else { //operate result --------------------------
                    createHistoryP(writtenNumbers.innerText, result);

                    writtenNumbers.innerText = `${result} ${eventObj.value}`;
                    operator = eventObj.value;
                    number1 = result;
                    number2 = null;
                }
            } else if ((number1 !== null) && (number2 === null)) {
                operator = eventObj.value;
                writtenNumbers.innerText = `${number1} ${operator}`;
            }
        }
    } 
    else if (eventObj.class === 'point') { //----------------- DECIMAL POINT -------------------------------
        if ((operator === null) && (number1 === null)) {
            num1Point = true;
            number1 = '0.';
            writtenNumbers.innerText = number1;
        }
        else if ((operator === null) && !num1Point) {
            num1Point = true;
            number1 = number1 + eventObj.value;
            writtenNumbers.innerText = number1;
        }
        else if ((operator !== null) && !num2Point) {
            num2Point = true;
            number2 = number2 + eventObj.value;
            writtenNumbers.innerText = `${number1} ${operator} ${number2}`;
        }
    }
    else if (eventObj.class === 'equals') { // ----------------------- EQUAL -------------------------------
        if ((number1 !== null) && (operator !== null) && (number2 !== null)) {
            result = operate(number1,operator,number2);
            if (result === 'a') {
                writtenNumbers.innerText = `You can't divide by 0! Try again with another number...`;
                result = null;
            } else {
                createHistoryP(writtenNumbers.innerText, result);
                writtenNumbers.innerText = result;
            }
            number1 = result; result = null;number2 = null; operator = null; num1Point = false; num2Point = false;
        }
    } 
    else if (eventObj.class === 'backspace') { //----------------------BACKSPACE --------------------------
        if ((number1 !== null) && (operator === null) && (number2 === null)) {
            number1 = String(number1).split('').toSpliced(-1,1).join('');
            writtenNumbers.innerText = number1;
        } else if ((number1 !== null) && (operator !== null) && (number2 === null)) {
            operator = null;
            writtenNumbers.innerText = number1;
        } else if ((number1 !== null) && (operator !== null) && (number2 !== null)) {
            if (number2.length === 1) {
                number2 = null;
                writtenNumbers.innerText = `${number1} ${operator}`;
            } else {
                number2 = String(number2).split('').toSpliced(-1,1).join('');
                writtenNumbers.innerText = `${number1} ${operator} ${number2}`;
            }
        } else {
            writtenNumbers.innerText = '';
        }
    }
    else if (eventObj.class === 'clear') { //---------------------------- CLEAR -----------------------------
        number1 = null;
        number2 = null;
        operator = null;
        num1Point = false;
        num2Point = false;
        result = null;
        writtenNumbers.innerText = '';
        while (history.firstChild) {
            history.removeChild(history.firstChild);
        }
    }
}

buttonsContainer.addEventListener('click', eventHandler);
document.addEventListener('keydown', eventHandler);