const screen = document.getElementById('screen');
let currentValue = '';
let mode = ''; // no mode at start

// Mode buttons
document.getElementById('inchToCm').addEventListener('click', () => {
  mode = 'inchToCm';
  screen.textContent = 'Inch → Cm';
  currentValue = '';
});

document.getElementById('cmToInch').addEventListener('click', () => {
  mode = 'cmToInch';
  screen.textContent = 'Cm → Inch';
  currentValue = '';
});

// Clear button
document.getElementById('clear').addEventListener('click', () => {
  currentValue = '';
  screen.textContent = mode === 'inchToCm' ? 'Inch → Cm' : mode === 'cmToInch' ? 'Cm → Inch' : 'Select mode';
});

// Backspace with long-press
const backspace = document.getElementById('backspace');
let backspaceHold;

backspace.addEventListener('mousedown', () => {
  backspaceHold = setInterval(() => {
    currentValue = currentValue.slice(0, -1);
    screen.textContent = currentValue || (mode ? (mode === 'inchToCm' ? 'Inch → Cm' : 'Cm → Inch') : 'Select mode');
  }, 100);
});

backspace.addEventListener('mouseup', () => clearInterval(backspaceHold));
backspace.addEventListener('mouseleave', () => clearInterval(backspaceHold));

backspace.addEventListener('click', () => {
  currentValue = currentValue.slice(0, -1);
  screen.textContent = currentValue || (mode ? (mode === 'inchToCm' ? 'Inch → Cm' : 'Cm → Inch') : 'Select mode');
});

// Number and equals buttons
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      const num = parseFloat(currentValue);
      if (!isNaN(num) && mode) {
        let result = 0;
        if (mode === 'inchToCm') result = num * 2.54;
        else if (mode === 'cmToInch') result = num / 2.54;
        screen.textContent = result.toFixed(2);
        currentValue = '';
      } else {
        screen.textContent = 'Select mode';
      }
    } else {
      currentValue += value;
      screen.textContent = currentValue;
    }
  });
});
