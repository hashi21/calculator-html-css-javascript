let runningTotal = 0;
let buffer = "0";
let previousOperator = null; // Initialize to null instead of undefined

const display = document.querySelector('.display');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    display.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case '.':
            if (buffer.includes('.')) {
                return; // If buffer already contains '.', do nothing
            }
            buffer += '.';
            break;
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null; // Reset previousOperator to null
            break;
        case '=':
            if(previousOperator === null){ // Check if previousOperator is null
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString(); // Convert runningTotal to string
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.slice(0, -1); // Use slice method instead of toString and slice
            }
            break;
        case '-':
        case '×':
        case '÷':
        case '+':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    const floatBuffer = parseFloat(buffer);

    if(runningTotal === 0){
        runningTotal = floatBuffer;
    }else{
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(floatBuffer){
    switch(previousOperator){ // Use switch statement instead of if-else
        case '+':
            runningTotal += floatBuffer;
            break;
        case '-':
            runningTotal -= floatBuffer;
            break;
        case '×':
            runningTotal *= floatBuffer;
            break;
        case '÷':
            runningTotal /= floatBuffer;
            break;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.btn-wrapper').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
