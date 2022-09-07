import { API } from './app/API.js';
import { Desks } from './app/Desks.js';
import { User } from './app/User.js';
import { getClock } from './app/utils/clock.js';

getClock();
setInterval(getClock, 1000);

new Desks(1).render();
