const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
const errorMessage = document.getElementById('error-message');
let memoryValue = null;

// تحديث الوقت والتاريخ
function updateDateTime() {
    const dt = new Date();
    document.getElementById('datetime').textContent =
        dt.toLocaleDateString('ar-EG') + ' | ' + dt.toLocaleTimeString('ar-EG');
}
setInterval(updateDateTime, 1000);
updateDateTime();

function appendNumber(num) {
    errorMessage.textContent = "";
    display.value += num;
}

function appendOperator(op) {
    errorMessage.textContent = "";
    if (display.value === '') return;
    const lastChar = display.value.slice(-1);
    if ('+-*/^'.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}

function appendDot() {
    errorMessage.textContent = "";
    let parts = display.value.split(/[\+\-\*\/\^]/);
    let last = parts[parts.length - 1];
    if (!last.includes('.')) display.value += '.';
}

function clearDisplay() {
    display.value = '';
    errorMessage.textContent = "";
}

function calculate() {
    errorMessage.textContent = "";
    let expr = display.value.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
    try {
        expr = expr.replace(/(\d+)\^(\d+)/g, (_, a, b) => `Math.pow(${a},${b})`);
        expr = expr.replace(/√(\d+)/g, (_, a) => `Math.sqrt(${a})`);
        let result = eval(expr);
        if (isNaN(result)) throw new Error("نتيجة غير صالحة");
        addToHistory(display.value + ' = ' + result);
        display.value = result;
    } catch (e) {
        errorMessage.textContent = "خطأ في العملية: " + e.message;
    }
}

function percent() {
    if (display.value !== '') {
        try {
            display.value = (parseFloat(display.value) / 100).toString();
        } catch {
            errorMessage.textContent = "خطأ في النسبة المئوية";
        }
    }
}

function sqrt() {
    if (display.value !== '') {
        try {
            display.value = Math.sqrt(Number(display.value)).toString();
        } catch {
            errorMessage.textContent = "خطأ في الجذر";
        }
    }
}

function power() {
    if (display.value !== '') {
        display.value += '^';
    }
}

function memorySave() {
    memoryValue = display.value;
    errorMessage.textContent = "تم الحفظ في الذاكرة";
}

function memoryRecall() {
    if (memoryValue !== null) {
        display.value += memoryValue;
    } else {
        errorMessage.textContent = "لا يوجد قيمة محفوظة!";
    }
}

function copyResult() {
    navigator.clipboard.writeText(display.value);
    errorMessage.textContent = "تم نسخ النتيجة!";
}

function addToHistory(operation) {
    const li = document.createElement('li');
    li.textContent = operation;
    historyList.prepend(li);
    if (historyList.children.length > 10)
        historyList.removeChild(historyList.lastChild);
}

function showHelp() {
    window.open('help.html', '_blank');
}