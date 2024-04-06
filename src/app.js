import todoStore, { Filters } from "./store/todo.store.js";

import html from './app.html?raw';
import { renderTodos, renderCurrentFilter } from "./helpers";


export const App = () => {
  const d = document,
        root = d.getElementById('root');

  root.innerHTML = html;
  renderTodos();
  renderCurrentFilter('.filter')

  // References
  const inputSearch = d.querySelector('#search');
  const filterButtons = d.querySelectorAll('.filter');
  const inputNewTodo = d.querySelector('#new-todo');
  const listTodos = d.querySelector('.todo-list-body');

  // Events
  inputSearch.addEventListener('keyup', (e) => {
    todoStore.setSearch(e.target.value);
    
    renderTodos();
  });


  inputNewTodo.addEventListener('keyup', (e) => {
    if (e.keyCode !== 13) return;
    if (e.target.value.trim().length === 0) return;

    todoStore.addTodo(e.target.value);
    e.target.value = '';
    renderTodos();
  })

  listTodos.addEventListener('click', (e) => {
    const element = e.target.closest('[data-id]');
    todoStore.toggleTodo(element.dataset.id);

    renderTodos();
  });

  listTodos.addEventListener('click', (e) => {
    const element = e.target.closest('[data-id]');
    if (!element || !e.target.classList.contains('delete')) return;

    todoStore.deleteTodo(element.getAttribute('data-id'));
    renderTodos();
  });

  filterButtons.forEach((elment) => {
    elment.addEventListener('click', (event) => {
      // Se remueve la clase 'active-filter' de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active-filter'));
      // Se agrega la clase 'active-filter' al botón actual
      event.target.classList.add('active-filter');

      // Según el texto del botón, se aplica el filtro correspondiente
      switch(event.target.textContent) {
        case 'Todos':
          todoStore.setFilter(Filters.All);
          break;
        case 'Pendientes':
          todoStore.setFilter(Filters.Pending);
          break;
        case 'Completadas':
          todoStore.setFilter(Filters.Completed);
          break;
      }

      // Se actualiza la lista de tareas
      renderTodos();
    })
  })
}