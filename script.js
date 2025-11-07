const display = document.getElementById('display');
const preview = document.getElementById('preview');
const buttons = document.querySelectorAll('.btn');
const themeToggle = document.getElementById('theme-toggle');
let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    handleInput(button.getAttribute('data-value'));
  });
});

document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(e.key)) {
    currentInput += e.key;
    updateDisplay();
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (e.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});

function handleInput(value) {
  if (value === 'C') clearDisplay();
  else if (value === 'DEL') currentInput = currentInput.slice(0, -1);
  else if (value === '=') calculate();
  else currentInput += value;
  updateDisplay();
}

function updateDisplay() {
  display.value = currentInput;
  try {
    if (currentInput && /[0-9]/.test(currentInput)) {
      const result = eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*'));
      preview.textContent = `= ${result}`;
    } else {
      preview.textContent = '';
    }
  } catch {
    preview.textContent = '';
  }
}

function clearDisplay() {
  currentInput = '';
  display.value = '';
  preview.textContent = '';
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    display.value = currentInput;
    preview.textContent = '';
  } catch {
    display.value = 'Error';
  }
}

// 🌙 Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
});
