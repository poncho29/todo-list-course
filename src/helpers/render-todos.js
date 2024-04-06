import todoStore from "../store/todo.store";

import { TodoItem } from "../components";

let element;

export const renderTodos = () => {
  if (!element)
    element = document.querySelector('.todo-list-body');

  const todos = todoStore.getTodos(todoStore.getCurrentFilter());
  
  element.innerHTML = null;

  if (todos.length === 0) {
    element.innerHTML = `
      <li class="no-todos">No hay tareas</li>
    `
  } else {
    todos.forEach(todo => {
      element.append(TodoItem(todo));
    });
  }
}