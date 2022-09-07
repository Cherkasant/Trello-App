import { API } from './API.js';
import { User } from './User.js';
import { $ } from './DOM.js';
import {
  createDeskTemplate,
  progressTemplate,
  doneTemplate,
  createContentDesk,
  createContentDeskInprogress,
  createContentDeskDone,
  createDeskCount,
  createDeskCountInprogress,
  createDeskCountDone,
  btnRemoveAll,
  btnAddTodo,
} from './elements.js';
import { getDate } from './utils/date.js';
import { Logic } from './Logic.js';
import { ERROR_FETCHING, ERROR_WHILE_DELETE } from './errorMessages.js';

export class Desks extends User {
  constructor(userId) {
    super(userId);
  }

  deskLogic() {
    return new Logic(
      this.user,
      this.fetcher.bind(this),
      this.appendDesks.bind(this)
    );
  }

  appendDesks() {
    createContentDesk.clear();
    createContentDeskInprogress.clear();
    createContentDeskDone.clear();

    const $logic = this.deskLogic();

    $logic.appendCreateTodos();

    $logic.appendProgressTodos();

    $logic.appendDoneTodos();
  }

  render() {
    this.fetcher(
      () => API.getUser(this.userId),
      this.appendDesks.bind(this),
      ERROR_FETCHING
    );

    btnRemoveAll.addEvent('click', () => {
      this.deskLogic().removeAll();
    });

    btnAddTodo.addEvent('click', () => {
      this.deskLogic().addTodoLayout();
    });
  }
}
