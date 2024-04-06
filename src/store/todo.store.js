import { Todo } from './models/todo.model';

export const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending',
}

const state = {
  todos: [],
  filter: Filters.All,
}

const initiStore = () => {
  loadStore();
}

const loadStore = () => {
  if (!localStorage.getItem('state')) return;

  const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
  state.todos = todos;
  state.filter = filter;
}

const saveStateToStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
}

/**
 * @param { Filters } filter 
 */
const getTodos = (filter = Filters.All) => {
  let filteredTodos = [];

  switch (filter) {
    case Filters.All:
      filteredTodos = [...state.todos];
      break;
    case Filters.Completed:
      filteredTodos = state.todos.filter(todo => todo.done);
      break;
    case Filters.Pending:
      filteredTodos = state.todos.filter(todo => !todo.done);
      break;
    default:
      throw new Error(`Option ${filter} is not valid.`);
  }

  if (state.search) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.description.toLowerCase().includes(state.search.toLowerCase())
    ));
  }

  return filteredTodos;
}

/**
 * @param { String } description 
 */
const addTodo = (description) => {
  if (!description) throw new Error('Description is required');

  state.todos.push(new Todo(description));

  saveStateToStorage();
}

/**
 * @param { String } id 
 */
const toggleTodo = (id) => {
  state.todos = state.todos.map(todo => {
    if (todo.id === id) {
      todo.done = !todo.done;
    }
    return todo;
  });

  saveStateToStorage();
}

/**
 * @param { String } id 
 */
const deleteTodo = (id) => {
  state.todos = state.todos.filter(todo => todo.id !== id);

  saveStateToStorage();
}

const deleteCompleted = () => {
  state.todos = state.todos.filter(todo => !todo.done);

  saveStateToStorage();
}

/**
 * @param { String } search 
 */
const setSearch = (search) => {
  state.search = search;
}

/**
 * @param { Filters } newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;

  saveStateToStorage();
}

const getCurrentFilter = () => {
  return state.filter
}

export default {
  initiStore,
  loadStore,
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setSearch,
  setFilter,
  getCurrentFilter
}