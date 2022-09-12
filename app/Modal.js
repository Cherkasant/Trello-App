import { root } from './elements.js';
import { DOM } from './DOM.js';

export class Modal {
  static #errorLayout;
  static #loader;
  static #warning;
  static #addTodo;
  static #userSelect;

  static addLoader() {
    const loader = DOM.create('div', 'modal');
    loader.insertHTML('afterbegin', `<div class="lds-hourglass"></div>`);
    Modal.#loader = loader;
    root.insertElement('afterend', loader);
  }

  static removeLoader() {
    if (Modal.#loader) {
      Modal.#loader.remove();
    }
  }

  static addError(message) {
    this.removeLoader();
    const error = DOM.create('div', 'modal');
    error.insertHTML('afterbegin', `<p>&#9888; ${message}</p>`);
    Modal.#errorLayout = error;
    root.insertElement('afterend', error);

    error.addEvent('click', (e) => {
      if (e.target.tagName === 'P') return;
      Modal.#errorLayout.remove();
    });
  }
  static addWarning(callback) {
    const warning = DOM.create('div', 'modal');
    warning.insertHTML(
      'afterbegin',
      `
    <div class="btn_warning-buttons">
    <span>Are you sure?</span>
    <div>
    <button class="btn_confirm" data-button-confirm>YES</button>
    <button class="btn_cancel" data-button-cancel>NO</button>
    </div>
    
    </div>`
    );
    Modal.#warning = warning;
    warning.addEvent('click', (e) => {
      if ('buttonCancel' in e.target.dataset) {
        this.removeWarning();
        return;
      }
      if ('buttonConfirm' in e.target.dataset) {
        callback();
        this.removeWarning();
      }
    });
    root.insertElement('afterend', warning);
  }

  static removeWarning() {
    if (Modal.#warning) {
      Modal.#warning.remove();
    }
  }

  static addWarningLimit(limit) {
    const warning = DOM.create('div', 'modal');
    warning.insertHTML(
      'afterbegin',
      `
    <div class="btn_warning-buttons">
    <span>You can add only ${limit} todos </span>
    <div>
    <button class="btn_confirm" data-button-confirm>OK</button>
    
    </div>
    
    </div>`
    );
    Modal.#warning = warning;
    warning.addEvent('click', (e) => {
      if ('buttonConfirm' in e.target.dataset) {
        this.removeWarning();
      }
    });
    root.insertElement('afterend', warning);
  }

  static addTodo(callback, type = 'add', todo = null, name = ' ') {
    const newTodo = DOM.create('div', 'modal');
    const formNewTodo = DOM.create('form', 'modal_new-todo');

    formNewTodo.insertHTML(
      'afterbegin',
      `<h4 class="newtodo_header">${type === 'add' ? 'New todo' : 'Edit'}</h4>
    <input required type="text" placeholder="title" class="newtodo_title" value="${
      todo ? todo.title : ''
    }"  />
    <textarea required placeholder="enter description..."   rows="5" cols="30"  class="newtodo_description" >${
      todo ? todo.desc : ''
    }</textarea>
      <select name="select" id="">
      <option value="1">Jim Aufderhar</option>
      <option value="2">Ms. Rogelio Marks</option>
      <option value="3">Melanie Trantow</option>
    </select>

    <div class="newtodo_buttons">
      <button
        type="submit"
        class="newtodo_button-confirm"
        data-btn-newtodo-confirm
      >
        ${type === 'add' ? 'Add Todo' : 'Edit Todo'}
      </button>
      <button
        type="button"
        class="newtodo_button-cancel"
        data-btn-newtodo-cancel
      >
        Cancel
      </button>
    </div>`
    );
    Modal.#addTodo = newTodo;
    newTodo.insertElement('afterbegin', formNewTodo);
    root.insertElement('afterend', newTodo);

    newTodo.addEvent('click', (e) => {
      if ('btnNewtodoCancel' in e.target.dataset) {
        this.removeAddTodo();
      }
    });

    newTodo.addEvent('submit', (e) => {
      e.preventDefault();
      const id = todo ? todo.id : Date.now();
      callback(e.target[0].value, e.target[1].value, id);
      this.removeAddTodo();
    });

    newTodo.addEvent('keyup', (e) => {
      if (e.code === 'Escape') {
        this.removeAddTodo();
      } else if (e.code === 'Enter') {
        e.preventDefault();
        const id = todo ? todo.id : Date.now();
        callback(
          e.target.parentNode[0].value,
          e.target.parentNode[1].value,
          id
        );

        this.removeAddTodo();
      }
    });
  }

  static removeAddTodo() {
    if (Modal.#addTodo) {
      Modal.#addTodo.remove();
    }
  }

  static userSelect(desks) {
    const list = DOM.create('div', 'modal');
    const usersForm = DOM.create('form', 'modal_new-todo', 'user_form');
    usersForm.insertHTML(
      'afterbegin',
      `<label for="select">Welcome!</label>
      <select name="select" id="">
      <option value="">--Please choose a User--</option>
    <option value="1">Jim Aufderhar</option>
    <option value="2">Ms. Rogelio Marks</option>
    <option value="3">Melanie Trantow</option>
    <option value="4">Allison Torp MD</option>
  </select>`
    );

    usersForm.addEvent('change', (e) => {
      const value = e.target.value.trim();
      if (value) {
        desks.render(value);
        this.removeUserSelect();
      }
    });
    Modal.#userSelect = list;
    list.append(usersForm);
    root.insertElement('afterend', list);
  }

  static removeUserSelect() {
    if (Modal.#userSelect) {
      Modal.#userSelect.remove();
    }
  }
}
