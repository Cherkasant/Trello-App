import {
  createDeskCount,
  createDeskCountInprogress,
  createDeskCountDone,
  createDeskTemplate,
  progressTemplate,
  doneTemplate,
  createContentDesk,
  createContentDeskInprogress,
  createContentDeskDone,
} from './elements.js';
import { $ } from './DOM.js';
import { API } from './API.js';
import {
  ERROR_WHILE_DELETE,
  ERROR_WHILE_MOVING,
  ERROR_WHILE_EDIT,
  ERROR_WHILE_ADD,
} from './errorMessages.js';
import { Modal } from './Modal.js';
import { getDate } from './utils/date.js';

export class Logic {
  constructor(user, fetcher, appendDesks) {
    this.user = user;
    this.desks = user.desks;
    this.fetcher = fetcher;
    this.appendDesks = appendDesks;
    this.ID = user.id;
  }

  pushContent(template, el) {
    const title = template.find('[data-todo-title]');
    title.text(el.title);

    const description = template.find('[data-todo-desc]');
    description.text(el.desc);

    const userLayout = template.find('[data-todo-user]');
    userLayout.text(this.user.name);

    const date = template.find('[data-todo-time]');
    date.text(el.date);
  }

  putFetch(desks, message) {
    this.fetcher(
      () => API.putUser(this.ID, { desks }),
      this.appendDesks,
      message
    );
  }

  appendCreateTodos() {
    const { create } = this.desks;
    createDeskCount.text(create.length);

    if (create.length) {
      create.forEach((el) => {
        const createTemplate = $(
          document.importNode(createDeskTemplate.$el.content, true)
        );
        this.pushContent(createTemplate, el);

        const btnMove = createTemplate.find('[data-button-move]');

        btnMove.addEvent('click', () => {
          const limit = 3;
          if (this.desks.progress.length >= limit) {
            Modal.addWarningLimit(limit);
            return;
          }
          const create = this.desks.create.filter((todo) => todo.id !== el.id);
          const progress = [...this.desks.progress, el];
          const newDesks = {
            ...this.desks,
            create,
            progress,
          };
          this.putFetch(newDesks, ERROR_WHILE_MOVING);
        });

        const btnRemove = createTemplate.find('[data-button-remove]');
        btnRemove.addEvent('click', () => this.removeTodo('create', el));

        const bntEdit = createTemplate.find('[data-button-edit]');
        bntEdit.addEvent('click', () => {
          Modal.addTodo(
            this.editTodoLogic.bind(this),
            'edit',
            el,
            this.user.name
          );
        });

        createContentDesk.append(createTemplate);
      });
    } else {
      createContentDesk.insertHTML('afterbegin', `<p>No todos...</p>`);
    }
  }

  appendProgressTodos() {
    const { progress } = this.desks;
    createDeskCountInprogress.text(progress.length);

    if (progress.length) {
      progress.forEach((el) => {
        const createProgressTemplate = $(
          document.importNode(progressTemplate.$el.content, true)
        );

        this.pushContent(createProgressTemplate, el);

        const btnMove = createProgressTemplate.find('[data-button-move]');
        btnMove.addEvent('click', () => {
          const progress = this.desks.progress.filter(
            (todo) => todo.id !== el.id
          );
          const done = [...this.desks.done, el];
          const newDesks = {
            ...this.desks,
            progress,
            done,
          };
          this.putFetch(newDesks, ERROR_WHILE_MOVING);
        });

        const btnBack = createProgressTemplate.find('[data-button-back]');
        btnBack.addEvent('click', () => {
          const progress = this.desks.progress.filter(
            (todo) => todo.id !== el.id
          );
          const create = [...this.desks.create, el];
          const newDesks = {
            ...this.desks,
            create,
            progress,
          };
          this.putFetch(newDesks, ERROR_WHILE_MOVING);
        });

        const btnRemove = createProgressTemplate.find('[data-button-remove]');
        btnRemove.addEvent('click', () => this.removeTodo('progress', el));

        createContentDeskInprogress.append(createProgressTemplate);
      });
    } else {
      createContentDeskInprogress.insertHTML(
        'afterbegin',
        `<p>No todos...</p>`
      );
    }
  }
  appendDoneTodos() {
    const { done } = this.desks;
    createDeskCountDone.text(done.length);

    if (done.length) {
      done.forEach((el) => {
        const createDoneTemplate = $(
          document.importNode(doneTemplate.$el.content, true)
        );

        this.pushContent(createDoneTemplate, el);

        const btnRemove = createDoneTemplate.find('[data-button-remove]');
        btnRemove.addEvent('click', () => this.removeTodo('done', el));

        createContentDeskDone.append(createDoneTemplate);
      });
    } else {
      createContentDeskDone.insertHTML('afterbegin', `<p>No todos...</p>`);
    }
  }

  removeTodo(deskName, el) {
    const newDesk = this.desks[deskName].filter((todo) => todo.id !== el.id);
    const newDesks = {
      ...this.desks,
      [deskName]: newDesk,
    };
    this.putFetch(newDesks, ERROR_WHILE_DELETE);
  }

  removeAll() {
    const remove = () => {
      const newDesks = {
        ...this.desks,
        done: [],
      };
      this.putFetch(newDesks, ERROR_WHILE_DELETE);
    };
    Modal.addWarning(remove);
  }

  editTodoLogic(title, desc, id) {
    const newDesk = { title, desc, id, date: getDate() };
    const newCreateTodos = this.desks.create.map((el) => {
      if (el.id === id) {
        return newDesk;
      }
      return el;
    });

    const newDesks = { ...this.desks, create: newCreateTodos };

    this.putFetch(newDesks, ERROR_WHILE_EDIT);
  }

  addTodoLogic(title, desc, id) {
    const newDesk = { title, desc, id, date: getDate() };
    const newDesks = { ...this.desks, create: [...this.desks.create, newDesk] };

    this.putFetch(newDesks, ERROR_WHILE_ADD);
  }

  addTodoLayout() {
    Modal.addTodo(this.addTodoLogic.bind(this));
  }
}
