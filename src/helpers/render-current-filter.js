import { Filters } from "../store/todo.store";

let element;

const textButtons = {
  [Filters.All]: 'Todos',
  [Filters.Pending]: 'Pendientes',
  [Filters.Completed]: 'Completadas',
}

/**
 * @param { String } attribute 
 */
export const renderCurrentFilter = (attribute) => {
  if (!element)
    element = document.querySelectorAll(attribute);

  if (!element) throw new Error(`Element not found: ${attribute}`);

  if (localStorage.getItem('state')) {
    const { filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    
    element.forEach((el) => {
      if (el.textContent === textButtons[filter]) {
        el.classList.add('active-filter');
      } else {
        el.classList.remove('active-filter');
      }
    });
  }
}