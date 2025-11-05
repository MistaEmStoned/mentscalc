const screen = document.getElementById('screen');
  let currentValue = '';
  let mode = 'inchToCm'; // default
  let backspaceHold; // holds the interval for long press

  // Conversion buttons
  document.getElementById('inchToCm').addEventListener('click', () => {
    mode = 'inchToCm';
    screen.textContent = '';
    currentValue = '';
  });

  document.getElementById('cmToInch').addEventListener('click', () => {
    mode = 'cmToInch';
    screen.textContent = '';
    currentValue = '';
  });

  // Calculator buttons
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent;

      if (value === '=') {
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
        screen.textContent = currentValue;
      }
    });
  });

  // Clear button
  document.getElementById('clear').addEventListener('click', () => {
    currentValue = '';
    screen.textContent = '';
  });

  // Backspace button with long press
  const backspaceBtn = document.getElementById('backspace');

  const deleteOnce = () => {
    currentValue = currentValue.slice(0, -1);
    screen.textContent = currentValue;
  };

  backspaceBtn.addEventListener('mousedown', () => {
    deleteOnce(); // delete one immediately
    backspaceHold = setInterval(deleteOnce, 100); // repeat every 100ms
  });

  backspaceBtn.addEventListener('mouseup', () => clearInterval(backspaceHold));
  backspaceBtn.addEventListener('mouseleave', () => clearInterval(backspaceHold));
  backspaceBtn.addEventListener('touchstart', e => {
    e.preventDefault();
    deleteOnce();
    backspaceHold = setInterval(deleteOnce, 100);
  });
  backspaceBtn.addEventListener('touchend', () => clearInterval(backspaceHold));
