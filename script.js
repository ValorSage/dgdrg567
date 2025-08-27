const display = document.getElementById('display');

function appendNumber(num) {
    display.value += num;
}

function appendOperator(op) {
    if (display.value === '') return;
    const lastChar = display.value.slice(-1);
    if ('+-*/'.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}

function appendDot() {
    let parts = display.value.split(/[\+\-\*\/]/);
    let last = parts[parts.length - 1];
    if (!last.includes('.')) display.value += '.';
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        display.value = eval(display.value).toString();
    } catch {
        display.value = 'خطأ';
    }
}

function percent() {
    if (display.value !== '') {
        display.value = (parseFloat(display.value) / 100).toString();
    }
}