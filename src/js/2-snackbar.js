// Напиши скрипт, який після сабміту форми створює проміс.
//  В середині колбека цього промісу через вказану користувачем кількість мілісекунд
//  проміс має виконуватися(при fulfilled) або відхилятися(при rejected),
//     залежно від обраної опції в радіокнопках.Значенням промісу,
//     яке передається як аргумент у методи resolve / reject,
//         має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок,
//     де delay — це значення затримки виклику промісу в мілісекундах.

// `✅ Fulfilled promise in ${delay}ms`

// Якщо проміс буде відхилено, то виводь у консоль наступний рядок,
// де delay — це значення затримки промісу в мілісекундах.

// `❌ Rejected promise in ${delay}ms`

import iziToast from 'izitoast';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.delay-input');
const button = document.querySelector('.form-btn');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const selectedBtn = document.querySelector('input[name="state"]:checked');
  const delayedPromise = delay => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedBtn.value === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  };
  delayedPromise(delay)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
      form.reset();
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
      form.reset();
    });
});
