import { $ } from './DOM.js';

const clock = $('[data-header-clock]');
const createDeskTemplate = $('[data-todo-item-template]');
const progressTemplate = $('[data-todo-item-template-inprogress]');
const doneTemplate = $('[data-todo-item-template-completed]');

const createContentDesk = $('[data-todo-description]');
const createContentDeskInprogress = $('[data-todo-description-inprogress]');
const createContentDeskDone = $('[data-todo-description-done]');

const createDeskCount = $('[data-todo-count]');
const createDeskCountInprogress = $('[data-todo-count-inprogress]');
const createDeskCountDone = $('[data-todo-count-done]');

const root = $('.root');

const btnRemoveAll = $('[data-button-removeall]');
const btnAddTodo = $('[data-button-add]');

export {
  clock,
  createDeskTemplate,
  progressTemplate,
  doneTemplate,
  createContentDesk,
  createContentDeskInprogress,
  createContentDeskDone,
  createDeskCount,
  createDeskCountInprogress,
  createDeskCountDone,
  root,
  btnRemoveAll,
  btnAddTodo,
};
