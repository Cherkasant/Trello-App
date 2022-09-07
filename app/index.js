import { API } from './API.js';
import { Desks } from './Desks.js';
import { User } from './User.js';
import { getClock } from './utils/clock.js';

getClock();
setInterval(getClock, 1000);

new Desks(1).render();
