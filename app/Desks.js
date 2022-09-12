import { API } from './API.js';
import { User } from './User.js';
import { $ } from './DOM.js';
import {
  createContentDesk,
  createContentDeskInprogress,
  createContentDeskDone,
  btnRemoveAll,
  btnAddTodo,
  userName,
  avatar,
} from './elements.js';
import { getDate } from './utils/date.js';
import { Logic } from './Logic.js';
import { ERROR_FETCHING, ERROR_WHILE_DELETE } from './errorMessages.js';

export class Desks extends User {
  constructor(userId) {
    super(userId);

    btnRemoveAll.addEvent('click', () => {
      this.deskLogic().removeAll();
    });

    btnAddTodo.addEvent('click', () => {
      this.deskLogic().addTodoLayout();
    });
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

    userName.text(this.user.name);
    avatar.$el.src = this.user.avatar;

    const $logic = this.deskLogic();

    $logic.appendCreateTodos();

    $logic.appendProgressTodos();

    $logic.appendDoneTodos();
  }

  render(id = this.userId) {
    this.fetcher(
      () => API.getUser(id),
      this.appendDesks.bind(this),
      ERROR_FETCHING
    );
  }
}
