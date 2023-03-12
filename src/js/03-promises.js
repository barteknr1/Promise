import Notiflix from 'notiflix';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const create = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
} else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
  })};

create.addEventListener('click', e => {
  e.preventDefault();
  let position = 1;
  let timeout = setTimeout(() => {
    let interval = setInterval(() => {
          promiseDelay = Number(delay.value) + position * Number(step.value)
        createPromise(position, promiseDelay);
          position++;
          if (position > Number(amount.value)) {
            clearInterval(interval);
            clearTimeout(timeout);
        };
      }, step.value);
}, delay.value);
});