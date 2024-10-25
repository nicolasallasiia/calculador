// Obtener los elementos
const buttons = document.querySelectorAll('.calc-button');
const screen = document.querySelector('.screen');

// Variables para almacenar el valor actual y la operación
let currentInput = '';
let previousInput = '';
let operation = null;
let resetScreen = false;

// Función para actualizar la pantalla
function updateScreen(value) {
    if (resetScreen) {
        screen.textContent = value;
        resetScreen = false;
        currentInput = value;
    } else {
        if (screen.textContent === '0' && value !== '.') {
            screen.textContent = value;
        } else {
            screen.textContent += value;
        }
        currentInput = screen.textContent;
    }
}

// Función para manejar la operación
function handleOperation(operator) {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        } else {
            previousInput = currentInput;
        }
        currentInput = '';
        resetScreen = true;
    }
    operation = operator;
}

// Función para calcular el resultado
function calculate() {
    if (!previousInput || !currentInput || !operation) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current !== 0) {
                result = prev / current;
            } else {
                updateScreen('Error');
                return;
            }
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    operation = null;
    updateScreen(currentInput);
}

// Función para reiniciar la calculadora
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operation = null;
    resetScreen = false;
    updateScreen('0');
}

// Función para borrar el último dígito
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        updateScreen('0');
    } else {
        updateScreen(currentInput);
    }
}

// Agregar eventos a los botones
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if ((value >= '0' && value <= '9') || value === '.') {
            if (resetScreen) {
                currentInput = value;
                resetScreen = false;
            } else {
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
            }
            updateScreen(currentInput);
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === '←') {
            deleteLast();
        } else if (value === '=') {
            calculate();
        } else {
            const operator = value === '÷' ? '/' : value === '×' ? '*' : value;
            handleOperation(operator);
        }
    });
});
