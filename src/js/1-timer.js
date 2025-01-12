import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const timerInput = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

button.disabled = true;

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      button.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      button.disabled = false;
    }
  },
};
iziToast.success({
  title: 'Success',
  message: 'Valid date selected!',
});
flatpickr('#datetime-picker', options);
const todayDate = new Date();
const timeDifference = userSelectedDate - Date.now();
button.addEventListener('click', () => {
  button.disabled = true;
  timerInput.disabled = true;

  start();
  timerId = setInterval(() => {
    function updateTimerDisplay({ days, hours, minutes, seconds }) {
      days.textContent = addLeadingZero(days);
      hours.textContent = addLeadingZero(hours);
      minutes.textContent = addLeadingZero(minutes);
      seconds.textContent = addLeadingZero(seconds);
    }
    1000;
    const timeLeft = convertMs(timeDifference);
    updateTimerDisplay(timeLeft);
  });

  stop();
  if (timeDifference < 1000) {
    clearInterval(timerId);
    updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    datetimePicker.disabled = false;
    button.disabled = true;
    return;
  }
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
