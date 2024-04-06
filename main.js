import { App } from './src/app';
import todoStore from './src/store/todo.store';

todoStore.initiStore();

document.addEventListener('DOMContentLoaded', App);
