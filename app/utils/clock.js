import { clock } from '../elements.js';

export function getClock() {
  clock.clear();

  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  clock.insertHTML('afterbegin', `${hours}:${minutes}:${seconds}`);
}
