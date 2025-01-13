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
const todayDate = new Date();
const timeDifference = userSelectedDate - Date.now();

button.addEventListener('click', () => {
  button.disabled = true;
  timerInput.disabled = true;
  if (userSelectedDate) {
    startTimer(userSelectedDate);
  }
});
function startTimer(userSelectedDate) {
  const diff = setInterval(() => {
    if (diff < 1000) {
      clearInterval(timerId);
      updateTimerDisplay({
        daysSpan: 0,
        hoursSpan: 0,
        minutesSpan: 0,
        secondsSpan: 0,
      });
      timerInput.disabled = false;
      button.disabled = true;
      return;
    } else {
      updateTimerDisplay({ daysSpan, hoursSpan, minutesSpan, secondsSpan });
    }
    const timeLeft = convertMs(diff);
    updateTimerDisplay(timeLeft);
  }, 1000);
}
function updateTimerDisplay({ daysSpan, hoursSpan, minutesSpan, secondsSpan }) {
  daysSpan.textContent = addLeadingZero(daysSpan);
  hoursSpan.textContent = addLeadingZero(hoursSpan);
  minutesSpan.textContent = addLeadingZero(minutesSpan);
  secondsSpan.textContent = addLeadingZero(secondsSpan);
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
  const daysSpan = Math.floor(ms / day);
  // Remaining hours
  const hoursSpan = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutesSpan = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const secondsSpan = Math.floor((((ms % day) % hour) % minute) / second);

  return { daysSpan, hoursSpan, minutesSpan, secondsSpan };
}

console.log(convertMs(2000)); // {daysSpan: 0, hoursSpan: 0, minutesSpan: 0, secondsSpan: 2}
console.log(convertMs(140000)); // {daysSpan: 0, hoursSpan: 0, minutesSpan: 2, secondsSpan: 20}
console.log(convertMs(24140000)); // {daysSpan: 0, hoursSpan: 6 minutesSpan: 42, secondsSpan: 20}
