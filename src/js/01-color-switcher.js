function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startSwitcher = document.querySelector("button[data-start]");
const stopSwitcher = document.querySelector("button[data-stop]");
const body = document.body;
const colorValue = document.querySelector('.color');
let interval = null;
stopSwitcher.setAttribute('disabled', '')

const colorSwitcher = () => {
        interval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    stopSwitcher.removeAttribute('disabled');
    startSwitcher.setAttribute('disabled', '');

}

startSwitcher.addEventListener('click', colorSwitcher);

stopSwitcher.addEventListener('click', () => {
  clearInterval(interval);
  startSwitcher.removeAttribute('disabled');
  stopSwitcher.setAttribute('disabled', '');
});
