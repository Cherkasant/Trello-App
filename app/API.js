import { Modal } from './Modal.js';

export class API {
  static #route = 'https://6307a92f46372013f56e8a1c.mockapi.io/Users/';

  static async getUsers() {
    const response = await fetch(API.#route);
    if (response.ok) {
      const todos = await response.json();
      return todos;
    } else {
      throw new Error(response.statusText);
    }
  }

  static async getUser(id) {
    Modal.addLoader();
    const response = await fetch(API.#route + id);
    if (response.ok) {
      const user = await response.json();
      setTimeout(Modal.removeLoader, 500);
      return user;
    } else {
      throw new Error(response.statusText);
    }
  }

  static async putUser(id, body) {
    const bodyContent = JSON.stringify(body);
    const headerList = {
      'content-type': 'application/json',
    };

    const options = {
      method: 'PUT',
      body: bodyContent,
      headers: headerList,
    };

    const response = await fetch(API.#route + id, options);

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      throw new Error(response.statusText);
    }
  }
}
