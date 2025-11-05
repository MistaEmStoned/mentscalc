const screen = document.getElementById('screen');
let currentValue = '';
let mode = '';

function updateScreen() {
  if (!mode) {
    screen.textContent = 'Select mode';
  } else if (currentValue === '') {
    screen.textContent = mode === 'inchToCm' ? 'Inch → Cm' : 'Cm → Inch';
  } else {
    screen.textContent = currentValue;
  }
}

document.getElementById('inchToCm').addEventListener('click', () => {
  mode = 'inchToCm';
  currentValue = '';
  updateScreen();
});

document.getElementById('cmToInch').addEventListener('click', () => {
  mode = 'cmToInch';
  currentValue = '';
  updateScreen();
});

document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      if (!mode || currentValue === '') return;
      const num = parseFloat(currentValue);
      if (!isNaN(num)) {
        let result = 0;
        if (mode === 'inchToCm') result = num * 2.54;
        else result = num / 2.54;
        screen.textContent = result.toFixed(2);
        currentValue = '';
      }
    } else {
      currentValue += value;
      updateScreen();
    }
  });
});

document.getElementById('clear').addEventListener('click', () => {
  currentValue = '';
  updateScreen();
});

// Backspace with long press
const backspaceBtn = document.getElementById('backspace');
let backspaceInterval;

function backspaceAction() {
  currentValue = currentValue.slice(0, -1);
  updateScreen();
}

backspaceBtn.addEventListener('mousedown', () => {
  backspaceAction();
  backspaceInterval = setInterval(backspaceAction, 100);
});
backspaceBtn.addEventListener('mouseup', () => clearInterval(backspaceInterval));
backspaceBtn.addEventListener('mouseleave', () => clearInterval(backspaceInterval));
backspaceBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  backspaceAction();
  backspaceInterval = setInterval(backspaceAction, 100);
});
backspaceBtn.addEventListener('touchend', () => clearInterval(backspaceInterval));

updateScreen();
