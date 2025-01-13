import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const timerInput = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

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

      iziToast.success({
        title: 'Success',
        message: 'Valid date selected!',
      });
      button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);
// const todayDate = new Date();

button.addEventListener('click', () => {
  button.disabled = true;
  timerInput.disabled = true;
  if (userSelectedDate) {
    startTimer(userSelectedDate);
  }
});
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  // timerId = setInterval(() => {
  //   const diff = userSelectedDate - todayDate;
  // });
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}
function startTimer(userSelectedDate) {
  timerId = setInterval(() => {
    const todayDate = new Date();
    const diff = userSelectedDate - todayDate;

    if (diff <= 1000) {
      updateTimerDisplay({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      timerInput.disabled = false;
      button.disabled = true;
      clearInterval(timerId);
      return;
    }
    const timeLeft = convertMs(diff);
    updateTimerDisplay(timeLeft);
  }, 1000);
}

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
