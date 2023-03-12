import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
start.setAttribute('disabled', '');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date();
        console.log(convertMs(selectedDates[0].getTime() - date.getTime()));
        if (selectedDates[0].getTime() < date.getTime()) {
            window.alert("Please choose a date in the future")
            start.setAttribute('disabled', '')
        }
        else {
            start.removeAttribute('disabled');
        }
  },
};
flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
start.addEventListener('click', () => {
    start.setAttribute('disabled', '');
    datetimePicker.setAttribute('disabled', '');
    let timeLeft = new Date(datetimePicker.value) - new Date();
    let timer = setInterval(() => {
        console.log(timeLeft);
        // days.textContent =
        // hours.textContent =
        // minutes.textContent =
        // seconds.textContent =   
    }, 1000);
    if (timeLeft >= 0) {
    }
    else {
        clearInterval(timer);
        start.removeAttribute('disabled');
        datetimePicker.removeAttribute('disabled');
    }
})
// const asd = convertMs(selectedDates[0].getTime() - date.getTime());
