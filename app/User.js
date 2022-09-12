import { API } from './API.js';
import { Modal } from './Modal.js';

export class User {
  #user = {};
  #desks = {};
  #userId;

  constructor(userId) {
    this.#userId = userId;
  }

  get userId() {
    return this.#userId;
  }
  get user() {
    return this.#user;
  }

  set user(user) {
    if (typeof user !== 'undefined') {
      return (this.#user = user);
    }
  }

  get desks() {
    return this.#desks;
  }

  set desks(desks) {
    if (typeof desks !== 'undefined') {
      return (this.#desks = desks);
    }
  }

  async fetcher(callback, appendDesks, message) {
    try {
      const user = await callback();
      this.user = user;
      this.desks = user.desks;
      this.#userId = user.id;
      appendDesks();
    } catch (e) {
      Modal.addError(`${message}: ${e.message}`);
      // console.error('fetcher()', e.message);
    }
  }
}
