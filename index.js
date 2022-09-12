import { Desks } from './app/Desks.js';
import { avatar } from './app/elements.js';
import { Modal } from './app/Modal.js';

import { getClock } from './app/utils/clock.js';

getClock();
setInterval(getClock, 1000);

const desks = new Desks(1);
avatar.addEvent('click', () => {
  Modal.userSelect(desks);
});
Modal.userSelect(desks);
