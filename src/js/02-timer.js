import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

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
        if (selectedDates[0].getTime() < date.getTime()) {
            start.setAttribute('disabled', '');
            Notiflix.Notify.failure("Please choose a date in the future");
        }
        else {
            start.removeAttribute('disabled');
            Notiflix.Notify.success('Date selected');
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
let addLeadingZero = value => value.toString().padStart(2, '0');

start.addEventListener('click', () => {
    start.setAttribute('disabled', '');
    datetimePicker.setAttribute('disabled', '');
    let timer = setInterval(() => {
        let timeLeft = new Date(datetimePicker.value) - new Date();
        let ms = convertMs(timeLeft);
        if (timeLeft >= 0) {
            days.textContent = addLeadingZero(ms.days);
            hours.textContent = addLeadingZero(ms.hours);
            minutes.textContent = addLeadingZero(ms.minutes);
            seconds.textContent = addLeadingZero(ms.seconds);
        }
        else {
            clearInterval(timer);
            start.removeAttribute('disabled');
            datetimePicker.removeAttribute('disabled');
            Notiflix.Notify.info("Time's up")
        }
    }, 1000);
});